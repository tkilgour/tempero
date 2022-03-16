import { defineStore } from "pinia";

export const useUiStore = defineStore({
  id: "ui",
  state: () => ({
    showSettings: false,
    settingsTimeout: null,
  }),
  actions: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
      if (this.showSettings) {
        this.resetSettingsTimeout();
      }
    },
    resetSettingsTimeout() {
      this.clearSettingsTimeout();
      // TODO: re-enable this
      // this.settingsTimeout = setTimeout(() => {
      //   this.showSettings = false;
      // }, 20000);
    },
    clearSettingsTimeout() {
      clearTimeout(this.settingsTimeout);
    },
  },
});
