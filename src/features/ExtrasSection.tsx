import Card from "../components/Card";
import { useRecords } from "../store";
import { todayISO } from "../utils/export";

const ACTIVITIES = [
  "Book Reading 📚",
  "Explore New AI 🤖",
  "Played PC/Mobile Game 🎮",
  "Watched Anime / Netflix / TMKUC / Movie🍥",
];

export default function ExtrasSection() {
  const date = todayISO();
  const extras = useRecords((s) => s.byDate[date]?.extras ?? []);
  const add = useRecords((s) => s.add);

  const toggle = (activity: string) => {
    const current = extras.find((e) => e.id === activity)?.done ?? false;
    console.log({ id: activity, date, done: !current });
    add("extras", { id: activity, date, done: !current });
  };

  return (
    <Card className="space-y-3">
      <div className="font-semibold text-neon-pink">Extras 🌌</div>
      <div className="space-y-2">
        {ACTIVITIES.map((a) => {
          const checked = extras.find((e) => e.id === a)?.done ?? false;
          return (
            <label key={a} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(a)}
                className="accent-neon-blue w-4 h-4"
              />
              <span>{a}</span>
            </label>
          );
        })}
      </div>
    </Card>
  );
}
