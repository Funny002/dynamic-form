<template>
  <el-tabs v-model="tabsValue" v-bind="getProps">
    <tab-pane v-for="(pane, keys) in (item.childList || [])" :key="`tabPane-${keys}`" :label="pane.label" :name="pane.name">
      <template slot="label">
        <i :class="pane.icon" v-if="pane.icon" style="margin-right: 2px;"></i>
        <span>{{ pane.label }}</span>
      </template>
      <template v-if="getDragGable">
        <drag-gable :list="(pane.childList||[])" group="editor-editor" :animation="200" tag="div" class="var-dragGable__grid--list">
          <editor-content v-for="(model, modelKey) in (pane.childList||[])" :key="`grid-col-${modelKey}`" :item="model" @click="onClick" @delete="pane.childList.splice(modelKey,1)"/>
        </drag-gable>
      </template>
      <editor-content v-else v-for="(model, modelKey) in (pane.childList||[])" :key="`grid-col-${modelKey}`" :item="model" @click="onClick"/>
    </tab-pane>
  </el-tabs>
</template>

<script>
import EditorContent from '../../lib/EditorContent';
import {PropObject} from '../../utils/Props';
import {reArray} from '../../utils/Object';
import {Tabs, TabPane} from 'element-ui';

export default {
  name: 'Tabs',
  inject: ['dragGable'],
  components: {ElTabs: Tabs, TabPane, EditorContent},
  props: {
    item: PropObject({})
  },
  data: function () {
    return {
      tabsValue: this.item.value
    };
  },
  computed: {
    getDragGable () {
      return 'dragGable' in this;
    },
    getProps () {
      return reArray(['type', 'tabPosition'], this.item);
    }
  },
  methods: {
    onClick (...event) {
      this.$emit('click', ...event);
    }
  }
};
</script>