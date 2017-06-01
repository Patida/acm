<template>
  <div>


  </div>
</template>

<script>
  export default {
    name: "directions",

    props: {
      origin: '',
      destination: '',
      directionsSearch: null,
      directionsSearchText: ''
    },

    data: function () {
      return {
        /**
         * The Autocomplete object.
         *
         * @type {Autocomplete}
         * @link https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
         */
        directionsSearch: null,

        /**
         * Autocomplete input text
         * @type {String}
         */
        directionsSearchText: '',
      }
    },

    methods: {
      onclick: function() {
      },

      getRoute: function() {
          this.directionsSearch = new google.maps.DirectionsService();

          var request = {
            origin: {lat: this.origin.latitude, lng:  this.origin.longitude},
            destination: {lat: this.destination.latitude, lng: this.destination.longitude},
            travelMode: transport
          }

          let Route = directionsService.route(request, function(result, status) {
          let returnData = {};
          returnData['Way'] = Route;
          this.$emit(returndata);
          });


      }
    }
  }

</script>
