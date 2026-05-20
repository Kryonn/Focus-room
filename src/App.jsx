import './App.css'
import Sidebar from './components/sidebar/sidebar.jsx'
import Content from './components/content/content.jsx'
import Auth from "./components/auth/auth.jsx"
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState("auth");

  if(screen === "auth") {
    return (
      <Auth setScreen={setScreen}/>
    )
  }

  if(screen === "app") {
    return (
      <div className='main'>
        <Sidebar/>
        <Content/>
      </div>
    )
  }

  return (
      <div className='main'>
        
      </div>
  )
}

export default App
