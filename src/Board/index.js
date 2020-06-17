import React from 'react'
import Square from '../Square'

class Board extends React.Component {
  renderSquare(index) {
    const square = this.props.squares[index]
    return (
      <Square
        key={index}
        value={square.value}
        highlight={square.highlight}
        onClick={() => this.props.onClick(index)}
      />
    )
  }

  renderCol(square) {
    return this.renderSquare(square)
  }

  renderRow(row) {
    const cols = [...Array(3).keys()]

    return (
      <div key={row} className='board-row'>
        {cols.map(col => {
          return this.renderCol(col + row * cols.length)
        })}
      </div>
    )
  }

  render() {
    const rows = [...Array(3).keys()]

    return (
      <div>
        {rows.map(row => {
          return this.renderRow(row)
        })}
      </div>
    )
  }
}

export default Board
