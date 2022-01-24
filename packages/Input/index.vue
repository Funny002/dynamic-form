<template>
  <form-item-models :item="item">
    <el-input v-model="value_[item.prop]" v-bind="getProp"/>
  </form-item-models>
</template>

<script>
import FormItemModels from '../../lib/FormItemModels';
import {PropObject} from '../../utils/Props';
import {Input} from 'element-ui';
import {reArray} from '../../utils/Object';

export default {
  name: 'Input',
  inject: ['formValue', 'formFunc'],
  components: {FormItemModels, ElInput: Input},
  props: {
    item: PropObject({})
  },
  computed: {
    value_: {
      get () {
        return (this.formValue && this.formValue()) || {};
      },
      set (value) {
        this.formValue && this.formValue(value);
      }
    },
    getProp () {
      return reArray([
        'type',
        'maxlength',
        'minlength',
        'showWordLimit',
        'placeholder',
        'clearable',
        'showPassword',
        'disabled',
        'size',
        'prefixIcon',
        'suffixIcon',
        'rows',
        'autosize',
        'readonly',
        'max',
        'min',
        'step',
        'resize',
        'autofocus'
      ], this.item);
    }
  }
};
</script>
