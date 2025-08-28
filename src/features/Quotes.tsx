import React, { useState } from "react";
import Card from "../components/Card";
import { useRecords } from "../store";
import { todayISO } from "../utils/export";

export default function QuotesSection() {
  const add = useRecords((s) => s.add);
  const [text, setText] = useState("");
  const date = todayISO();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    add("quotes", { id: crypto.randomUUID(), date, text });
    setText("");
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold">Quotes 📝</div>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-2">
        <input
          className="glass px-3 py-2 md:col-span-3"
          placeholder="Your quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn">Add</button>
      </form>
    </Card>
  );
}
