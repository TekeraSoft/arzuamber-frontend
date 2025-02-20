'use client'
import { useEffect, useState } from 'react';

function PaymentCallback() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Ödeme Tamamlanıyor...");

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR ortamında çalışmasını engelle

        const params = new URLSearchParams(window.location.search);
        const paymentId = params.get('paymentId');
        const conversationId = params.get('conversationId');

        // Eğer parametreler yoksa işlem yapma
        if (!paymentId || !conversationId) {
            setMessage("Geçersiz ödeme bilgileri.");
            setLoading(false);
            return;
        }

        // Backend'e ödeme tamamlama isteği gönder
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/order/complete-threeds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ conversationId:conversationId, paymentId:paymentId }) // Doğru JSON body formatı
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    setMessage("Ödeme başarılı! Yönlendiriliyorsunuz...");
                    setTimeout(() => {
                        window.location.href = "/"; // Başarılı ödeme sonrası yönlendirme
                    }, 3000);
                } else {
                    setMessage("Ödeme başarısız. Lütfen tekrar deneyin.");
                }
            })
            .catch((error) => {
                console.error("Bir hata oluştu: ", error);
                setMessage("Ödeme işlemi sırasında hata oluştu.");
            })
            .finally(() => setLoading(false));

    }, []);

    return <div>{loading ? "Ödeme Tamamlanıyor..." : message}</div>;
}

export default PaymentCallback;