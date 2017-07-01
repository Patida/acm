import Vue from 'vue'
import SubResultDescription from '@/components/SubResultDescription.vue'

describe('SubResultDescription', () => {

  it('Total works', () => {
    const Constructor = Vue.extend(SubResultDescription)
    const vm = new Constructor().$mount()
    expect(vm.total).to.equal('')
  })

  it('WayDescriptor works', () => {
    const Constructor = Vue.extend(SubResultDescription)
    const vm = new Constructor().$mount()
    expect(vm.WayDescriptor).to.equal('')
  })

})
