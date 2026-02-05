import './App.css'
import { FileUpload, DetailedView, TreeView } from './components'

export const App = () => {
  return (
    <div className='Layout'>
      <FileUpload />
      <div>
        <TreeView />
        <DetailedView />
      </div>
    </div>
  )
}
