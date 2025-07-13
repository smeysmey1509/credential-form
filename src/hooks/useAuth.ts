import {getCookie} from "../utils/cookie";
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): boolean => {
    const token = getCookie("accessToken")
    return !!token
}

export const getUserRole = (): string | null => {
    const token = getCookie('accessToken');

    if(!token) return null;

    try{
        const decoded = jwtDecode<{role: string}>(token);
        return decoded.role
    }catch{
        return null;
    }

}