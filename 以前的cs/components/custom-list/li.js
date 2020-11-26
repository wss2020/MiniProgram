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

      // const pages = getCurrentPages()
      // if (pages.length === 1) {
      //   wx.navigateTo({
      //     url: this.data.link
      //   })
      // } else {

      //   const prevPage = pages[pages.length - 2]
      //   const { route } = prevPage
      //   // 上一页路由是要跳转的页面则直接返回
      //   if ('/' + route === this.data.link) {
      //     wx.navigateBack()
      //   } else {
      //     wx.navigateTo({
      //       url: this.data.link,
      //     })
      //   }
      // }


    }

  }
})
