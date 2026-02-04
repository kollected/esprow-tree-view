import './App.css'
import { FileUpload } from './components/FileUpload.tsx'
import { useStore } from './store.ts'

export const App = () => {
  const { data, nav, map } = useStore()

  return (
    <>
      <div onClick={() => console.log(data, nav, map)}>test that store works</div>
      <FileUpload />
    </>
  )
}
