import {generate} from './bezier';
import fmt from './fmt';
let timer;

Component({

    properties: {
        'showNumType': { type: Number, value: 0},    // 0时间   1公里   2数字货币化
        'setTarget': {type: Number, value: -1},
    },

    observers: {
        "setTarget": function (value) {
            if (value != -1) {
                let that =  this;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    that.start(value);
                }, 200);
            }
        }
    },

    data: {
        unit:'',
        text: 0,
        showText: '0',
        num: 1,
        target:0
    },

    methods: {
        start: function (target,options = {}) {
            this.stop();
            target = Number(target);
            let {delay = 0,duration=1500, bezier = generate(.4,.9,.5,.97)} = options;
            this.setData({
                num: target - this.data.text > 0 ? 1 : -1,
                target:target,
            });
            target = Math.abs(this.data.text - target);
            // if(target < 200)  duration=1500;
            // else if(target < 400 ) duration=1750;
            // else if(target < 600 ) duration=2000;

            let that = this;
            let scale = 1 / duration;
            let start = 0;
            let startTimestamp;

            function step() {
                let timestamp = new Date().getTime() - startTimestamp;
                if (!start) start = timestamp;
                let progress = timestamp - start;
                let y = bezier(scale * progress); // y轴的比例
                let result = Math.ceil(Number(target * y));
                result = result <= target ? result : target;
                setData(result,result >= target ? true : false);
            }

            function setData(result,isStop=false) {
                let value = Number(that.data.text) + Number(result * that.data.num);
                // that.setData({ showText: value < 60 ? value : formatTime(value)});
                that.setData({ showText: formatTime(value)});
                if(isStop) that.stop(value);
            }

            function formatTime(value) {
                that.setData({unit: value < 60 ? 'min' : 'h'});
                let showNumType = that.data.showNumType;
                if (showNumType == 0 && value >= 60) {
                    let num = Math.floor(value / 60);
                    let num1 = num > 9 ? num : `0` + num;
                    let num2 = value % 60 > 9 ? value % 60 : `0` + value % 60;
                    return `${num1}:${num2}`;
                }
                if (showNumType == 2) {
                   return  fmt.formatCoin(value)
                } else {
                    return value;
                }
            }

            setTimeout(() => {
                startTimestamp = new Date().getTime();
                that._interval = setInterval(step, 60);
            }, delay);

        },

        stop: function () {
            clearInterval(this._interval);
            let target = this.data.target;
            this.setData({text: target});
        },

        reset(){
            clearInterval(this._interval);
            this.setData({text:0, target:0});
        },

    }
})
