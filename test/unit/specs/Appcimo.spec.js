import Vue from 'vue'
import Appcimo from '@/components/Appcimo.vue'


describe('Appcimo', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#title').textContent)
      .to.equal('AppCiMo')
  })

  it('Car Adreess Moking work', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    var mocking = {route : "Greifswalder Str."}
    vm.mockCarAddress(mocking)
    expect(vm.car2go.address).to.equal("Greifswalder Str. 5, Berlin")
    })

  it('Car Adress Mocking doesnt work', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    var mocking = {route : "Greifswalder Str."}
    vm.mockCarAddress(mocking)
    expect(vm.car2go.address).to.equal("Greifswalder Str. 10, Berlin")
  })

  it('Message works', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.msg).to.equal("Please enter your location and destination.")
  })

  it('Subline works', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.subline).to.equal("Application for City Movement")
  })

  it('Headline works', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.headline).to.equal("AppCiMo")
  })

})

