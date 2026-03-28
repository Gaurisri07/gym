import ChatInterface from "../components/ChatInterface";
import BMICalculator from "../components/BMICalculator";
import GroceryList from "../components/GroceryList";
import DietDashboard from "../components/DietDashboard";
import { motion } from "framer-motion";

const SYSTEM_PROMPT = `You are AshAI — an expert AI Dietician & Calorie Coach created by Gauri Srivastava. You help users with meal plans, calorie counting, BMI analysis, grocery lists, and nutritional advice. Be supportive, knowledgeable, and give practical advice.`;

export default function DieticianPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold gradient-text">AI Dietician & Calorie Coach</h1>
        <p className="text-sm text-muted-foreground mt-1">Your personal nutrition assistant powered by AshAI</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
        <div className="lg:col-span-2 glass-panel overflow-hidden flex flex-col">
          <ChatInterface
            systemPrompt={SYSTEM_PROMPT}
            botName="AshAI"
            placeholder="Ask about diet, calories, BMI..."
            welcomeMessage="Hey! I'm **AshAI**, your AI Dietician 🥗 Ask me about meal plans, calorie counts, BMI, or grocery lists!"
          />
        </div>
        <div className="space-y-4 overflow-y-auto">
          <DietDashboard />
          <BMICalculator />
          <GroceryList />
        </div>
      </div>
    </div>
  );
}
