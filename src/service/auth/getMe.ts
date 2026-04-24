export const getMe = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
        return {
            success: false,
            userId: "",
            email: "",
        };
    }

    return {
        success: true,
        userId: result.data?.id ?? "",
        email: result.data?.email ?? "",
    };
};