import { type ChangeEvent, useState } from 'react'

export const FileUpload = () => {
  const [data, setData] = useState(null)

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
      <input type='file'
             accept='.json,application/json'
             onChange={handleUpload}
      />
      <div onClick={() => console.log(data)}>{typeof data}</div>
    </div>
  )
}