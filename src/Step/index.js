import React from 'react'
import './index.css'

function description(step, movement) {
  return step
    ? `Go to move #${step} [${movement.position[0]}, ${movement.position[1]}]`
    : 'Go to game start'
}

function Step(props) {
  return (
    <li>
      <button
        className={props.clickedStep === props.step ? 'button-bold' : ''}
        onClick={props.onClick}
      >
        {description(props.step, props.movement)}
      </button>
    </li>
  )
}

export default Step
