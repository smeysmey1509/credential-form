import {getCookie} from "../utils/cookie";

export const isAuthenticated = (): boolean => {
    const token = getCookie("accessToken")
    return !!token
}