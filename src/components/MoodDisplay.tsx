import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😤", label: "Fired Up", color: "bg-red-500/20 border-red-500/40" },
  { emoji: "😊", label: "Happy", color: "bg-green-500/20 border-green-500/40" },
  { emoji: "😌", label: "Calm", color: "bg-blue-500/20 border-blue-500/40" },
  { emoji: "😔", label: "Low", color: "bg-yellow-500/20 border-yellow-500/40" },
  { emoji: "💪", label: "Strong", color: "bg-purple-500/20 border-purple-500/40" },
];

export default function MoodDisplay() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="font-semibold text-foreground">How are you feeling?</h3>
      <div className="flex gap-2 justify-center">
        {moods.map((m, i) => (
          <motion.button
            key={m.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
              selected === i ? m.color + " scale-105" : "border-transparent hover:bg-secondary/50"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] text-muted-foreground">{m.label}</span>
          </motion.button>
        ))}
      </div>
      <motion.p
        key={selected}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm text-muted-foreground"
      >
        {selected === 0 && "Channel that fire into your workout! 🔥"}
        {selected === 1 && "Great mood! Perfect time to push your limits! ✨"}
        {selected === 2 && "Calm and focused — ideal for yoga or stretching 🧘"}
        {selected === 3 && "A light workout can boost your mood. Start small! 💜"}
        {selected === 4 && "You're unstoppable today! Go beast mode! 🦁"}
      </motion.p>
    </div>
  );
}
