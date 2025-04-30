<template>
  <div class="homepage">
    <h1>Welcome to PCPartBuilder</h1>
    <p>This application allows you to explore PC components and create builds manually with the Selfbuilder, or automatically with the Autobuilder.</p>
    <div class="button-container">
      <div class="button-column">
        <router-link to="/autobuilder" class="btn btn-primary">
          Auto Builder
        </router-link>
      </div>
      <div class="button-column">
        <router-link to="/selfbuilder" class="btn btn-secondary">
          Self Builder
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.btn {
  padding: 10px 20px;
  font-size: 1em;
  margin-bottom: 10px;
}
</style>