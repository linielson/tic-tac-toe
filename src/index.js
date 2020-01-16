import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
  return (
    <button className={`square ${props.highlight ? 'winner-square' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

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
    return (this.renderSquare(square))
  }

  renderRow(row) {
    const cols = [...Array(3).keys()]

    return (
      <div key={row} className='board-row'>
        {cols.map((col) => { return this.renderCol(col + (row * cols.length)) })}
      </div>
    )
  }

  render() {
    const rows = [...Array(3).keys()]

    return (
      <div>
        {rows.map((row) => { return this.renderRow(row) })}
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
      return { winner: squares[a].value, positions: [a, b, c] }
    }
  }
  return null
}

function lastPositionPlayed(index) {
  const positions = [[1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [3, 2], [1, 3], [2, 3], [3, 3]]
  return [positions[index][0], positions[index][1]]
}

function setWinningPositions(squares, positions) {
  return squares.map((square, position) =>
    positions.includes(position) ? { ...square, highlight: true } : square
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        squares: Array(9).fill({ value: null, highlight: false }),
        position: [null, null]
      }],
      stepNumber: 0,
      clickedStep: null,
      xIsNext: true,
      orderAsc: true
    }
  }

  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]

    if (calculateWinner(squares) || squares[index].value) return

    squares[index] = { ...squares[index], value: this.nextPlayer() }
    this.setState({
      history: history.concat([{
        squares: squares,
        position: lastPositionPlayed(index)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status

    if (winner) {
      current.squares = setWinningPositions(current.squares, winner.positions)
      status = `Winner: ${winner.winner}`
    } else {
      status = this.state.stepNumber === 9 ? 'It was a tie' : `Next player: ${this.nextPlayer()}`
    }

    //TODO refactore
    const steps = history.map((move, step) => {
      const desc = step ?
        `Go to move #${step} [${move.position[0]}, ${move.position[1]}]` :
        'Go to game start'
      return (
        <li key={step}>
          <button
            className={this.state.clickedStep === step ? 'button-bold' : ''}
            onClick={() => {
              this.setState({ clickedStep: step })
              this.jumpTo(step)
            }}
          >
            {desc}
          </button>
        </li>
      )
    })

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <div>
            <button onClick={() => {
              this.setState({ orderAsc: !this.state.orderAsc })
            }}>Change ordering</button>
          </div>
          <ol>{this.state.orderAsc ? steps : steps.reverse()}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
