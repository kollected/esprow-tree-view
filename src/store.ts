import { create } from 'zustand/react'

type Item = {
  name: string // as it's required
  children?: Item[]
  [x: string]: unknown
}

type MapItem = Omit<Item, 'children'> & { children?: string[] }

export type NavItem = {
  name: string
  internalID: string
  children?: NavItem[]
}

type Navigation = NavItem[]

type Store = {
  data: Item[]
  setData: (data: Item[], fileName: string) => void
  fileName: string
  selectedItem: string
  setSelectedItem: (item: string) => void
  nav: Navigation
  map: Map<string, MapItem>
  expanded: Set<string>
  setExpanded: (expanded: Set<string>) => void
}

const formatChildren = (item: Item): string[] | undefined => item.children ? item.children.map(({ name }) => name) : undefined

const formatData = (data: Item[], fileName: string): { nav: Navigation, map: Map<string, MapItem> } => {
  const map = new Map<string, MapItem>()

  const recursion = (arr: Item[], path = ''): Navigation =>
    arr.map((item) => {
      const { name, children, ...rest } = item
      map.set(fileName + path + name, { name, ...rest, children: formatChildren(item) })
      return { name, internalID: fileName + path + name, ...(children && { children: recursion(children, path + name + '.') }) }
    })

  const nav = recursion(data, '')

  return { nav, map }
}

export const useStore = create<Store>((set) => ({
  data: [],
  setData: (data, fileName) => {
    const { nav, map } = formatData(data, fileName)
    set({ data, nav, map, fileName })
  },
  nav: [],
  map: new Map(),
  fileName: '',
  selectedItem: '',
  setSelectedItem: (selectedItem) => set({ selectedItem }),
  expanded: new Set(),
  setExpanded: (expanded) => set({ expanded })
}))