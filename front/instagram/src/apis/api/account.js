import instance from "../utils/instance"

export const signup = async (account) => {
    // signup : 데이터 등록 -> post
    
    const response = await instance.post("/api/v1/auth/user", account);
    console.log(response);
}