import { PropBoolean, PropObject } from "../utils/Props";
import Models from "./index";

export default {
  name: "ModelsItem",
  props: {
    item: PropObject({}),
    dragGable: PropBoolean(false),
  },
  computed: {
    getModels () {
      return Models[this.item.alias]
    }
  },
  methods: {
    onClick (...event) {
      this.$emit('click', ...event)
    },
    onChange (...event) {
      this.$emit('change', ...event)
    },
    otherFunc (name, ...event) {
      this.$emit(name, ...event)
    }
  },
  render (h) {
    return h(this.getModels, {
      props: {dragGable: this.dragGable, item: this.item},
      on: {
        click: this.onClick,
        change: this.onChange,
        'other-func': this.otherFunc,
      }
    }, this.$slots.default)
  }
}
