const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)

const inputData = await file.text()

const inputDataArray = inputData.split("\n")

const dict: string[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]
const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

function findFirstAndLastNumberFromStringArray(array: string[]) {
  // filter out non-numbers
  const arrayOfNumbers = array.filter(Number)

  // find first and last number
  const firstNumber = arrayOfNumbers[0]
  const lastNumber = arrayOfNumbers[arrayOfNumbers.length - 1]

  // return the sum
  return parseInt(firstNumber + lastNumber)
}

function findFirstAndLastNumberFromNumberArray(array: number[]) {
  // find first and last number
  const firstNumber = array[0]
  const lastNumber = array[array.length - 1]

  // return the sum
  return firstNumber.toString() + lastNumber.toString()
}

// replace all numbers with their string counterparts
function replaceStringNumbersWithNumbers(string: string) {
  const numbersArray: number[] = []
  for (let i = 0; i < string.length; i++) {
    const newString = string.slice(i)

    // find first number in string
    for (let num in dict) {
      if (newString.startsWith(dict[num])) {
        numbersArray.push(parseInt(num) + 1)
      }
    }
    for (let num in dict) {
      if (newString.startsWith(numbers[num])) {
        numbersArray.push(parseInt(num) + 1)
      }
    }
  }
  return numbersArray
}

// Part 1
console.log(
  "Part 1: ",
  inputDataArray
    .map((line) => line.split(""))
    .reduce((prev, curr) => {
      return prev + findFirstAndLastNumberFromStringArray(curr)
    }, 0)
)

// Part 2
console.log(
  "Part 2: ",
  inputDataArray
    .map((line) => replaceStringNumbersWithNumbers(line))
    .reduce((prev, curr) => {
      return prev + parseInt(findFirstAndLastNumberFromNumberArray(curr))
    }, 0)
)
