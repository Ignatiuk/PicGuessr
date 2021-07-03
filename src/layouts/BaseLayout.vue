<template lang="pug">
  .base-layout
    slot

</template>

<script>
export default {
  name: 'BaseLayout',
}
</script>

<style lang="scss">
@import "../assets/styles/global.scss";
@import "../assets/styles/reset.scss";
@import "../assets/styles/common.scss";

.base-layout {
  @include flex-center;
  
  background-color: $backgroundColor;
  overflow: auto;
  box-sizing: content-box;
  height: 100%;
}
</style>