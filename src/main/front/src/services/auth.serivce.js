import http from "../http-common";

class AuthDataService {

    login(data) {
        return http.post("api/public/login", data);
    }

    register(data) {
        return http.post("api/public/register", data);
    }
}

export default new AuthDataService();