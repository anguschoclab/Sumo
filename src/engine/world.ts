
import { useEffect, useState } from 'react'
import { getWorld, onWorldChange, World } from './time'

export function useWorld(): World {
  const [w, setW] = useState(getWorld())
  useEffect(() => {
    setW(getWorld())
    const off = onWorldChange(() => setW(getWorld()))
    return off
  }, [])
  return w
}

export { onWorldChange } from './time'

export function seedIfEmpty() {
  // placeholder for demo-data seeding
}
