import React, { useState } from "react";
import Card from "../components/Card";
import { useRecords } from "../store";

export default function InterviewSection() {
  const add = useRecords((s) => s.add);
  const [date, setDate] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;
    add("interviews", { id: crypto.randomUUID(), date, company, role, notes });
    setCompany("");
    setRole("");
    setNotes("");
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold">Interviews 📅</div>
      <form onSubmit={submit} className="grid md:grid-cols-4 gap-2">
        <input
          className="glass px-3 py-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="glass px-3 py-2"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="glass px-3 py-2"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          className="glass px-3 py-2"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button className="btn md:col-span-4">Add</button>
      </form>
    </Card>
  );
}
