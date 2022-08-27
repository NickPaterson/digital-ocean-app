import {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import QuizQuestions from './QuizQuestions'
import Bubbles from './Bubbles'
import '../css/QuizTab.css'

function QuizTab() {
  const [formData, setFormData] = useState([])
  const [answersChecked, setAnswersChecked] = useState(false)
  const [hasReset, setHasReset] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=4&category=27&type=multiple')
      .then(res => res.json())
      .then(data => {
        setFormData(() => {
          return data.results.map(question => {
            const answers = question.incorrect_answers.concat(question.correct_answer)
            const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

            return {
              id: nanoid(),
              question: question.question,
              correctAnswer: question.correct_answer,
              answers: shuffledAnswers,
              checked: ``,
              checkedId: ``
            }
          })
        })
      }).catch(err => console.log(err))
  } , [hasReset])

  function updateForm(e, id, checkedId) {
    e.preventDefault()
    setFormData(formData.map(question => {
      if (question.id === id) {
        return {
          ...question,
          checked: e.target.value,
          checkedId: checkedId
        }
      }
      return {...question}
    }))
  }

  function submitAnswers(e) {
    e.preventDefault()

    for (let i = 0; i < formData.length; i++) {
      if (formData[i].checked === formData[i].correctAnswer)  {
        setCorrectAnswers(correctAnswers => correctAnswers + 1)
        const correctEl = document.getElementById(formData[i].checkedId).nextSibling
        correctEl.style.backgroundColor = 'green'
        correctEl.style.color = 'white'
      } else {
        const incorrectEl = document.getElementById(formData[i].checkedId).nextSibling
        incorrectEl.style.backgroundColor = 'red'
        incorrectEl.style.color = 'white'
      }
    }
    
    
    setAnswersChecked(true)
  }

  function resetQuestions(e) {
    e.preventDefault()
    setAnswersChecked(false)
    setCorrectAnswers(0)
    setHasReset(prevReset => !prevReset)
  }

  const questionElements = formData.map((questionEl) => {
    const {id, question, answers, checked} = questionEl
    return (
      <QuizQuestions 
        key={id} 
        questionId={id}
        question={question} 
        answers={answers}
        updateForm={updateForm}
        checked={checked}
      />
    )
  })

  return (
    <>
    <Bubbles />
    <div className="QuizQuestion__wrapper">
      <div className="QuizQuestion__modal">
        <form className='form-quiz'>
          {questionElements}
          {(setAnswersChecked) 
            &&  <p className='correctAnswers'>
                  You got {correctAnswers} out of {formData.length} correct!
                </p>}
          {(answersChecked) 
            ? <button className='btn' onClick={resetQuestions}>Reset</button>
            : <button className='btn' onClick={submitAnswers}>Check Answers</button>
          }
          
        </form>
        
      </div>
    </div>
    </>
  )
}
export default QuizTab