import Promise from 'bluebird'
import co from 'co'
import fs from 'fs'
import gulp from 'gulp'
import gutil from 'gulp-util'
import webpack from 'webpack'

import buildConfig from '../config/buildConfig'
import config from '../config/webpack'
import path from '../config/path'

const readFile = Promise.promisify(fs.readFile, fs)
const writeFile = Promise.promisify(fs.writeFile, fs)

gulp.task(
  'build',
  ['dist'],
  async function () {
    const stats = await Promise.promisify(webpack)(config)
    gutil.log('[webpack]', stats.toString({ colors: true }))
    await postProcess()
    await generateDocs()
  }
)

function postProcess () {
  return readFile(path('dist', 'index.html'), 'utf-8')
    .then(updateTitle)
    .then(inlineBootScript)
    .then(ssi)
    .then(result => writeFile(path('dist', 'index.html'), result, 'utf-8'))
}

function updateTitle (html) {
  return html.replace(/<title>Bemuse/, a => {
    if (buildConfig.name === 'Bemuse') {
      return a
    }
    return `<meta name="robots" content="noindex" /><title>${
      buildConfig.name
    } ${buildConfig.version}`
  })
}

function inlineBootScript (html) {
  const re = /(<!--\sBEGIN BOOT SCRIPT\s-->)[\s\S]*(<!--\sEND BOOT SCRIPT\s-->)/
  let boot = fs.readFileSync(path('dist', 'build', 'boot.js'), 'utf-8')
  return html.replace(re, (x, a, b) => `${a}${scriptTag(boot)}${b}`)
}

function ssi (html) {
  const re = /<!--\s*#include file="([^"]+)"\s*-->/g
  return html.replace(re, (x, file) => fs.readFileSync(path('dist', file)))
}

function scriptTag (text) {
  return `<script>${text}</script>`
}

async function generateDocs () {
  require('child_process').execSync('yarn build', {
    cwd: path('website'),
    stdio: 'inherit'
  })
  await new Promise((resolve, reject) => {
    gulp.src(path('website', 'build', 'bemuse', '**', '*'))
      .on('error', reject)
      .pipe(gulp.dest(path('dist', 'project')))
      .on('end', resolve)
  })
}
