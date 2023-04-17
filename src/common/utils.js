const utils = {
  getParams: function (url) {
    var url = url || window.location.href;
    if (url.indexOf('?') < 0) {
        return false
    }
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce(function(a, v) {
      return (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a;
    }, {});
  },
  // 拿到url中的具体某个参数的值
  getUrlParam: function (key, url) {
    var url = url || window.location.href;
    var self = this;
    var params = this.getParams(url);
    return params[key] ? params[key] : '';
  },
  webpFormat(urlObj, quality) {
    let _this = this
    return new Promise((resolve) => {
      if (window.SUPPORT_WEBP) {
        urlObj = _this.formatWebpParams(urlObj, quality)
        resolve(urlObj)
      } else {
        var img = new Image();
        img.onload = function () {
          var result = (img.width > 0) && (img.height > 0);
          if (result) {
            window.SUPPORT_WEBP = true
            urlObj = _this.formatWebpParams(urlObj, quality)
          }
          resolve(urlObj)
        }
        img.onerror = function () {
          window.SUPPORT_WEBP = false
          resolve(urlObj)
        }
        img.src = 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
      }
    })
  },
  formatWebpParams(urlObj, quality = 75) {
    let cdnReg = /^(https|http):\/\/[a-zA-Z0-9]+\.(max-c|maxjia)\.com/
    if (window.SUPPORT_WEBP) {
      if (typeof urlObj === 'object') {
        Object.keys(urlObj).forEach((key) => {
          if (cdnReg.test(urlObj[key])) {
            let url = urlObj[key].split('?')[0]
            urlObj[key] = `${url}?imageMogr2/format/webp/quality/${quality}`
          }
        })
      } else if (urlObj) {
        if (cdnReg.test(urlObj)) {
          let url = urlObj.split('?')[0]
          urlObj = `${url}?imageMogr2/format/webp/quality/${quality}`
        }
      }
    }
    return urlObj
  },
  getOSType: function () {
    if (window && window.navigator.userAgent) {
      const ua = window.navigator.userAgent.toLocaleLowerCase()
      if (/(iphone|ipad|ios)/i.test(ua)) {
        return 'iOS'
      } else if (/mac os/i.test(ua)) {
        return 'Mac'
      } else if (/(android|harmony)/i.test(ua)) {
        return 'Android'
      } else {
        return 'Windows'
      }
    }
    return ''
  },
  // cookie操作
  setCookie (name, value, time = 'd7') {
    if (time) {
      var strSec = getSec(time)
      var now = new Date()
      now.setTime(now.getTime() + strSec * 1)
      document.cookie = name + "=" + escape(value) + ";expires=" + now.toGMTString() + ";path=/;domain=" + process.env.BASE_DOMAIN
    } else {
      document.cookie = name + "=" + escape(value) + ";expires=Session;path=/;domain=" + process.env.BASE_DOMAIN
    }
  
    function getSec (str) {
      var str1 = str.substring(1, str.length) * 1
      var str2 = str.substring(0, 1)
      if (str2 === "s") {
        return str1 * 1000
      } else if (str2 === "h") {
        return str1 * 60 * 60 * 1000
      } else if (str2 === "d") {
        return str1 * 24 * 60 * 60 * 1000
      }
    }
  },
  getCookie (name) {
    const arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))
    if (arr != null) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  delCookie (name) {
    let now = new Date()
    now.setTime(now.getTime() - 100000)
    const cval = utils.getCookie(name)
    if(cval!=null) {
      document.cookie = name + "=;expires=" + now.toGMTString() + ";path=/;domain=" + process.env.BASE_DOMAIN
    }
  },
  // 持久储存操作: 客户端存本地，web存localStorage
  setStorage (key, val) {
    if (window.client_env === 'electron' && window.electronAPI.setData) {
      window.electronAPI.setData(key, val)
    } else {
      localStorage.setItem(key, JSON.stringify(val))
    }
  },
  async getStorage (key) {
    if (window.client_env === 'electron' && window.electronAPI.getData) {
      let d = await window.electronAPI.getData(key)
      return d
    } else {
      return JSON.parse(localStorage.getItem(key))
    }
  },
  delStorage (key) {
    if (window.client_env === 'electron' && window.electronAPI.delData) {
      window.electronAPI.delData(key)
    } else {
      localStorage.removeItem(key)
    }
  },
  playAudio (file, volume = 10) {
    var mp3 = new Audio(file)
    mp3.volume = volume / 100
    mp3.play();
  },
  IMTimeFormat(timestamp) {
    const days = ['日','一','二','三','四','五','六']
    let time = new Date()
    let ye = time.getFullYear()
    let mo = time.getMonth()+1
    let da = time.getDate()
    let week = time.getDay()
    let todayStartPoint = new Date(`${ye}/${mo}/${da} 00:00:00`).getTime()
    let yesterdayStartPoint = todayStartPoint - 24*60*60*1000
    let thisWeekStartPoint = new Date(`${ye}/${mo}/${da} 00:00:00`).getTime() - week*24*60*60*1000
    let thisYearStartPoint = new Date(`${ye}/1/1 00:00:00`).getTime()
  
    let tarDate = new Date(timestamp)
    let t_ye = tarDate.getFullYear()
    let t_mo = tarDate.getMonth()+1
    let t_da = tarDate.getDate()
    let t_week = tarDate.getDay()
    let t_hour = tarDate.getHours()
    let t_minute = tarDate.getMinutes()
    t_minute = t_minute < 10 ? '0'+ t_minute : t_minute
    let res = ''
    if(timestamp < thisYearStartPoint) {
        res = `${t_ye}年${t_mo}月${t_da}日 ${t_hour}:${t_minute}`
    } else if (timestamp < thisWeekStartPoint) {
        res = `${t_mo}月${t_da}日 ${t_hour}:${t_minute}`
    } else if (timestamp < yesterdayStartPoint) {
        res = `星期${days[t_week]} ${t_hour}:${t_minute}`
    } else if (timestamp < todayStartPoint) {
        res = `昨天 ${t_hour}:${t_minute}`
    } else {
        res = `${t_hour}:${t_minute}`
    }
    return res
  },
  uint8arrayToBase64(u8Arr) {
    let CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    let length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    // web image base64图片格式: "data:image/png;base64," + b64encoded;
    return  "data:image/png;base64," + btoa(result);
    // return btoa(result);
  },
  uint8arraytoImage(data, type='png') {
    var blob = new Blob([data])
    return new File([blob], 'index.' + type, { type: 'image/' + type })
  },
  base64ToFile(base64, fileName, type='image/png') {
    let arr = base64.split(",");
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type });
  },
  fileToUrl(file) {
    const windowURL = window.URL || window.webkitURL;
    return windowURL.createObjectURL(file);
  },
  releaseFileUrl(url) {
    const windowURL = window.URL || window.webkitURL;
    windowURL.revokeObjectURL(url);
  },
  //把字节转换成正常文件大小
  getfilesize(size) {
    if (!size)  return "";
    var num = 1024.00; //byte
    if (size < num)
        return size + " B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + " KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + " MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + " G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + " T"; //T
  },
}
function getSmDeviceId () {
  return new Promise((resolve) => {
    window.dealSmDeviceId((device_id) => {
      resolve(device_id)
    })
  })
}
function throttle(fn, wait) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(_this, args)
        timer = null
      }, wait)
    }
  }
}

function debounce(func, wait) {
  let timer
  return function () {
    let _this = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(_this, args)
    }, wait)
  }
}
export { utils, throttle, debounce, getSmDeviceId }
