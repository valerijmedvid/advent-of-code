const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)

const inputData = await file.text()

const gameField = inputData.split("\n").map((line) => line.split(""))

function findNeighbours(row: number, cell: number) {
  let isPart = false
  let lastPartNumber = true

  // check all neighbours
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (
        row + x < 0 ||
        cell + y < 0 ||
        row + x >= gameField.length ||
        cell + y >= gameField[row].length ||
        (x === 0 && y === 0)
      ) {
        continue
      }
      if (gameField[row + x][cell + y] === ".") continue
      if (!isNaN(parseInt(gameField[row + x][cell + y]))) continue
      isPart = true
    }
  }

  // check if this is last number of the part
  if (
    cell + 1 <= gameField[row].length &&
    !isNaN(parseInt(gameField[row][cell + 1]))
  ) {
    lastPartNumber = false
  }
  return { isPart, lastPartNumber }
}

function isEnginePartNumber() {
  const parts = []
  let partNum = 0
  let isPartNum = false

  // find all parts
  for (let row = 0; row < gameField.length; row++) {
    for (let cell = 0; cell < gameField[row].length; cell++) {
      if (!isNaN(parseInt(gameField[row][cell]))) {
        const { isPart, lastPartNumber } = findNeighbours(row, cell)

        partNum += parseInt(gameField[row][cell])

        if (isPart) {
          isPartNum = true
        }

        if (!lastPartNumber) {
          partNum = partNum * 10
        } else {
          if (isPartNum) {
            parts.push(partNum)
            isPartNum = false
          }
          partNum = 0
        }
      }
    }
  }

  return parts
}

function findGearBoxNeighbours(row: number, cell: number) {
  let isGear = false
  let gearBoxCoord = ""
  let lastPartNumber = true

  // check all neighbours
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (
        row + x < 0 ||
        cell + y < 0 ||
        row + x >= gameField.length ||
        cell + y >= gameField[row].length ||
        (x === 0 && y === 0)
      ) {
        continue
      }
      if (gameField[row + x][cell + y] === "*") {
        isGear = true
        gearBoxCoord = `${row + x},${cell + y}`
      }
    }
  }

  // check if this is last number of the part
  if (
    cell + 1 <= gameField[row].length &&
    !isNaN(parseInt(gameField[row][cell + 1]))
  ) {
    lastPartNumber = false
  }
  return { isGear, gearBoxCoord, lastPartNumber }
}

function isGearPartNumber() {
  const gearBoxes: { [key: string]: number[] } = {}
  let partNum = 0
  let isPartNum = false
  let gearBoxCoords = ""

  // find all parts
  for (let row = 0; row < gameField.length; row++) {
    for (let cell = 0; cell < gameField[row].length; cell++) {
      if (!isNaN(parseInt(gameField[row][cell]))) {
        const { isGear, gearBoxCoord, lastPartNumber } = findGearBoxNeighbours(
          row,
          cell
        )

        partNum += parseInt(gameField[row][cell])

        if (isGear) {
          isPartNum = true
          gearBoxCoords = gearBoxCoord
        }

        if (!lastPartNumber) {
          partNum = partNum * 10
        } else {
          if (isPartNum) {
            if (gearBoxCoords in gearBoxes) {
              gearBoxes[gearBoxCoords].push(partNum)
            } else {
              gearBoxes[gearBoxCoords] = [partNum]
            }

            isPartNum = false
            gearBoxCoords = ""
          }
          partNum = 0
        }
      }
    }
  }
  return gearBoxes
}

// Part 1
console.log(
  "Part 1: ",
  isEnginePartNumber().reduce((a, b) => a + b, 0)
)

// Part 2
console.log(
  "Part 2: ",
  Object.values(isGearPartNumber()).reduce((prev, curr) => {
    if (curr.length == 2) {
      return prev + curr[0] * curr[1]
    }
    return prev
  }, 0)
)
