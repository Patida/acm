<template>
  <ResultView
    :shortWaysOutput="shortWaysOutput"
    :directionRouteMap="directionRouteMap"
    :directionRouteDescription="directionRouteDescription"
    :showDrive="false"
  >
  </ResultView>
</template>
<script>
  import ResultView from './ResultView.vue';
  import DirectionService from './SubResultMap.vue';

  export default {
      name: 'GetRoutes',
      props: {
        options: '',
      },
    components: {
      ResultView
    },
    data () {
          return {
              directionRouteDescription: [],
              directionRouteMap: '',
              shortWaysOutput: [],
          }
    },
    mounted: function() {
      this.getRoutes(this.options);
    },
    methods: {
      getRoutes: function(options) {
        this.shortWaysOutput = null;
        this.directionRouteDescription = null;
        this.shortWaysOutput = [];
        this.directionRouteDescription = [];
        for (var i = 0; i < this.options.length; i++) {
          this.getRoute(options[i]);
        }
      },

      getRoute: function (options) {
        var that = this;
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(options, function (result, status) {
          if (status == 'OK') {
            var resultarray;
            if (options.travelMode != "WALKING") {
              if ((options.travelMode == "DRIVING" && options.waypoints)|| options.travelMode == "BICYCLING" || options.travelMode == "TRANSIT") {
                that.directionRouteMap = result;

              }
            }
            if (result.routes[0].legs[0].departure_time) {
              resultarray = {
                transportmethod: options.travelMode,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.value,
                start: result.routes[0].legs[0].departure_time.text,
                finish: result.routes[0].legs[0].arrival_time.text,
              };
            }
            else {

              var Zeit = new Date();
              var Startzeit = Zeit.toLocaleString('de-DE').substring(11,16);
              var Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime() + result.routes[0].legs[0].duration.value * 1000));
              Ankuftszeit = Ankuftszeit.toLocaleString('de-DE').substring(11,160);
              resultarray = {
                transportmethod: options.travelMode,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.value,
                start: Startzeit,
                finish: Ankuftszeit,
              };
            }
            if ((options.travelMode == "DRIVING" && !options.waypoints) || options.travelMode != "DRIVING")  {
              that.directionRouteDescription.push(result);
              that.shortWaysOutput.push(resultarray);
            }
          }
        });
      }

    },
    watch: {
         'options'(options) {
            this.getRoutes(this.options);
         }
    }
  }
</script>
