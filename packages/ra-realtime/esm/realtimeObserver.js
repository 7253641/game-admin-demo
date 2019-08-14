import { END } from 'redux-saga';
export default (function (emitter) { return ({
    complete: function () {
        emitter(END);
    },
    error: function () {
        emitter(END);
    },
    next: function (value) {
        emitter(value);
    },
}); });
