import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = readFileSync(`${__dirname}/input.txt`, "utf-8")
const inputData = file.trim()

const inputDataArray = inputData.split("\n")

let dialCircle = 50
let result = 0

function dial(input: string) {
  const directions = input[0]
  const steps = Number(input.replace(directions, ""))

  if (directions === "L") {
    dialCircle -= steps
  } else if (directions === "R") {
    dialCircle += steps
  }

  while (dialCircle > 100 || dialCircle < 0) {
    if (dialCircle > 100) {
      dialCircle -= 100
    } else if (dialCircle < 0) {
      dialCircle += 100
    }
  }

  if (dialCircle === 0 || dialCircle === 100) {
    result++
  }
}

inputDataArray.forEach((line) => dial(line))

console.log("Result 1:", result)
