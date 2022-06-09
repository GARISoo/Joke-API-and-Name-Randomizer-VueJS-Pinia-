<template>
  <div class="name__container">
    <div class="name__unselected">
      <ul>
        <li v-for="name in getAllNames" :key="name">
          {{ name }}
        </li>
      </ul>
    </div>

    <div class="name__actions">
      <button class="name__btn" @click="updateNames" v-if="getAllNames.length">
        The Lucky Name
      </button>
      <button class="name__btn" @click="resetNames" v-if="!getAllNames.length">
        The Great Reset
      </button>
      <div v-if="!getSelectedNames.length">
        <p>{{ getSelectedName }}</p>
      </div>
      <div v-if="getSelectedNames.length" class="paper">
        <div class="pin">
          <div class="shadow"></div>
          <div class="metal"></div>
          <div class="bottom-circle"></div>
        </div>
        <p>{{ getSelectedName }}</p>
      </div>
    </div>

    <div class="name__selected">
      <ul>
        <li v-for="name in getSelectedNames" :key="name">
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useNamesStore as useStore } from "@/stores/names";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SingleJoke",

  computed: {
    ...mapState(useStore, [
      "getAllNames",
      "getSelectedNames",
      "getSelectedName",
    ]),
  },

  methods: {
    ...mapActions(useStore, ["updateNames", "resetNames"]),
  },
});
</script>

<style scoped>
@import "../assets/NameView.scss";
</style>
