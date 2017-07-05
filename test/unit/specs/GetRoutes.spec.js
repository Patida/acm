import Vue from 'vue'
import GetRoutes from '@/business/GetRoutes.vue'
const testShortWaysOutputDriving = [
  {
    transportmethod: 'DRIVING',
    distance: 1000,
    duration: 200,
    start:'20:00',
    finish: '22:00'
  }
];

const googleResult = {
  geocoded_waypoints: ['',''],
  request: {
    travelMode: 'TRANSIT'
  },
  routes: [{
    legs: [{
      departure_time: {
        text: '20:00 Uhr'
      },
      arrival_time: {
        text: '22:00 Uhr'
      },
      distance: {
        value: '1000'
      },
      duration: {
        value: '200'
      }
    }]
  }]
};

describe('GetRoutes', () => {
  const Constructor = Vue.extend(GetRoutes)
  const vm = new Constructor().$mount()

  it('shortView works', () => {
    var expectvar = {
      transportmethod: 'TRANSIT',
      distance: '1000',
      duration: '200',
      start:'20:00 Uhr',
      finish: '22:00 Uhr'
    }
    var mocking = vm.getShortinfo(googleResult)
    expect(mocking.distance).to.equal(expectvar.distance)
    expect(mocking.duration).to.equal(expectvar.duration)
    expect(mocking.start).to.equal(expectvar.start)
    expect(mocking.finish).to.equal(expectvar.finish)
  })

  it('Start works', () => {
    var mocking = vm.start(testShortWaysOutputDriving)
      expect(mocking).to.equal("20:00")
    })

  it('Price works', () => {
    var mocking = vm.price(testShortWaysOutputDriving)
    expect(mocking).to.equal("2.00 €")
  })

  it('Duration at mounting works', () => {
    expect(vm.shortView.duration).to.equal(0)
  })

  it('function duration work', () => {
    var mocking = vm.duration(testShortWaysOutputDriving)
    expect(mocking).to.equal("7:20min")
  })

  it('function transportmethod works for DRIVING', () => {
    var mocking = vm.transportmethod("DRIVING")
    expect(mocking).to.equal("Carsharing")
    })

  it('function transportmethod works for WALKING', () => {
    var mocking = vm.transportmethod("WALKING")
    expect(mocking).to.equal("Carsharing")
  })

  it('function transportmethod works for TRANSIT', () => {
    var mocking = vm.transportmethod("TRANSIT")
    expect(mocking).to.equal("Öffis")
  })

  it('function transportmethod works for BICYCLING', () => {
    var mocking = vm.transportmethod("BICYCLING")
    expect(mocking).to.equal("Fahrrad")
  })

})
