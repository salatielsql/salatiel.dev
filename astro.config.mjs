// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import dp from 'node:child_process'

const commitHash = dp.execSync('git rev-parse --short HEAD').toString()
console.log(`commit hash: ${commitHash}`)

let latestUpdate = null

const fetchCommitData = async () => {
  const url = `https://api.github.com/repos/salatielsql/salatiel.dev/commits/${commitHash}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  const json = await response.json()
  return json
}

try {
  const commitData = await fetchCommitData()
  console.log('commit data debug', JSON.stringify(commitData))
  latestUpdate = commitData.commit.date
} catch (e) {
  // @ts-ignore
  console.error(`fetching commit ${commitHash} data failed with mesasge: ${e.message}`, JSON.stringify(e))
}

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  vite: {
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
      __LATEST_UPDATE__: JSON.stringify(latestUpdate || ''),
    },
  },
})
