import Vue from 'vue'
import SubResultMap from '@/components/SubResultMap.vue'

describe('SubResultMap', () => {
  const Constructor = Vue.extend(SubResultMap)
  const vm = new Constructor().$mount()
  it('Total works', () => {
    expect(vm.total).to.equal('')
  })

  it('isCarSearch works', () => {
    expect(vm.isCarSearch).to.equal(false)
  })

  it('isTrainSearch works', () => {
    expect(vm.isTrainSearch).to.equal(false)
  })

})
