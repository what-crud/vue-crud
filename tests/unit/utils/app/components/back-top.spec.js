import { shallowMount } from '@vue/test-utils'
import BackTop from '@/utils/app/components/BackTop.vue'

describe('BackTop.vue', () => {
  const wrapper = shallowMount(BackTop, {
    stubs: {
      'v-btn': true,
      'v-icon': true,
    },
  })

  it('speed equals 0.1 when props.speed isn\'t specified', () => {
    expect(wrapper.vm.speed).toBe(0.1)
  })
  it('speed equals 0.2 when props.speed equals to 0.2', () => {
    wrapper.setProps({
      speed: 0.2,
    })
    expect(wrapper.vm.speed).toBe(0.2)
  })
  it('has button if top value > 0', () => {
    wrapper.setData({
      top: 200,
    })
    expect(wrapper.contains('v-btn-stub')).toBe(true)
  })
  it('hasn\'t button if top value == 0', () => {
    wrapper.setData({
      top: 0,
    })
    expect(wrapper.contains('v-btn-stub')).toBe(false)
  })
})
