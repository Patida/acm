import Vue from 'vue'
import SubResultDescription from '@/components/SubResultDescription.vue'

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
describe('SubResultDescription', () => {
  const Constructor = Vue.extend(SubResultDescription)
  const vm = new Constructor().$mount()
  it('Total works', () => {
    expect(vm.total).to.equal('')
  })

  it('WayDescriptor works', () => {
    expect(vm.WayDescriptor).to.equal('')
  })
  
})
