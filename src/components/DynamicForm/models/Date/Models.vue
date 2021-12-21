<template>
  <models-form-item>
    <el-date-picker v-model="_value" v-bind="props_"/>
  </models-form-item>
</template>

<script>
import { createProp, PropBoolean, PropObject, PropString } from "../../utils/Props";
import { arrayDiffUndock } from "../../utils/Object";
import ModelsFormItem from "../ModelsFormItem";

const getFormat = type => {
  if (['year'].includes(type)) return 'yyyy' // 年
  if (['week'].includes(type)) return 'yyyy-WW' // 周 ，el-date-picker 中有问题，无法渲染
  if (['month', 'monthrange'].includes(type)) return 'yyyy-MM' // 月
  if (['date', 'daterange'].includes(type)) return 'yyyy-MM-dd' // 日
  if (['datetime', 'datetimerange'].includes(type)) return 'yyyy-MM-dd HH:mm:ss' // 时间
  return 'timestamp'
}

const getPlaceholder = (state, placeholder) => {
  if (state && !Array.isArray(placeholder)) {
    return [placeholder, placeholder]
  }
  return placeholder
}

const getProps = item => {
  const hasRange = /range$/.test(type)
  const {format, type, unlinkPanels, placeholder} = item
  const _format = format || getFormat(type)
  const _placeholder = getPlaceholder(hasRange, placeholder)
  const itemObject = arrayDiffUndock(['valueFormat', 'format', 'unlinkPanels'], item)
  const props = {...itemObject, format: _format, valueFormat: _format, unlinkPanels: unlinkPanels !== false}
  if (hasRange) {
    props.startPlaceholder = _placeholder[0]
    props.endPlaceholder = _placeholder[1]
  } else {
    props.placeholder = _placeholder
  }
  return props
}

export default {
  name: 'DateModels',
  components: {ModelsFormItem},
  model: {prop: 'value', event: 'change'},
  props: {
    value: {},
    item: {
      format: PropString(),
      clearIcon: PropString(),
      prefixIcon: PropString(),
      unlinkPanels: PropBoolean(),
      pickerOptions: PropObject(),
      rangeSeparator: PropString(),
      editable: PropBoolean(true),
      readonly: PropBoolean(false),
      disabled: PropBoolean(false),
      placeholder: createProp([Array, String]),
    }
  },
  computed: {
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    props_ () {
      return getProps(this.item)
    }
  }
}
</script>
