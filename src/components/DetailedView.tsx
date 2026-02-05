import { useStore } from '../store.ts'

export const DetailedView = () => {
  const { selectedItem, map } = useStore()

  const obj = map?.get(selectedItem)

  if (!obj) return <span>no item selected</span>

  // doesn't look good, gotta refine this later
  return (
    <div>
      {Object.keys(obj).map((key) => <div key={key}>{key}: {String(obj[key])}</div>)}
    </div>
  )
}