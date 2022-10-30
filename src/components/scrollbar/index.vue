<template>
  <div class="scrollbar-wrapper" ref="scrollbarWrapper" @mouseenter="showScrollbar" @mouseleave="hideScrollbar">
    <div class="scrollbar-view" @scroll="handleScroll" ref="scrollbarView">
      <slot></slot>
    </div>
    <Transition name="scrollbar-fade">
      <div class="bar vertical" v-show="verticalThumbState.overflow && (wrapperActive || verticalThumbState.isDragging)"
        :style="`width: ${thumbWidth}px`" @mousedown="handleMouseDown">
        <div class="thumb" ref="verticalThumb"
          :style="`transform: translateY(${scrollY}px); height: ${verticalThumbState.height}px`"></div>
      </div>
    </Transition>
    <Transition name="scrollbar-fade">
      <div class="bar horizontal"
        v-show="horizontalThumbState.overflow && (wrapperActive || horizontalThumbState.isDragging)"
        :style="`height: ${thumbWidth}px`" @mousedown="handleMouseDown">
        <div class="thumb" ref="horizontalThumb"
          :style="`transform: translateX(${scrollX}px); width: ${horizontalThumbState.width}px`"></div>
      </div>
    </Transition>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// 组件暴露 api
defineExpose({
  scrollTo,
  scrollIntoView
})

const verticalThumb = ref<HTMLElement>()    // 垂直滚动条
const horizontalThumb = ref<HTMLElement>()  // 水平滚动条

const scrollbarWrapper = ref<HTMLElement>() // wrapper
const scrollbarView = ref<HTMLElement>()    // 视图

let wrapperActive = ref(false)  // 鼠标是否移入实例，用于控制滚动条的显隐
let wrapperCoord = reactive<{ height: number, width: number, left: number, top: number }>({
  height: 0,
  width: 0,
  top: 0,
  left: 0
})

const thumbWidth = 10           // 滚动条的厚度
let scrollX = ref<number>(0),   // 水平滚动条的偏移量
  scrollY = ref<number>(0)    // 垂直滚动条的偏移量

const verticalThumbState = reactive<{ height: number, maxScrollY: number, isDragging: boolean, overflow: boolean }>({
  height: 0,
  maxScrollY: 0,
  isDragging: false,
  overflow: false
})

const horizontalThumbState = reactive<{ width: number, maxScrollX: number, isDragging: boolean, overflow: boolean }>({
  width: 0,
  maxScrollX: 0,
  isDragging: false,
  overflow: false
})

/**
 * 开始拖拽滚动条
 * https://zh.javascript.info/mouse-drag-and-drop
 * @param event 
 */
function handleMouseDown(event: MouseEvent) {
  const {
    left: wrapperClientLeft,
    top: wrapperClientTop
  } = wrapperCoord

  // 判断是否为点击事件，还是拖动事件
  let isClick = true

  // 判断拖动的滑块是否为垂直滚动条的
  const isVertical = (verticalThumb.value as HTMLElement).contains(event.target as HTMLElement)
  // 拖动的目标元素
  const target = isVertical ?
    verticalThumb.value as HTMLElement :
    horizontalThumb.value as HTMLElement

  // 设置滑块的拖动状态
  verticalThumbState.isDragging = isVertical
  horizontalThumbState.isDragging = !isVertical

  const { left: targetClientLeft, top: targetClientTop } = target.getBoundingClientRect()
  const maxScrollX = horizontalThumbState.maxScrollX,
    maxScrollY = verticalThumbState.maxScrollY

  // 鼠标事件的坐标
  const { clientX: startX, clientY: startY } = event
  // 鼠标事件的坐标 相对于 scrollbar 的滑块左上角的偏移值
  const shift = {
    x: startX - targetClientLeft,
    y: startY - targetClientTop
  }

  moveTo(target, startX, startY)

  // const thottleMouseMoveHandler = throttle(handleMouseMove, 50)

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  /**
   * 处理鼠标移动滑块
   * @param event 
   */
  function handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event
    // 点击事件
    if (isClick && (Math.abs(clientX - startX) >= 3 || Math.abs(clientY - startY) >= 3)) {
      console.log("isn's Click")
      isClick = false
    }
    moveTo(target, clientX, clientY)
  }

  /**
   * 鼠标按键松开，移动滑块结束
   * @param event 
   */
  function handleMouseUp(event: MouseEvent) {
    // 处理点击事件
    if (isClick) handleClickBar(event)
    horizontalThumbState.isDragging = verticalThumbState.isDragging = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  /**
   * 移动滑块
   * @param target 移动的目标滑块 DOM 元素
   * @param x 鼠标当前相对窗口的 x 坐标
   * @param y 鼠标当前相对窗口的 y 坐标
   */
  function moveTo(target: HTMLElement, x: number, y: number) {
    const translateX = isVertical ? 0 : x - wrapperClientLeft - shift.x,
      translateY = isVertical ? y - wrapperClientTop - shift.y : 0

    // translateX 取值在 0 ~ maxScrollX 之间
    // translateY 取值在 0 ~ maxScrollY 之间
    if (target === horizontalThumb.value) scrollX.value = Math.min(Math.max(0, translateX), maxScrollX)
    if (target === verticalThumb.value) scrollY.value = Math.min(Math.max(0, translateY), maxScrollY)

    console.log(scrollX.value, scrollY.value)
    update()
  }
}

