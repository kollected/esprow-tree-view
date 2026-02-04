import { create } from 'zustand/react'

type Item = {
  name: string // as it's required
  children?: Item[]
  [x: string]: unknown
}

type MapItem = Omit<Item, 'children'> & { children?: string[] }

type NavItem = {
  name: string
  internalID: string
  children?: NavItem[]
}

type Navigation = NavItem[]

type Store = {
  data: Item[]
  setData: (data: Item[]) => void
  // not sure if i grab the entire item or just grab the id (parentName.nextName.name)
  // this will do for now
  selectedItem?: string
  setSelectedItem: (item: string) => void
  // another question: should i create a separate property with names only? for the actual tree?
  // not sure.
  nav?: Navigation
  map?: Map<string, MapItem>
}

// i will use internalID for handling clicks in navigation view.
// const extractNavigation = (data: Item[], path = ''): Navigation => data.map((item) => ({
//   name: item.name,
//   internalID: path + item.name,
//   ...(item.children && { children: extractNavigation(item.children, path + item.name + '.') })
// }))

// next thing that i need is to create a map for detailed view component.
// i want the keys to be the internalIDs from just above and the values to be the original objects.
// map.get('parentName.childName') is the same as json.find(({ name }) => name === parentName).find(({ name }) => name === childName), if i didn't miss a bracket somewhere

// ok so this looks suspiciously like the extractNavigation function. both use recursion to achieve slightly different things. gotta unite them.
// const generateMap = (data: Item[]): Map<string, Item> => {
//   const map = new Map<string, Item>()
//
//   const recursion = (arr: Item[], parentName = ''): void => arr.forEach((item) => {
//     map.set(parentName + item.name, item)
//     if (item.children) recursion(item.children, parentName + item.name + '.')
//   })
//
//   recursion(data)
//
//   return map
// }

const formatChildren = (item: Item): string[] | undefined => item.children ? item.children.map(({ name }) => name) : undefined

const formatData = (data: Item[]): { nav: Navigation, map: Map<string, MapItem> } => {
  const map = new Map<string, MapItem>()

  const recursion = (arr: Item[], path = ''): Navigation =>
    arr.map((item) => {
      const { name, children, ...rest } = item
      map.set(path + name, { name, ...rest, children: formatChildren(item) })
      return { name, internalID: path + name, ...(children && { children: recursion(children, path + name + '.') }) }
    })

  const nav = recursion(data, '')

  return { nav, map }
}

export const useStore = create<Store>((set) => ({
  data: [],
  setData: (data) => {
    const { nav, map } = formatData(data)
    set({ data, nav, map })
  },
  selectedItem: undefined,
  setSelectedItem: (selectedItem) => set({ selectedItem })
}))