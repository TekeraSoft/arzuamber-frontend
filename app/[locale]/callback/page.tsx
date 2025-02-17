'use client'
import { useEffect } from 'react';

function PaymentCallback() {
    const paymentId = new URLSearchParams(window.location.search).get('paymentId');
    const conversationId = new URLSearchParams(window.location.search).get('conversationId');
    console.log(paymentId, conversationId);
    useEffect(() => {
        // Eğer ödeme parametreleri varsa backend'e ödeme tamamlama isteği gönderelim
        if (paymentId && conversationId) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/order/complete-threeds`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                params: {conversationId: conversationId, paymentId: paymentId}
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        console.log("Ödeme başarılı!");
                    } else {
                        console.error("Ödeme hatalı");
                    }
                })
                .catch((error) => {
                    console.error("Bir hata oluştu: ", error);
                });
        }
    }, [paymentId, conversationId]);

    return <div>Ödeme Tamamlanıyor...</div>;
}

export default PaymentCallback;