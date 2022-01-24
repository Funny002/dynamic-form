<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">图标名</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['icon']" size="mini" @change="v => onUpdate('icon', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">组件尺寸</div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['size']" :data="['medium', 'small', 'mini']" @change="v => onUpdate('size', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">风格类型</div>
        <div class="var-dynamic__lockerForm--body">
          <el-select v-model="value['type']" size="mini" @change="v => onUpdate('type', v)">
            <el-option v-for="(item, key) in TypeList" :key="key" :value="item.value" :label="item.label"/>
          </el-select>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box" v-for="(item, key) in styleList" :key="key">
        <div class="var-dynamic__lockerForm--title">{{ item.label }}</div>
        <div class="var-dynamic__lockerForm--body">
          <el-switch v-model="value[item.name]" size="mini" @change="v => onUpdate(item.name, v)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Input, Switch} from 'element-ui';
import {PropObject} from '../../utils/Props';
import ButtonGroup from '../../lib/packages/ButtonGroup';

export default {
  name: 'Button',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, ButtonGroup},
  props: {
    value: PropObject({})
  },
  data: function () {
    return {
      TypeList: [
        {label: '默认按钮', value: ''},
        {label: '主要按钮', value: 'primary'},
        {label: '成功按钮', value: 'success'},
        {label: '信息按钮', value: 'info'},
        {label: '警告按钮', value: 'warning'},
        {label: '危险按钮', value: 'danger'},
        {label: '文字按钮', value: 'text'}
      ],
      styleList: [
        {label: '是否朴素按钮', name: 'plain'},
        {label: '是否圆角按钮', name: 'round'},
        {label: '是否圆形按钮', name: 'circle'},
        {label: '是否禁用状态', name: 'disabled'},
        {label: '是否默认聚焦', name: 'autofocus'}
      ]
    };
  },
  mounted () {
    this.defaultValue();
  },
  methods: {
    defaultValue () {
      const data = {...this.value};
      if (!('type' in data)) data['type'] = '';
      this.$emit('change', data);
    },
    onPanePush (keys) {
      const key = (this.value.childList || []).length;
      const getPane = (label, name) => ({label, name, childList: []});
      this.value.childList.splice(keys + 1, 0, getPane('标签页' + key, 'pane-' + key));
      this.onUpdate('childList', this.value.childList);
    },
    onPaneDelete (keys) {
      this.value.childList.splice(keys, 1);
      this.onUpdate('childList', this.value.childList);
    },
    onInput (name, key, value) {
      const childList = [...this.value.childList];
      if (value === 0) {
        delete childList[key][name];
      } else {
        childList[key][name] = value;
      }
      this.onUpdate('childList', childList);
    },
    onUpdate (name, value) {
      const data = {...this.value};
      data[name] = value;
      this.$emit('change', data);
    }
  }
};
</script>
