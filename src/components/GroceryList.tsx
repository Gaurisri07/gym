import { useState } from "react";
import { ShoppingCart, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultItems = [
  { id: "1", name: "Chicken breast", checked: false },
  { id: "2", name: "Brown rice", checked: false },
  { id: "3", name: "Broccoli", checked: false },
  { id: "4", name: "Greek yogurt", checked: false },
  { id: "5", name: "Eggs", checked: false },
  { id: "6", name: "Spinach", checked: false },
];

export default function GroceryList() {
  const [items, setItems] = useState(defaultItems);
  const [newItem, setNewItem] = useState("");

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const add = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [...prev, { id: Date.now().toString(), name: newItem.trim(), checked: false }]);
    setNewItem("");
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Grocery List</h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {items.filter((i) => i.checked).length}/{items.length}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add item..."
          className="flex-1 bg-secondary text-foreground rounded-lg px-3 py-2 text-sm outline-none border border-border/50 focus:border-primary/50 transition-colors"
        />
        <button onClick={add} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50 group transition-colors"
            >
              <button
                onClick={() => toggle(item.id)}
                className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors ${
                  item.checked ? "bg-primary border-primary" : "border-muted-foreground/40"
                }`}
              />
              <span className={`text-sm flex-1 ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.name}
              </span>
              <button onClick={() => remove(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
