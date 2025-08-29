#!/usr/bin/env python3
"""
Reads data/records.json and writes exports/today_YYYY-MM-DD.txt
Records format matches the frontend's exported JSON.
"""
import json, os, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "records.json"
EXPORTS = ROOT / "exports"
EXPORTS.mkdir(parents=True, exist_ok=True)

def fmt_money(v):
    try:
        return f"₹{float(v):.2f}"
    except Exception:
        return str(v)

def line(s=""):
    return s + "\n"

def main():
    today = datetime.date.today().isoformat()
    if not DATA.exists():
        print(f"[!] {DATA} not found. Export JSON from the app and place it here.")
        return
    with open(DATA, "r", encoding="utf-8") as f:
        data = json.load(f)

    day = data.get("byDate", {}).get(today, {})
    out = []
    out.append(line(f"=== Daily Summary — {today} ==="))
    out.append(line())

    # Expenses
    ex = day.get("expenses", [])
    total = sum([float(e.get("amount", 0) or 0) for e in ex]) if ex else 0
    out.append(line("[Expenses]"))
    if ex:
        for e in ex:
            out.append(line(f"- {e.get('category','misc')} | {fmt_money(e.get('amount'))} | {e.get('note','')}"))
        out.append(line(f"Total: {fmt_money(total)}"))
    else:
        out.append(line("No expenses logged."))
    out.append(line())

    # Workouts
    w = day.get("workouts", [])
    out.append(line("[Workouts]"))
    if w:
        for s in w:
            out.append(line(f"- {s.get('type','session')} | {s.get('details','')}"))
    else:
        out.append(line("No workout logged."))
    out.append(line())

    # Learning
    l = day.get("learning", [])
    out.append(line("[Learning]"))
    if l:
        for it in l:
            out.append(line(f"- {it.get('topic','')} | {it.get('notes','')}"))
    else:
        out.append(line("No learning logged."))
    out.append(line())

    # Interviews
    iv = day.get("interviews", [])
    out.append(line("[Interviews]"))
    if iv:
        for ev in iv:
            out.append(line(f"- {ev.get('date','')} | {ev.get('company','')} | {ev.get('role','')} | {ev.get('notes','')}"))
    else:
        out.append(line("No interviews today."))
    out.append(line())

    # Quotes
    q = day.get("quotes", [])
    out.append(line("[Quotes]"))
    if q:
        for qt in q:
            out.append(line(f'“{qt.get("text","")}”'))
    else:
        out.append(line("No quotes today."))

    outfile = EXPORTS / f"today_{today}.txt"
    with open(outfile, "w", encoding="utf-8") as f:
        f.write("".join(out))
    print(f"[✓] Wrote {outfile}")

if __name__ == "__main__":
    main()
