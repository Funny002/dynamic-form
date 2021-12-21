<template>
  <div class="FormConf__body">
    <div class="FormConf__body">
      <component :is="getOptions" v-model="_value"/>
    </div>
    <el-collapse class="FormConf__Collapse">
      <!--      <el-collapse-item lang="基础设置" class="FormConf__Collapse-item">-->
      <!--        基础设置-->
      <!--      </el-collapse-item>-->
      <el-collapse-item title="表单设置" name="rules" class="FormConf__Collapse-item">
        <div class="FormConf__box">
          <div class="FormConf__box--title">标签宽度</div>
          <el-input-number :min="0" v-model="_value['labelWidth']" size="mini" @change="v => onUpdate('labelWidth', v)"/>
        </div>
        <div class="FormConf__box">
          <div class="FormConf__box--title">是否必填</div>
          <div style="text-align: right;">
            <el-switch v-model="_value['required']" size="mini" @change="v => onUpdate('required', v)"/>
          </div>
        </div>
        <div class="FormConf__box">
          <div class="FormConf__box--title">是否隐藏</div>
          <div style="text-align: right;">
            <el-switch v-model="_value['hide']" size="mini" @change="v => onUpdate('hide', v)"/>
          </div>
        </div>
        <!--        <div class="FormConf__box">-->
        <!--          <div class="FormConf__box&#45;&#45;title">是否禁用</div>-->
        <!--          <div style="text-align: right;">-->
        <!--            <el-switch v-model="value['hideRequiredAsterisk']" size="mini" @change="v => onUpdate('hideRequiredAsterisk', v)"/>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="FormConf__box">-->
        <!--          <div class="FormConf__box&#45;&#45;title">是否只读</div>-->
        <!--          <div style="text-align: right;">-->
        <!--            <el-switch v-model="value['hideRequiredAsterisk']" size="mini" @change="v => onUpdate('hideRequiredAsterisk', v)"/>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="FormConf__box">
          <div class="FormConf__box--title">自定义规则</div>
          <div style="text-align: right;">
            <el-switch v-model="_value['validator']" size="mini" @change="v => onUpdate('validator', v)"/>
          </div>
        </div>
        <template v-if="_value['validator']">
          <div class="FormConf__box">
            <div class="FormConf__box--title">验证触发方式</div>
            <button-group v-model="_value['trigger']" :data="[{label: '改变', value:'change'}, {label: '失焦', value:'blur'}]" @change="v => onUpdate('trigger', v)"/>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { PropObject } from "../utils/Props";
import { ModelOptions } from "../models";
import ButtonGroup from "./ButtonGroup";

export default {
  name: "ModelConf",
  components: {ButtonGroup},
  model: {prop: 'value', event: 'update'},
  props: {
    value: PropObject({}),
  },
  computed: {
    getOptions () {
      return ModelOptions[this.value.alias]
    },
    _value: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  },
  methods: {
    onChange (...e) {
      this.$emit('change', ...e)
    },
    onUpdate (name, value) {
      const obj = {...this.value}
      obj[name] = value
      this.$emit('update', obj)
      this.onChange(name, value, obj)
    }
  }
}
</script>
