export function excerpt(body: string) {
  return `${body.substring(0, 160)}...`
}
