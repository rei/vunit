import { shallowMount } from '@vue/test-utils'
import Test from '@src/components/Test.vue'

describe('List.vue', () => {
  it('Renders Test component', () => {
    const wrapper = shallowMount(Test, {
      propsData: { }
    })
    expect(wrapper.findAll('h1')).toHaveLength(1);
    console.log(wrapper.findAll('h1').at(0).html());
  })
})
