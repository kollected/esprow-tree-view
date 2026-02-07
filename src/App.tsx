import { useStore } from './store.ts'
import { FileUpload, DetailedView, TreeView } from './components'
import './App.css'

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
