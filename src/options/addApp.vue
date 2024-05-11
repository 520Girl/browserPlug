

<template>
应用添加
</template>
<script  lang="ts">
import {
  NGrid,
  NGridItem,
} from 'naive-ui'
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'AddApp',
  props:{
    appList:{type:Object,default:{}},
  },
  components: {
    NGrid,
    NGridItem,
  },
  setup() {

  }
})
</script>
<style scoped>

</style>