<template lang="pug">
  .home-view.container
    .home-view__title Выбери режим игры

    .home-view__modes
      BaseButton(icon="painting" @click="onModeClick('title')") Названия картин
      //- BaseButton(icon="painting" @click="onModeClick('author')") Угадать автора
      //- BaseButton(icon="painting" @click="onModeClick('extra')") Смешанный
  
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    onModeClick(mode) {
      const settings = {
        path: 'play',
        query: { mode },
      }

      this.$router.push(settings)
    },
  },
}
</script>

<style lang="scss">
.home-view {
  &__title {
    @include heading2;

    color: #4183c4;
    text-align: center;
    margin-bottom: 14px;
  }

  &__modes {
    display: grid;
    grid-gap: 8px;

    @media (max-width: $breakpointMobile) {
      max-width: 500px;
    }
  }
}
</style>