<template>
  <div class="components-container">
    <Tinymce />

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

