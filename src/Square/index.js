import React from 'react'
import './index.css'

function Square(props) {
  return (
    <button
      className={`square ${props.highlight ? 'winner-square' : ''}`}
      data-pro={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

export default Square
