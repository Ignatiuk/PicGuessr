<template lang="pug">
  .base-input
    input(:placeholder="placeholder" @input="onInput")

</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    placeholder: {
      type: String,
      default: 'Введите',
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss">
.base-input {
  background-color: white;

  input {
    padding: 16px;
    border: none;
    outline: none;
    font-size: 14px;
    width: 100%;
  }
}
</style>