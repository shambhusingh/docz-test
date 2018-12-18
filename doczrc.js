import { css } from 'docz-plugin-css'

export default {
  port: '8000',
  publicUrl: '.',
  indexHtml: './public.html',
  plugins: [
    css(),
    css({ cssmodules: true, preprocessor: 'sass' })
  ]
}