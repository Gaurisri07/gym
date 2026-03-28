const API_BASE = 'http://localhost:5001/api';

export const chatAPI = {
  sendMessage: async (message: string, sessionId: string, type: 'dietician' | 'gym_buddy') => {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: sessionId, type })
    });
    
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  }
};

export const bmiAPI = {
  calculate: async (height: number, weight: number) => {
    const response = await fetch(`${API_BASE}/bmi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ height, weight })
    });
    
    if (!response.ok) throw new Error('Failed to calculate BMI');
    return response.json();
  }
};