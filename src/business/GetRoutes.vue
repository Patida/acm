<template>
  <div>
    <ResultView
      :shortView="shortView"
      :directionRouteMap="directionRouteMap"
      :directionRouteDescription="directionRouteDescription"
      :showDrive="false"
    >
    </ResultView>
  </div>
</template>
<script>
  import ResultView from '../components/ResultView.vue';
  var Promise = require('promise');

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
        RouteCalcOperation: false,
        shortView: {
          transport: '',
          start: '',
          end: '',
          duration: '',
          price: ''
        }

      }
    },
    mounted: function () {
      this.getRoutes();
    },
    methods: {

      getRoutes: function() {
        var that = this;
        that.shortWaysOutput = null;
        that.shortWaysOutput = [];
        that.directionRouteDescription = [];
        var promises= [];

        for (var i = 0; i < that.options.length; i++) {
          promises.push(that.GoogleRouteQuery(that.options[i]));
        }
        that.getRoute(promises).then(function (results) {
            for (var j = 0; j < results.length; j++) {
              that.shortWaysOutput.push(that.getShortinfo(results[j],that.options[j]));
              if(results[j].geocoded_waypoints.length == 2) {
                that.directionRouteDescription.push(that.getDescription(results[j], that.options[j]));
              }
              if (results[j].geocoded_waypoints.length > 2 || that.options[j].travelMode == "BICYCLING" || that.options[j].travelMode == "TRANSIT") {
                that.directionRouteMap = that.getMap(results[j], that.options[j]);
              }
            }
        }).then(function() {
          that.shortView.transport = that.transportmethod();
          that.shortView.start = that.start();
          that.shortView.end = that.end();
          that.shortView.duration = that.duration();
          that.shortView.price = that.price();
        })
      },

      getRoute: function (promises) {
        return Promise.all(promises);
      },
      GoogleRouteQuery: function(options) {
        var directionsService = new google.maps.DirectionsService();
        return new Promise(function (resolve, reject) {
          directionsService.route(options, function (result, status) {
            if (status == 'OK') {
              resolve(result);
            }
            else {
              reject(status);
            }
          });
        });
      },

      getShortinfo: function(googleResult) {
        if (googleResult.request.travelMode != "DRIVING" || (googleResult.request.travelMode == "DRIVING" && googleResult.request.waypoints != undefined)) {
          var Ankuftszeit;
          var Startzeit;

          if (googleResult.routes[0].legs[0].departure_time) {
            Startzeit = googleResult.routes[0].legs[0].departure_time.text;
            Ankuftszeit = googleResult.routes[0].legs[0].arrival_time.text;
          }
          else {
            var Zeit = new Date();
            Startzeit = Zeit.toLocaleString('de-DE').substring(11, 16);
            Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime() + googleResult.routes[0].legs[0].duration.value * 1000));
            Ankuftszeit = Ankuftszeit.toLocaleString('de-DE').substring(11, 16);
          }

          return {
            transportmethod: googleResult.request.travelMode,
            distance: googleResult.routes[0].legs[0].distance.value,
            duration: googleResult.routes[0].legs[0].duration.value,
            start: Startzeit,
            finish: Ankuftszeit,
          };
        }
        else {
          return {
            transportmethod: googleResult.request.travelMode,
            distance: 0,
            duration: 0,
            start:'',
            finish: '',
          };
        }
      },

      getDescription: function(googleResult, options) {
        if ((options.travelMode == "DRIVING" && googleResult.geocoded_waypoints.length == 2) || options.travelMode != "DRIVING") {
          return googleResult;
        }
      },

      getMap: function(googleResult, options) {
        if (options.travelMode != "WALKING") {
          if ((options.travelMode == "DRIVING" && googleResult.geocoded_waypoints.length > 2) || options.travelMode == "BICYCLING" || options.travelMode == "TRANSIT") {
              console.log(googleResult)
            return googleResult;
          }
        }
      },
      transportmethod: function() {
        var that = this;

        if (that.shortWaysOutput[0].transportmethod == "TRANSIT") {
          return "Öffis";
        }
        else if (that.shortWaysOutput[0].transportmethod == "BICYCLING") {
          return "Fahrrad"
        }
        else {
          return "Carsharing"
        }

      },
      duration: function() {
        var that = this;
        var time = 0;
        for (var i = 0;i < that.shortWaysOutput.length;i++) {
          if (that.shortWaysOutput[i].transportmethod == "DRIVING") {
            time = time + 240;
          }
          time = time + that.shortWaysOutput[i].duration

        }

        return (time-(time%=60))/60+(9<time?':':':0')+time + 'min';
      },
      start: function() {
        var that = this;
        var starttime = that.shortWaysOutput[0].start;
        for (var k = 0; k < that.shortWaysOutput.length; k++) {
            if ( starttime < that.shortWaysOutput[k].start) {
                starttime = that.shortWaysOutput[k].start;
            }
        }
        return starttime;
      },
      end: function() {
        var that = this;
        if (that.shortWaysOutput[0].transportmethod == "DRIVING") {
          var Zeit = new Date();
          var Finishtime = (new Date(Zeit.setTime(Zeit.getTime() + 1))).toLocaleString('de-DE').substring(11, 160)
          return Finishtime;
        }
        else {
          return that.shortWaysOutput[0].finish;
        }

      },

      price: function() {
        var that = this;
        if (that.shortWaysOutput[0].transportmethod == "TRANSIT") {
          return "2,70 €";
        }
        else if (that.shortWaysOutput[0].transportmethod == "BICYCLING") {
          return "Its free and healty!";
        }
        else {
          var duration = 0;
          for (var i = 0; i < that.shortWaysOutput.length; i++) {
              duration += that.shortWaysOutput[i].duration;
          }
          return (Math.ceil((duration + 240) / 60) * 0.25).toFixed(2) + " €";

        }
      }

    },
      watch: {
        'options'(options) {
          this.getRoutes();
        }
      }
  }
</script>
