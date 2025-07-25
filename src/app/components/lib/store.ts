// lib/store.ts
import { create } from 'zustand'

interface CursorStore {
  hovered: boolean
  setCursorHovered: () => void
  unsetCursorHovered: () => void
}

export const useCursorStore = create<CursorStore>((set) => ({
  hovered: false,
  setCursorHovered: () => set({ hovered: true }),
  unsetCursorHovered: () => set({ hovered: false }),
}))
