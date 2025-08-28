import { Records, DayRecord } from "@/store"

export const todayISO = () => new Date().toISOString().slice(0,10)

export function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function toDailyTxt(date: string, day: DayRecord): string {
  const money = (n: any) => {
    const num = parseFloat(n ?? 0)
    return "₹" + (isNaN(num) ? n : num.toFixed(2))
  }
  const lines: string[] = []
  lines.push(`=== Daily Summary — ${date} ===`)
  lines.push("")

  // Expenses
  lines.push("[Expenses]")
  if (day.expenses.length) {
    let total = 0
    day.expenses.forEach(e => {
      lines.push(`- ${e.category} | ${money(e.amount)} | ${e.note ?? ""}`)
      total += Number(e.amount || 0)
    })
    lines.push(`Total: ${money(total)}`)
  } else lines.push("No expenses logged.")
  lines.push("")

  // Workouts
  lines.push("[Workouts]")
  if (day.workouts.length) {
    day.workouts.forEach(w => lines.push(`- ${w.type} | ${w.details ?? ""}`))
  } else lines.push("No workout logged.")
  lines.push("")

  // Learning
  lines.push("[Learning]")
  if (day.learning.length) {
    day.learning.forEach(l =>
      lines.push(`- ${l.topic} | ${l.stack ?? ""} | ${l.notes ?? ""}`)
    )
  } else lines.push("No learning logged.")
  lines.push("")

  // Interviews
  lines.push("[Interviews]")
  if (day.interviews.length) {
    day.interviews.forEach(i =>
      lines.push(`- ${i.date} | ${i.company} | ${i.role} | ${i.notes ?? ""}`)
    )
  } else lines.push("No interviews today.")
  lines.push("")

  // Quotes
  lines.push("[Quotes]")
  if (day.quotes.length) {
    day.quotes.forEach(q => lines.push(`“${q.text}”`))
  } else lines.push("No quotes today.")
  lines.push("")

  // ✅ Extras
  lines.push("[Extras]")
  if (day.extras && day.extras.length) {
    day.extras
      .filter(e => e.done)
      .forEach(e => lines.push(`- ${e.id}`))
  } else lines.push("No extras logged.")

  return lines.join("\n")
}


export function buildExportJson(records: Records): string {
  return JSON.stringify(records, null, 2)
}
