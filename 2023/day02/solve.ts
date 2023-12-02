const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)

const inputData = await file.text()

const maxCubesInGame = {
  red: 12,
  green: 13,
  blue: 14,
}

type Cube = {
  red: number
  green: number
  blue: number
}

type Game = {
  id: number
  sets: Cube[]
}

const games: Game[] = []

const inputDataArray = inputData.split("\n").map((line) => line.split(":"))

inputDataArray.forEach((line) => {
  const gameId = parseInt(line[0].split(" ")[1])
  const sets: Cube[] = []

  // split sets
  line[1].split(";").forEach((set) => {
    const setObj: Cube = {
      red: 0,
      green: 0,
      blue: 0,
    }
    // split colors
    set.split(",").forEach((colors) => {
      const color = colors.trim().split(" ")

      if (color[1] === "red" || color[1] === "green" || color[1] === "blue") {
        setObj[color[1]] = parseInt(color[0])
      }
    })
    sets.push(setObj)
  })

  games.push({ id: gameId, sets })
})

function isGamePossible(game: Game) {
  for (let set of game.sets) {
    // if any of the sets has more cubes than allowed, return false
    if (
      set.red > maxCubesInGame.red ||
      set.green > maxCubesInGame.green ||
      set.blue > maxCubesInGame.blue
    ) {
      return false
    }
  }
  return true
}

// Part 1
console.log(
  "Part 1: ",
  games.reduce((prev, curr) => {
    if (isGamePossible(curr)) {
      return prev + curr.id
    }
    return prev
  }, 0)
)

// Part 2
console.log(
  "Part 2: ",
  games.reduce((prev, curr) => {
    const red = Math.max(...curr.sets.map((set) => set.red))
    const green = Math.max(...curr.sets.map((set) => set.green))
    const blue = Math.max(...curr.sets.map((set) => set.blue))

    return prev + red * green * blue
  }, 0)
)
