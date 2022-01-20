// 注意此值要与 postcss.config.js 文件中的 rootValue保持一致
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 375宽的缩放比例，可根据自己需要修改,一般设计稿都是宽750(图方便可以拿到设计图后改过来)。
  const { clientWidth } = document.documentElement
  const baseSize = 37.5
  const scale = clientWidth / 375
  let fontSize = Math.max(baseSize * Math.min(scale, 2), 12)
  document.documentElement.style.fontSize = fontSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = setRem
