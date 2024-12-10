<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <router-link to="/" class="btn btn-primary">Go to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound"
  };
  </script>
  
  <style>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  .not-found h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  .not-found p {
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  .btn {
    padding: 10px 20px;
    font-size: 1em;
  }
  </style>