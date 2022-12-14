// 进行播放总数字格式转换
export function getCount(count) {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}

// 给图片地址拼接上尺寸，从服务器获取合适尺寸图片，进行性能优化
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}y${size}`
}

// 进行时间格式化
export function formatDate(time, fmt) {
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function formatMonthDay(time) {
  return formatDate(time, 'MM月dd日')
}

export function formatMinuteSecond(time) {
  return formatDate(time, 'mm:ss')
}

// 音乐播放器，传入对应id即可进行播放
export function getPlaySong(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

// 判断两个数之间的差值是否小于999
export function numberDiff(arg1, arg2) {
  return Math.abs(arg1 - arg2) < 999
}
// 随机向下取整
export function getRandomNumber(num) {
  return Math.floor(Math.random() * num)
}

// 进行歌词格式转化
// line: [00:31.160]如果场景里出现一架钢琴 ==>{time: 16280, content: 'あんなに愛した君がいない'}
// 用正则表达式匹配前面的时间[00:31.160]
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lineStrings = lyricString.split('\n')

  const lyrics: Array<{
    time: number
    content: any
  }> = []
  for (const line of lineStrings) {
    if (line) {
      const result: any = parseExp.exec(line)
      // console.log(result);
      // 如果这一次没有匹配到，则跳过这一次进行下一次匹配
      if (!result) continue
      const time1 = result[1] * 60 * 1000
      const time2 = result[2] * 1000
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
      const time = time1 + time2 + time3
      // replace方法：用后面的值取代前面的值，trim：去掉空格
      const content = line.replace(parseExp, '').trim()
      const lineObj: {
        time: number
        content: any
      } = { time, content }
      lyrics.push(lineObj)
    }
  }
  return lyrics
}

// 实现歌词的滚动
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop // 滚动条需要移动的总距离
  const perTick = (difference / duration) * 10 // 每次移动的距离
  setTimeout(function() {
    // 每次地柜调用时用当前的滚动高度加上每次移动的距离
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return // 如果完成要求的移动 则停止调用
    scrollTo(element, to, duration - 10) // 递归调用 直到完成规定的移动
  }, 10)
  // console.log(to, element.scrollTop, difference, perTick, duration);
}
