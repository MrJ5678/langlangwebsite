// 获取滚动范围的对象
let slideWrap = document.getElementById('slide-wrap')
// 获取滚动对象
let slideContent = slideWrap.getElementsByClassName('slide-content')[0]
// 获取图片对象[li, li, li]
let liItem = slideContent.getElementsByTagName('li')
// 获取导航圆点[a, a, a]
let aItem = slideWrap.getElementsByClassName('slide-nav')[0].children
// next按钮
let nextButton = slideWrap.getElementsByClassName('slide-next')[0]
// prev按钮
let prevButton = slideWrap.getElementsByClassName('slide-prev')[0]
// 当前索引
let currentIndex = 0
// 滚动开关标记
let flag = false
// 标记定时器
let flagTimer = null
// 自动播放定时器
let autoTimer = null
// 获取可视区宽度
let viewWidth = document.documentElement.clientWidth || document.body.clientWidth

autoPlay()

nextButton.addEventListener('click', function() {
  if(flag) { return false }
  flag = true
  next()
})

prevButton.addEventListener('click', function() {
  if(flag) { return false }
  flag = true
  prev()
})

// 设置滚动对象的宽度
slideContent.style.width = `${viewWidth * liItem.length}px`
// 设置图片宽度
for (let i = 0; i < liItem.length; i++) {
  liItem[i].style.width = `${viewWidth}px`
}
// 导航圆点单击事件
for (let i = 0; i < aItem.length; i++) {
  aItem[i].addEventListener('click', function() {
    currentIndex = i

    slide(i)
  })
}

slideWrap.addEventListener('mouseenter', function() {
  clearInterval(autoTimer)
})

slideWrap.addEventListener('mouseleave', function() {
  autoPlay()
})

// 自动播放
function autoPlay() {
  autoTimer = setInterval(() => {
    next()
  }, 3000)
}

// next
function next() {
  currentIndex++
  if(currentIndex === aItem.length) { currentIndex = 0 }
  slide(currentIndex)
}

// prev
function prev() {
  currentIndex--
  if(currentIndex < 0) { currentIndex = aItem.length - 1 }
  slide(currentIndex)
}

// 滚动
function slide(index) {
  let left = viewWidth * index
  slideContent.style.left = `-${left}px`
  // 开启定时器
  flagTimer = setTimeout(() => {
    flag = false
    clearTimeout(flagTimer)
  }, 1000)
  toggleHigh()
}

// 圆点白色切换
function toggleHigh() {
  for (let j = 0; j < aItem.length; j++) {
    aItem[j].className = ''
  }
  aItem[currentIndex].className = 'current'
}
