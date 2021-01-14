import api from './api';
import fetch from '../utils/fetch'
import { graphqlToken } from './data'
import { chargingPage, rangePage, everyDayPage, prices } from './graphql/index'

/**
 * code换sessionKey
 * @param {String} code 微信code
 */
export function mpauth(code) {
  // return fetch('https://dev.china.polestar.com/' + 'api/wxacode/v1/auth/code2Session', { code }, { method: 'post' })
  return fetch(api.domin + 'api/wxacode/v1/wxacode/auth/code2Session', { code }, { method: 'post' })
}
/**
 * 微信授权
 * @param {Object} data 授权数据
 * @param {Object} options 配置项
 */
export function mpregister(data, options) {
  // return fetch('https://dev.china.polestar.com/' + 'api/wxacode/v1/auth/getUserInfo', data, options)
  return fetch(api.domin + 'api/wxacode/v1/wxacode/auth/getUserInfo', data, options)
}

/**
获取手机号
  "sessionKey": "string",
  "encryptedData": "string",
  "iv": "string",
  "detail": {
    "unionid": "string",
    "nickname": "string",
    "headimgurl": "string"
    }
 */
export function getUserInfo(data) {
  return fetch(`${api.domin}api/wxacode/v1/wxacode/auth/getUserInfo`, data, { method: 'POST' })
}

// 获取城市
export function getArea(code = 0) {
  return fetch(`${api.domin}api/dictionary/area/polestar/${code}`)
}

// 交车城市
export function invoiceCity(cityCode) {
  return fetch(`${api.domin}api/dictionary/handovercity/invoicecity/${cityCode}`,)
}

/* 获取初始配置器
* @param {Object} data 初始配置器参数
*/
export function getInitConfig(data) {
  return fetch(api.domin + 'api/configurator/v1/zh-cn/polestar-2/initconfig', data)
}

/**
 * 改变配置
 * @param {Object} data 配置信息
 */
export function changeConfig(data) {
  // return fetch('https://prod.china.polestar.com/' + 'api/configurator/v1/zh-cn/polestar-2/configuration', data)
  return fetch(api.domin + 'api/configurator/v1/zh-cn/polestar-2/configuration', data)
}

/**
 * 长参数换短参数
 * @param {String} longparam 长参数
 */
export function longUrl2short(longparam) {
  return fetch(api.domin + 'api/wxacode/v1/wxacode/shorturl', { longparam }, { method: 'POST' })
}
/**
 * 短参数换长参数
 * @param {String} shortparam 短参数
 */
export function shortUrl2long(shortparam) {
  return fetch(api.domin + `api/wxacode/v1/wxacode/getlongurl/${shortparam}`)
}


/**
 * app登录
 * @param mobile 手机号
 * @param code 验证码
 */
export function AuthApp(data) {
  return fetch(`${api.domin}api/sms/verify`, data, { method: 'POST', toast: false })
}

/**
 * app过去验证码
 * @param mobile 手机号
 */
export function getSmsCode(value) {
  return fetch(`${api.domin}api/sms/code`, { mobile: value }, { method: 'POST' })
}

/**
 * 提交订单
 * @param orderId  订单ID
 * @param data 看文档，一堆
 */
export function orders(orderId, data) {
  return fetch(`${api.domin}api/orders/${orderId}/checkout`, data, { method: 'POST', toast: false })
}

/**
 * 检查支付结果
 * @param orderId  订单ID
 * @param uid
 */
export function checkPayStatus(orderId, uid) {
  return fetch(`${api.domin}api/orders/${orderId}/checkout/${uid}`)
}


/**
 * 重新估价
 * @param orderId  订单ID
 * @param data  上牌城市
 */
export function estimate(orderId, data) {
  return fetch(`${api.domin}api/orders/${orderId}/discount/estimate`, data, { method: 'POST', toast: false })
}


/**
 * 获取协议
 */
export function terms_ps2() {
  return fetch(`${api.domin}api/dictionary/polestar/terms_ps2`)
}


/**
 * 获取订单列表
 */
export function orderList() {
  return fetch(`${api.domin}api/orders`)
}

/***
 * 获取订单信息详情
 * @param orderId  订单ID
 * */
export function orderDetail(orderId) {
  return fetch(`${api.domin}api/orders/${orderId}`)
}


/***
 * 获取充电页面信息详情
 * */
export function chargingPageDetail() {
  return fetch(`${api.graphqlDomin}?query=${encodeURIComponent(chargingPage)}`, {
    variables: {
      locale: "zh_CN"
    }
  }, {
    header: {
      Authorization: `Bearer ${graphqlToken}`
    }
  })
}

export function rangePageDetail() {
  return fetch(`${api.graphqlDomin}?query=${encodeURIComponent(rangePage)}`, {
    variables: {
      locale: "zh_CN"
    }
  }, {
    header: {
      Authorization: `Bearer ${graphqlToken}`
    }
  })
}

export function everyDayPageDetail() {
  return fetch(`${api.graphqlDomin}?query=${encodeURIComponent(everyDayPage)}`, {
    variables: {
      locale: "zh_CN"
    }
  }, {
    header: {
      Authorization: `Bearer ${graphqlToken}`
    }
  })
}

export function pricesDetail() {
  return fetch(`${api.graphqlPriceDomin}cn-northwest-1/energy-prices/?query=${encodeURIComponent(prices)}`, {
    variables: {
      fuelId: "CN",
      electricityId: "CN"
    }
  })
}

/**
 * 获取充电桩
 * @param {Number} longitude 经度
 * @param {Number} latitude 纬度
 */
export function getOpenChargeMap(longitude, latitude) {
  return fetch(api.openchargeDomin, {
    latitude,
    longitude,
    output: 'json',
    distanceunit: 'KM',
    distance: 100,
    compact: true,
    verbose: false
  },{
    loading: false
  })
}











