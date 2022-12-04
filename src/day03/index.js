import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const findCommonPart = (a, b) => {
  const first = [...a]
  const second = [...b]

  return first.filter(x => second.includes(x))[0]
}

const findCommonElement = (group) => {
  return group.map(x => new Set(x))
    .reduce((a,b) => new Set([...a].filter(el => b.has(el)))).values().next().value
}

const getValue = (x) => {
  if(x == x.toUpperCase()) {
    return x.charCodeAt(0) - 'A'.charCodeAt(0) + 27
  } else {
    return x.charCodeAt(0) - 'a'.charCodeAt(0) + 1
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
    .split('\n')

  const result = input.map(x => [x.substring(0, (x.length)/ 2), x.substring(x.length / 2, x.length)])
    .map(x => findCommonPart(x[0], x[1]))
    .map(x => getValue(x))
    .reduce((a,b) => a + b)

  return result
}

const part2 = (rawInput) => {
  const grouped = parseInput(rawInput)
    .split('\n')
    .reduce((a,b) => {
      const lastElement = a[a.length - 1]
      console.log(b)
      if(lastElement === undefined) {
        a.push([b])
      } else if(lastElement.length < 3) {
        lastElement.push(b)
      } else {
        a.push([b])
      }
      return a
    }, [])

  const result = grouped.map(group => findCommonElement(group))
    .map(x => getValue(x))
    .reduce((a,b) => a + b)

  return result
}

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
      {
        input: `
rGnRRccfcCRFDPqNWdwWJWRBdB
jZzVVSZSjmQvZTSZfjmLzNPJqWtJBwqpNtBpdWdNvd
        `,
        expected: 66,
      },
      {
        input: `
        aa
        bb
        `,
        expected: 1 + 2,
      },
      {
        input: `
        aaa
        bbb
        `,
        expected: 1 + 2,
      },
      {
        input: `
        AAA
        BBB
        `,
        expected: 27 + 28,
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
