<template>
  <el-row :class="{'var-dragGable__grid': getDragGable}" v-bind="rowProps(item)">
    <el-col v-for="(col, key) in (item.childList||[])" :key="`grid-${key}`" v-bind="colProps(col)">
      <template v-if="getDragGable">
        <drag-gable :list="(col.childList||[])" group="editor-editor" :animation="200" tag="div" class="var-dragGable__grid--list">
          <editor-content v-for="(model, modelKey) in (col.childList||[])" :key="`grid-col-${modelKey}`" :item="model" @click="onClick" @delete="col.childList.splice(modelKey,1)"/>
        </drag-gable>
      </template>
      <editor-content v-else v-for="(model, modelKey) in (col.childList||[])" :key="`grid-col-${modelKey}`" :item="model" @click="onClick"/>
    </el-col>
  </el-row>
</template>

<script>
import {Col, Row} from 'element-ui';
import vuedraggable from 'vuedraggable';
import {reArray} from '../../utils/Object';
import {PropObject} from '../../utils/Props';
import EditorContent from '../../lib/EditorContent';

export default {
  name: 'Grid',
  inject: ['dragGable'],
  components: {EditorContent, ElRow: Row, ElCol: Col, dragGable: vuedraggable},
  props: {
    item: PropObject({})
  },
  computed: {
    getDragGable () {
      return this.dragGable;
    }
  },
  created () {
    // 添加一些参数
    if (!this.item.childList) this.item.childList = [];
  },
  methods: {
    onClick (...event) {
      this.$emit('click', ...event);
    },
    rowProps (row) {
      return reArray(['justify', 'gutter', 'align'], row);
    },
    colProps (col) {
      return reArray(['span', 'offset', 'push', 'pull', 'xs', 'sm', 'md', 'lg', 'xl'], col);
    }
  }
};
</script>

<style src="../../assets/css/packages/grid.css"/>
