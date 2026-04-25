"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const removeTokenFromCookies = async (
  key: string,
  option?: { redirect: string },
) => {
  (await cookies()).delete(key);
  if (option && option.redirect) {
    redirect(option?.redirect);
  }
};

export default removeTokenFromCookies;
