import remarkGfm from 'remark-gfm'

export function useMDXComponents(components) {
  return {
    ...components,
  }
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
}
