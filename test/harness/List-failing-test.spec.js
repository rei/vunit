import { shallowMount } from '@vue/test-utils'
import List from '@src/components/List.vue'

describe('List.vue', () => {
  it('renders li for each item in props.items', () => {
    const items = ['', '']
    const wrapper = shallowMount(List, {
      propsData: { items }
    })
    expect(wrapper.findAll('li')).toHaveLength(items.length + 1) // <-- Make test fail
  })
})
