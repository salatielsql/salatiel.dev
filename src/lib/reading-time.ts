const WORDS_PER_MINUTE = 200

function wordCount(body: string): number {
  const words = body.trim().match(/\S+/g)

  return words ? words.length : 0
}

export function readingTime(body: string): number {
  return Math.round(wordCount(body) / WORDS_PER_MINUTE)
}
