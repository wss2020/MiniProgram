Component({
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['image-class'],
  properties: {
    width: {
      type: null,
      observer: 'setStyle'
    },
    height: {
      type: null,
      observer: 'setStyle',
      value: 290
    },
    mode: {
      type: String,
      value: 'aspectFill'
    },
    src: String,
    errorLink: String
  },
  data: {
    imgWrong: false
  },
  methods: {
    setStyle() {
      const { width, height } = this.data;
      let style = '';
      if (this.isDef(width)) {
        style += `width: ${this.addUnit(width)};`;
      }
      if (this.isDef(height)) {
        style += `height: ${this.addUnit(height)};`;
      }
      this.setData({ imgStyle: style });
    },
    onImgError() {
      this.setData({
        imgWrong: true
      })
    },
    isDef(value) {
      return value !== undefined && value !== null;
    },
    isNumber(value) {
      return /^\d+(\.\d+)?$/.test(value);
    },
    addUnit(value) {
      if (!this.isDef(value)) {
        return undefined;
      }
      value = String(value);
      return this.isNumber(value) ? `${value}rpx` : value;
    }
  }
})
