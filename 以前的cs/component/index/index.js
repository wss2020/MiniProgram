// component/index/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		emitEvent (key) {
			this.triggerEvent('change', { key });
		},

		handleClickItem (e) {
			const key = e.currentTarget.dataset.key; //获取到传递过来的key
			this.emitEvent(key); //调用自定义组件内部方法
		}




	}
});
