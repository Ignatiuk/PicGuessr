<template>
  <div id="app">
    <div class="container">
      <div class="start area" v-show="gameMode === ''">
        <div class='text'>Выберите мод для игры</div>
        <div class="mods">
          <button @click="startGame('title')">Угадать название</button>
          <button @click="startGame('author')">Угадать автора</button>
          <button @click="startGame('hard')">Сложный</button>
        </div>
      </div>

      <div class="play area" v-show="gameMode !== ''">
        <img
          v-if="currentPictureImage"
          :src="require(`@/assets/pictures/${currentPictureImage}`)"
        />

        <div class='inputs'>
          <div
            v-if="gameMode === 'author' || showResults"
            class='text'
            :class="{ w: currentPicture.title.length > 40 }"
          >
            <span class='s'>«</span>
              {{currentPicture.title}}
            <span class='s'>»</span>
          </div>

          <input
            v-if="gameMode === 'title' && !showResults || gameMode === 'hard' && !showResults"
            type='text'
            placeholder="Название"
            v-model="writtenTitle"
          />

          <div
            v-if="gameMode === 'title' || showResults"
            :class="{ w: currentPicture.author.length > 40 }"
            class='text'
          >
            {{currentPicture.author}}
          </div>

          <input
            v-if="gameMode === 'author' && !showResults || gameMode === 'hard' && !showResults"
            type='text'
            placeholder="Автор"
            v-model='writtenAuthor'
          />

          <button v-if='isNextButtonAvailable' @click='nextStep()'>Далее</button>
          <button v-if='!isNextButtonAvailable' @click='showResults = true'>Показать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import picturesData from '@/data/pictures.json'
import { getRandomNumber } from '@/utils/utils'

export default {
  data: () => ({
    pictures: picturesData,
    gameMode: '',
    previousIndexes: [],
    currentPicture: {
      title: '',
      author: '',
      src: '',
    },
    showResults: false,
    writtenTitle: '',
    writtenAuthor: '',
  }),

  computed: {
    currentPictureImage() {
      return this.currentPicture.src;
    },

    isNextButtonAvailable() {
      if (this.showResults) {
        return true
      } else if (this.gameMode === 'title') {
        return (this.isEqual(this.writtenTitle, this.currentPicture.title))
      } else if (this.gameMode === 'author') {
        return (this.isEqual(this.writtenAuthor, this.currentPicture.author))
      } else if (this.gameMode === 'hard') {
        return (
          this.isEqual(this.writtenTitle, this.currentPicture.title) &&
          this.isEqual(this.writtenAuthor, this.currentPicture.author)
        )
      } else {
        return false
      }
    },
  },

  methods: {
    startGame(gameMode) {
      const pictureIndex = this.getRandomIndex();

      this.currentPicture = this.pictures[pictureIndex];
      this.gameMode = gameMode;
    },

    nextStep() {
      const pictureIndex = this.getRandomIndex();
      const anotherPicture = this.pictures[pictureIndex];
      const isInPrevious = this.previousIndexes.includes(pictureIndex);

      if (this.previousIndexes.length >= this.pictures.length) {
        return alert('Вы прошли все картины!')
      }

      if (isInPrevious) {
        this.nextStep();
      } else {
        this.currentPicture = anotherPicture;
        this.previousIndexes.push(pictureIndex);

        this.resetInputs();
      }
    },

    resetInputs() {
      this.writtenTitle = '';
      this.writtenAuthor = '';
      this.showResults = false;
    },

    isEqual(x, y) {
      return (x.toLowerCase() === y.toLowerCase())
    },

    getRandomIndex() {
      const length = Object.keys(this.pictures).length;

      return getRandomNumber(0, length - 1);
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

body {
  background: linear-gradient( rgba(150, 150, 150, 0.2), rgba(0, 0, 0, 0.3) ), url('https://sun9-2.userapi.com/c635101/v635101352/24a0d/vv67-E93D3E.jpg');
  background-size: 100%;
  font-family: 'Caveat', sans-serif;
  font-size: 40px;
  overflow: hidden;
}
#app {
  height: 100vh;
}

button, input {
  font-size: 30px;
  text-align: center;
  outline: none;
}
button {
  border: none;
  color: white;
  width: auto!important;
  background-color: #3a4549;
  padding: 7px 32px 8px;
  border-radius: 4px;
  cursor: pointer;
}
input {
  padding: 10px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 2px 4px #00000047;
}
.container {
  margin: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  display: flex;
}
.area {
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025);
  min-width: 16em;
  max-height: 15em;
  background: url('data:image/jpeg;base64,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');
}
.start {
  margin: auto;
  max-width: 15em;
}
.play {
  text-align: center;
  max-width: 15em;
}
.area > div {
  margin: 15px 0;
}
.mods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.mods * {
  margin: 5px 0;
  width: 400px;
}
.inputs {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inputs * {
  margin: 10px 0;
  width: 650px;
  height: 48px;
}
.inputs button, .inputs input {
  width: 450px;
}
img {
  max-height: 10em;
  max-width: 15em;
  user-drag: none;
  -webkit-user-drag: none;
}

.s {
  font-size: 25;
}

.w {
  font-size: 34px!important;
}

</style>
