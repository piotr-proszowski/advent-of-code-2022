import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const elvesCalories = parseInput(rawInput)
    .split("\n\n")
    .map(elfCalories => elfCalories.split("\n").map(x => parseInt(x)))

  const max = elvesCalories
    .map(elfCalories => elfCalories.reduce((a,b) => a + b))
    .reduce((a,b) => { if(a > b) { return a } else return b })

  return max
}

const part2 = (rawInput) => {
  const elvesCalories = parseInput(rawInput)
    .split("\n\n")
    .map(elfCalories => elfCalories.split("\n").map(x => parseInt(x)))

  const sumOfTop3 = elvesCalories
    .map(elfCalories => elfCalories.reduce((a,b) => a + b))
    .sort((a,b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((a,b) => a + b)

  return sumOfTop3
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
