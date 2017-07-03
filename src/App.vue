<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        warning: "Bitte beachten Sie, dass die Carsharing suche noch nich korrekt funktioniert. Es wird angenommen, dass das Auto in der Straße Ihrer Startadresse bei der Hausnummer 5 steht."

        }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .form-control {
    height: 40px;
    border-radius: 5px;
    border-style: groove;
    padding-left: 10px;
    background-color: white;
  }
</style>
