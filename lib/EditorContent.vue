<template>
  <div v-if="getDragGable" :style="getStyle" :class="classes" @click.stop="onActive" @mouseover.stop="isHover = true" @mouseout.stop="isHover = false">
    <component v-if="show && getModels[item.name]" :is="getModels[item.name]" :item="item" :options="getOptions[item.prop]" @click.stop="onClick"/>
    <div class="var-dynamic-editor__btn el-button--danger" @click.stop="onDelete">
      <i class="el-icon-close"></i>
    </div>
  </div>
  <component v-else-if="show && getModels[item.name]" :is="getModels[item.name]" :item="item" :options="getOptions[item.prop]" @click.stop="onClick"/>
</template>

<script>
import {PropObject} from '../utils/Props';

export default {
  name: 'EditorContent',
  /** 传递*/
  inject: ['dragGable', 'indexes', 'models', 'options', 'setOptionsFunc'],
  props: {item: PropObject({})},
  data: function () {
    return {
      show: true,
      isHover: false
    };
  },
  computed: {
    getStyle () {
      if (this.item.name === 'Button') {
        return {display: 'inline-block'};
      }
      return {};
    },
    getDragGable () {
      return 'dragGable' in this;
    },
    getModels () {
      return (this.models && this.models()) || {};
    },
    getOptions () {
      return (this.options && this.options()) || {};
    },
    getKeys () {
      return (this.indexes && this.indexes()) || '';
    },
    classes () {
      const classes = ['var-dynamic-editor__content'];
      if (this.isHover) classes.push('is-hover');
      if (this.getKeys === this.item.indexes) classes.push('is-active');
      return classes;
    }
  },
  methods: {
    viewUpdate () {
      this.show = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = true;
        });
      });
    },
    optionsCallback (value) {
      Object.assign(this.item, value);
      this.viewUpdate();
    },
    onActive (event) {
      this.$emit('active', event);
      this.setOptionsFunc(this.item, this.optionsCallback);
    },
    onDelete (event) {
      const hsaDeleteKey = list => {
        for (const item of list) {
          if (item.indexes === this.getKeys) {
            this.setOptionsFunc();
            break;
          }
          hsaDeleteKey(item.childList || []);
        }
      };
      if (this.getKeys) hsaDeleteKey([this.item]);
      this.$emit('delete', event);
    },
    onClick (...event) {
      this.$emit('click', ...event);
    }
  }
};
</script>

<style src="../assets/css/editorContent.css"/>
