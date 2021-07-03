export function getRandomNumber(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1)

  return Math.round(rand)
}

export function shuffleArray(array) {
  // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // it's https://en.wikipedia.org/wiki/Schwartzian_transform

  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
}