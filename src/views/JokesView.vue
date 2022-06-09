<template>
  <div class="jokes__view">
    <div class="jokes__info">
      <p>Showing 5 random jokes</p>
      <p>
        <b>{{ `Category: ${selected}` }}</b>
      </p>
    </div>

    <div class="filter__wrapper">
      <button
        class="filter__btn"
        :class="{ active: category === selected }"
        v-for="category in categories"
        :key="category"
        @click="changeCategory(category)"
      >
        <span>{{ category }}</span>
      </button>
    </div>

    <div class="jokes__mode">
      <p>Special Modes for Special People</p>
      <div class="filter__wrapper">
        <button
          class="filter__btn"
          :class="{ active: mode === selected }"
          v-for="mode in modes"
          :key="mode"
          @click="changeCategory(mode)"
        >
          <span>{{ mode }}</span>
        </button>
      </div>
    </div>

    <div class="jokes__wrapper">
      <div
        class="joke__box"
        :class="{
          sb1: joke.id % 2 === 0,
          sb2: joke.id % 2 !== 0,
        }"
        v-for="joke in getJokes"
        :key="joke.id"
        @click="$router.push(`/jokes/${String(joke.id)}`)"
      >
        <div class="joke__flags">
          <div v-if="joke.safe === true" class="joke__flag safe">
            <span>Safe for children</span>
          </div>
          <div v-if="joke.safe === false" class="joke__flag dark">
            <span>Dark</span>
          </div>
        </div>

        <div v-if="joke.type === 'single'">
          <p>{{ joke.joke }}</p>
        </div>
        <div v-if="joke.type === 'twopart'">
          <p>Q: {{ joke.setup }}</p>
          <p>A: {{ joke.delivery }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useJokesStore as useStore } from "@/stores/counter";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RandomJokes",
  data: () => ({
    categories: ["Any", "Programming", "Misc", "Pun", "Spooky", "Christmas"],
    modes: ["Dark", "Safe-mode"],
    selected: "Any",
  }),

  watch: {
    selected(newSelection: string) {
      this.updateJokesByCategory(newSelection);
    },
  },

  computed: {
    ...mapState(useStore, ["getJokes", "getSingleJoke"]),
  },

  created() {
    useStore().fetchJokesByCategory("Any");
  },

  methods: {
    changeCategory(target: string) {
      this.selected = target;
    },
    updateJokesByCategory(target: string) {
      const store = useStore();
      store.fetchJokesByCategory(target);
    },
  },
});
</script>

<style scoped>
@import "../assets/JokesView.scss";
</style>
