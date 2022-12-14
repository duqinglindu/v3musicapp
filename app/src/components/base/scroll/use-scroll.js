import BScroll from '@better-scroll/core'
// 监控dom 内容的改变
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })

    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    if(scroll.value) {
      scroll.value.enable()
    scroll.value.refresh()
    }
  })

  onDeactivated(() => {
    if(scroll.value) {
      scroll.value.disable()
    }
  })

  return scroll
}
