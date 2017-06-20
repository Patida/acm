/**
 * Created by Daniel on 20.06.2017.
 */
module.exports = {

    mockCarAddress: function (originCar)
  {
    return originCar.route + " 5, Berlin";
  },

   getCarLocation: function(Street) {
    var carAddress = Street.route + " 5, Berlin"
    var geocoder = new google.maps.Geocoder();
    var loc = {
      latitude: '',
      longitude: ''
    };
    geocoder.geocode({'address': carAddress}, function (results, status) {
      if (status == 'OK') {
        loc.latitude = results[0].geometry.location.lat();
        loc.longitude = results[0].geometry.location.lng();
      }
    });

  },
   createCar: function(latlng, Street) {
    return {
      address: Street,
      coordinates: latlng,
      engineType: 'CE',
      exterior: 'GOOD',
      fuel: 100,
      interior: 'GOOD',
      name: '123456',
      vin: 'WMEEJ3BA8DK643640'
    };
  }
}

