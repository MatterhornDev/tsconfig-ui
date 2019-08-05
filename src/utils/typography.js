import Typography from 'typography'
import CodePlugin from 'typography-plugin-code'
import GitHubTheme from 'typography-theme-github'

GitHubTheme.plugins = [
  new CodePlugin()
]

// GitHubTheme.overrideThemeStyles = () => ({
//   'code': {
//     fontSize: '1rem'
//   }
// })

const typography = new Typography(GitHubTheme)

typography.injectStyles()