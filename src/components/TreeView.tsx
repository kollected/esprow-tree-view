import { useState, useRef, useMemo, useLayoutEffect } from 'react'
import { useStore, type NavItem } from '../store.ts'
import { type Row, Line } from '.'

const ROW_HEIGHT = 24
const BUFFER = 10

const flattenVisibleTree = (nestedNav: NavItem[], expandedIds: Set<string>, depth = 0): Row[] => {
  const rows = []

  for (const node of nestedNav) {
    rows.push({
      internalID: node.internalID,
      name: node.name,
      depth,
      hasChildren: !!node.children
    })

    if (!!node.children && expandedIds.has(node.internalID)) {
      rows.push(...flattenVisibleTree(node.children, expandedIds, depth + 1))
    }
  }

  return rows
}

export const TreeView = () => {
  const { nav, expanded } = useStore()
  const [scrollTop, setScrollTop] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight)
    }
  }, [])

  const rows = useMemo(() => flattenVisibleTree(nav, expanded), [nav, expanded])

  const getCurrentRows = () => {
    if (!rows.length) {
      return { virtualizedRows: [], paddingTop: 0, paddingBottom: 0 }
    }

    const totalRows = rows.length
    const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT)

    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER)
    const endIndex = Math.min(totalRows, startIndex + visibleCount + BUFFER)

    return {
      virtualizedRows: rows.slice(startIndex, endIndex),
      paddingTop: startIndex * ROW_HEIGHT,
      paddingBottom: (totalRows - endIndex) * ROW_HEIGHT
    }
  }

  const { virtualizedRows, paddingTop, paddingBottom } = getCurrentRows()

  return (
    <div
      className='TreeView'
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ paddingTop }} />
      {virtualizedRows.map((item) => <Line key={item.internalID} item={item} />)}
      <div style={{ paddingBottom }} />
    </div>
  )
}