import ChatInterface from "../components/ChatInterface";
import MoodDisplay from "../components/MoodDisplay";
import { motion } from "framer-motion";
import { Trophy, Zap, Target, TrendingUp } from "lucide-react";

const SYSTEM_PROMPT = `You are AshAI — a Virtual Gym Buddy and motivational AI companion created by Gauri Srivastava. You support users emotionally, provide workout suggestions, and give motivational nudges. You're like a supportive friend who never gives up on them.`;

const stats = [
  { icon: Trophy, label: "Streak", value: "7 days", color: "text-yellow-400" },
  { icon: Zap, label: "Energy", value: "High", color: "text-green-400" },
  { icon: Target, label: "Goal", value: "5 workouts/wk", color: "text-primary" },
  { icon: TrendingUp, label: "Progress", value: "+12%", color: "text-blue-400" },
];

export default function GymBuddyPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold gradient-text">Virtual Gym Buddy</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI workout companion & motivational coach</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
        <div className="lg:col-span-2 glass-panel overflow-hidden flex flex-col">
          <ChatInterface
            systemPrompt={SYSTEM_PROMPT}
            botName="AshAI"
            placeholder="Need motivation? Ask me anything..."
            welcomeMessage="Hey champion! 💪 I'm **AshAI**, your Virtual Gym Buddy. Tell me how you're feeling, ask for workouts, or just chat when you need a boost!"
          />
        </div>
        <div className="space-y-4 overflow-y-auto">
          <MoodDisplay />
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-foreground mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-lg bg-secondary/50 text-center"
                >
                  <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-foreground mb-3">Daily Nudge</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-primary/10 border border-primary/20"
            >
              <p className="text-sm text-foreground italic">
                "The only bad workout is the one that didn't happen."
              </p>
              <p className="text-xs text-muted-foreground mt-2 text-right">— Your Gym Buddy 💜</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
