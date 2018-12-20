module.exports = {
  linters: {
    '**/*.+(js|json|css|scss|mdx|md)': ['yarn prettify', 'git add'],
  },
}
