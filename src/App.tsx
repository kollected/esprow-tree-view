import './App.css'
import { FileUpload } from './components/FileUpload.tsx'
import { useStore } from './store.ts'

export const App = () => {
  const { data, navigation } = useStore()

  return (
    <>
      <div onClick={() => console.log(data, navigation)}>test that store works</div>
      <FileUpload />
    </>
  )
}
