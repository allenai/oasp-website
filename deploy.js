const fs = require('fs');
const cp = require('child_process');

const TMP_PATH = '/tmp/oasp-website-deploy-artifacts';
const EXEC_OPTS = { cwd: TMP_PATH };

module.exports = function deployToGithubPages(dir) {
  if (fs.existsSync(TMP_PATH)) {
    throw `Directory ${TMP_PATH} already exists.`;
  }

  const tmp = fs.mkdirSync(TMP_PATH);
  console.log(`created dir ${TMP_PATH} to store temporary deploy artifacts...`);

  cp.execSync('git init', EXEC_OPTS);
  cp.execSync('git remote add origin git@github.com:allenai/oasp-website.git', EXEC_OPTS);
  cp.execSync('git fetch origin', EXEC_OPTS);
  cp.execSync('git checkout -b gh-pages origin/gh-pages', EXEC_OPTS);

  cp.execSync(`cp -R ${dir}/ ${TMP_PATH}/`);
  console.log(`copied ${dir} to ${TMP_PATH}...`);

  cp.execSync(`git add .`, EXEC_OPTS);
  cp.execSync(`git commit --allow-empty -m"Automated release courtesy of yours truly, DeployBot 🤖™."`, EXEC_OPTS);
  cp.execSync(`git push origin gh-pages`, EXEC_OPTS)

  cp.execSync(`rm -rf ${TMP_PATH}`);
  console.log(`cleaned up ${TMP_PATH}...`);

  console.log('👌  deploy complete');
}