/**
 * 处理鼠标滚动事件
 * scroll 事件只有在 overflow: scroll | auto 的状态下才能产生
 * @param event 
 */
function handleScroll(event: UIEvent) {
  const viewDom = scrollbarView.value as HTMLElement
  scrollY.value = viewDom.scrollTop / viewDom.scrollHeight * wrapperCoord.height
  scrollX.value = viewDom.scrollLeft / viewDom.scrollWidth * wrapperCoord.width
}

/**
 * 处理滚动条所在轨道的点击事件
 * @param event 
 */
function handleClickBar(event: MouseEvent) {
  const target = (event.target as HTMLElement).closest('.bar')
  if (!target) return

  const isVertical = target.classList.contains('vertical')
  const { clientX, clientY } = event
  const { top: wrapperClientTop, left: wrapperClientLeft } = wrapperCoord

  if (isVertical) {
    const { height: thumbHeight, maxScrollY } = verticalThumbState
    const translateY = clientY - wrapperClientTop - thumbHeight / 2
    scrollY.value = Math.min(Math.max(0, translateY), maxScrollY)
  } else {
    const { width: thumbWidth, maxScrollX } = horizontalThumbState
    const translateX = clientX - wrapperClientLeft - thumbWidth / 2
    scrollX.value = Math.min(Math.max(0, translateX), maxScrollX)
  }

  update()
}

/**
 * 根据滚动条的偏移更新 view 容器的滚动偏移
 */
function update() {
  const viewDom = scrollbarView.value as HTMLElement

  const barHeight = wrapperCoord.height - thumbWidth,
    barWidth = wrapperCoord.width - thumbWidth

  viewDom.scrollTop = scrollY.value / barHeight * viewDom.scrollHeight
  viewDom.scrollLeft = scrollX.value / barWidth * viewDom.scrollWidth
}

const showScrollbar = () => wrapperActive.value = true,
  hideScrollbar = () => wrapperActive.value = false


function scrollTo(x: number, y: number) {
  const viewDom = scrollbarView.value as HTMLElement
  viewDom.scrollTo({
    top: y,
    left: x,
    behavior: 'smooth'
  })
}

function scrollIntoView(elem: HTMLElement) {
  const wrapDom = scrollbarWrapper.value as HTMLElement
  if (!wrapDom.contains(elem)) return

  const { top, left } = elem.getBoundingClientRect()
  const { top: wrapperClientTop, left: wrapperClientLeft } = wrapperCoord
  scrollTo(left - wrapperClientLeft, top - wrapperClientTop)
}
/**
 * 初始化 scrollbar
 */
function initScrollbar() {
  const wrapperDom = scrollbarWrapper.value as HTMLElement,
    viewDom = scrollbarView.value as HTMLElement

  // 计算滚动条的长度 & 最大偏移量 & 是否溢出
  const { left, top } = wrapperDom.getBoundingClientRect()
  const { clientHeight: height, clientWidth: width } = wrapperDom
  const { scrollHeight, scrollWidth } = viewDom

  wrapperCoord = { left, top, width, height }

  const horizontalThumbWidth = width / scrollWidth * (width - thumbWidth)
  const verticalThumbHeight = height / scrollHeight * (height - thumbWidth)

  verticalThumbState.height = verticalThumbHeight
  verticalThumbState.maxScrollY = height - thumbWidth - verticalThumbHeight
  verticalThumbState.overflow = !(scrollHeight === height)

  horizontalThumbState.width = horizontalThumbWidth
  horizontalThumbState.maxScrollX = width - thumbWidth - horizontalThumbWidth
  horizontalThumbState.overflow = !(scrollWidth === width)
}

onMounted(() => {
  const verticalThumbDom = verticalThumb.value as HTMLElement,
    horizontalThumbDom = horizontalThumb.value as HTMLElement

  // 取消原生 drag 和 select 事件
  // TODO: 还没有取消 bar 的 select 事件
  const cancelEventHandler = () => false
  verticalThumbDom.ondragstart = horizontalThumbDom.ondragstart = cancelEventHandler
  verticalThumbDom.onselectstart = horizontalThumbDom.onselectstart = cancelEventHandler

  // 监听 resize 事件
  window.onresize = initScrollbar

  // 初始化
  initScrollbar()
})

onBeforeUnmount(() => {
  window.onresize = null
})
</script>
<style lang="scss">
.scrollbar-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scrollbar-view {
  position: absolute;
  left: 0;
  top: 0;
  /* 🥺对滚动条无计可施，自暴自弃 */
  height: calc(100% + 17px);
  width: calc(100% + 17px);
  overflow: scroll;
  // 会导致 scrollTop 始终为 0
  // scroll-behavior: smooth;
}

.bar {
  transition: opacity .2s ease-in-out;
  position: absolute;

  &.horizontal {
    width: 100%;
    bottom: 0;
    left: 0;

    .thumb {
      width: 100px;
      height: 100%;
    }
  }

  &.vertical {
    height: 100%;
    right: 0;
    top: 0;

    .thumb {
      width: 100%;
      height: 100px;
    }
  }
}

.thumb {
  position: absolute;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
}

.scrollbar-fade-enter-active,
.scrollbar-fade-leave-active {
  transition: all 0.25s ease;
}

.scrollbar-fade-enter-from,
.scrollbar-fade-leave-to {
  opacity: 0;
}
</style>