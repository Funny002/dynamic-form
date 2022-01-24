<template>
  <el-button
      v-bind="getProps"
      @click="e => onClick('click',item.prop,e)"
      @dblclick="e => onClick('dblclick',item.prop,e)">
    {{ item.label }}
  </el-button>
</template>

<script>
import {Button} from 'element-ui';
import {reArray} from '../../utils/Object';
import {PropObject} from '../../utils/Props';

export default {
  name: 'Button',
  inject: ['formFunc'],
  components: {ElButton: Button},
  props: {
    item: PropObject({})
  },
  computed: {
    getProps () {
      return reArray(['icon', 'type', 'size', 'plain', 'round', 'circle', 'disabled', 'autofocus', 'nativeType'], this.item);
    }
  },
  methods: {
    onClick (...event) {
      this.formFunc && this.formFunc(...event);
    }
  }
};
</script>
