import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import mdx from '@mdx-js/rollup'
import remarkGfm from "remark-gfm";
import remarkFrontMatter from "remark-frontmatter"
import remarkMdxFrontMatter from "remark-mdx-frontmatter"
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),mdx({
    remarkPlugins: [remarkGfm, remarkFrontMatter, remarkMdxFrontMatter],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
