<template>
  <div class="joke__view">
    <div class="joke__container">
      <div class="joke__flags">
        <div v-if="getSingleJoke.safe === true" class="joke__flag safe">
          <span>Safe for children</span>
        </div>
        <div v-if="getSingleJoke.safe === false" class="joke__flag-wrapper">
          <div class="joke__flag" v-for="flag in getJokeFlags" :key="flag">
            <span>{{ flag }}</span>
          </div>
        </div>
      </div>
      <div class="joke__category">
        <span>{{ getSingleJoke.category }}</span>
      </div>

      <div class="joke__main">
        <div v-if="getSingleJoke.type === 'single'">
          <p>{{ getSingleJoke.joke }}</p>
        </div>
        <div v-if="getSingleJoke.type === 'twopart'">
          <p>Q: {{ getSingleJoke.setup }}</p>
          <p>A: {{ getSingleJoke.delivery }}</p>
        </div>
      </div>
    </div>
    <button class="back-btn" @click="$router.push('/jokes')">BACK PLS</button>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useJokesStore as useStore } from "@/stores/counter";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SingleJoke",

  mounted() {
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;
    store.fetchSingleJoke(Number(id));
  },

  computed: {
    ...mapState(useStore, ["getSingleJoke", "getJokeFlags"]),
  },
});
</script>

<style scoped>
@import "../assets/SingleJokeView.scss";
</style>
