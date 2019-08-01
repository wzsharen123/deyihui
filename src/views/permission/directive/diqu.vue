<template>
  <div id="app">
    <el-cascader
      v-model="selectedOptions"
      size="large"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: []
    }
  },

  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-cascader{
  width: 100%;
}
</style>
