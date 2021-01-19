var app = getApp();

Component({
    "options": {
        styleIsolation: "isolated"
    },
    properties: {},
    data: {
        time: '00:00',
        time2: '00:00',
        currentTime: 0,
        duration: null,
        playing: false,
        state: 'none',
        slidedisable: true
    },
    lifetimes: {
        attached: function () {
            this.platform = app.func.getPlatform();
            this.mgr = this.platform.getBackgroundAudioManager();

            console.log( 1111 );
            console.log( this.mgr );

            this.onStateChange = (state) => {
                console.log(2222);
                console.log(state);
                this.setData({
                    title: app.func.audio.title,
                    state: state,
                    slidedisable: (state == 'none' || state == 'error' || state == 'play'),
                    playing: (state == 'play')
                });
            };
            this.onUpdate = (res) => {
                console.log( 3333 );
                console.log(res);
                this.setData({
                    currentTime: res.currentTime,
                    time: this.formatTime(res.currentTime),
                    duration: res.duration,
                    time2: this.formatTime(res.duration)
                });
            };
            if (app.func.audio != null) {
                console.log( 44444 );
                console.log(this.mgr);
                this.setData({
                    title: this.mgr.getTitle(),
                    state: this.mgr.state,
                    time: '00:00',
                    time2: '00:00'
                });
            }
            this.mgr.on('audio-play', this.onStateChange);
            this.mgr.on('audio-update', this.onUpdate);
            this.mgr.on('audio-endded', this.onStateChange);
            this.mgr.on('audio-stop', this.onStateChange);
            this.mgr.on('audio-pause', this.onStateChange);
        },
        detached: function () {
            this.mgr.off('audio-play', this.onStateChange);
            this.mgr.off('audio-update', this.onUpdate);
            this.mgr.off('audio-endded', this.onStateChange);
            this.mgr.off('audio-stop', this.onStateChange);
            this.mgr.off('audio-pause', this.onStateChange);
        },
    },
    pageLifetimes:{
        show: function () {
        },
        hide: function () {
        }
    },
    observers: {},
    methods: {
        formatTime: function (time) {
            var min = Math.floor(time / 60);
            if (min < 10) {
                min = '0' + min;
            }
            var sec = Math.floor(time % 60);
            if (sec < 10) {
                sec = '0' + sec;
            }
            return min + ":" + sec;
        },
        pause: function () {
            this.mgr.pause();
        },
        play: function () {
            console.log(1111);
            console.log(this.mgr);

            this.mgr.play();
        },
        slidechanging: function (res) {
            var value = res.detail.value;
            this.setData({
                time: this.formatTime(value),
                currentTime: value
            })
        },
        slidechange: function (res) {
            var value = res.detail.value;
            this.setData({
                time: this.formatTime(value),
                currentTime: value
            }, () => {
                this.mgr.seek(value);
            });
        }
    }
});
