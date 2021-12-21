<template>
  <el-row :type="item.type" :gutter="item.gutter" :justify="item.justify" :align="item.align">
    <drag-gable tag="el-col" v-for="(col ,key) in item.childList" :key="`col-${key}`" :list="col.childList" :componentData="getColProps(col)">
      <models-item v-for="(v, k) in col.childList" :key="`col-${key}-${k}`" :drag-gable="true" :item="v"/>
    </drag-gable>
  </el-row>
</template>

<script>
import { PropString } from "../../utils/Props";
import { reArray } from "../../utils/Object";
import ModelsItem from "../ModelsItem";

export default {
  name: 'TabsModels',
  components: {ModelsItem},
  model: {prop: 'value', event: 'change'},
  props: {
    item: {
      // type: PropString(),
      align: PropString(), // top/middle/bottom
      gutter: PropString(),
      justify: PropString(), // start/end/center/space-around/space-between
    }
  },
  data: function () {
    return {
      getColProps: col => {
        return {props: reArray(['span', 'offset', 'push', 'pull'], col)}
      }
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
    }
  }
}
</script>
