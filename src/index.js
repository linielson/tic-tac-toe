import React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'
import Step from './Step'
import setWinner from './service/setWinner'
import setLastPositionPlayed from './service/setLastPositionPlayed'
import './index.css'

function setWinningPositions(squares, positions) {
  return squares.map((square, position) =>
    positions.includes(position) ? { ...square, highlight: true } : square,
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [
        {
          squares: Array(9).fill({ value: null, highlight: false }),
          position: [null, null],
          status: '',
        },
      ],
      stepNumber: 0,
      clickedStep: null,
      xIsNext: true,
      orderAsc: true,
    }
  }

  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = [...current.squares]

    if (setWinner(squares) || squares[index].value) return

    squares[index] = { ...squares[index], value: this.nextPlayer() }
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: setLastPositionPlayed(index),
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  currentBoard(history) {
    const currentStep = history[this.state.stepNumber]
    const winner = setWinner(currentStep.squares)

    if (winner) {
      currentStep.squares = setWinningPositions(
        currentStep.squares,
        winner.positions,
      )
      currentStep.status = `Winner: ${winner.winner}`
    } else {
      currentStep.status =
        this.state.stepNumber === 9
          ? 'It was a tie'
          : `Next player: ${this.nextPlayer()}`
    }
    return currentStep
  }

  render() {
    const history = this.state.history
    const currentBoard = this.currentBoard(history)

    const steps = history.map((move, step) => {
      return (
        <Step
          key={step}
          step={step}
          movement={move}
          clickedStep={this.state.clickedStep}
          onClick={() => {
            this.setState({ clickedStep: step })
            this.jumpTo(step)
          }}
        />
      )
    })

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={currentBoard.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{currentBoard.status}</div>
          <div>
            <button
              onClick={() => {
                this.setState({ orderAsc: !this.state.orderAsc })
              }}
            >
              Change ordering
            </button>
          </div>
          <ol>{this.state.orderAsc ? steps : steps.reverse()}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('root'))
