// vue插件moment转换时间格式，并且兼容IE
// 获取毫秒数示例（使用/）：new Date(moment(new Date()).format('YYYY/MM/DD HH:mm:ss')).getTime()
import moment from 'moment'

/**
 * Created by lyq on 2019-7-01.
 */

export function parseTime(time) {
  if (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
    // var date = new Date(time)
    // var year = date.getFullYear()
    // /* 在日期格式中，月份是从0开始的，因此要加0
    //  * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    //  * */
    // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    // var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    // var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // // 拼接
    // return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  } else {
    return ''
  }
}

export function parseDate(time) {
  if (time) {
    return moment(time).format('YYYY-MM-DD')
    // var date = new Date(time)
    // var year = date.getFullYear()
    // /* 在日期格式中，月份是从0开始的，因此要加0
    //  * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    //  * */
    // var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    // var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // // 拼接
    // return year + '-' + month + '-' + day
  } else {
    return ''
  }
}

/**
 * 获取时间（兼容IE）
 * @param time
 * @returns {Date}
 */
export function formatToTime(time) {
  return new Date(moment(time).format('YYYY/MM/DD HH:mm:ss'))
}

/**
 * 计算报警时长
 */
export function formatTimeMinu(sTime) {
  var beginTime = new Date(moment(sTime).format('YYYY/MM/DD HH:mm:ss')) // 开始时间
  var betweenTime = new Date(moment(new Date()).format('YYYY/MM/DD HH:mm:ss')).getTime() - beginTime.getTime() // 时间差的毫秒数
  // 计算出相差天数
  var days = Math.floor(betweenTime / (24 * 3600 * 1000))
  // 计算出小时数
  var leave1 = betweenTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  if (seconds > 0) {
    minutes = minutes + 1
  }
  // eslint-disable-next-line eqeqeq
  return (days != '0' ? days + '天' : '') + (hours != '0' ? hours + '小时' : '') + (minutes != 0 ? minutes + '分钟' : '')
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 替换邮箱字符
export function regEmail(email) {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (var i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}

// 替换手机字符
export function regMobile(mobile) {
  if (mobile.length > 7) {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
  }
  return new_mobile
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function formatTimeToStr(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * 数组对象去重
 * @param arr
 * @param name
 * @returns {*}
 */
export function arrayUnique(arr, name) {
  var hash = {}
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next)
    return item
  }, [])
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function strIsEmpty(str) {
  if (str === null || str === '' || str.length === 0) {
    return true
  } else {
    return false
  }
}

