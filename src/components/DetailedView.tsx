import { useStore } from '../store.ts'

export const DetailedView = () => {
  const { selectedItem, map } = useStore()

  const obj = map?.get(selectedItem)

  if (!obj) return <span>No item selected</span>

  const { children, ...rest } = obj

  const entries = Object.entries(rest)

  return (
    <dl className='DetailedView'>
      {entries.map(([key, value], index) => (
        <div key={index} className='Row'>
          <dt>{key}:</dt>
          <dd>{String(value)}</dd>
        </div>
      ))}
      {children && (
        <div className='Row'>
          <dt>children:</dt>
          <dd>{children.map((name) => <p key={name}>{name}</p>)}</dd>
        </div>
      )}
    </dl>
  )
}