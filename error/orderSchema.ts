import * as yup from 'yup';

export const orderSchema = yup.object().shape({
    paymentCard: yup.object({
        cardHolderName: yup.string().required('Ad zorunlu alan !'),
        cardNumber: yup.string().min(16,'Minimum 16 karakter !').required('Kart numarası zorunlu alan !'),
        expireMonth: yup.string().min(2).max(2).required('Ay zorunlu alan !'),
        expireYear: yup.string().min(2).max(2).required('Yıl zorunlu alan !'),
        cvc: yup.string().min(3).max(3).required('CVC zorunlu alan !')
    }),
    buyer: yup.object({
        name: yup.string().required('Ad zorunlu alan !'),
        surname: yup.string().required('Soyad zorunlu alan !'),
        gsmNumber: yup.string().required('Gsm numarası zorunlu alan !'),
        email: yup.string().email('Lütfen mail formatında giriniz !').required('E-mail zorunlu alan !'),
    }),
    shippingAddress: yup.object({
        city: yup.string().required('Şehir zorunlu alan !'),
        state: yup.string().required('İlçe zorunlu alan !'),
        address: yup.string().required('Detaylı adres zorunlu alan !'),
        street: yup.string().required('Mahalle veya cadde zorunlu alan !'),
    })
})