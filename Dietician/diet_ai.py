import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

load_dotenv()

class DietAI:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-3-flash-preview", 
            google_api_key=api_key,
            temperature=0.7
        )
        
        self.system_prompt = """You are an AI Dietician and Calorie Coach. Your role is to:
1. Provide personalized nutrition advice based on user goals
2. Suggest healthy meal ideas and recipes
3. Calculate calorie needs and macronutrient targets
4. Help users make better food choices
5. Provide motivation and accountability
6. Answer questions about nutrition, diet plans, and healthy eating habits

Be supportive, evidence-based, and practical. Always consider the user's dietary preferences, restrictions, and goals.
Provide specific, actionable advice rather than general statements."""
    
    def get_response(self, user_message, user_context):
        """Generate AI response based on user message and context"""
        
        # Create context-aware prompt
        context_prompt = f"""
User Profile:
- Name: {user_context.get('name', 'User')}
- Goal: {user_context.get('goal', 'Not specified')} (lose/maintain/gain weight)
- Daily Calorie Target: {user_context.get('daily_calories', 'Not set')} calories
- Today's Calories: {user_context.get('todays_meals', {}).get('total_calories', 0)} calories
- Weight: {user_context.get('weight', 'Not recorded')} kg
- Height: {user_context.get('height', 'Not recorded')} cm
- Age: {user_context.get('age', 'Not recorded')}
- Gender: {user_context.get('gender', 'Not specified')}

User's Question: {user_message}

Provide a helpful, personalized response considering their profile and goals.
"""
        
        try:
            messages = [
                SystemMessage(content=self.system_prompt),
                HumanMessage(content=context_prompt)
            ]
            
            response = self.llm.invoke(messages)
            
            # Clean response for terminal/UI
            if isinstance(response.content, list):
                clean_text = response.content[0].get('text', '')
            else:
                clean_text = response.content
                
            return clean_text
            
        except Exception as e:
            if "429" in str(e):
                return "I'm currently experiencing high demand. Please try again in a moment!"
            return f"I apologize, but I'm having trouble processing your request. Let me try a different approach. Could you rephrase your question?"