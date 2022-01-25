<template>
  <form-models :item="data" :model="value" :rules="rules">
    <editor-content v-for="(item, key) in (data.childList || [])" :key="`formModels-${key}`" :item="item" @delete="value.childList.splice( key,1)"/>
  </form-models>
</template>
<script>

import EditorContent from './EditorContent';
import {PropObject} from '../utils/Props';
import {Models} from '../packages/index';
import FormModels from './FormModels';

export default {
  name: 'DynamicFormView',
  model: {prop: 'value', event: 'change'},
  components: {FormModels, EditorContent},
  provide () {
    const self = this;
    return {
      dragGable: false,
      indexes: undefined,
      setOptionsFunc: undefined,
      options: () => self.getOptions,
      models: () => Object.assign({}, Models, this.models),
      formValue (...args) {
        if (args.length) {
          console.log(args);
        } else {
          return self.value;
        }
      },
      formFunc (keys, name, event) {
        self.$emit(keys, name, event);
      }
    };
  },
  props: {
    options: PropObject({}),
    rules: PropObject({}),
    value: PropObject({}),
    data: PropObject({})
  },
  computed: {
    getOptions () {
      return {};
    }
  }
};
</script>
