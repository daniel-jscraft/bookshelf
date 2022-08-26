const {username} = require('os').userInfo()
const {
  spawnSync,
  getExerciseBranches,
  updateExerciseBranch,
} = require('./utils')

const branch = spawnSync('git rev-parse --abbrev-ref HEAD')


function updateExercises() {
  console.log('▶️  Updating exercise branches')
  const exerciseBranches = getExerciseBranches()
  exerciseBranches.forEach(branch => {
    const didUpdate = updateExerciseBranch(branch)
    console.log(`  ✅  ${branch} is up to date.`)
    if (didUpdate) {
      console.log(`Force pushing ${branch}`)
      spawnSync('git push -f')
    }
  })
  spawnSync('git checkout main')
  console.log('✅  All exercises up to date.')
}
