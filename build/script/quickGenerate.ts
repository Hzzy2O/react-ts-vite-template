const fs = require('fs')
const [ node , mand , comm , path, fileName ] = process.argv

let data = ''
if (comm === 'page') {
  data = `<script setup>
import useConfig from '/@/hooks/useConfig'
import { Form, Table } from '/@/components'
import OPTIONS from './index.json'

const { $router , $route , tableRef, formRef, formBuilder, tableBuilder } = useConfig()

const formOptions = formBuilder(OPTIONS.FormOptions)
const tableOptions = tableBuilder(OPTIONS.TableOptions)

const buttonClick = (method, row) => {
  switch (method) {
    default:
      break;
  }
}
</script>

<template>
    <div class="${fileName}_containter">
      <Form 
        :inline="true" 
        :options="formOptions" 
        @buttonClick="buttonClick" 
        ref="formRef"
      >
      </Form>
      <Table
        ref="tableRef"
        v-model:options="tableOptions"
        @buttonClick="buttonClick"
        @searchFunc="getCustomerList"
      >
      </Table>
    </div>
</template>

<style lang="scss">
</style>
`
let npath = path + '\\' + fileName;
fs.mkdirSync(npath)
fs.writeFileSync(npath + '\\index.vue', data, 'utf-8')
fs.writeFileSync(
  npath + '\\index.json',
  `{
  "formOptions": {
    "buttonGroup": [
      { "txt": "xxx", "method": "search", "type": "success" }
    ],
    "compList": []
  },
  "tableOptions": {
    "buttonGroup": [
      { "txt": "xxx", "method": "xxx" }
    ],
    "colList": [
      { "prop": "xxx", "label": "xxx", "width": "auto" }
    ]
  }
}`,
  'utf-8'
)
} else {
  data = `<template>
    <div class="${fileName}_box">  
    </div>
</template>

<script>
export default {
    name:"${fileName}"
}
</script>
<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, reactive } from 'vue'

const props = defineProps({
})
</script>

<style lang="scss" scoped>
</style>`
let npath = path + '\\' + fileName
fs.mkdirSync(npath)
fs.writeFileSync(npath + '\\index.vue', data, 'utf-8')

fs.readFile("./src/components/index.js",'utf-8',(err,data) => {
  fs.writeFileSync(
    './src/components/index.js',
    data + '\n' + `export { default as ${fileName} } from './${fileName}/index.vue'`
  )
})
}




