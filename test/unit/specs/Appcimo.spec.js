import Vue from 'vue'
import Appcimo from '@/components/Appcimo.vue'

describe('Appcimo', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#title').textContent)
      .to.equal('AppCiMo')
  })

  it('Should just work', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    var mocking = {route : "Greifswalder Str."}
    vm.mockCarAddress(mocking)
    expect(vm.car2go.address).to.equal("Greifswalder Str. 5, Berlin")
    })

  it('Should not work', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    var mocking = {route : "Greifswalder Str."}
    vm.mockCarAddress(mocking)
    expect(vm.car2go.address).to.equal("Greifswalder Str. 10, Berlin")
  })
})

