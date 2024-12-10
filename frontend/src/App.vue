<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">PCPartBuilder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/cpus" class="nav-link">CPUs</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/selfbuilder" class="nav-link">Self Builder</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>

    <footer class="footer bg-dark text-white text-center">
      <p class="mb-1">&copy; {{ currentYear }} Bradford Torpey</p>
      <p class="mb-0">
        <router-link to="/about" class="text-white">About</router-link> |
        <a href="https://github.com/biffmalibu" target="_blank" class="text-white">
          <img src="@/assets/github.png" alt="GitHub" class="github-icon" />
          GitHub
        </a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  flex: 1;
}
.footer {
  padding: 10px 0;
  background-color: #343a40;
  color: white;
}
.github-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
  transform: translate(2px, -2px); /* Adjust the icon position */
}
</style>