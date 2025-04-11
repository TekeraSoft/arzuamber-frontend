import axios from "axios";

export default async function sendWhatsappMessage({ gsmNumber, basketItems }) {
  try {
    const formattedNumber = gsmNumber.replace(/\D/g, ""); // + ve boşluklardan kurtul

    // Sepet içeriğini formatla
    const itemsText = basketItems
      .map(
        (item) => `- ${item.name} | Beden: ${item.size} | Renk: ${item.color}`,
      )
      .join("\n");

    // Tüm mesaj metni
    const messageBody = `Merhaba, siparişimle ilgilenir misiniz?\n\nSipariş Detayları:\n${itemsText}`;

    // WhatsApp API isteği
    await axios.post(
      "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages",
      {
        messaging_product: "whatsapp",
        to: formattedNumber,
        type: "text",
        text: {
          body: messageBody,
        },
      },
      {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "Mesaj gönderilemedi:",
      error?.response?.data || error.message,
    );
  }
}
