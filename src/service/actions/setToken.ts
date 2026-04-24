'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const setTokenInCookies = async (key: string, token: string, option?: { redirect: string }) => {

    (await cookies()).set(key, token)
    if (option && option.redirect) {
        redirect(option?.redirect)
    }
}

export default setTokenInCookies