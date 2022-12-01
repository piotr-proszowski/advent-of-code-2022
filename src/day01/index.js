import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/)

  var max = -1
  var sum = 0

  for(var i = 0; i < input.length; i++) {
    const num = parseInt(input[i])
    if(isNaN(parseInt(num))) {
      sum = 0
    } else {
      sum += num
    }

    if(sum > max) {
      max = sum
    }
  }

  if(sum > max) {
    max = sum
  }

  return max
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\n/)

  var sum = 0

  var elves = []

  for(var i = 0; i < input.length; i++) {
    const num = parseInt(input[i])
    if(isNaN(parseInt(num))) {
      elves.push(sum)
      sum = 0
    } else {
      sum += num
    }
  }

  elves.push(sum)

  elves.sort((a, b) => a - b)
  elves.reverse()
  var sum = elves.slice(0, 3).reduce((a, b) => a + b)

  return sum
}

run({
  part1: {
    tests: [
    { input: `
    1
    `, expected: 1, },
    { input: `
    1
    2
    `, expected: 3, },
    { input: `
    1
    2
    3
    `, expected: 6, },
  ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        1
        2

        2
        3

        3
        4
        `,
        expected: 15,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
