import api from './api'

// 设备型号(1->ios,2->Android)
const device = 2
const appid = 'wx1731d1d47587e5ce'
const encryptedKey = 'wEGlKypNVnthtEwu'
const amount = api.envVersion === 'release' ? 2000.00 : 0.01

// 腾讯地图key
const qqmapKey = '3RFBZ-CGSRU-F6WVM-2BCFH-NQ4SZ-XWFXA'

const graphqlToken = '04b6cb33b1f41a1675acc858a5bd00'

const images = {
  ps1: {
    header: `${api.assetsDomin}/images/PS1_Hero.png`,
    details: [
      `${api.assetsDomin}/images/PS1_1.png`,
      `${api.assetsDomin}/images/PS1_2.png`,
      `${api.assetsDomin}/images/PS1_3.png`,
      `${api.assetsDomin}/images/PS1_4.png`,
      `${api.assetsDomin}/images/PS1_5_2.png?v=1.1`
    ],
    link: `${api.assetsDomin}/images/Link.png`,
    testdrivebg: `${api.assetsDomin}/images/testdrive_bg.png`    
  },
  ps2: {
    header: `${api.assetsDomin}/images/PS2_Hero.jpg`,
    details: [
      `${api.assetsDomin}/images/PS2_1.png`,
      `${api.assetsDomin}/images/PS2_2.png`,
      `${api.assetsDomin}/images/PS2_4.png`,
      `${api.assetsDomin}/images/PS2_5.png`
    ],
    banner: [
      `${api.assetsDomin}/images/PS2_3_1.png`,
      `${api.assetsDomin}/images/PS2_3_2.png`
    ],
    link: `${api.assetsDomin}/images/PS2_link.png`,
    testdrivebg: `${api.assetsDomin}/images/testdrive_bg.png`
  },
  formbanner: `${api.assetsDomin}/images/form_banner.png`,
  recommend: {
    hero: `${api.cdnAssetsDomin}/recommend/hero.png`,
    swiper:[
      `${api.cdnAssetsDomin}/recommend/recommend1.jpg`,
      `${api.cdnAssetsDomin}/recommend/recommend2.jpg`,
      `${api.cdnAssetsDomin}/recommend/recommend3.jpg`
    ]
  }
}

const video = `${api.assetsDomin}/video/video.mp4`

const assetsData = {
  device,
  amount,
  appid,
  images,
  video,
  encryptedKey,
  graphqlToken,
  qqmapKey
}

module.exports = assetsData