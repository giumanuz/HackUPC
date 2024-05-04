import {useState} from 'react'
import './App.css'
import {FaFolderOpen} from "react-icons/fa6";
import MainPage from "./pages/MainPage.tsx";

function App() {
  const [loading, setLoading] = useState(false)

  const handleFileSubmit = (files: File[]) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }
  return (
    <>
      <MainPage onSubmit={handleFileSubmit} loading={loading} />
    </>
  )
}

export default App
