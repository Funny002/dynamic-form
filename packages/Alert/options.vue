<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">标题</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['title']" size="mini" @change="v => onUpdate('title', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">辅助文字</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['description']" size="mini" @change="v => onUpdate('description', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">类型</div>
        <div class="var-dynamic__lockerForm--body">
          <el-select v-model="value['type']" size="mini" @change="v => onUpdate('type', v)">
            <el-option v-for="(item, key) in TypeList" :key="key" :value="item.value" :label="item.label"/>
          </el-select>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">主题</div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['effect']" :data="['light', 'dark']" @change="v => onUpdate('effect', v)"/>
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
import {PropObject} from '../../utils/Props';
import ButtonGroup from '../../lib/packages/ButtonGroup';
import {Input, Select, Option} from 'element-ui';

export default {
  name: 'Alert',
  model: {prop: 'value', event: 'change'},
  components: {ButtonGroup, ElInput: Input, ElSelect: Select, ElOption: Option},
  props: {value: PropObject({})},
  data: function () {
    return {
      TypeList: [
        {label: '成功', value: 'success'},
        {label: '警告', value: 'warning'},
        {label: '信息', value: 'info'},
        {label: '错误', value: 'error'}
      ],
      styleList: [
        {label: '是否可关闭', name: 'closable'},
        {label: '是否居中', name: 'center'},
        {label: '显示图标', name: 'showIcon'}
      ]
    };
  },
  mounted () {
    this.defaultValue();
  },
  methods: {
    defaultValue () {
      const data = {...this.value};
      if (!data['type']) data['type'] = 'info';
      if (!data['effect']) data['effect'] = 'light';
      if (!data['closable']) data['closable'] = true;
      this.$emit('change', data);
    },
    onInput (value) {
      this.onUpdate('fontSize', value + 'px');
    },
    onUpdate (name, value) {
      const data = {...this.value};
      data[name] = value;
      this.$emit('change', data);
    }
  }
};
</script>
