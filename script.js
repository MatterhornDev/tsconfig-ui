const x = 1
const s = 'abc' + (
  (() => { switch (x) {
    case 1:
      return 'x'
    case 2:
      return 'y'
    case 3:
      return 'z'
    default:
      return ''
  }})()
)

console.log(s)

const s2 = 'abc' + (
  switch (x) {
    case 1:
      return 'x'
    case 2:
      return 'y'
    case 3:
      return 'z'
    default:
      return ''
  }
)

console.log(s2)