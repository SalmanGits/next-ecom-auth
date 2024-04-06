export const setLocalStorage = (key, value) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem(key, value);
    }

};
export const getLocalStorage = (key) => {
    const response = {};
    if(typeof window !== 'undefined'){
        response.token = localStorage.getItem(
            key
        );
    }

    return response;
};
