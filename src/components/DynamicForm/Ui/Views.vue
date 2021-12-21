<template>
  <models-form :model="value" :item="conf">
  </models-form>
</template>

<script>
import ModelsForm from "../models/ModelsForm";
import { PropArray, PropObject } from "../utils/Props";

export default {
  name: "Views",
  components: {ModelsForm},
  props: {
    data: PropArray([]),
    conf: PropObject({}),
    value: PropObject({}),
    options: PropObject({})
  }
}
</script>
