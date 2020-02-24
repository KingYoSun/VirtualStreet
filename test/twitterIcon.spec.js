import { mount } from '@vue/test-utils'
import TwitterIcon from '~/components/parts/twitterIcon.vue'

describe('TwitterIcon', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(TwitterIcon)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})