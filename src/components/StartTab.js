import '../css/StartTab.css'
import Bubbles from './Bubbles'

function StartTab(props) {
  const {startQuiz} = props
  

  return (
    <>
    <Bubbles />
    <div className="StartTab__wrapper">
      <div className="StartTab__modal">
        <h1>Quiz</h1>
        <p>Are you ready?</p>
        <button 
          className='btn'
          onClick={startQuiz}
        >Start
        </button>
      </div>
    </div>
    </>
  )
}

export default StartTab