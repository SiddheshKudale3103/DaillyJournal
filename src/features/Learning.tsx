import React, { useState } from "react";
import Card from "../components/Card";
import { useRecords } from "../store";
import { todayISO } from "../utils/export";

export default function LearningSection() {
  const add = useRecords((s) => s.add);
  const [topic, setTopic] = useState("");
  const [stack, setStack] = useState("RN");
  const [notes, setNotes] = useState("");
  const date = todayISO();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    add("learning", { id: crypto.randomUUID(), date, topic, stack, notes });
    setTopic("");
    setNotes("");
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold text-neon-purple">Learning 📖</div>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-2">
        <input
          className="glass px-3 py-2"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <select
          className="glass px-3 py-2"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        >
          <option>RN</option>
          <option>JS</option>
          <option>TS</option>
          <option>React JS</option>
          <option>AI</option>
          <option>Other</option>
        </select>
        <input
          className="glass px-3 py-2 md:col-span-2"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button className="btn md:col-span-4">Add</button>
      </form>
    </Card>
  );
}
