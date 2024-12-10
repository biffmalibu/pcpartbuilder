<template>
  <div class="homepage">
    <h1>Welcome to the CPU Database</h1>
    <p>This application allows you to browse, search, and view detailed information about various CPUs.</p>
    <div class="button-container">
      <div class="button-column">
        <router-link to="/cpus" class="btn btn-primary">View CPU List</router-link>
      </div>
      <div class="button-column">
        <router-link to="/selfbuilder" class="btn btn-secondary">Self Builder</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
};
</script>

<style>
.homepage {
  text-align: center;
  margin-top: 50px;
}
.homepage h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}
.homepage p {
  font-size: 1.2em;
  margin-bottom: 30px;
}
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.button-column {
  flex: 1;
  display: flex;
  justify-content: center;
}
.btn {
  padding: 10px 20px;
  font-size: 1em;
}
</style>