<template>
  <div class="components-container">

    <ElDragSelect />

  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {

    }
  }
}
</script>
