export function stripMarkdownAndHTML(input: string) {
  if (typeof input !== 'string') return ''

  // Remove HTML tags
  let result = input.replace(/<\/?[^>]+(>|$)/g, '')

  // Remove Markdown syntax
  result = result
    // Remove headers, emphasis, bold, strikethrough
    .replace(/([*_~`#>\-=]|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\))/g, '')
    // Remove inline code
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')

  return result.trim()
}
