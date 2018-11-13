#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 获取参数
const componentName = process.argv[2]

if (!componentName) {
  return console.log('请输入组件文件夹名称')
}

const noop = () => {}
const vueTpl = `<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.css"></style>
`
const templateTpl = `<div class="${componentName}-wrapper">
  ${componentName} 组件
</div>
`
const scirptTpl = `export default {
  created () {

  },

  data () {
    return {

    }
  },

  methods: {

  }
}
`
const styleTpl = `.${componentName}-wrapper {

}
`

fs.mkdir(path.join(__dirname, `./src/components/${componentName}`), (err) => {
  if (err) {
    return console.log(err)
  }

  fs.writeFile(path.join(__dirname, `./src/components/${componentName}/index.vue`), vueTpl, noop)
  fs.writeFile(path.join(__dirname, `./src/components/${componentName}/script.js`), scirptTpl, noop)
  fs.writeFile(path.join(__dirname, `./src/components/${componentName}/style.css`), styleTpl, noop)
  fs.writeFile(path.join(__dirname, `./src/components/${componentName}/template.html`), templateTpl, noop)
})
