<template lang="pug">
  .base-loader
    img.base-loader__image(:src="require(`@/assets/img/icons/paint-splash.svg`)")

</template>

<script>
export default {
  name: 'BaseLoader',
}
</script>

<style lang="scss">
.base-loader {
  width: 60px;
  height: 60px;

  &__image {
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>