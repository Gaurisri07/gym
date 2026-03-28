from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

chat_sessions = {}

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        session_id = data.get('session_id', 'default')
        chat_type = data.get('type', 'dietician')
        
        if session_id not in chat_sessions:
            if chat_type == 'dietician':
                system_prompt = "You are AshAI, an AI Dietician & Calorie Coach created by Gauri Srivastava. Provide nutrition advice, meal plans, and calorie calculations."
            else:
                system_prompt = "You are AshAI, a Virtual Gym Buddy created by Gauri Srivastava. Provide workout suggestions, motivation, and fitness guidance."
            
            chat_sessions[session_id] = model.start_chat(history=[
                {"role": "user", "parts": [system_prompt]},
                {"role": "model", "parts": ["I'm ready to help!"]}
            ])
        
        response = chat_sessions[session_id].send_message(user_message)
        
        return jsonify({
            'response': response.text,
            'session_id': session_id
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/bmi', methods=['POST'])
def calculate_bmi():
    try:
        data = request.json
        height = data.get('height')
        weight = data.get('weight')
        
        height_m = height / 100
        bmi = weight / (height_m * height_m)
        
        if bmi < 18.5:
            category = "Underweight"
        elif bmi < 25:
            category = "Normal weight"
        elif bmi < 30:
            category = "Overweight"
        else:
            category = "Obese"
        
        return jsonify({
            'bmi': round(bmi, 1),
            'category': category
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)