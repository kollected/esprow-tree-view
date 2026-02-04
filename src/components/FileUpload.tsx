import { type ChangeEvent } from 'react'
import { useStore } from '../store.ts'

export const FileUpload = () => {
  const { setData } = useStore()

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      setData(JSON.parse(text))
    }

    reader.readAsText(e.target.files![0])
  }

  return (
    <div className='FileUpload'>
      <h4>Upload a .json</h4>
      <input
        type='file'
        accept='.json,application/json'
        onChange={handleUpload}
      />
    </div>
  )
}