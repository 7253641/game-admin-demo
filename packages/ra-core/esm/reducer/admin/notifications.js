import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, } from '../../actions/notificationActions';
import { UNDO } from '../../actions/undoActions';
var notificationsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = []; }
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return previousState.concat(action.payload);
        case HIDE_NOTIFICATION:
        case UNDO:
            return previousState.slice(1);
        default:
            return previousState;
    }
};
export default notificationsReducer;
/**
 * Returns the first available notification to show
 * @param {Object} state - Redux state
 */
export var getNotification = function (state) { return state.admin.notifications[0]; };
