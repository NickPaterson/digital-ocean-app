import React from 'react'
import '../css/bubbles.css'

function Bubbles() {
    const bubbles = []
    for (let i = 0; i < 10; i++) {
        const classes = `bubble x${i + 1}`
        bubbles.push(<div className={classes} key={i}></div>)
    } 
    return (
        <div className="Bubbles__wrapper">
            {bubbles}
        </div>
    )
}

export default Bubbles
