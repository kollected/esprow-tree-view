import { useStore, type NavItem } from '../store.ts'
import { useState } from 'react'

const Line = ({ item }: { item: NavItem }) => {
  const { setSelectedItem } = useStore()
  const [expanded, setExpanded] = useState(false)

  return (
    <div key={item.internalID} onClick={(event) => {
      event?.stopPropagation()
      setSelectedItem(item.internalID)
    }}>
      {item.children && (
        <button onClick={() => setExpanded((c) => !c)}>
          {expanded ? '-' : '+'}
        </button>
      )}
      {item.name}
      {expanded && (
        <div className='TreeView'>
          {item.children?.map((child) => <Line item={child} />)}
        </div>
      )}
    </div>
  )
}

export const TreeView = () => {
  const { nav } = useStore()

  console.log('tree view', nav)

  return (
    <div className='TreeView'>
      {nav?.map((item) => <Line item={item} />)}
    </div>
  )
}