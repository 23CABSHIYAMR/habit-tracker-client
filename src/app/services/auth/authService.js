import api from "@/app/(MainBody)/api/apiInstance";

export const SignUpService= async(formData)=>{
    const res=await api.post("/auth/sign-up",formData);
    return res;
}
export const loginService = async (formData) => {
    const response = await api.post("/auth/login", formData);
    return response;
};
export const logoutService = async () => {
    const response = await api.delete("/auth/logout");
    return response;
};
export const fetchMe = async () => {
    const response=await api.get("auth/me",{withCredentials:true});
    return response.data;
}