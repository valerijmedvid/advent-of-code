const debug = false
const fileName = debug ? "test.txt" : "input.txt"

const file = Bun.file(`${import.meta.dir}/${fileName}`)
const inputData = await file.text()
const parsedInpuData = inputData.split("\n")

const seeds = parsedInpuData[0].split(" ").filter(Number).map(Number)
const seeds2: number[] = []

// for (let i = 0; i < seeds.length; i = i + 2) {
//   for (let y = seeds[i]; y < seeds[i] + seeds[i + 1]; y++) {
//     seeds2.push(y)
//   }
// }

const maps: { [key: string]: number[][] } = {}

let mapName = ""
parsedInpuData
  .slice(1)
  .filter((x) => x)
  .forEach((line) => {
    if (line.includes(" map:")) {
      const name = line.split(" map:")
      mapName = name[0]
      maps[mapName] = []
    } else {
      maps[mapName].push(line.split(" ").map(Number))
    }
  })

function getLocationForSeed(seeds: number[]) {
  const finalLocation: number[] = []
  seeds.forEach((seed) => {
    let s = seed

    const mapArray = Object.values(maps)
    for (let i in mapArray) {
      for (let y in mapArray[i]) {
        const [destination, source, range] = mapArray[i][y]
        const difference = destination - source

        if (source <= s && s < source + range) {
          s = s + difference
          break
        }
      }
    }
    finalLocation.push(s)
  })
  return Math.min(...finalLocation)
}

console.log(getLocationForSeed(seeds))
