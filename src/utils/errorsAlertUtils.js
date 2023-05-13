import {createToast} from "mosha-vue-toastify";

export function onErrorAlert(error, callbackFn = undefined) {
    if (error.response && error.response.data && error.response.data.detail) {
        createToast(`${error.response.data.title}:\n${error.response.data.detail}`, {
            position: 'top-right',
            type: 'danger',
        });
        return;
    }

    if (error.message) {
        createToast(`Ошибка:\n(${error.code}) ${error.message}`, {
            position: 'top-right',
            type: 'danger'
        })
        return;
    }

    createToast(`Ошибка:\n${error}`, {
        position: 'top-right',
        type: 'danger',
    });

    if (callbackFn)
        callbackFn()
}

export function onSuccessAlert(successName, callbackFn = undefined) {
    createToast(`Вы успешно ${successName}!`, {
        position: 'top-right',
        type: 'success',
    });

    if (callbackFn)
        callbackFn()
}