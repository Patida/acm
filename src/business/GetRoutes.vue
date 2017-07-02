<template>
  <div>
    <ResultView
      :shortView="shortView"
      :directionRouteMap="directionRouteMap"
      :directionRouteDescription="directionRouteDescription"
      :counter = "shortView"
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
      counter: '',
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
          duration: 0,
          price: 0
        }

      }
    },
    mounted: function () {
      this.getRoutes();
    },
    methods: {

      /*
      1. Reset the arrays shortWaysOutput and directionRouteDescription.
      2. Create a promises array and push every google api route call in it.
      3. After every route is returned by google by using the getRoute function, the sorting out and storing of every route is started.
      4. When step 3 is finished the shortView-calculations start.
      */
      getRoutes: function() {
        var that = this;
        that.shortWaysOutput = null;
        that.directionRouteDescription = null;
        that.shortWaysOutput = [];
        that.directionRouteDescription = [];
        var promises = [];

        for (var i = 0; i < that.options.length; i++) {
          promises.push(that.GoogleRouteQuery(that.options[i]));
        }
        that.getRoute(promises).then(function (results) {
            for (var j = 0; j < results.length; j++) {
              that.shortWaysOutput.push(that.getShortinfo(results[j],that.options[j]));

              if(results[j].geocoded_waypoints.length == 2) {
                that.directionRouteDescription.push(results[j]);
              }
              if (results[j].geocoded_waypoints.length > 2 || that.options[j].travelMode == "BICYCLING" || that.options[j].travelMode == "TRANSIT") {
                that.directionRouteMap = results[j];
              }
            }
        }).then(function() {
          that.shortView.transport = that.transportmethod(that.shortWaysOutput[0].transportmethod);
          that.shortView.start = that.start(that.shortWaysOutput);
          that.shortView.end = that.end(that.shortWaysOutput);
          that.shortView.duration = that.duration(that.shortWaysOutput);
          that.shortView.price = that.price(that.shortWaysOutput);
        })
      },

      /*
      Returns a Promise.all result for the amount of promises which are given here with the parameter "promises"
      This function is needed to handle the asynchronous behavior of multiple google javascript api calls.
      Promise.all waits for every async promise and returns the results of all given promises in an array.
      It is needed and used in the getRoutes function to wait with the start of the calculations until every route is returned from google.
      */
      getRoute: function (promises) {
        return Promise.all(promises);
      },

      /*
      Asynchronous access to the google javascript API to get the routes.
      It returns a promise to handle the async behavior.
      */
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

      /*
      returns the values to calculate the shortView values as a Json object.
      ...
      */
      getShortinfo: function(googleResult) {
        if (googleResult.geocoded_waypoints.length == 2) {
          var Ankuftszeit = null;
          var Startzeit = null;

          if (googleResult.routes[0].legs[0].departure_time) {
            Startzeit = googleResult.routes[0].legs[0].departure_time.text;
            Ankuftszeit = googleResult.routes[0].legs[0].arrival_time.text;
          }
          else {
            var Zeit = new Date();
            Startzeit = Zeit.toLocaleString('de-DE').substring(10, 15);
            Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime() + googleResult.routes[0].legs[0].duration.value * 1000));
            Ankuftszeit = Ankuftszeit.toLocaleString('de-DE').substring(10, 15);
          }
          return {
            transportmethod: googleResult.request.travelMode,
            distance: googleResult.routes[0].legs[0].distance.value,
            duration: googleResult.routes[0].legs[0].duration.value,
            start: Startzeit,
            finish: Ankuftszeit
          };
        }
        else {
          return {
            transportmethod: googleResult.request.travelMode,
            distance: 0,
            duration: 0,
            start:'',
            finish: ''
          };
        }
      },

      /*
      Returns the google results for SubResultDescription to display the route description.
      We sort out the waypoint result because the description would be wrong for the route by feet.
      */
      getDescription: function(googleResult, options) {
        if (googleResult.geocoded_waypoints.length == 2) {
          return googleResult;
        }
      },

      /*
      Sort out the results to display the map within the detailed results at SubResultMap.vue.
      For carsharing we only use the result with the extra waypoint to display also the way by feet to the car.
      */
      getMap: function(googleResult, options) {
        if (options.travelMode != "WALKING") {
          if (googleResult.geocoded_waypoints.length > 2 || options.travelMode == "BICYCLING" || options.travelMode == "TRANSIT") {
            return googleResult;
          }
        }
      },

      /*
      Returns the tranportmethod in a better understandable format than the google results.
      */
      transportmethod: function(transportsystem) {
        if (transportsystem == "TRANSIT") {
          return "Öffis";
        }
        else if (transportsystem == "BICYCLING") {
          return "Fahrrad";
        }
        else {
          return "Carsharing";
        }

      },

      /*
      Calculation of the duration.
      We sum up all resulted values to get the total duration. For carsharing we add 4 minutes.
      */
      duration: function(shortWaysOutput) {
        var time = 0;
        for (var i = 0;i < shortWaysOutput.length;i++) {
          if (shortWaysOutput[i].transportmethod == "DRIVING" && shortWaysOutput[i].duration != 0) {
            time = time + 240;
          }
          time = time + shortWaysOutput[i].duration
        }

        return (time-(time%=60))/60+(9<time?':':':0')+time + 'min';
      },

      /*
      Returns the departure time.
      For the carsharing option we sort out the map-only-result value by comparing the values of the array and use the latest.
      */
      start: function(shortWaysOutput) {
        var starttime = shortWaysOutput[0].start;
        for (var k = 0; k < shortWaysOutput.length; k++) {
            if ( starttime < shortWaysOutput[k].start) {
                starttime = shortWaysOutput[k].start;
            }
        }
        return starttime;
      },

      /*
      Within the end function we calculate the arrival time.
      The calculation is only needed for the carsharing. If the route is transit or bicycling the value is directly returned.
      If the route is carsharing we sum up the results and add 4 minutes extra.
      */
      end: function(shortWaysOutput) {
        var that = this;
        var Zeit = new Date();
        if (shortWaysOutput[0].transportmethod == "DRIVING" || shortWaysOutput[0].transportmethod =="WALKING") {
          var calcDuration = 240;
          for (var i = 0; i < shortWaysOutput.length; i++) {
            calcDuration = calcDuration + shortWaysOutput[i].duration;
          }
          var Finishtime = (new Date(Zeit.setTime(Zeit.getTime() + calcDuration*1000))).toLocaleString('de-DE').substring(10, 15);
        }
        else {
           var Finishtime =  shortWaysOutput[0].finish;
        }
        return Finishtime;

      },

      /*
      Calculate the price for the trip
      At the moment the public transport price is fixed.
      We add 4 minutes for the carsharing result, because of the search for a parking lot and the configurations before the driving-start.
      */
      price: function(shortWaysOutput) {
        if (shortWaysOutput[0].transportmethod == "TRANSIT") {
          return "2,70 €";
        }
        else if (shortWaysOutput[0].transportmethod == "BICYCLING") {
          return "Its free and healty!";
        }
        else {
          var duration = 0;
          for (var i = 0; i < shortWaysOutput.length; i++) {
              duration += shortWaysOutput[i].duration;
          }
          return (Math.ceil((duration + 240) / 60) * 0.25).toFixed(2) + " €";

        }
      }

    },
    // Watcher to listen on changed options data. The counter is used to trigger this options change in Appcimo.vue.
      watch: {
        'counter'(counter) {
          this.getRoutes();
        }
      }
  }
</script>
