<template lang="pug">
  .base-button(
    :class="{ '--centered': !icon, '--disabled': isDisabled }"
    @click="onClick"
  )
    img(v-if="icon" :src="require(`@/assets/img/icons/${icon}.svg`)").base-button__image

    .base-button__text
      slot

</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    icon: {
      type: String,
      default: '',
    },

    isDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      if (this.isDisabled) {
        return
      }

      this.$emit('click')
    },
  },
}
</script>

<style lang="scss">
.base-button {
  padding: 14px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;

  display: flex;
  align-items: center;

  &__image {
    width: 36px;
    height: 36px;
    margin-right: 16px;
  }

  &__text {
    font-weight: 600;
    font-size: 14px;
  }

  &:hover {
    box-shadow: 0 2px 5px 0 #4183c4, 0 0 0 2px #4183c4;
  }

  &.--centered {
    .base-button__text {
      margin: 0 auto;
    }
  }

  &.--disabled {
    pointer-events: none;
    opacity: 0.5;
    background: #CCC;
  }
}
</style>
