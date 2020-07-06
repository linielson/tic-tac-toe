import React from 'react'

function description(step, movement) {
  return step
    ? `Go to move #${step} [${movement.position[0]}, ${movement.position[1]}]`
    : 'Go to game start'
}

function Step(props) {
  return (
    <li>
      <button className={props.className} onClick={props.onClick}>
        {description(props.step, props.movement)}
      </button>
    </li>
  )
}

export default Step
