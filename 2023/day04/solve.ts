const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)

const inputData = await file.text()

const parsedInpuData = inputData.split("\n")

type ScratchCard = {
  id: number
  winingNumbers: number[]
  scratchNumbers: number[]
  matchedNumbers: number
  score: number
  wonScratchCards: number
}

const scratchCards: ScratchCard[] = []
const wonScratchCards: { [key: string]: number } = {}

parsedInpuData.forEach((line) => {
  const scratchCard: ScratchCard = {
    id: 0,
    winingNumbers: [],
    scratchNumbers: [],
    score: 0,
    matchedNumbers: 0,
    wonScratchCards: 0,
  }
  const [gameId, gameNumbers] = line.split(":")

  const [_, id] = gameId.split(" ")
  scratchCard.id = parseInt(id)

  const [winingNumbers, scratchNumbers] = gameNumbers.split("|")
  scratchCard.winingNumbers = winingNumbers
    .trim()
    .split(" ")
    .map((num) => parseInt(num))
    .filter(Number)
  scratchCard.scratchNumbers = scratchNumbers
    .trim()
    .split(" ")
    .map((num) => parseInt(num))
    .filter(Number)

  scratchCards.push(scratchCard)
})

function calculateScore(scratchCard: ScratchCard) {
  scratchCard.winingNumbers.forEach((num) => {
    if (scratchCard.scratchNumbers.includes(num)) {
      scratchCard.score = scratchCard.score === 0 ? 1 : scratchCard.score * 2
      scratchCard.matchedNumbers++
    }
  })
}
scratchCards.forEach((scratchCard) => {
  calculateScore(scratchCard)
})

const scratchSum = Array.from({ length: scratchCards.length }, () => 1)
for (let i = 0; i < scratchCards.length; i++) {
  for (let j = 0; j < scratchCards[i].matchedNumbers; j++) {
    scratchSum[i + j + 1] += scratchSum[i]
  }
}

// Part 1
console.log(
  "Part 1: ",
  scratchCards.reduce((prev, curr) => prev + curr.score, 0)
)

// Part 2
console.log(
  "Part 2: ",
  scratchSum.reduce((a, b) => a + b)
)
