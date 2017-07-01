<template>
  <div>
    <div class="resultBar">
      <button v-on:click="showDrive = !showDrive">
        <img src="../assets/downarrow.png" height="20" width="15">
      </button>
      <span class="shortinfo" id="transport"> {{ shortView.transport }}</span>
      <span class="shortinfo" id="start">{{ shortView.start }}</span>
      <span class="shortinfo">{{ shortView.end }}</span>
      <span class="shortinfo" id="duration">{{ shortView.duration }}</span>
      <span class="shortinfo" id="price">{{ shortView.price }}</span>
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
      shortView: '',
      directionRouteMap: '',
      directionRouteDescription: '',
      counter: 0
    },
    data() {
      return {
        showDrive: false
      }
    },
    methods: {
      resetDetails: function() {
          this.showDrive = !this.showDrive;
      }
    },
    watcher: {
      'shortView'(shortView) {
        this.resetDetails();
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
