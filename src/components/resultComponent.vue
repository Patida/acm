<template>
  <div>


    <div class="resultBar">
      <button v-on:click="showDrive = !showDrive">
        <img src="../assets/downarrow.png" height="20" width="15">
      </button>
      <span class="shortinfo" id="transport"> {{ transportSystem() }}</span>
     <span class="shortInfo" id="Start">{{ start() }}</span>
      <span class="shortInfo">{{ end() }}</span>
      <span class="shortInfo" id="duration">{{ duration() }}</span>

      </div>

    <!-- TRANSITION TABS-->
    <div id="demo">
      <transition name="fade">
        <div v-if="showDrive">

          <md-tabs md-fixed class="tabs">
            <md-tab id="Zusammenfgassung" md-label="Zusammenfassung">
              <RouteDescription
                :description="completeRoute"
                :descriptionCar="shortRouteCar"
                :descriptionWalk="walkRoute"
              ></RouteDescription>
            </md-tab>

          <md-tab id="Map" md-label="Map">
            <DirectionService
              :directionRoute="completeRoute"
            ></DirectionService>
          </md-tab>

          <md-tab id="Preis" md-label="Preis">
            <prices
              :carData = "shortRoute"
            >
          </prices>
          </md-tab>

          </md-tabs>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  import DirectionService from './DirectionService.vue';
  import RouteDescription from './RouteDescription.vue';
  import prices from './prices.vue';

  export default {
    components: {
      DirectionService,
      RouteDescription,
      prices,
    },
    name: "resultComponent",
    props: {
      shortRoute: '',
      shortRouteSecond: '',
      completeRoute: '',
      shortRouteCar: '',
      walkRoute: '',
      showDrive: ''
    },

    methods: {
      transportSystem: function() {
        var that = this;

          if (that.shortRoute.transportmethod == "DRIVING") {
            return "Carsharing";
          }
          else if (that.shortRoute.transportmethod == "TRANSIT") {
            return "Öffis";
          }
          else if (that.shortRoute.transportmethod == "BICYCLING") {
            return "Fahrrad"
          }
          else {

        }
      },
      duration: function() {
        var that = this;
        var time = 0;
        for (var i = 0;i < that.shortRoute.length;i++) {
            time = time + that.shortRoute[i].duration
        }
        return (time-(time%=60))/60+(9<time?':':':0')+time + 'min';
      },
     /* distance: function() {
        var that = this;
        if (that.shortRoute[0].transportmethod == "DRIVING") {
          return that.shortRoute.distance + that.shortRouteSecond.distance;
        }
        else if (that.shortRoute[0].transportmethod == "TRANSIT") {
          return that.shortRoute.distance;
        }
        else {}
      },*/
      start: function() {
        var that = this;
        if (that.shortRoute.transportmethod == "DRIVING") {
          return that.shortRouteSecond.start;
        }
        else {
          return that.shortRoute.start;
        }
      },
      end: function() {
        var that = this;
        if (that.shortRoute.transportmethod == "DRIVING") {
          var Zeit = new Date();
          var time = (that.shortRoute.duration + that.shortRouteSecond.duration) * 1000;
          var Finishtime = new Date(Zeit.setTime(Zeit.getTime() + time));
          var Finishtime = Finishtime.getHours() + ":" + Finishtime.getMinutes();
          return Finishtime;
        }
        else {
          return that.shortRoute.finish;
        }
      }
    },

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
    text-align: left;
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

  #transport {
    margin-left: 2%;
    width: 100px;
  }

  #Start {
    margin-left: 5%;
  }
  #duration {
    margin-right: 100px;
  }
</style>
