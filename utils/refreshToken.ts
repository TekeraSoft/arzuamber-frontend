export async function refreshToken(refreshToken) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error("Failed to refresh token");
    }

    return await response.json(); // Yeni Access ve Refresh Token'ları döner
}