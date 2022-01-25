<template>
  <div class="App">
    <h3 style="padding: 10px 0;">editor</h3>
    <dynamic-form-editor style="height: 500px;" v-model="form.data"/>
    <h3 style="padding: 10px 0;">
      <span>views</span>
      <el-button @click="timeoutShow" size="mini" type="text" style="margin-left: 5px;">刷新</el-button>
    </h3>
    <div style="width: 100%; display: table" v-if="viewShow">
      <el-tabs style="width: 40%; float: left;">
        <el-tab-pane label="结构体">
          <div class="scroll-bar" style="width: 100%; max-height: 600px; float: left;">
            <pre>{{ form.data }}</pre>
          </div>
        </el-tab-pane>
        <el-tab-pane label="内容">
          <div class="scroll-bar" style="width: 100%; max-height: 600px; float: left;">
            <pre>{{ form.value }}</pre>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="scroll-bar" style="width: 60%; max-height: 600px; float: left;">
        <dynamic-form-view v-model="form.value" :data="form.data" @click="onClick"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      viewShow: true,
      form: {
        data: {},
        value: {}
      }
    };
  },
  methods: {
    timeoutShow () {
      this.viewShow = false;
      this.$nextTick(() => {
        this.viewShow = true;
      });
    },
    onClick (...event) {
      console.log('onClick ->>', event);
    },
    onChange (value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 10px;
  color: #303133;
  font-size: 14px;
}
</style>
