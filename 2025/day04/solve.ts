import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
// const file = readFileSync(`${__dirname}/test_input.txt`, "utf-8")
const file = readFileSync(`${__dirname}/input.txt`, "utf-8")
const inputData = file.trim()

const rows = inputData.split("\n")
const width = rows[0].length
const height = rows.length

const values: string[] = []

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, 1],
  [0, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
]

for (let r = 0; r < height; r++) {
  for (let c = 0; c < width; c++) {
    const id = r * width + c
    const char = rows[r][c]
    values[id] = char
  }
}

let result1 = 0
let result2 = 0

function getNeighbors(x: number, y: number): number {
  let count = 0

  for (const [dx, dy] of directions) {
    const nx = x + dx
    const ny = y + dy

    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const neighborId = ny * width + nx
      if (values[neighborId] === "@") {
        count++
      }
    }
  }

  return count
}

for (let r = 0; r < height; r++) {
  for (let c = 0; c < width; c++) {
    const id = r * width + c
    if (values[id] === "@") {
      const neighborCount = getNeighbors(c, r)

      if (neighborCount < 4) {
        result1++
      }
    }
  }
}

function countIterations() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const id = r * width + c
      if (values[id] === "@") {
        const neighborCount = getNeighbors(c, r)

        if (neighborCount < 4) {
          result2++
          values[id] = "."
        }
      }
    }
  }
}

let previousResult2 = -1

while (previousResult2 !== result2) {
  previousResult2 = result2
  countIterations()
}

console.log("Result 1: ", result1)
console.log("Result 2: ", result2)
