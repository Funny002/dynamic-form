<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">类型</div>
        <div class="var-dynamic__lockerForm--body">
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">占位文本</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['placeholder']" size="mini" @change="v => onUpdate('placeholder', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">内容格式</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['format']" size="mini" @change="v => onUpdate('format', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">对齐方式</div>
        <div class="var-dynamic__lockerForm--body">
          <button-group v-model="value['align']" :data="['left', 'center','right']" @change="v => onUpdate('align', v)"/>
        </div>
      </div>
      <template v-for="(item, key) in styleList">
        <div class="var-dynamic__lockerForm--box" v-if="item.show !== false" :key="key">
          <div class="var-dynamic__lockerForm--title">{{ item.label }}</div>
          <div class="var-dynamic__lockerForm--body">
            <el-switch v-model="value[item.name]" size="mini" @change="v => onUpdate(item.name, v)"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {Input, Switch} from 'element-ui';
import {PropObject} from '../../utils/Props';
import ButtonGroup from '../../lib/packages/ButtonGroup';

export default {
  name: 'Date',
  model: {prop: 'value', event: 'change'},
  components: {ElInput: Input, ElSwitch: Switch, ButtonGroup},
  props: {value: PropObject({})},
  data: function () {
    return {
      styleList: [
        {label: '是否只读', name: 'readonly'},
        {label: '是否禁用', name: 'disabled'},
        {label: '取消面板联动', name: 'unlinkPanels'}
      ]
    };
  },
  mounted () {
    this.defaultValue();
  },
  methods: {
    defaultValue () {
      const data = {...this.value};
      if (!data['align']) data['align'] = 'left';
      if (!data['format']) data['format'] = 'yyyy-MM-dd';
      if (!data['valueFormat']) data['valueFormat'] = 'yyyy-MM-dd';
      this.$emit('change', data);
    },
    onUpdate (name, value) {
      const data = {...this.value};
      data[name] = value;
      if (name === 'format') {
        data['valueFormat'] = value;
      }
      this.$emit('change', data);
      if (name === 'autosize' && value === false) this.autosize = {};
    }
  }
};
</script>
