<template>
  <div class="App">
    <h3 style="padding: 10px 0;">editor</h3>
    <dynamic-form-editor style="height: 800px;" v-model="form.data" :conf.sync="form.conf"/>
    <h3 style="padding: 10px 0;">views</h3>
    {{ dateValue }}
    <date :item="{type:'date',placeholder:'text'}" v-model="dateValue" @change="onChange"/>
  </div>
</template>

<script>
import Date from './components/DynamicForm/models/Date/Models'

export default {
  name: 'App',
  components: {Date},
  data: function () {
    return {
      dateValue: undefined,
      form: {
        data: [],
        conf: {disabled: true},
        value: {},
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" src="./assets/scss/__base.scss"/>
