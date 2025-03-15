import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

const useWebSocket = (page, size) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws"); // WebSocket URL'niz
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                console.log("✅ WebSocket connected");

                // Sayfa ve boyut parametrelerini içeren payload oluşturuluyor
                const orderRequestDto = {
                    page: page,
                    size: size
                };

                stompClient.subscribe("/topic/orders", (response) => {
                    console.log("📦 Received orders:", response.body);
                    try {
                        const ordersData = JSON.parse(response.body);
                        console.log("📊 Orders data:", ordersData);

                        // 'orders' state'ini güncelleyin
                        setOrders(ordersData._embedded?.orderDtos || []);
                    } catch (error) {
                        console.error("❌ Error parsing orders data:", error);
                    }
                });

                // Sipariş verilerini almak için payload'ı gönderiyoruz
                stompClient.publish({
                    destination: "/app/orders", // Backend'de tanımladığınız endpoint
                    body: JSON.stringify(orderRequestDto)
                });
            },
            onStompError: (frame) => {
                console.error("❌ STOMP error:", frame.headers['message']);
                console.error("Additional details:", frame.body);
            },
        });

        stompClient.activate(); // Bağlantıyı başlat

        return () => stompClient.deactivate(); // Cleanup
    }, [page, size]); // page ve size değiştiğinde yeniden bağlanacak
    const playSound = () => {
        const audio = new Audio("/notification.mp3"); // Zil sesi dosyanız
        audio.play();
    };
    return { orders };
};

export default useWebSocket;