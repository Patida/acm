/**
 * Created by Daniel on 20.06.2017.
 */
var Promise = require('promise');
module.exports = {

  mockCarAddress: function (originCar) {
    return originCar.route + " 5, Berlin";
  },


  getCarLocation: function (Street) {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function (resolve, reject) {
      geocoder.geocode({'address': Street}, function (results, status) { // called asynchronously
        if (status == google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  },


  createCar: function (latlng, Street) {
    return {
      address: Street,
      coordinates: {latitude: latlng[0].geometry.location.lat(), longitude: latlng[0].geometry.location.lng()},
      engineType: 'CE',
      exterior: 'GOOD',
      fuel: 100,
      interior: 'GOOD',
      name: '123456',
      vin: 'WMEEJ3BA8DK643640'
    };
  }
}
