import { NetworkConfiguration, APIURL } from "../network/NetworkConfiguration.js";
import { callAPI } from "../network/NetworkConnection.js"
const login = (body) => {
    return callAPI(APIURL + NetworkConfiguration.LOGIN, "POST", body, {});
};
const signup = (body) => {
    return callAPI(APIURL + NetworkConfiguration.SIGNUP, "POST", body, {});
};
const category = (body) => {
    return callAPI(APIURL + NetworkConfiguration.CATEGORIES, "POST", body, {});
};

export const AppService = {
    login,
    signup,
    category
};
