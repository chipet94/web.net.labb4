import { put, post, get, remove } from '../Api'

const actionType = (type) => {
    const actions = {
        put: put,
        post: post,
        get: get,
        remove: remove,
        default: () => {
            return { status: 501, error: "Requested action does not exist." }
        }
    }
    return (actions[type] || actions.default);
}

const questionAction = async (type, data, onSuccess, onError) => {
    const action = actionType(type);
    await action('question', data)
        .then((res) => {
            if (!res.ok) {
                res.json().then(err => {
                    onError(err);
                });
            } else {
                console.log("added!")
                onSuccess();
            }
        }).catch(err => onError(err));
}

export default questionAction;