<template>
  <div class="Editor">
    <el-collapse class="Editor__Left scroll-bar" v-model="collapseVal">
      <el-collapse-item v-for="(tab, key) in ModelTabs" :key="key" :name="`collapse_${key}`">
        <div class="Editor__Left--header" slot="title">
          <i :class="tab.icon"></i>
          <div style="padding-left: 8px;">{{ tab.title }}</div>
        </div>
        <drag-gable :list="tab.childList" :group="{name: 'form', pull: 'clone', put: false}" :sort="false" @end="onEnd">
          <el-button v-for="(item, k) in tab.childList" :key="k" :icon="item.icon" type="primary" plain :title="item.title">{{ item.title }}</el-button>
        </drag-gable>
        <div v-show="!tab.childList.length" style="line-height: 60px; text-align: center; color: #999;" v-text="'暂无数据'"/>
      </el-collapse-item>
    </el-collapse>
    <models-form class="Editor__Form" :item="formConf">
      <drag-gable tag="transition-group" class="Editor__Form--content scroll-bar" group="form" :list="contents.data" :animation="200" @end="onMoveEnd" @click.native="contents.active = null" :componentData="{props: {tag: 'div'}}" ghostClass="Editor__Form--content-ghost">
        <div class="Editor__Form--list" v-for="(item, key) in contents.data" :key="`contents_${key}`" @click.stop="contents.active = key" :class="{'Editor__Form--active': contents.active === key}">
          <div class="Editor__Form--box">
            <models-item :drag-gable="true" :item="item"/>
          </div>
          <el-button class="Editor__Form--button" type="danger" icon="el-icon-delete" @click.stop="onDelete(key)"/>
        </div>
      </drag-gable>
      <el-empty class="Editor__Form--empty" v-show="!contents.data.length" description="拖拽模组开始编辑"/>
    </models-form>
    <el-tabs class="Editor__Right">
      <el-tab-pane label="属性设置" name="option" class="scroll-bar" v-if="contents.active !== null">
        <model-conf v-model="getOptions"/>
      </el-tab-pane>
      <el-tab-pane label="全局属性" name="form">
        <form-conf style="padding: 10px;" v-model="formConf"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { PropArray, PropObject } from "../utils/Props";
import { deepCopy } from "../utils/Object";
import { ModelTabs } from "../models";
import ModelsItem from "../models/ModelsItem";
import ModelsForm from '../models/ModelsForm';
import ModelConf from "./ModelConf";
import FormConf from "./FormConf";

export default {
  name: "Editor",
  components: {ModelsItem, ModelConf, FormConf, ModelsForm},
  model: {prop: 'value', event: 'update'},
  props: {
    value: PropArray([]),
    conf: PropObject({})
  },
  computed: {
    formConf: {
      get () {
        return this.conf || {}
      },
      set (value) {
        this.$emit('update:conf', value)
      }
    },
    getOptions () {
      const active = this.contents.active
      if (active !== null) {
        return this.contents.data[active]
      }
      return null
    }
  },
  data: function () {
    return {
      ModelTabs,
      tipsList: {callback: null},
      history: {data: [], max: 10}, // 历史
      contents: {data: [], active: null}, // 内容
      collapseVal: Object.keys(ModelTabs).map(v => `collapse_${v}`)
    }
  },
  methods: {
    setHistory () {
      const {history: {data, max}, contents: {data: contents, active}} = this
      if (data.length >= max) this.history.data.shift()
      this.history.data.push({data: deepCopy(contents), active})
    },
    getHistory () {
      if (this.history.data.length) {
        const {data: contents, active} = this.history.data.pop()
        this.contents = {data: contents, active}
      }
    },
    onEnd ({newIndex, pullMode}) {
      if (pullMode) this.onMoveEnd({oldIndex: this.contents.length, newIndex})
    },
    onMoveEnd ({oldIndex, newIndex}) {
      // this.setHistory()
      const active = this.contents.active
      if (active !== null) {
        if (active === oldIndex) {
          this.contents.active = newIndex
        } else if (oldIndex > active && active >= newIndex) {
          this.contents.active += 1
        } else if (oldIndex < active && active <= newIndex) {
          this.contents.active -= 1
        }
      } else {
        this.contents.active = newIndex
      }
    },
    onDelete (keys) {
      // this.setHistory()
      const active = this.contents.active
      if (active !== null) {
        if (active === keys) {
          this.contents.active = null
        } else if (keys < active) {
          this.contents.active -= 1
        }
      }
      this.contents.splice(keys, 1)
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      if (this.tipsList.callback) this.tipsList.callback.close()
      this.tipsList.callback = this.$message({
        type: 'success',
        showClose: true,
        duration: 1000 * 1,
        message: this.$createElement('div', {class: 'el-message__content'}, [
          '操作成功。',
          // '操作成功，',
          // this.$createElement('el-link', {
          //   props: {underline: false, type: 'primary'},
          //   on: {
          //     click: () => {
          //       this.tipsList.callback.close()
          //       this.getHistory()
          //     }
          //   }
          // }, '点击撤回')
        ])
      })
    }
  }
}
</script>

<style lang="scss" src="../scss/Editor.scss"/>
