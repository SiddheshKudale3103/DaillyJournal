import React, { useMemo } from "react";
import Navbar from "./components/Navbar";
import GalaxyBackground from "./three/GalaxyBackground";
import ExpenseSection from "./features/Expenses";
import WorkoutSection from "./features/Workouts";
import LearningSection from "./features/Learning";
import InterviewSection from "./features/Interviews";
import QuotesSection from "./features/Quotes";
import ExtrasSection from "./features/ExtrasSection";
import Card from "./components/Card";
import { useRecords } from "./store";
import {
  todayISO,
  toDailyTxt,
  buildExportJson,
  download,
} from "./utils/export";

export default function App() {
  const records = useRecords();
  const today = todayISO();
  const todayData = useMemo(() => records.byDate[today], [records, today]);

  const exportJSON = () => {
    const text = buildExportJson({ byDate: records.byDate });
    download("records.json", text);
  };

  const importJSON = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(String(reader.result));
        records.importJson(json);
      } catch (e) {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  const exportTodayTxt = () => {
    const day = records.byDate[today] || {
      expenses: [],
      workouts: [],
      learning: [],
      interviews: [],
      quotes: [],
      extras: [],
    };
    const txt = toDailyTxt(today, day);
    download(`today_${today}.txt`, txt);
  };

  const reset = () => {
    if (confirm("Reset all data?")) records.resetAll();
  };

  return (
    <div className="relative min-h-screen">
      <GalaxyBackground />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 space-y-4 pb-20">
        <Card className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <div className="text-lg font-semibold">
              Today: <span className="text-neon-blue">{today}</span>
            </div>
            <div className="text-sm opacity-70">
              Anime vibes on. Log your day, Homie. 🥷⚡
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn" onClick={exportJSON}>
              Export JSON
            </button>
            <label className="btn cursor-pointer">
              Import JSON
              <input
                type="file"
                className="hidden"
                accept="application/json"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importJSON(f);
                }}
              />
            </label>
            <button className="btn" onClick={exportTodayTxt}>
              Export Today (.txt)
            </button>
            <button
              className="btn border-red-500/40 hover:border-red-500/70"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <ExpenseSection />
          <WorkoutSection />
          <LearningSection />
          <InterviewSection />
          <QuotesSection />
          <ExtrasSection />
        </div>

        <Summary />
      </main>
    </div>
  );
}

function Summary() {
  const s = useRecords();
  const today = todayISO();
  const day = s.byDate[today];

  if (!day)
    return (
      <Card>
        <div className="opacity-80">
          No entries yet today. Log something to see your summary.
        </div>
      </Card>
    );

  const total = (day.expenses || []).reduce(
    (a, b) => a + Number(b.amount || 0),
    0
  );

  return (
    <Card className="space-y-2">
      <div className="text-lg font-semibold">Quick Summary</div>
      <div className="grid md:grid-cols-4 gap-3">
        <KPI label="Spent" value={`₹${total.toFixed(2)}`} />
        <KPI label="Workouts" value={day.workouts?.length || 0} />
        <KPI label="Learned" value={day.learning?.length || 0} />
        <KPI label="Quotes" value={day.quotes?.length || 0} />
      </div>
    </Card>
  );
}

function KPI({ label, value }: { label: string; value: any }) {
  return (
    <div className="glass p-4 flex flex-col rounded-xl">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-semibold">{String(value)}</div>
    </div>
  );
}
