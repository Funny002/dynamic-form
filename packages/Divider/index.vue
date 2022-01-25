<template>
  <el-divider v-bind="getProp"><span :style="getStyle">{{ item.value }}</span></el-divider>
</template>

<script>
import {PropObject} from '../../utils/Props';
import {reArray} from '../../utils/Object';
import {Divider} from 'element-ui';

export default {
  name: 'Divider',
  props: {item: PropObject({})},
  components: {ElDivider: Divider},
  computed: {
    getStyle () {
      return reArray(['fontSize', 'lineHeight', 'fontWeight'], this.item);
    },
    getProp () {
      return reArray(['direction', 'contentPosition'], this.item);
    }
  }
};
</script>