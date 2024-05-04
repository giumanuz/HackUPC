import {useState} from 'react'
import './App.css'
import {FaFolderOpen} from "react-icons/fa6";
import MainPage from "./pages/MainPage.tsx";

function App() {
  return (
    <>
      <MainPage onSubmit={(f) => console.log(f)} loading={true} />
    </>
  )
}

export default App
