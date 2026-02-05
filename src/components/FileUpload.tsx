import { type ChangeEvent, useState } from 'react'
import { useStore } from '../store.ts'

export const FileUpload = () => {
  const { setData } = useStore()
  const [fileName, setFileName] = useState('')

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result as string
      setData(JSON.parse(text))
      setFileName(e.target.files![0].name)
    }

    reader.readAsText(e.target.files![0])
  }

  // yeah i'll leave the styling for later.

  return (
    <>
      <span className='FileName'>{fileName}</span>
      <label className='FileUpload'>
        +
        <input
          type='file'
          accept='.json,application/json'
          onChange={handleUpload}
        />
      </label>
    </>
  )
}