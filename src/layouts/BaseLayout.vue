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

  height: 100%;
  // background-size: cover;
  // background:
  //   linear-gradient(rgba(150, 150, 150, 0.2), rgba(0, 0, 0, 0.6)),
  //   url('https://sun9-2.userapi.com/c635101/v635101352/24a0d/vv67-E93D3E.jpg');
  background-color: $backgroundColor;
}
</style>