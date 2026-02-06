import { useStore, type NavItem } from '../store.ts'
import { useState } from 'react'

const Line = ({ item, margin = 0 }: { item: NavItem, margin?: number }) => {
  const { selectedItem, setSelectedItem } = useStore()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div
        style={{ marginLeft: margin }}
        className='Line'
      >
        {item.children && (
          <button onClick={() => setExpanded((c) => !c)}>
            {expanded ? '-' : '+'}
          </button>
        )}
        <span
          className={selectedItem === item.internalID ? 'Selected' : ''}
          onClick={(event) => {
            event.stopPropagation()
            setSelectedItem(item.internalID)
          }}
        >
          {item.name}
        </span>
      </div>
      {expanded && (
        <>
          {item.children?.map((child) => <Line key={child.internalID} margin={margin + 16} item={child} />)}
        </>
      )}
    </>
  )
}

export const TreeView = () => {
  const { nav } = useStore()

  return (
    <div className='TreeView'>
      {nav?.map((item) => <Line key={item.internalID} item={item} />)}
    </div>
  )
}