import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'fp:'

export function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* localStorage may be unavailable in private mode */
  }
}

export function useLocalState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readLocal(key, fallback))
  useEffect(() => {
    writeLocal(key, value)
  }, [key, value])
  return [value, setValue] as const
}

export type FavoriteKey = `${'article' | 'case' | 'book' | 'person'}:${string}`

export function useFavorites() {
  const [favorites, setFavorites] = useLocalState<FavoriteKey[]>('favorites', [])
  const toggle = useCallback((key: FavoriteKey) => {
    setFavorites((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]))
  }, [setFavorites])
  const isFavorite = useCallback((key: FavoriteKey) => favorites.includes(key), [favorites])
  return { favorites, toggle, isFavorite }
}

export interface ReadingRecord {
  key: string
  progress: number
  updatedAt: string
}

export function useReadingRecords() {
  const [records, setRecords] = useLocalState<ReadingRecord[]>('reading-records', [])
  const save = useCallback((key: string, progress: number) => {
    setRecords((prev) => {
      const rest = prev.filter((r) => r.key !== key)
      return [...rest, { key, progress: Math.max(0, Math.min(100, Math.round(progress))), updatedAt: new Date().toISOString() }].slice(-200)
    })
  }, [setRecords])
  const get = useCallback((key: string) => records.find((r) => r.key === key)?.progress ?? 0, [records])
  return { records, save, get }
}

export interface ReadingSettings {
  fontSize: number
  lineWidth: number
  theme: 'system' | 'light' | 'dark'
}

export const defaultReadingSettings: ReadingSettings = { fontSize: 17, lineWidth: 720, theme: 'system' }

export function useReadingSettings() {
  const [settings, setSettings] = useLocalState<ReadingSettings>('reading-settings', defaultReadingSettings)
  return { settings, setSettings }
}

export function applyTheme(theme: 'system' | 'light' | 'dark') {
  const resolved = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme
  document.documentElement.dataset.theme = resolved
}
