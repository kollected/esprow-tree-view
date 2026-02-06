import './App.css'
import { FileUpload, DetailedView, TreeView } from './components'
import { useStore } from './store.ts'

export const App = () => {
  const { data } = useStore()

  return (
    <div className='Layout'>
      <FileUpload />
      {!!data.length && (
        <div className='ViewContainer'>
          <TreeView />
          <DetailedView />
        </div>
      )}
    </div>
  )
}
