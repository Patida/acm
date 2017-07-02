import Vue from 'vue'
import SubResultDescription from '@/components/SubResultDescription.vue'

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
