import { create } from 'zustand/react'

type Item = {
  name: string // as it's required
  children?: Item[]
  [x: string]: unknown
}

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
  selectedItem?: Item
  setSelectedItem: (item: Item) => void
  // another question: should i create a separate property with names only? for the actual tree?
  // not sure.
  navigation?: Navigation
}

const extractNavigation = (data: Item[], path = ''): Navigation => data.map((item) => ({
  name: item.name,
  internalID: path + item.name,
  ...(item.children && { children: extractNavigation(item.children, path + item.name + '.') })
}))


export const useStore = create<Store>((set) => ({
  data: [],
  setData: (data) => set({ data, navigation: extractNavigation(data) }),
  selectedItem: undefined,
  setSelectedItem: (selectedItem) => set({ selectedItem }),
}))