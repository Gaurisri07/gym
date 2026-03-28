from datetime import datetime, date
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Profile Info
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    height = db.Column(db.Float)  # in cm
    weight = db.Column(db.Float)  # in kg
    goal = db.Column(db.String(50))  # lose, maintain, gain
    activity_level = db.Column(db.String(20))  # sedentary, light, moderate, active, very_active
    
    # Relationships
    meals = db.relationship('Meal', backref='user', lazy=True)
    grocery_items = db.relationship('GroceryItem', backref='user', lazy=True)
    weight_logs = db.relationship('WeightLog', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def calculate_bmr(self):
        """Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation"""
        if self.gender == 'male':
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age + 5
        else:
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age - 161
        return bmr
    
    def calculate_tdee(self):
        """Calculate Total Daily Energy Expenditure"""
        bmr = self.calculate_bmr()
        activity_multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very_active': 1.9
        }
        return bmr * activity_multipliers.get(self.activity_level, 1.2)
    
    def get_daily_calorie_target(self):
        """Get daily calorie target based on goal"""
        tdee = self.calculate_tdee()
        if self.goal == 'lose':
            return tdee - 500  # 0.5 kg per week
        elif self.goal == 'gain':
            return tdee + 500
        else:
            return tdee

class Meal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    meal_type = db.Column(db.String(20))  # breakfast, lunch, dinner, snack
    food_name = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Float, nullable=False)
    protein = db.Column(db.Float, default=0)
    carbs = db.Column(db.Float, default=0)
    fat = db.Column(db.Float, default=0)
    serving_size = db.Column(db.String(50))
    date = db.Column(db.Date, default=date.today)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class GroceryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.String(50))
    category = db.Column(db.String(50))  # fruits, vegetables, dairy, meat, grains, etc.
    is_purchased = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class WeightLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, default=date.today)
    notes = db.Column(db.String(200))

class FoodDatabase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(100), unique=True, nullable=False)
    calories_per_100g = db.Column(db.Float)
    protein_per_100g = db.Column(db.Float)
    carbs_per_100g = db.Column(db.Float)
    fat_per_100g = db.Column(db.Float)
    serving_unit = db.Column(db.String(20))
    serving_size_g = db.Column(db.Float)