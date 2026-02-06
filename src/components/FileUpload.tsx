import { type ChangeEvent } from 'react'
import { useStore } from '../store.ts'

export const FileUpload = () => {
  const { setData, fileName } = useStore()

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      setData(JSON.parse(text), e.target.files![0].name)
    }

    reader.readAsText(e.target.files![0])
  }

  return (
    <div className='FileUpload'>
      <span className='FileName'>{fileName || 'Please upload a file'}</span>
      <label>
        +
        <input
          type='file'
          accept='.json,application/json'
          onChange={handleUpload}
        />
      </label>
    </div>
  )
}