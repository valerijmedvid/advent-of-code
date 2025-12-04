import { readFileSync } from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
// const file = readFileSync(`${__dirname}/test_input.txt`, "utf-8")
const file = readFileSync(`${__dirname}/input.txt`, "utf-8")
const inputData = file.trim()

const batteries = inputData.split("\n").map((line) => line.split(""))

let result1 = 0
let result2 = 0

function findHighestJoltagePair(bank: string[]) {
  const pairs = []
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const value = `${bank[i]}${bank[j]}`
      pairs.push(Number(value))
    }
  }
  pairs.sort((a, b) => b - a)
  result1 += pairs[0]
}

function findLargestJoltageBank(bank: string[]) {
  const numbersBank = [...bank].map(Number)
  const NUMER_SIZE = 12
  let toRemove = numbersBank.length - NUMER_SIZE

  const stackOfNumber: (number | string)[] = []

  for (let i = 0; i < numbersBank.length; i++) {
    while (
      toRemove > 0 &&
      stackOfNumber.length > 0 &&
      Number(stackOfNumber[stackOfNumber.length - 1]) < Number(bank[i])
    ) {
      stackOfNumber.pop()
      toRemove--
    }

    stackOfNumber.push(bank[i])
  }

  result2 += Number(stackOfNumber.slice(0, NUMER_SIZE).join(""))
}

batteries.forEach(findHighestJoltagePair)
batteries.forEach(findLargestJoltageBank)

console.log("Result 1: ", result1)
console.log("Result 2: ", result2)
