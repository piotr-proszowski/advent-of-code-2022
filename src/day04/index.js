import run from "aocrunner"
import _ from 'lodash'

const parseInput = (rawInput) => rawInput

const toRange = (range) => {
  const firstAndLast = range.split("-").map(x => parseInt(x))

  const first = firstAndLast[0]
  const last = firstAndLast[1]
  return _.range(first, last + 1)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")

  const result = _.chain(input)
    .map(x => x.split(","))
    .map(x => [toRange(x[0]), toRange(x[1])])
    .filter(x => {
      const intersection = _.intersection(x[0], x[1])
      return _.isEqual(intersection, x[0]) || _.isEqual(intersection, x[1])
    })
    .countBy()
    .map(x => x)
    .sum()
    .value()


  return result
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split("\n")

  const result = _.chain(input)
    .map(x => x.split(","))
    .map(x => [toRange(x[0]), toRange(x[1])])
    .filter(x => {
      const intersection = _.intersection(x[0], x[1])
      return intersection.length > 0
    })
    .countBy()
    .map(x => x)
    .sum()
    .value()


  return result
}

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
