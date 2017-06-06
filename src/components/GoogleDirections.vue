<template>
  <div>


    <div class="resultBar">
      <span class="shortinfo">{{ directionRoute.transportmethod }}</span>
     <span class="shortInfo">{{ directionRoute.start }}</span>
      <span class="shortInfo">{{ directionRoute.finish }}</span>
      <span class="shortInfo">{{ directionRoute.duration }}</span>

      </div>

  </div>
</template>

<script>
  export default {
    name: "GoogleDirections",
    props: {
      directionRoute: '',
    },

    data() {
      return {
          wegbeschreibung: '',
      }
    },


    methods: {

    }
  }

</script>
<style scoped>
  .directionWindow {
    margin: auto;
    margin-top: 30px;
    width:500px;
    height: 300px;
  }
  .resultBar {
    margin: auto;
    width: 80%;
    background-color: rgba(79,147,248,0.3);
  }
  .shortInfo {

  }

  .bus {

  }

  .tram {

  }
</style>
