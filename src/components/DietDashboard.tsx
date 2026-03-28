import { Flame, Droplets, Wheat, Beef } from "lucide-react";
import { motion } from "framer-motion";

const macros = [
  { label: "Calories", value: "1,850", target: "2,200", percent: 84, icon: Flame, color: "text-orange-400" },
  { label: "Protein", value: "120g", target: "150g", percent: 80, icon: Beef, color: "text-red-400" },
  { label: "Carbs", value: "210g", target: "280g", percent: 75, icon: Wheat, color: "text-yellow-400" },
  { label: "Water", value: "2.1L", target: "3.0L", percent: 70, icon: Droplets, color: "text-blue-400" },
];

export default function DietDashboard() {
  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="font-semibold text-foreground">Today's Nutrition</h3>
      <div className="grid grid-cols-2 gap-3">
        {macros.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-lg bg-secondary/50 space-y-2"
          >
            <div className="flex items-center gap-2">
              <m.icon className={`w-4 h-4 ${m.color}`} />
              <span className="text-xs text-muted-foreground">{m.label}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{m.value}</p>
            <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.percent}%` }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">of {m.target}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
