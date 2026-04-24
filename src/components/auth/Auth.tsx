"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthLoader from "./AuthLoader";
import { getMe } from "@/src/service/auth/getMe";
import useUserSlice from "@/src/redux/features/user/useUserSlice";

interface AuthProps {
    children: ReactNode;
}

export function Auth({ children }: AuthProps) {
    const pathname = usePathname();
    const { setUser } = useUserSlice();
    const [checking, setChecking] = useState(true);
    const guestRoutes = ["/login", "/signup", "/forget", "/reset"];
    const shouldSkipAuthCheck = guestRoutes.includes(pathname);

    useEffect(() => {
        if (shouldSkipAuthCheck) {
            return;
        }

        let isMounted = true;

        const verifyAuth = async () => {
            try {
                setChecking(true);
                const { email, success, userId } = await getMe();

                if (!isMounted) {
                    return;
                }

                if (success && userId) {
                    setUser({ userId, email });
                } else {
                    setUser({ userId: "", email: "" });
                }

            } catch (err: unknown) {
                console.error("Error occurred while verifying authentication:", err);

                if (isMounted) {
                    setUser({ userId: "", email: "" });
                }
            } finally {
                if (isMounted) {
                    setChecking(false);
                }
            }
        };

        verifyAuth();

        return () => {
            isMounted = false;
        };

    }, [setUser, shouldSkipAuthCheck]);

    if (shouldSkipAuthCheck) {
        return children;
    }

    return checking ? (
        <AuthLoader />
    ) : (
        children
    );
}