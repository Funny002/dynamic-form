<template>
  <el-alert v-bind="getProp"/>
</template>

<script>
import {Alert} from 'element-ui';
import {PropObject} from '../../utils/Props';
import {reArray} from '../../utils/Object';

export default {
  name: 'Alert',
  components: {ElAlert: Alert},
  props: {item: PropObject({})},
  computed: {
    getProp () {
      return reArray(['title', 'type', 'description', 'closable', 'center', 'closeText', 'showIcon', 'effect'], this.item);
    }
  }
};
</script>
