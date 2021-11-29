#!/usr/bin/env node

const StackUpgrade = require('organic-stack-upgrade')
const path = require('path')
const prompts = require('prompts')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const generateProjectName = function () {
  return 'project-' + Math.ceil(Math.random() * 1000)
}

const execute = async function ({destDir = process.cwd(), answers}) {
  answers = answers || {}
  const questions = [
    {
      name: 'project-name',
      message: 'project name',
      initial: answers['project-name'] || generateProjectName(),
      type: 'text'
    }
  ]
  Object.assign(answers, await prompts(questions))
  await exec(`mkdir -p ${answers['project-name']}`)
  destDir = path.join(destDir, answers['project-name'])
  let stack = new StackUpgrade({
    destDir: destDir,
    packagejson: path.join(__dirname, 'package.json')
  })
  await stack.merge({
    sourceDir: path.join(__dirname, 'seed'),
    answers
  })
  await stack.updateJSON()
  console.info('run npm install...')
  await stack.exec('npm install')
  console.info('run git init...')
  await stack.exec('git init .')
}

if (module.parent) {
  module.exports = execute
} else {
  execute({}).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
