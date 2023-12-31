import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    transform(md, id) {
      if (id.endsWith('.md')) {
        return `export default ${JSON.stringify(md)}`;
      }
    },
  },
],
})
