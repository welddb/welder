export class Debouncer {
    timer;
    milliseconds;
    constructor(duration) {
        this.milliseconds = duration;
    };
    debounce(fn) {
        if (this.timer) {
            clearTimeout(this.timer);
            // this.timer;
        }
        this.timer = setTimeout(() => {
            fn()
        }, this.milliseconds);

    }
}