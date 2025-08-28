import React, { useState } from "react";
import Card from "../components/Card";
import { useRecords } from "../store";
import { todayISO } from "../utils/export";

export default function ExpenseSection() {
  const add = useRecords((s) => s.add);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const date = todayISO();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    add("expenses", {
      id: crypto.randomUUID(),
      date,
      amount: parseFloat(amount),
      category,
      note,
    });
    setAmount("");
    setNote("");
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold text-neon-blue">Expenses 💰</div>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-2">
        <input
          className="glass px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="glass px-3 py-2 text-white bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-md "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Petrol</option>
          <option>Tools</option>
          <option>Friend</option>
          <option>8-Pool</option>
          <option>Other</option>
        </select>
        <input
          className="glass px-3 py-2 md:col-span-2"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="btn md:col-span-4">Add</button>
      </form>
    </Card>
  );
}
