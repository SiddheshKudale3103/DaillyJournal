import React, { useState } from "react";
import Card from "../components/Card";
import { useRecords } from "../store";
import { todayISO } from "../utils/export";

export default function WorkoutSection() {
  const add = useRecords((s) => s.add);
  const [type, setType] = useState("Push-Up");
  const [details, setDetails] = useState("");
  const date = todayISO();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    add("workouts", { id: crypto.randomUUID(), date, type, details });
    setDetails("");
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold text-neon-pink">Workout 🏋️</div>
      <form onSubmit={submit} className="grid md:grid-cols-3 gap-2">
        <select
          className="glass px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Push-Up</option>
          <option>Squats</option>
          <option>Walking</option>
          <option>SuryaNamaskar</option>
          <option>Gym</option>
        </select>
        <input
          className="glass px-3 py-2 md:col-span-2"
          placeholder="Details (sets/reps/time)"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button className="btn md:col-span-3">Add</button>
      </form>
    </Card>
  );
}
