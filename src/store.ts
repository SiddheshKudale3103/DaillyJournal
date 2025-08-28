import { create } from "zustand"

export type Expense = { id: string; date: string; amount: number; category: string; note?: string }
export type Workout = { id: string; date: string; type: string; details?: string }
export type Learning = { id: string; date: string; topic: string; notes?: string; stack?: "JS"|"TS"|"RN"|"Other" }
export type Interview = { id: string; date: string; company: string; role: string; notes?: string }
export type Quote = { id: string; date: string; text: string }
export type Extra = { id: string; date: string; done: boolean }  

export type DayRecord = {
  expenses: Expense[]
  workouts: Workout[]
  learning: Learning[]
  interviews: Interview[]
  quotes: Quote[]
  extras: Extra[]  
}

export type Records = {
  byDate: Record<string, DayRecord>
}

const emptyDay = (): DayRecord => ({
  expenses: [],
  workouts: [],
  learning: [],
  interviews: [],
  quotes: [],
  extras: []   
})

type Actions = {
  add: (kind: keyof DayRecord, item: any) => void
  remove: (kind: keyof DayRecord, date: string, id: string) => void
  importJson: (data: Records) => void
  resetAll: () => void
}

const load = (): Records => {
  try {
    const raw = localStorage.getItem("records")
    if (!raw) return { byDate: {} }
    return JSON.parse(raw)
  } catch { return { byDate: {} } }
}

const persist = (s: Records) => localStorage.setItem("records", JSON.stringify(s))

export const useRecords = create<Records & Actions>((set, get) => ({
  ...load(),
  add: (kind, item) => {
  const date = item.date
  const state = { ...get() }
  state.byDate[date] = {
    ...emptyDay(),            // 👈 ensure all keys exist
    ...state.byDate[date],    // 👈 keep existing data
  }

  if (kind === "extras") {
    state.byDate[date].extras = [
      ...state.byDate[date].extras.filter((x) => x.id !== item.id),
      item,
    ]
  } else {
    // @ts-ignore
    state.byDate[date][kind] = [...state.byDate[date][kind], item]
  }

  persist(state)
  set(state)
}

  ,
  remove: (kind, date, id) => {
    const state = { ...get() }
    const day = state.byDate[date]
    if (!day) return
    // @ts-ignore
    day[kind] = day[kind].filter((x:any) => x.id !== id)
    persist(state)
    set(state)
  },
  importJson: (data) => {
    persist(data)
    set(data)
  },
  resetAll: () => {
    const blank = { byDate: {} }
    persist(blank)
    set(blank)
  }
}))
