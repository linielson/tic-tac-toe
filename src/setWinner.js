export default function setWinner(squares) {
  const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < winnerCombinations.length; i++) {
    const [a, b, c] = winnerCombinations[i]
    if (
      squares[a].value &&
      squares[a].value === squares[b].value &&
      squares[a].value === squares[c].value
    ) {
      return { winner: squares[a].value, positions: [a, b, c] }
    }
  }
  return null
}
