<template>
    <div class="about-page">
      <h1>About PCPartBuilder</h1>
      <p>PCPartBuilder application created using Vue.js, Node.js, Express.js, and MySQL. This application was created by Bradford Torpey as a senior thesis project and remains a work in progress.</p>
      <div class="github-link">
        <a href="https://github.com/your-github-username" target="_blank">
          <img src="@/assets/github.png" alt="GitHub" class="github-icon" />
          Visit my GitHub
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutPage"
  };
  </script>
  
  <style>
  .about-page {
    text-align: center;
    margin-top: 50px;
  }
  .about-page h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  .about-page p {
    font-size: 1.2em;
    margin-bottom: 30px;
  }
  .github-link {
    margin-top: 20px;
  }
  .github-icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 8px;
  }
  </style>