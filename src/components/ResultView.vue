<template>
  <div>


    <div class="resultBar">
      <button v-on:click="showDrive = !showDrive">
        <img src="../assets/downarrow.png" height="20" width="15">
      </button>
      <span class="shortinfo" id="transport"> {{ transportmethod(shortWaysOutput) }}</span>
      <span class="shortinfo" id="start">{{ start(shortWaysOutput) }}</span>
      <span class="shortinfo">{{ end(shortWaysOutput) }}</span>
      <span class="shortinfo" id="duration">{{ duration(shortWaysOutput) }}</span>
      <span class="shortinfo" id="price">{{ price(shortWaysOutput) }}</span>
    </div>

    <!-- TRANSITION TABS-->
    <div id="demo">
      <transition name="fade">
        <div v-if="showDrive">

          <md-tabs md-fixed class="tabs">
            <md-tab id="Zusammenfassung" md-label="Zusammenfassung">
              <SubResultDescription
                :description="directionRouteDescription"
              ></SubResultDescription>
            </md-tab>

            <md-tab id="Map" md-label="Map">
              <SubResultMap
                :directionRouteMap="directionRouteMap"
              ></SubResultMap>
            </md-tab>
          </md-tabs>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  import SubResultMap from './SubResultMap.vue';
  import SubResultDescription from './SubResultDescription.vue';

  export default {
    components: {
      SubResultMap,
      SubResultDescription,
    },
    name: "ResultView",
    props: {
      shortWaysOutput: {
          type: Array,
          required: true
      },
      directionRouteMap: {
          required: true
      },
      directionRouteDescription: {
          type: Array,
          required: true
      },
    },
    data() {
        return {
          showDrive: '',
        }
    },
    computed: {
      transportmethod: function(Way) {
        var that = this;
        if (Way[0].transportmethod == "DRIVING") {
          return "Carsharing";
        }
        else if (Way[0].transportmethod == "TRANSIT") {
          return "Öffis";
        }
        else if (Way[0].transportmethod == "BICYCLING") {
          return "Fahrrad"
        }
        else {
          return "Carsharing"
        }
      },
      duration: function(Way) {
        var that = this;
        var time = 0;

        for (var i = 0;i < Way.length;i++) {
          if (Way[i].transportmethod == "DRIVING") {
            time = time + 240;
          }
          time = time + Way[i].duration
        }
        return (time-(time%=60))/60+(9<time?':':':0')+time + 'min';
      },
      start: function(Way) {
         return Way[0].start;
      },
      end: function(Way) {
        if (Way[0].transportmethod == "DRIVING") {
          var Zeit = new Date();
          var Finishtime = (new Date(Zeit.setTime(Zeit.getTime() + time))).toLocaleString('de-DE').substring(11,160)
          return Finishtime;
        }
        else {
          return Way[0].finish;
        }
      },

      getPrice: function(Way) {
          var that = this;

          if (Way[0].transportmethod == "TRANSIT") {
              that.price = "2,70 €"
          }
          else if (Way[0].transportmethod == "BICYCLING") {
              that.price = "Its free and healty!"
          }
          else {
            var duration = 0;
            for (var i = 0; i < Way.length; i++) {
              duration += Way[i].duration;
            }
            that.price = (Math.ceil((duration + 240) / 60) * 0.25).toFixed(2) + " €";
          }
      }
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
    text-align: left;
    margin-left: 10%;
    width: 80%;
    height: 50px;
    background-color: rgba(79,147,248,0.3);
    border-radius: 10px;
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
    margin-bottom: 5px;
    width: 80%;
    background-color: rgba(0,0,0,0.15);
    border-radius: 10px;
  }

  #transport {
    margin-left: 5px;
  }

  #start {
    margin-left: 39px;
  }
  #duration {
    margin-right: 100px;
  }

  #price {
  }

  .shortinfo {
    width: 120px;
    height: 50px;
    display: inline-block;
    text-align: center;
    background-color: lightgrey;
    padding-top: 5px
  }
</style>
