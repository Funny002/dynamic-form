<template>
  <div class="var-dynamic__lockerForm" style="padding: 0;">
    <div style="padding: 10px 10px 0;">
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">默认显示</div>
        <div class="var-dynamic__lockerForm--body">
          <el-input v-model="value['value']" size="mini" style="width: 140px;" @change="v => onUpdate('value', v)"/>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">风格类型</div>
        <div class="var-dynamic__lockerForm--body">
          <el-select v-model="value['type']" size="mini" style="width: 140px;" @change="v => onUpdate('type', v)">
            <el-option v-for="(item, key) in TypeList" :key="key" :value="item.value" :label="item.label"/>
          </el-select>
        </div>
      </div>
      <div class="var-dynamic__lockerForm--box">
        <div class="var-dynamic__lockerForm--title">选项卡位置</div>
        <div class="var-dynamic__lockerForm--body">
          <el-select v-model="value['tabPosition']" size="mini" style="width: 140px;" @change="v => onUpdate('tabPosition', v)">
            <el-option v-for="(item, key) in PositionList" :key="key" :value="item.value" :label="item.label"/>
          </el-select>
        </div>
      </div>
      <alert type="warning" show-icon :closable="false" style="padding: 2px 10px; margin: 5px 0;" title="删除会把，内容一起删除"/>
    </div>
    <collapse>
      <collapse-item v-for="(pane, key) in (value.childList || [])" :key="key" :name="key">
        <div slot="title" style="display: flex; align-items: center; padding-left: 10px; width: 100%;">
          <div style="font-weight: bold;">标签页:<span style="padding-left: 10px;">{{ pane.label }}</span></div>
          <div style="margin: auto;"></div>
          <div class="var-dragGable__grid--btn">
            <div class="el-button--primary" @click.stop="onPanePush(key)">
              <i class="el-icon-plus"></i>
            </div>
            <div class="el-button--danger" v-if="value.childList.length > 1" @click.stop="onPaneDelete(key)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
        <div class="var-dynamic__lockerForm--box" v-for="(item, keys) in PaneList" :key="keys">
          <div class="var-dynamic__lockerForm--title">{{ item.label }}</div>
          <div class="var-dynamic__lockerForm--body">
            <el-input size="mini" v-model="pane[item.name]" @change="v => oninput(item.name, key, v)"/>
          </div>
        </div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script>
import {Alert, Input, Select, Option, Collapse, CollapseItem} from 'element-ui';
import {PropObject} from '../../utils/Props';

export default {
  name: 'Tabs',
  model: {prop: 'value', event: 'change'},
  components: {Alert, ElInput: Input, ElSelect: Select, ElOption: Option, Collapse, CollapseItem},
  props: {
    value: PropObject({})
  },
  data: function () {
    return {
      TypeList: [
        {value: '', label: '默认样式'},
        {value: 'card', label: '选项卡样式'},
        {value: 'border-card', label: '卡片化样式'}
      ],
      PositionList: [
        {value: 'top', label: '上'},
        {value: 'left', label: '左'},
        {value: 'right', label: '右'},
        {value: 'bottom', label: '下'}
      ],
      PaneList: [
        {label: '图标', name: 'icon'},
        {label: '昵称', name: 'label'},
        {label: '标识', name: 'name'}
      ]
    };
  },
  methods: {
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
      console.log(data);
      this.$emit('change', data);
    }
  }
};
</script>
