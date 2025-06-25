export function getBlogUrl(path?: string) {
  if (path) {
    return `/blog${path.startsWith('/') ? path : '/' + path}`
  }

  return '/blog'
}
