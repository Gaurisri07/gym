import { useState } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import { bmiAPI } from "../services/api";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setLoading(true);
      try {
        const result = await bmiAPI.calculate(h, w);
        setBmi(result.bmi);
        setCategory(result.category);
      } catch (error) {
        console.error("BMI calculation failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getCategoryColor = (cat: string) => {
    if (cat === "Underweight") return "text-yellow-400";
    if (cat === "Normal weight") return "text-green-400";
    if (cat === "Overweight") return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">BMI Calculator</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full bg-secondary text-foreground rounded-lg px-3 py-2 text-sm outline-none border border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="w-full bg-secondary text-foreground rounded-lg px-3 py-2 text-sm outline-none border border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
      <button
        onClick={calculate}
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {loading ? "Calculating..." : "Calculate BMI"}
      </button>
      {bmi !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-4 rounded-lg bg-secondary/50">
          <p className="text-3xl font-bold gradient-text">{bmi}</p>
          <p className={`text-sm font-medium mt-1 ${getCategoryColor(category)}`}>{category}</p>
        </motion.div>
      )}
    </div>
  );
}