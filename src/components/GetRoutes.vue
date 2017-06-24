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
  const RouteOperations = require('../business/RouteOperations.js');

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
        RouteCalcOperation: false

      }
    },
    mounted: function () {
      this.getRoutes();
    },
    methods: {

      getRoutes: function () {
        var that = this;
        var i = 0;
          RouteOperations.GoogleRouteQuery(that.options[i]).then(function (result) {
            that.shortWaysOutput.push(RouteOperations.getShortinfo(result, that.options[i]));
            that.directionRouteDescription.push(RouteOperations.directionRouteDescription(result, that.options[i]));
            that.directionRouteMap = RouteOperations.directionRouteMap(result, that.options[i]);
          });
      },
      watch: {
        'options'(options) {
          this.getRoutes();
        }
      }
    }
  }
</script>
