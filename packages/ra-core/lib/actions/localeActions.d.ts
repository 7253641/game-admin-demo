export declare const CHANGE_LOCALE = "RA/CHANGE_LOCALE";
export interface ChangeLocaleAction {
    readonly type: typeof CHANGE_LOCALE;
    readonly payload: string;
}
export declare const changeLocale: (locale: string) => ChangeLocaleAction;
export declare const CHANGE_LOCALE_SUCCESS = "RA/CHANGE_LOCALE_SUCCESS";
export interface ChangeLocaleSuccessAction {
    readonly type: typeof CHANGE_LOCALE_SUCCESS;
    readonly payload: {
        locale: string;
        messages: any;
    };
}
export declare const changeLocaleSuccess: (locale: string, messages: any) => ChangeLocaleSuccessAction;
export declare const CHANGE_LOCALE_FAILURE = "RA/CHANGE_LOCALE_FAILURE";
export interface ChangeLocaleFailureAction {
    readonly type: typeof CHANGE_LOCALE_FAILURE;
    readonly error: any;
    readonly payload: {
        locale: string;
    };
}
export declare const changeLocaleFailure: (locale: string, error: any) => ChangeLocaleFailureAction;
