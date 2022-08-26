try {
  const {username} = require('os').userInfo()
  const {
    repository: {url: repoUrl},
  } = require('../package.json')

  const remote = process.env.HUSKY_GIT_PARAMS.split(' ')[1]
  const repoName = repoUrl.match(/(?:.(?!\/))+\.git$/)[0]
  
} catch (error) {
  // ignore
}
