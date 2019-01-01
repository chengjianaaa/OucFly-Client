/**
 * @file: 对request做包装，使其适应await/async
 * @author: Yidadaa
 */

/**
 * 发送请求
 * @param {String} url url
 * @param {String} method GET/POST/PUT等等
 * @param {Object} data data
 */
export function request (url, method, data = null) {
  console.debug('[Request]', url, method, data)
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success (res) {
        if (res.statusCode===200) {
          resolve(res.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail (res) {
        uni.navigateTo({
          url: '/pages/login/index'
        })
        reject(res)
      }
    })
  })
}

/**
 * GET请求
 * @param {String} url 地址
 */
export function get (url) {
  return request(url, 'GET')
}

/**
 * POST请求
 * @param {String} url 地址
 * @param {Object} data 数据
 */
export function post (url, data) {
  return request(url, 'POST', data)
}
