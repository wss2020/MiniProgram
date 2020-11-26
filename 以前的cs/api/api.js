const envVersion = __wxConfig.envVersion

const assetsDominMap = {
  release: 'https://testdrive.s3.cn-northwest-1.amazonaws.com.cn/showroom/prd',
  trial: 'https://testdrive.s3.cn-northwest-1.amazonaws.com.cn/showroom/prd',
  develop: 'https://testdrive.s3.cn-northwest-1.amazonaws.com.cn/showroom/test'
}

const cdnAssetsDominMap = {
  release: 'https://cdn-dev.china.polestar.com/uat-resource/miniprogram/showroom',
  trial: 'https://cdn-dev.china.polestar.com/uat-resource/miniprogram/showroom',
  develop: 'https://cdn-dev.china.polestar.com/dev-resource/miniprogram/showroom'
}

const dominMap = {
  release: 'https://prod.china.polestar.com/',
  trial: 'https://uat.china.polestar.com/',
  develop: 'https://uat.china.polestar.com/'
}

const authDominMap = {
  release: 'https://testdrivewechat.polestar.com/',
  trial: 'https://polestarapi.jesquare.cn/',
  develop: 'https://polestarapi.jesquare.cn/'
}

const graphqlDomin = 'https://graphql.datocms.com/'
const graphqlPriceDomin = 'https://pc-api.polestar.com/'

const sendsms = 'https://prod.china.polestar.com/api/sms/testdrive/code'

const verifysms = 'https://prod.china.polestar.com/api/sms/testdrive/verify'

const api = {
  sendsms,
  verifysms,
  cdnAssetsDomin: cdnAssetsDominMap[envVersion],
  assetsDomin: assetsDominMap[envVersion],
  domin: dominMap[envVersion],
  authDomin: authDominMap[envVersion],
  graphqlDomin,
  graphqlPriceDomin
}

export default api
