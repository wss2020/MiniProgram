Component({
  relations: {
    './ul': {
      type: 'parent'
    }
  },
  properties: {
    link: String,
    name: String
  },
  methods: {
    onclick() {
      const pages = getCurrentPages()
      const prev = pages[pages.length - 2]
      if (!prev) {
        // 没有历史页面
        wx.navigateTo({
          url: this.data.link
        })
      } else {
        const pageIndex = pages.findIndex(item => ('/' + item.route) === this.data.link)
        if (pageIndex === -1) {
          // 历史页面没有要跳转的路径
          wx.navigateTo({
            url: this.data.link
          })
        } else {
          // 历史页面有要跳转的路径
          wx.navigateBack({
            delta: pages.length - pageIndex - 1,
          })
        }
      }
    }

  }
})
