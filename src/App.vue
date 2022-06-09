<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <RouterLink to="/jokes" class="link">Jokes</RouterLink>
      <RouterLink to="/names" class="link">Names</RouterLink>
    </nav>
  </header>
  <div class="main">
    <RouterView />
  </div>
</template>

<style>
@import "./assets/base.css";
@import "./assets/App.scss";
</style>
