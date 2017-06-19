import Vue from 'vue'
import Appcimo from '@/components/Appcimo'

describe('Appcimo.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Appcimo)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#title').textContent)
      .to.equal('AppCiMo')
  })




})

