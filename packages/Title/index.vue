<template>
  <div class="var-dynamic__title" :style="getStyle">{{ item['value'] }}</div>
</template>

<script>
import {PropObject} from '../../utils/Props';
import {reArray} from '../../utils/Object';

export default {
  name: 'Title',
  props: {item: PropObject({})},
  computed: {
    getStyle () {
      return reArray(['fontSize', 'lineHeight', 'fontWeight', 'textAlign'], this.item);
    }
  }
};
</script>

<style src="../../assets/css/packages/title.css"/>
