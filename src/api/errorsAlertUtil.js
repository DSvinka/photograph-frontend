import {createToast} from "mosha-vue-toastify";

export function onErrorAlert(error, callbackFn = undefined) {
    if (error.response && error.response.data) {
        createToast(`${error.response.data.title}:\n ${error.response.data.detail}`, {
            position: 'top-right',
            type: 'danger',
        });
    } else {
        createToast("Ошибка:\n "+error, {
            position: 'top-right',
            type: 'danger',
        });
    }

    if (callbackFn)
        callbackFn()
}

export function onSuccessAlert(successName, callbackFn = undefined) {
    createToast(`Вы успешно ${successName}!`, {
        position: 'top-right',
        type: 'danger',
    });

    if (callbackFn)
        callbackFn()
}