<template lang="pug">
  .play-view(v-if="currentPainting" :key="currentPaintingIndex")
    figure.play-view__image(
      v-show="isImageLoaded"
      @mousemove="onImageMouseMove"
      :style="{ 'background-image': `url('${currentPainting.src}')` }"
    )
      img(:src="currentPainting.src" @load="onImgLoad")

    BaseLoader.play-view__loader(v-if="!isImageLoaded")

    .play-view__body.container
      .play-view__title Автор: {{ currentPainting.author }}

      BaseInput.play-view__input(
        v-model="currentInputText"
        placeholder="Введите название картины"
      )
      
      BaseButton.play-view__button(
        :is-disabled="!isNextStepAvailable"
        @click="onNextStepClick"
      ) Продолжить

</template>

<script>
import { shuffleArray } from '@/utils/utils'

export default {
  name: 'PlayView',

  data() {
    return {
      paintings: [],
      currentPaintingIndex: 0,
      currentInputText: '',
      isImageLoaded: false,
    }
  },

  computed: {
    mode() {
      return this.$route.query.mode
    },

    currentPainting() {
      return this.paintings[this.currentPaintingIndex]
    },

    isNextStepAvailable() {
      const currentText = this.currentInputText.toLowerCase()
      const paintingTitle = this.currentPainting.title.toLowerCase()

      return currentText === paintingTitle
    },
  },

  watch: {
    currentPaintingIndex() {
      this.currentInputText = ''
      this.isImageLoaded = false
    },
  },

  async created() {
    const { data } = await this.$axios.get('https://ignaty.uk/paintings.json')
    
    this.paintings = shuffleArray(data)
  },

  methods: {
    onNextStepClick() {
      const nextPaintingIndex = this.currentPaintingIndex + 1

      if (nextPaintingIndex === this.paintings.length) {
        return alert('Картины закончились!')
      }

      this.currentPaintingIndex += 1
    },

    onImageMouseMove(e) {
      const zoomer = e.currentTarget
      let offsetX, offsetY, x, y

      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
      e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX

      x = offsetX/zoomer.offsetWidth * 50
      y = offsetY/zoomer.offsetHeight * 50

      zoomer.style.backgroundPosition = x + '% ' + y + '%'
    },

    onImgLoad() {
      this.isImageLoaded = true
    },
  },
}
</script>

<style lang="scss">
.play-view {
  &__image {
    position: relative;
    display: flex;
    border-radius: 4px;
    max-height: 600px;
    min-height: 400px;
    overflow: hidden;
    cursor: zoom-in;

    img {
      transition: opacity .5s;
      display: block;
      width: 100%;
      object-fit: cover;
    }

    & img:hover {
      opacity: 0;
    }

    @media (max-width: $breakpointTablet) {
      margin: 0 16px;
    }
  }

  &__body {
    margin: 12px auto 0;
  }

  &__title {
    @include heading2;

    color: #4183c4;
    text-align: center;
    margin-bottom: 14px;
  }

  &__input {
    margin-bottom: 12px;
  }

  &__loader {
    margin: 24px auto;
  }
}
</style>