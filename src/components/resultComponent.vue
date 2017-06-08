<template>
  <div>


    <div class="resultBar">
      <button v-on:click="showDrive = !showDrive">
        <img src="../assets/downarrow.png" height="20" width="15">
      </button>
      <span class="shortinfo">{{ directionRoute.transportmethod }}</span>
     <span class="shortInfo">{{ directionRoute.start }}</span>
      <span class="shortInfo">{{ directionRoute.finish }}</span>
      <span class="shortInfo">{{ directionRoute.duration }}</span>

      </div>

    <!-- TRANSITION DEMO -->
    <div id="demo">
      <transition name="fade">
        <div v-if="showDrive">

          <md-tabs md-fixed class="tabs">

          <md-tab id="Zusammenfassung" md-label="Zusammenfassung">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>

          <md-tab id="Map" md-label="Map">
            <DirectionService :directionRoute="completeRoute"></DirectionService>
          </md-tab>

          <md-tab id="Preis" md-label="Preis">
            <p>Comming soon...</p>
          </md-tab>

          </md-tabs>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  import DirectionService from './DirectionService.vue';

  export default {
    components: {
      DirectionService,
    },
    name: "resultComponent",
    props: {
      directionRoute: '',
      completeRoute: '',
    },

    data() {
      return {
          wegbeschreibung: '',
          showDrive: false,
      }
    },


    methods: {

    }
  }

</script>
<style scoped>
  .directionWindow {
    margin: auto;
    margin-top: 0px;
    width:500px;
    height: 300px;
  }
  .resultBar {
    margin: auto;
    width: 80%;
    height: 50px;
    background-color: rgba(79,147,248,0.3);
  }
  .shortInfo {

  }

  .bus {

  }

  .tram {

  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  #demo {
    margin: auto;
    margin-top: 5px;
    width: 80%;
    background-color: rgba(0,0,0,0.15);
  }
</style>
