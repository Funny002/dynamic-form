<template>
  <div class="App">
    <h3 style="padding: 10px 0;">editor</h3>
    <dynamic-form-editor style="height: 500px;" v-model="form.data" :conf.sync="form.conf"/>
    <h3 style="padding: 10px 0;">views</h3>
    {{ form.data }}
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      dateValue: undefined,
      form: {
        data: {},
        conf: {disabled: true},
        value: {}
      }
    };
  },
  methods: {
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
