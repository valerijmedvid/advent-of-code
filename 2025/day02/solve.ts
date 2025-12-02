import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
// const file = readFileSync(`${__dirname}/test_input.txt`, "utf-8")
const file = readFileSync(`${__dirname}/input.txt`, "utf-8")
const inputData = file.trim()

const ranges = inputData.split(",").map((range) => range.split("-"))

let result1 = 0
let result2 = 0

function hasEqualHalves(id: string) {
  if (id.length % 2 !== 0) return false

  const mid = id.length / 2

  return id.slice(0, mid) === id.slice(mid)
}

function hasRepeatingPattern(id: string) {
  const idLength = id.length

  for (let patternLength = 1; patternLength <= idLength / 2; patternLength++) {
    if (idLength % patternLength !== 0) continue

    const pattern = id.slice(0, patternLength)
    const repeats = id.length / patternLength

    if (pattern.repeat(repeats) === id) {
      return true
    }
  }

  return false
}

function checkIdRange(rangeStart: string, rangeEnd: string) {
  const start = Number(rangeStart)
  const end = Number(rangeEnd)

  for (let id = start; id <= end; id++) {
    const idString = id.toString()

    if (hasEqualHalves(idString)) {
      result1 += id
    }

    if (hasRepeatingPattern(idString)) {
      result2 += id
    }
  }
}

ranges.forEach(([start, end]) => checkIdRange(start, end))

console.log("Result 1: ", result1)
console.log("Result 2: ", result2)
