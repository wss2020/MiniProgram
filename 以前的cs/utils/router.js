/**
 * 获取当前页面栈
 */
export function getCurrent() {
  return getCurrentPages()
}
/**
 * 获取前一个页面
 */
export function getPrev() {
  const pages = getCurrentPages()
  return pages[pages.length - 2] ? pages[pages.length - 2] : undefined
}
/**
 * 判断传入的路由路径是否是上一页
 * @param {String} path 路由路径(如：/pages/index/index)
 */
export function isPrev(path) {
  const pages = getCurrentPages()
  const prev = pages[pages.length - 2]
  if (!prev) return false
  return ('/' + prev.route) === path
}
/**
 * 返回到某个路由
 * @param {String} path 路由路径(如：/pages/index/index)
 */
export function back(path) {
  const pages = getCurrentPages()
  const prev = pages[pages.length - 2]
  if (!prev) {
    // 没有历史页面
    wx.redirectTo({
      url: path
    })
  } else {
    const pageIndex = pages.findIndex(item => ('/' + item.route) === path)
    if (pageIndex === -1) {
      // 历史页面没有要跳转的路径
      wx.redirectTo({
        url: path
      })
    } else {
      // 历史页面有要跳转的路径
      wx.navigateBack({
        delta: pages.length - pageIndex - 1,
      })
    }
  }

}