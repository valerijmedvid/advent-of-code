const file = Bun.file(`${import.meta.dir}/input.txt`)

const inputData = await file.text()

const inputDataArray = inputData.split("")

function findFloor(input: string[]): number {
  let floor = 0
  let counter = 1

  input.forEach((char) => {
    if (char === "(") {
      floor++
    } else if (char === ")") {
      floor--
    }
    counter++
  })

  return floor
}

function findBasement(input: string[]): number {
  let floor = 0

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++
    } else if (input[i] === ")") {
      floor--
    }

    if (floor === -1) {
      return i + 1
    }
  }

  return -1
}

console.log(findFloor(inputDataArray))
console.log(findBasement(inputDataArray))
