import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // 로컬스토리지에서 access토큰을 가져오고 jwt토큰을 Authorization 헤더에 설정.
    headers: { //header에있으면
        Authorization: !!localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : ""
    }
});

export default instance;