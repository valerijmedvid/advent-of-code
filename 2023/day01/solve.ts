const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)

const inputData = await file.text()

const inputDataArray = inputData
  .split("\n\n")
  .map((elf) => elf.split("\n").map((x) => parseInt(x)))

const sumArray = (myArray: number[]) => {
  return myArray.reduce((prev, curr) => prev + curr, 0)
}

// Get the cargo count for each elf
const elvesCargoCount = inputDataArray.map((elf) => sumArray(elf))

// Sort the elvesCargoCount array in descending order
const sortedElvesCargoCount = [...elvesCargoCount].sort((a, b) => b - a)

// Get the top 3 most loaded elves
const mostLoadedElves = sortedElvesCargoCount.slice(0, 3)

console.log(Math.max(...elvesCargoCount))
console.log(sumArray(mostLoadedElves))
