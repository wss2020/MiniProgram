var fmt = {
    formatCurrency: function (value) {
        return "￥" + fmt.formatNumber(value);
    },

    formatCoin: function (value) {
        return fmt.formatNumber(value, 0);
    },

    abs: function(value) {
        return Math.abs(value);
    },

    formatNumber: function (value, precision = 2) {
        value = Math.abs(value);
        //整数部分
        var intv = Math.floor(value);
        var arr = [];
        if(intv < 0.01) {
            arr.push("0");
        } else {
            while (intv > 0) {
                if (intv >= 1000) {
                    arr.push(fmt.intToString(intv % 1000, 3));
                } else {
                    arr.push(intv);
                }
                intv = Math.floor(intv / 1000);
            }
        }
        arr.reverse();
        var part1 = arr.join(',');

        if (precision == 0) {
            return part1;
        }

        var value2 = value;
        var part2 = "";
        for (var i = 0; i < precision; i++) {
            part2 = part2 + Math.floor(value2 * 10 % 10);
            value2 = value2 * 10;
        }
        return part1 + "." + part2;
    },

    intToString: function (value, length) {
        var result = "";
        while (value > 0) {
            result = (value % 10) + result;
            value = Math.floor(value / 10);
        }
        var rest = length - result.length;
        for (var i = 0; i < rest; i++) {
            result = "0" + result;
        }
        return result;
    },

    canvas: function (ctx) {
        var width = 110;
        var height = 110;
        var text = "已领取";
        var font_height = 26;
        var arc = 16 * - Math.PI/ 180;
        ctx.drawImage('/image/reward_bg.png', 0, 0, width, height);
        ctx.rotate(arc);
        ctx.setFillStyle('white');
        ctx.setFillStyle('#da6464');
        ctx.font = 'normal bold ' + font_height + 'px sans-serif';
        var metrics = ctx.measureText(text);
        ctx.fillText(text, 1, 78);
    }

};

module.exports = fmt;