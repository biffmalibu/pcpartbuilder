<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">PCPartBuilder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="componentsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Components
          </a>
          <div class="dropdown-menu dropdown-grid" aria-labelledby="componentsDropdown">
            <router-link to="/cpus" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-cpu-2023.png" alt="CPUs" class="dropdown-icon" /> CPUs
            </router-link>
            <router-link to="/gpus" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-videocard-2023.png" alt="GPUs" class="dropdown-icon" /> GPUs
            </router-link>
            <router-link to="/psus" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-powersupply-2023.png" alt="PSUs" class="dropdown-icon" /> PSUs
            </router-link>
            <router-link to="/coolers" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-cpucooler-2023.png" alt="Coolers" class="dropdown-icon" /> Coolers
            </router-link>
            <router-link to="/cases" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-case-2023.png" alt="Cases" class="dropdown-icon" /> Cases
            </router-link>
            <router-link to="/memory" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-memory-2023.png" alt="Memory" class="dropdown-icon" /> Memory
            </router-link>
            <router-link to="/storage" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-ssd-2023.png" alt="Storage" class="dropdown-icon" /> Storage
            </router-link>
            <router-link to="/motherboards" class="dropdown-item">
              <img src="https://cdna.pcpartpicker.com/static/forever/img/nav-motherboard-2023.png" alt="Motherboards" class="dropdown-icon" /> Motherboards
            </router-link>
          </div>
        </li>
        <li class="nav-item">
          <router-link to="/selfbuilder" class="nav-link">Self Builder</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/autobuilder" class="nav-link">Auto Builder</router-link>
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
        <a href="https://github.com/biffmalibu/pcpartbuilder" target="_blank" class="text-white">
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
  background-color: #f4f4f3;
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

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1.2em;
}
.dropdown-icon {
  width: 48px;
  height: 48px;
  margin-right: 10px;
}
</style>