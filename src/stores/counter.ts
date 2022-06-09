import axios from "axios";
import { defineStore } from "pinia";

type FlagType = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

type JokeType = {
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: FlagType;
  id: number;
  safe: boolean;
  lang: string;
};

export const useJokesStore = defineStore({
  id: "jokes",
  state: () => ({
    jokes: [] as JokeType[],
    singleJoke: {} as JokeType,
  }),

  getters: {
    getJokes(state) {
      return state.jokes;
    },
    getSingleJoke(state) {
      return state.singleJoke;
    },
    getJokeFlags(state) {
      const { flags } = state.singleJoke;
      const keys = Object.keys(flags) as (keyof typeof flags)[];
      return keys.filter((key) => flags[key]);
    },
  },

  actions: {
    async fetchJokesByCategory(category: string) {
      if (category !== "Safe-mode") {
        try {
          const response = await axios.get(
            `https://v2.jokeapi.dev/joke/${category}?amount=5`
          );
          this.jokes = response.data.jokes;
        } catch (error) {
          alert(error);
          console.log(error);
        }
      } else {
        try {
          const response = await axios.get(
            `https://v2.jokeapi.dev/joke/Any?safe-mode&amount=5`
          );
          this.jokes = response.data.jokes;
        } catch (error) {
          alert(error);
          console.log(error);
        }
      }
    },
    async fetchSingleJoke(id: number) {
      try {
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/Any?idRange=${id}`
        );
        this.singleJoke = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
