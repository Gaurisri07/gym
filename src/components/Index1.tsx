import { Link } from "react-router-dom";
import { Apple, Dumbbell, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const modules = [
  {
    to: "/dietician",
    icon: Apple,
    title: "AI Dietician & Calorie Coach",
    desc: "Smart meal plans, BMI calculator, calorie tracking, and personalized grocery lists.",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    to: "/gym-buddy",
    icon: Dumbbell,
    title: "Virtual Gym Buddy",
    desc: "Motivational AI companion for workouts, mood support, and fitness guidance.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-primary",
  },
];

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-6">
          <Sparkles className="w-3 h-3" /> Powered by AshAI — Created by Gauri Srivastava
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your AI <span className="gradient-text">Health</span> Companion
        </h1>
        <p className="text-muted-foreground text-lg">
          Smart nutrition coaching and motivational fitness support, all in one place.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        {modules.map((m, i) => (
          <motion.div
            key={m.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <Link
              to={m.to}
              className={`group block p-6 rounded-2xl bg-gradient-to-br ${m.gradient} border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5`}
            >
              <m.icon className={`w-10 h-10 ${m.iconColor} mb-4`} />
              <h2 className="text-xl font-bold text-foreground mb-2">{m.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{m.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                Get Started <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
