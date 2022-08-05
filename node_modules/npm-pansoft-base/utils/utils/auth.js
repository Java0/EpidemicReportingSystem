import Cookies from 'js-cookie'
const TokenKey = 'x-auth-token'
import website from '@/config/website';
var inFifteenMinutes = new Date(new Date().getTime() + website.tokenTime);
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}