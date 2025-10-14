import React from 'react'
import { getWorld, onWorldChange, World } from './time'

export function useWorld(): World {
  const [w, setW] = React.useState<World>(getWorld())
  React.useEffect(() => onWorldChange(() => setW(getWorld())), [])
  return w
}

export { onWorldChange } from './time'
