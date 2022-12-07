import run from "aocrunner"
import _ from "lodash"

const parseInput = (rawInput) => rawInput

var directories = {}
var currentDirectory = undefined

const handleCd = (command) => {
  const directory = command.split(" ")[1]
  if(directory == "..") {
    currentDirectory = currentDirectory.parent
  } else {
    if(directory == "/") {
      directories[directory] = {
        name: "/",
        totalSize: 0
      }
      currentDirectory = directories[directory]
    } else {
      let wholePath = ""
      if(currentDirectory != undefined) {
        let parent = currentDirectory
        while(parent != undefined) {
          const name = parent.name
          parent = parent.parent
          wholePath += name
        }
      }
      if(!wholePath.startsWith("/")) {
        wholePath = "/" + wholePath
      }
      directories[wholePath + directory] = {
        parent: currentDirectory,
        name: directory,
        totalSize: 0
      }
      currentDirectory = directories[wholePath + directory]
    }
  }
}

const totalSizeOfFile = (file) => parseInt(file.split(" ")[0])

const handleLs = (command) => {
  const files = _.chain(command.split("\n"))
    .drop(1)
    .filter(it => !it.startsWith("dir"))
    .value()

  const dirs = _.chain(command.split("\n"))
    .drop(1)
    .filter(it => it.startsWith("dir"))
    .map(it => it.split(" ")[1])
    .value()

  currentDirectory.files = files
  currentDirectory.dirs = dirs

  const totalSize = files.map(file => totalSizeOfFile(file)).reduce((a,b) => a + b, 0)
  let tmp = currentDirectory
  while(tmp != undefined) {
    tmp.totalSize += totalSize
    tmp = tmp.parent
  }
}

const handleCommand = (command) => {
  if(command.startsWith('cd')) {
    handleCd(command)
  }
  if(command.startsWith('ls')) {
    handleLs(command)
  }
}

const part1 = (rawInput) => {
  directories = {}
  const input = parseInput(rawInput)
    .split("$")

  input.forEach(command => handleCommand(command.trim()))

  var answer = 0
  for(let key in directories) {
    const dir = directories[key]
    if(dir.totalSize <= 100000) {
      answer += dir.totalSize
    }
  }

  return answer
}

const part2 = (rawInput) => {
  directories = {}
  const input = parseInput(rawInput)
    .split("$")

  input.forEach(command => handleCommand(command.trim()))

  var totalSpace = directories['/'].totalSize
  let min = Number.MAX_VALUE
  _.forOwn(directories, function(value, key) {
    if(value.totalSize > 389918 && value.totalSize < min) {
      min = value.totalSize
    }
  })

  return min
}

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
        `,
        expected: 95437,
      },
{
        input: `
$ cd /
$ ls
1 b.txt
`,
        expected: 1,
      }
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
