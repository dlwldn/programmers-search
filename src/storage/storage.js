export const storage = window.localStorage;

export const getStorage = (key, initialValue) => {
    try {
        const item = storage.getItem(key);
        return item ? JSON.parse(item) : initialValue
    } catch(e) {
        return initialValue
    }
}

export const setStorage = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value));
    } catch(e) {
        alert(e.message);
    }
}

export const removeStorage = (key) => {
    storage.removeItem(key);
}