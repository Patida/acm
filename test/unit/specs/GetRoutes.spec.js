import Vue from 'vue'
import GetRoutes from '@/business/GetRoutes.vue'
const testShortWaysOutput = [
  {
    transportmethod: 'DRIVING',
    distance: 1000,
    duration: 200,
    start:'20:00',
    finish: '22:00'
  }
];

describe('GetRoutes', () => {
  const Constructor = Vue.extend(GetRoutes)
  const vm = new Constructor().$mount()

  it('Price works', () => {
    var mocking = vm.price(testShortWaysOutput)
    expect(mocking).to.equal("2.00 €")
  })

  it('Duration at mounting works', () => {
    expect(vm.shortView.duration).to.equal(0)
  })

  it('function duration work', () => {
    var mocking = vm.duration(testShortWaysOutput)
    expect(mocking).to.equal("07:20min")
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


  /*it('sets the correct default data', () => {
   expect(typeof GetRoutes.price).toBe('function')
   const vm = GetRoutes.price
   if (that.shortWaysOutput[0].transportmethod == "TRANSIT") {
   expect(vm.price).to.equal('2.70')
   }
   else if (that.shortWaysOutput[0].transportmethod == "BICYCLING") {
   expect(vm.price).to.equal()
   }
   else {
   var duration = 0;
   for (var i = 0; i < that.shortWaysOutput.length; i++) {
   duration += that.shortWaysOutput[i].duration;
   }
   expect(vm.price).to.equal((Math.ceil((duration + 240) / 60) * 0.25).toFixed(2) + " €")
   }
   })
   */
})
