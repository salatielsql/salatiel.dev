import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Deep rehype pass: decorates every `<a>` in the tree (any depth) with the
 * `.bracket-link` class, whose `::before`/`::after` CSS draws the literal
 * `[text](↗)` markdown-link syntax around it. Only adds a class — href and
 * children are left untouched.
 */
export function rehypeBracketLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a') {
        node.properties.className = [...(node.properties.className ?? []), 'bracket-link']
      }
    })
  }
}
