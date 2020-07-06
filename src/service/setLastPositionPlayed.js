const positions = [
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [1, 3],
  [2, 3],
  [3, 3],
]

export default function setLastPositionPlayed(boardPosition) {
  const col = positions[boardPosition][0]
  const row = positions[boardPosition][1]
  return [col, row]
}
