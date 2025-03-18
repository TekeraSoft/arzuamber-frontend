import { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (page, size) => {
    const [orders, setOrders] = useState([]); // Siparişleri tutan state
    const audioRef = useRef(null); // 🎵 Audio nesnesini tutacak referans
    const previousOrderCountRef = useRef(0); // Önceki sipariş sayısını tutacak referans

    useEffect(() => {
        const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URI);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, function () {

            // 🔔 Yeni siparişleri dinle
            stompClient.subscribe("/topic/orders", function (res) {
                const newOrder = JSON.parse(res.body);

                setOrders((prevOrders) => [newOrder, ...prevOrders]); // Yeni siparişi listeye ekle
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    useEffect(() => {
        // Sayfa açıldığında ses dosyasını yükle ama çalma
        const audio = new Audio("/audio/order-alert.mp3");
        audioRef.current = audio;

        // Ses engelini kaldırmak için kullanıcı tıklamasını bekle
        const unlockAudio = () => {
            audio.play().then(() => {
                audio.pause();
            }).catch(e => console.warn("🔇 Ses yüklenemedi:", e));

            document.removeEventListener("click", unlockAudio); // Tıklama sonrası engeli kaldır
        };

        document.addEventListener("click", unlockAudio);

        return () => {
            document.removeEventListener("click", unlockAudio); // Temizleme
        };
    }, []);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.warn("🔇 Ses çalma hatası:", e));
        }
    };

    return { orders }; // Siparişleri döndür
};

export default useWebSocket;