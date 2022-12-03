import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const calculateScore = (options) => {
  const opponentChoice = options[0]
  const myChoice = options[1]

  if(opponentChoice == "A") {
    if(myChoice == "X") {
      return 4
    } else if(myChoice == "Y") {
      return 8
    } else if(myChoice == "Z") {
      return 3
    }
  } else if(opponentChoice == "B") {
    if(myChoice == "X") {
      return 1
    } else if(myChoice == "Y") {
      return 5
    } else if(myChoice == "Z") {
      return 9
    }
  } else if(opponentChoice == "C" ) {
    if(myChoice == "X") {
      return 7
    } else if(myChoice == "Y") {
      return 2
    } else if(myChoice == "Z") {
      return 6
    }
  }
}

const calculateScore2 = (options) => {
  const opponentChoice = options[0]
  const myChoice = options[1]

  if(opponentChoice == "A") {
    if(myChoice == "X") {
      return 3
    } else if(myChoice == "Y") {
      return 4
    } else if(myChoice == "Z") {
      return 8
    }
  } else if(opponentChoice == "B") {
    if(myChoice == "X") {
      return 1
    } else if(myChoice == "Y") {
      return 5
    } else if(myChoice == "Z") {
      return 9
    }
  } else if(opponentChoice == "C" ) {
    if(myChoice == "X") {
      return 2
    } else if(myChoice == "Y") {
      return 6
    } else if(myChoice == "Z") {
      return 7
    }
  }
}

const part1 = (rawInput) => {
  const result = parseInput(rawInput).split("\n")
    .map(x => x.split(" "))
    .map(x => calculateScore(x))
    .reduce((a,b) => a + b)

  return result
}

const part2 = (rawInput) => {
  const result = parseInput(rawInput).split("\n")
    .map(x => x.split(" "))
    .map(x => calculateScore2(x))
    .reduce((a,b) => a + b)

  return result
}

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 15,
      },
      {
        input: `
        A X
        `,
        expected: 4,
      },
      {
        input: `
        A Y
        `,
        expected: 8,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
