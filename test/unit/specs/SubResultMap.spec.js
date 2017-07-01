import Vue from 'vue'
import SubResultMap from '@/components/SubResultMap.vue'

describe('SubResultMap', () => {

  it('Total works', () => {
    const Constructor = Vue.extend(SubResultMap)
    const vm = new Constructor().$mount()
    expect(vm.total).to.equal('')
  })

  it('isCarSearch works', () => {
    const Constructor = Vue.extend(SubResultMap)
    const vm = new Constructor().$mount()
    expect(vm.isCarSearch).to.equal(false)
  })

  it('isTrainSearch works', () => {
    const Constructor = Vue.extend(SubResultMap)
    const vm = new Constructor().$mount()
    expect(vm.isTrainSearch).to.equal(false)
  })

})
