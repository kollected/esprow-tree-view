import { useStore } from '../store.ts'
import { type Row } from '.'

export const Line = ({ item }: { item: Row }) => {
  const { selectedItem, setSelectedItem, expanded, setExpanded } = useStore()
  const { name, internalID, hasChildren, depth } = item

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpanded(newExpanded)
  }

  return (
    <div
      style={{ marginLeft: depth * 8 }}
      className='Line'
    >
      {hasChildren && (
        <button onClick={() => toggleExpanded(internalID)}>
          {expanded.has(internalID) ? '-' : '+'}
        </button>
      )}
      <span
        className={selectedItem === internalID ? 'Selected' : ''}
        onClick={(event) => {
          event.stopPropagation()
          setSelectedItem(internalID)
        }}
      >
        {name}
      </span>
    </div>
  )
}
