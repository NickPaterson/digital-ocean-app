import React from 'react'
import { useState } from 'react'
import './App.css'
import StartTab from './components/StartTab.js'
import QuizTab from './components/QuizTab.js'
function App() {
  const [isRunning, setIsRunning] = useState(false)

  function startQuiz() {
    setIsRunning(true)
  }

  return (
    <div className="App">
      {isRunning 
        ? <QuizTab />
        : <StartTab startQuiz={startQuiz} />
      }
    </div>
  );
}

export default App
