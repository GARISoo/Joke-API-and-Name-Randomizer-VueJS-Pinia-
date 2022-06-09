import { classNames } from "./../data/allNames";
import { defineStore } from "pinia";

export const useNamesStore = defineStore({
  id: "names",

  state: () => ({
    allNames: [...classNames] as string[],
    selectedNames: [] as string[],
    selectedName: "The Lucky One",
  }),

  getters: {
    getAllNames({ allNames }) {
      return allNames;
    },
    getSelectedNames({ selectedNames }) {
      return selectedNames;
    },
    getSelectedName({ selectedName }) {
      return selectedName;
    },
  },

  actions: {
    updateNames() {
      const randomName =
        this.allNames[Math.floor(Math.random() * this.allNames.length)];
      this.selectedName = randomName;
      const targetIndex = this.allNames.indexOf(randomName);

      this.selectedNames.push(this.allNames[targetIndex]);
      this.allNames.splice(targetIndex, 1);
    },
    resetNames() {
      this.allNames = [...classNames];
      this.selectedName = "The Lucky One";
      this.selectedNames = [];
    },
  },
});
