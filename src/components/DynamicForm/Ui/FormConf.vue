<template>
  <div class="FormConf">
    <div class="FormConf__box">
      <div class="FormConf__box--title">标签位置</div>
      <button-group v-model="value['labelPosition']" :data="['left', 'right']" @change="v => onUpdate('labelPosition', v)"/>
    </div>
    <div class="FormConf__box">
      <div class="FormConf__box--title">标签宽度</div>
      <el-input-number :min="0" v-model="value['labelWidth']" style="width: 100%;" size="mini" @change="v => onUpdate('labelWidth', v)"/>
    </div>
    <div class="FormConf__box">
      <div class="FormConf__box--title">标签后缀</div>
      <el-input :min="0" v-model="value['labelSuffix']" size="mini" @change="v => onUpdate('labelSuffix', v)" clearable/>
    </div>
    <!--    <div class="FormConf__box">-->
    <!--      <div class="FormConf__box&#45;&#45;title">组件尺寸</div>-->
    <!--      <button-group v-model="value['size']" :data="['medium', 'small', 'mini']" @change="v => onUpdate('size', v)"/>-->
    <!--    </div>-->
    <div class="FormConf__box">
      <div class="FormConf__box--title">校验结果反馈图标</div>
      <div style="text-align: right;">
        <el-switch v-model="value['statusIcon']" size="mini" @change="v => onUpdate('statusIcon', v)"/>
      </div>
    </div>
    <div class="FormConf__box">
      <div class="FormConf__box--title">显示校验错误信息</div>
      <div style="text-align: right;">
        <el-switch v-model="value['showMessage']" size="mini" @change="v => onUpdate('showMessage', v)"/>
      </div>
    </div>
    <div class="FormConf__box">
      <div class="FormConf__box--title">必填字段显示红色星号</div>
      <div style="text-align: right;">
        <el-switch v-model="value['hideRequiredAsterisk']" size="mini" @change="v => onUpdate('hideRequiredAsterisk', v)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { PropArray, PropObject } from "../utils/Props";
import ButtonGroup from "./ButtonGroup";

export default {
  name: 'FormConf',
  components: {ButtonGroup},
  model: {prop: 'value', event: 'update'},
  props: {
    data: PropArray([]),
    value: PropObject({}),
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

<style lang="scss" src="../scss/FormConf.scss"/>
