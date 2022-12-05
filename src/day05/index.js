import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split(/\n/)

  const result = _.chain(input)
    .filter(x => x.match(/\[/))
    .map(x => {
      const breakWidth = 1
      const itemWidth = 3
      let current = 0
      let line = []
      while(current < x.length) {
        line.push(x.slice(current, current + itemWidth))
        current += itemWidth + breakWidth
      }
      return line
    })
    .flatMap(x => _.map(x, (value, index) => {
      return {key: index + 1, value: value.replace('[', '').replace(']', '')}
    }))
    .filter(x => !_.isEmpty(x.value.trim()))
    .value()

  const stacks = {}
  for(let i in result) {
    const pair = result[i]
    let stack = stacks[pair['key']]
    if(stack === undefined) {
      stack = []
    }
    if(pair['value'] != '') {
      stack.push(pair['value'])
    }
    stacks[pair['key']] = stack
  }

  const regexp = /move (\d+) from (\d+) to (\d+)/
  const instructions = _.chain(input)
    .filter(x => x.match(/move/))
    .map(x => {
      const match = regexp.exec(x)
      return [match[1], match[2], match[3]]
    })
    .value()

  for(let i in stacks) {
    stacks[i] = _.reverse(stacks[i])
  }

  for(let index in instructions) {
    const instruction = instructions[index]
    const howMuch = instruction[0]
    const from = instruction[1]
    const to = instruction[2]

    for(let i = 0; i < howMuch; i++) {
      const item = stacks[from].pop()
      stacks[to].push(item)
    }
  }

  var answer = ''
  for(let i in stacks) {
    const value = stacks[i].pop()
    answer += value
  }

  return answer
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
    .split(/\n/)

  const result = _.chain(input)
    .filter(x => x.match(/\[/))
    .map(x => {
      const breakWidth = 1
      const itemWidth = 3
      let current = 0
      let line = []
      while(current < x.length) {
        line.push(x.slice(current, current + itemWidth))
        current += itemWidth + breakWidth
      }
      return line
    })
    .flatMap(x => _.map(x, (value, index) => {
      return {key: index + 1, value: value.replace('[', '').replace(']', '')}
    }))
    .filter(x => !_.isEmpty(x.value.trim()))
    .value()

  const stacks = {}
  for(let i in result) {
    const pair = result[i]
    let stack = stacks[pair['key']]
    if(stack === undefined) {
      stack = []
    }
    if(pair['value'] != '') {
      stack.push(pair['value'])
    }
    stacks[pair['key']] = stack
  }

  const regexp = /move (\d+) from (\d+) to (\d+)/
  const instructions = _.chain(input)
    .filter(x => x.match(/move/))
    .map(x => {
      const match = regexp.exec(x)
      return [match[1], match[2], match[3]]
    })
    .value()

  for(let i in stacks) {
    stacks[i] = _.reverse(stacks[i])
  }

  for(let index in instructions) {
    const instruction = instructions[index]
    const howMuch = instruction[0]
    const from = instruction[1]
    const to = instruction[2]

    var itemsToAdd = []
    for(let i = 0; i < howMuch; i++) {
      itemsToAdd.push(stacks[from].pop())
    }
    for(let i = 0; i < howMuch; i++) {
      stacks[to].push(itemsToAdd.pop())
    }
  }

  var answer = ''
  for(let i in stacks) {
    const value = stacks[i].pop()
    answer += value
  }

  return answer
}

run({
  part1: {
    tests: [
      {
        input: `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "CMZ",
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
  trimTestInputs: false,
  onlyTests: false,
})
