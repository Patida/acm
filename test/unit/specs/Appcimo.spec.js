import Vue from 'vue'
import Appcimo from '@/components/Appcimo.vue'


describe('Appcimo', () => {
  const Constructor = Vue.extend(Appcimo)
  const vm = new Constructor().$mount()

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('#title').textContent)
      .to.equal('AppCiMo')
  })

  it('Car Adreess Moking work', () => {
    var mocking = {route : "Greifswalder Str."}
    vm.mockCarAddress(mocking)
    expect(vm.car2go.address).to.equal("Greifswalder Str. 5, Berlin")
    })

  it('Message works', () => {
    expect(vm.msg).to.equal("Please enter your location and destination.")
  })

  it('Subline works', () => {
    expect(vm.subline).to.equal("Application for City Movement")
  })

  it('Headline works', () => {
    expect(vm.headline).to.equal("AppCiMo")
  })

})

