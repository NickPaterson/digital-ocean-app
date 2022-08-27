
function QuizQuestions(props) {
    const {questionId, question, answers, checked, updateForm} = props
    const answersElements = answers.map((answer, index) => {
        const inputName = `${questionId}-answer${index}`
        
        return (
            <>
            <input 
                key={inputName}
                id={inputName}
                type="radio" 
                name={inputName} 
                value={answer} 
                checked={checked === answer ? true : false}
                onChange={(e) => updateForm(e, questionId, inputName)} 
             />
            <label 
                htmlFor={inputName}
                >{answer}</label>
            </>
            
        )
    })
    return (
        <>
            <fieldset>
                <legend>{question}</legend>
                {answersElements}
            </fieldset>
        </>
    )
}
export default QuizQuestions