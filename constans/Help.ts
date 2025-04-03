// JSON verisini TypeScript olarak tanımla
export const helpItems = [
  {
    id: 1,
    title: "Popüler Sorular",
    icon: "FaStar",
    questions: [
      {
        id: 101,
        question: "Siparişimi nasıl takip ederim?",
        answer:
          "Siparişinizin durumunu;\n\n- Üye girişi yaptıktan sonra, ana sayfada sağ üst köşede bulunan hesabım ikonuna tıklayarak; 'Siparişlerim' bölümünden,\n\n- butonuna tıklayarak,\n\n- Siparişiniz kargo firmasına teslim edildiğinde size gönderilecek e-posta ve SMS bilgilendirmelerinde yer alan 'Kargo Takip Kodu’nuzla birlikte ilgili kargo firmasıyla iletişime geçerek veya websitesini ziyaret ederek,\n\nöğrenebilirsiniz...",
      },
      {
        id: 102,
        question: "Siparişimi iptal edebilir miyim?",
        answer: "Siparişiniz kargoya verilmeden önce iptal edebilirsiniz.",
      },
      {
        id: 103,
        question: "Değişim ve İade politika ve prosedürleriniz nelerdir?",
        answer:
          "Arzuamber müşterisiyseniz değerlisiniz çünkü müşterilerimizin memnuniyeti ve beklentileri bizim için önemlidir bu nedenle değişim ve iade güvenceniz bulunmaktadır. Herhangi bir nedenle siparişinizden memnun kalmazsanız, satın aldığınız ürün ya da ürünlerinizi, orijinal ambalajında, kullanılmamış ve etiketleri çıkarılmamış olması koşuluyla teslim aldığınız tarihten itibaren 15 gün içinde değişim ve iade işlemi için geri gönderebilirsiniz. \n\nDeğişim işlemleriniz için gönderdiğiniz ürünün faturadaki satın alım fiyatı kadar hesabınıza bakiye tanımlanır. Bakiyeniz ile tekrardan sipariş verebilirsiniz. İade işlemlerinde, siparişin size ulaşması için kargo firmasına ödenen kargo bedeli iade edilememektedir.\n\nİade sürecinizi, hesabınıza giriş yaptıktan sonra 'İade Taleplerim' alanından ilgili siparişe ulaşarak veya anasayfada bulunan 'Kolay İade' sayfamızı ziyaret ederek gerçekleştirebilirsiniz. İade işlemlerinizde bu sayfadan alacağınız iade kodu ile kargonuzu 'MNG Kargo' aracılığıyla ücretsiz olarak gönderebilirsiniz. Değişim veya iade kargonuzu başka bir kargo firması ile göndermek isterseniz kargo ücretinin sizin tarafınızdan karşılanması gerektiğini unutmayınız.\n\nTürkiye’den yapacağınız değişim ve iade gönderilerinde MNG Kargo'yu tercih ederseniz gönderim ücreti alınmamaktadır. Yurtdışından verdiğiniz siparişlerinizin değişim ve iade işlemleri tarafınıza aittir. Etiketi koparılmış, kullanılmış, tekrar satışa sunulamayacak şekilde zarar görmüş ürünlerin değişim ve iade işlemi gerçekleştirilememektedir.",
      },
      {
        id: 104,
        question: "Kapıda ödeme yapabilir miyim?",
        answer:
          "Rahat ve kolay bir şekilde alışverişinizi hızlıca tamamlamanız için Kapıda Nakit ve Kapıda Kartlı ödeme hizmetimiz bulunmaktadır. Türkiye'nin her yerine Kapıda Ödemeli gönderim yapmaktayız.\n\n*Kapıda ödeme hizmeti MNG Kargo ile vereceğiniz siparişlerinizde geçerlidir.",
      },
      {
        id: 105,
        question: "Şifremi unuttum, ne yapmalıyım?",
        answer:
          "Şifrenizi unutmanız durumunda 'Üye Giriş' sayfasında yer alan 'Şifremi Unuttum' bağlantısına tıklayabilirsiniz. Hesabınıza ait e-posta adresini yazdıktan sonra güvenlik kutucuğunu doldurarak tekrar şifre talebinde bulunabilirsiniz.",
      },
      {
        id: 106,
        question: "Üyelik bilgilerimi nasıl güncelleyebilirim?",
        answer:
          "Üyelik bilgilerinizi güncellemek için 'Hesabım' sayfasını ziyaret edebilirsiniz.",
      },
      {
        id: 107,
        question: "Kargo ücretleri nelerdir?",
        answer:
          "Siparişinize ait kargo ücreti seçmiş olduğunuz gönderim ülkesine ve seçtiğiniz kargo firmasına göre değişiklik göstermektedir. Siparişinize ait kargo ücretini adres adımındaki kargo seçim ekranında ve ödeme sayfanızda görebilirsiniz.",
      },
      {
        id: 108,
        question: "Siparişim ne zaman kargoya verilir?",
        answer:
          "Siparişlerinizdeki tüm ürünler hızlı kargo için uygunluk sağlıyorsa, siparişlerinizi 24 saat içerisinde ilgili kargo firmasına teslim etmek üzere hazırlıyoruz. Siparişinizde tedarik edilmesi gereken ürün/ürünler olması durumunda kargoya verilme sürelerinde değişkenlik olabilmektedir. Ürünlerin tahmini kargoya teslim tarihlerini ürün detay sayfasında beden seçimi yaptıktan sonra görebilirsiniz.",
      },
      {
        id: 109,
        question: "Stoklarınız ne sıklıkla güncelleniyor?",
        answer:
          "arzuamber.com’a her gün yeni ürünler geldiği gibi tükenen ve talep gören ürünlerin de stokları yenileniyor. Beğendiğiniz fakat yeterli stok bulunmadığı için sipariş veremediğiniz ürünün stoğa geldiğinde haberdar olmak için ürün detay sayfasında 'Stoğa Gelince Haber Ver' özelliğimizi kullanabilirsiniz. Daha fazla yeni ürün ve yenilenen stoklar için ise online mağazamızı daha sık ziyaret edebilirsiniz.",
      },
      {
        id: 110,
        question: "Ödeme seçenekleriniz nelerdir?",
        answer:
          "Kapıda Ödeme, Kredi Kartı ve Debit Kart ödeme seçeneklerimiz mevcuttur. Havale yöntemi ile ödeme kabul edilmemektedir.\n\nKapıda Ödeme siparişlerinde 24,99 TL tutarında Kapıda Ödeme Hizmet Bedeli bulunmaktadır.",
      },
      {
        id: 111,
        question: "İade işlemlerinde kesinti gerçekleşiyor mu?",
        answer:
          "Siparişinizin size ulaşması için kargo firmasına ödenen taşımacılık bedeli iade edilememektedir. Ocak 2025 itibariyle bu tutar 99 TL'dir.",
      },
      {
        id: 112,
        question: "Toptan satışınız var mı?",
        answer:
          "20.000 Türk Lirası ve üzerindeki siparişleriniz için toptan satış politikalarımız uygulanmaktadır. Toptan alımlarınız ile ilgili detaylı bilgi alabilmek için WhatsApp Müşteri Hizmetleri numaramız +90 553 887 03 72 ‘dan bizimle iletişime geçebilirsiniz.",
      },
      {
        id: 113,
        question: "Bayilik/Franchise veriyor musunuz?",
        answer:
          "Arzuamber markası olarak bayilik, franchise vb. iş birliklerimiz bulunmamaktadır.",
      },
      {
        id: 114,
        question: "Sitenizden başka stok var mı?",
        answer:
          "Satışa sunulabilir ürünlerimizin stoklarının tamamı online mağazamız ile sınırlıdır. Başka bir stok veya mağaza stokları satışa sunulmamaktadır.",
      },
      {
        id: 115,
        question:
          "Kargo şubesinden teslim aldığım sipariş için kargo ücreti öder miyim?",
        answer:
          "Kargo ücretleri vermiş olduğunuz siparişinizin taşımacılık bedeli olduğu için kapınıza teslim edilmesi veya şubeden teslim alınması ile ücret farkı oluşmamaktadır. Kapıda Ödeme siparişlerde kargo şubesinden ödeme yaparak aldığınızda da Kapıda Ödeme Hizmet Aracılık Bedeli tahsil edilmektedir.",
      },
      {
        id: 116,
        question: "Sitenizdeki tüm ürünler mağazalarda da mevcut mu?",
        answer:
          "arzuamber.com on binlerce adetten fazla seçenek ve yüz binlerce adetten fazla stok ile satış yapmaktadır. Ne yazık ki burada görmüş olduğunuz ürünlerin tamamını fiziksel mağazalarımıza sığdıramıyoruz. Beğendiğiniz ürünlerin mağazalarımızdaki stok durumlarını öğrenmek için ilgili mağazanın telefon numarası üzerinden iletişime geçebilirsiniz.",
      },
      {
        id: 117,
        question: "Sepetimdeki ürünler tükenir mi?",
        answer:
          "Sepetinize eklediğiniz ürünler için stok revizesi yapılamamaktadır. Sepetinize eklediğiniz ürünü satın almadığınız sürece tükenme ihtimali bulunmaktadır.",
      },
      {
        id: 118,
        question: "Üye olmadan sipariş verebilir miyim?",
        answer:
          "Üye olmadan sipariş verebilirsiniz. Bunun için ürün sayfalarından satın almak istediğiniz ürünleri sepete ekleyerek, 'Siparişi Tamamla' adımında karşınıza çıkan ekrandan 'Üye Olmadan Devam Et' demeniz yeterli. Üye olmadan verdiğiniz siparişe ait bilgilendirme mesajlarınız ise sistemde verdiğiniz telefon ve e-posta adresine gönderilecektir.",
      },
    ],
  },
  {
    id: 2,
    title: "Alışveriş",
    icon: "FaMoneyBillWave",
    questions: [
      {
        id: 1,
        question: "Nasıl sipariş verebilirim?",
        answer: `Aşağıdaki adımları izleyerek kolayca sipariş verebilirsiniz:\n
  1- Ana sayfamızda yer alan son eklenen ürünler dahil, sizin için özenle hazırlanan koleksiyonlara ve ürünlere göz atın.\n
  2- Satın almak istediğiniz ürünleri, uygun bedenleri seçerek 'Sepete Ekle' butonuna tıklayın. (Size uygun beden seçimi için ürün detay sayfasındaki 'Beden Tablosu' alanından yararlanabilirsiniz.)\n
  3- Ürünleri sepetinize ekledikten sonra, ekranın sağ üst köşesinde yer alan "Sepetim" simgesine tıklayın.\n
  4- Devam etmek için “Güvenle Satın Al” butonuna tıklayın.\n
  5- Kargo adresi alanını detaylı ve doğru bir şekilde doldurun. Tercih ettiğiniz ödeme yöntemini seçin. Gerekli bilgileri doldurarak "Siparişi Tamamla" butonuna tıklayın. İşlem tamam; siparişiniz alınmıştır! Güle güle kullanın :)`,
      },
      {
        id: 2,
        question: "Toptan satışınız var mı?",
        answer: `5.000 Türk Lirası ve üzerindeki siparişleriniz için toptan satış politikalarımız uygulanmaktadır. Toptan alımlarınız ile ilgili detaylı bilgi alabilmek için WhatsApp Müşteri Hizmetleri numaramız +90 553 887 03 72 ‘dan bizimle iletişime geçebilirsiniz.`,
      },
      {
        id: 3,
        question: "Sitenizden başka stok var mı?",
        answer: `Satışa sunulabilir ürünlerimizin stoklarının tamamı online mağazamız ile sınırlıdır. Başka bir stok veya mağaza stokları satışa sunulmamaktadır.`,
      },
      {
        id: 4,
        question: "Üye olmadan sipariş verebilir miyim?",
        answer: `Üye olmadan sipariş verebilirsiniz. Bunun için ürün sayfalarından satın almak istediğiniz ürünleri sepete ekleyerek, 'Siparişi Tamamla' adımında karşınıza çıkan ekrandan 'Üye Olmadan Devam Et' demeniz yeterli. Üye olmadan verdiğiniz siparişe ait bilgilendirmeleri, sipariş esnasında paylaştığınız e-posta adresinden ve cep telefonu numaranızdan takip edebilirsiniz. Siparişlerinize ait bilgilere erişebilmek için üye olarak sipariş vermenizi tavsiye ederiz.`,
      },
      {
        id: 5,
        question: "Alışverişimi tamamlarken hata alırsam ne yapmalıyım?",
        answer: `Arzuamber olarak her zaman hatasız ve %100 güvenli bir alışveriş deneyimi sunmak için çabalıyoruz, fakat bazen alışverişinizi tamamlarken bazı teknik hatalar ile karşılaşabilirsiniz. Bu gibi durumlarda sizlere en kısa sürede yardımcı olabilmemiz adına bizimle iletişime geçmenizi öneriyoruz. Bizlere iletişim sayfamız üzerinden ulaşabilirsiniz.`,
      },
      {
        id: 6,
        question:
          "Stoğu tükenen ürünler tekrar satışta olduğunda nasıl haberdar olurum?",
        answer: `Web sitemizden 'Ürün Detay' sayfasında beden seçenekleri arasında tükenen bedene tıkladıktan sonra 'Gelince Haber Ver' butonuna tıklamanız yeterlidir, ürün tekrar geldiğinde sizlere bilgi verilir.`,
      },
      {
        id: 7,
        question: "Sepetimdeki ürünler tükenir mi?",
        answer: `Sepetinize eklediğiniz ürünler için stok revizesi yapılamamaktadır. Sepetinize eklediğiniz ürünü satın almadığınız sürece tükenme ihtimali bulunmaktadır.`,
      },
    ],
  },
  {
    id: 3,
    title: "Ödeme",
    icon: "FaCreditCard",
    questions: [
      {
        id: 1,
        question: "Kapıda ödeme seçeneğiniz var mı?",
        answer: `Elbette, kapıda ödeme seçeneği müşterilerimize sunuyoruz. Rahat ve kolay bir şekilde alışverişinizi hızlıca tamamlamanız için 'Kapıda Nakit ve Kapıda Kartlı' ödeme hizmetimizi tercih edebilirsiniz. Türkiye'nin her yerine Kapıda Ödemeli gönderim yapmaktayız. Kapıda ödeme hizmetimiz MNG Kargo ile vereceğiniz siparişlerinizde geçerlidir ve kargo firması tarafından 24,99 TL tutarında hizmet bedeli talep edilmektedir.`,
      },
      {
        id: 2,
        question: "Kredi kartımı kaydediyor musunuz?",
        answer: `Yapacağınız ödemelerde kredi kartı bilgileriniz hiçbir şekilde bizimle paylaşılmammaktadır. Ayrıca arzuamber.com olarak kart saklama, kart kaydetme gibi hizmetler sunmuyoruz. Kısacası kart bilgileriniz kaydedilmiyor. Fakat ödeme partnerimiz olan ödeme kuruluşu iyzico'nun kart kaydetme özelliği var, bu özelliği ödeme adımında iyzico ödeme sayfasında görebilirsiniz. Bu kutucuğu işaretlerseniz bir sonraki ödemelerinizde kolayca işlem yapabilmeniz için kart bilgileriniz iyzico güvencesinde şifrelenerek saklanılmaktadır.`,
      },
      {
        id: 3,
        question: "Kredi kartıyla ödeme yaparken güvende miyim?",
        answer: `Evet tamamen güvendesiniz. arzuamber.com'da en yüksek güvenlik sistemi olan yeşil bar (ev ssl) uygulaması bulunmaktadır. 128 bit şifreleme ile iletilen bilgilerin güvenliğini sağlayan en iyi SSL Sertifikası kullanılır. Ödeme adımında kart bilgileriniz kesinlikle üçüncü kişiler tarafından görülemez. Ayrıca ödeme işlemlerinizi de iyzico güvencesiyle sağlamaktasınız. Tüm işlemlerde 3D Secure sistemi kullanılır. 3D Secure, online alışverişlerin güvenliğini sağlamak amacıyla kart kuruluşları tarafından geliştirilmiş bir kimlik doğrulama sitemidir.`,
      },
      {
        id: 4,
        question: "Havale ile ödeme yapabilir miyim?",
        answer: `Siparişlerinizin ödemelerini sadece Kapıda Nakit Ödeme, Kapıda Kart Ödeme veya Kredi Kartı ve Banka Kartı ile gerçekleştirebilirsiniz.`,
      },
    ],
  },
  {
    id: 4,
    title: "Kargo & Teslimat",
    icon: "FaShippingFast",
    questions: [
      {
        id: 1,
        question: "Siparişim ne zaman kargoya verilir?",
        answer: `Siparişinizdeki tüm ürünler hızlı kargo için uygunluk sağlıyorsa, siparişinizi 24 saat içerisinde ilgili kargo firmasına teslim etmek üzere hazırlıyoruz. Siparişinizde tedarik edilmesi gereken ürün/ürünler olması durumunda kargoya verilme sürelerinde değişkenlik olabilmektedir. Ürünlerin kargoya teslim tarihlerini ürün detay sayfasında beden seçimi yaptıktan sonra görebilirsiniz.`,
      },
      {
        id: 2,
        question: "Siparişim ne zaman teslim edilir?",
        answer: `Satın aldığınız ürünlerin tahmini teslim tarihlerine göre en hızlı şekilde size ulaşacak şekilde gönderim sağlanır. Siparişiniz dağıtıma çıktığında kargo firmasından tarafınıza SMS ile bilgilendirme sağlanır. Siparişiniz kargoya verildikten sonra siparişiniz kargo aşamalarını 'Kargom Nerede?' linkinden takip edebilirsiniz.`,
      },
      {
        id: 3,
        question: "Kargo ücretleri nelerdir?",
        answer: `Siparişinize ait kargo ücreti seçmiş olduğunuz gönderim ülkesine ve seçtiğiniz kargo firmasına göre değişiklik göstermektedir. Siparişinize ait kargo ücretini adres adımındaki kargo seçim ekranında ve ödeme sayfanızda görebilirsiniz.`,
      },
      {
        id: 4,
        question:
          "Kargo şubesinden teslim aldığım sipariş için kargo ücreti öder miyim?",
        answer: `Kargo ücretleri vermiş olduğunuz siparişinizin taşımacılık bedeli olduğu için kapınıza teslim edilmesi veya şubeden teslim alınması ile ücret farkı oluşmamaktadır. Kapıda Ödeme siparişlerde kargo şubesinden ödeme yaparak aldığınızda da Kapıda Ödeme Hizmet Aracılık Bedeli tahsil edilmektedir.`,
      },
      {
        id: 5,
        question: "Kargomu teslim alırken nelere dikkat etmeliyim?",
        answer: `Siparişinizin güvenli bir şekilde size ulaşmasını sağlamak önceliğimizdir.\n\n*Siparişinizin bize iade edilmemesi için 3 gün içerisinde (Kargo firmasına göre değişiklik gösterebilir.) paketinizi belirtilen şubeden almanızı öneririz.`,
      },
      {
        id: 6,
        question: "Kargomu şubeden teslim alabilir miyim?",
        answer: `Kargo takip numaranız ile birlikte, kargo firması ile iletişime geçerek kargonuz şubeden teslim almak istediğinizi belirtebilirsiniz.`,
      },
      {
        id: 7,
        question: "Resmi tatil günlerinde teslimat yapılıyor mu?",
        answer: `Kargo firmaları hafta içi 09:00-18:00 arasında, Cumartesi günleri ise 09:00-13:00 saatleri arasında teslimat yapar. Pazar günleri ve resmi tatil günlerinde teslimat yapılmaz. Aynı Gün Teslimat veya Kuriye Teslimat seçeneklerinde teslimat günleri ve saatleri değişiklik gösterebilir.`,
      },
      {
        id: 8,
        question: "Hangi kargo firmalarıyla çalışıyorsunuz?",
        answer: `Türkiye gönderilerimizde sözleşmeli olduğumuz kargo firmalarımız:\n\n-MNG Kargo\n-Kargoist\n-Scotty\n-Sendeo\n-Cartell Kargo (Aynı gün teslimat servis ücreti 49.99 TL'dir)`,
      },
      {
        id: 9,
        question: "Siparişimi nasıl takip ederim?",
        answer: `Sipariş durumunu;\n\n-Üye girişi yaptıktan sonra, ana sayfada sağ üst köşede bulunan hesabım ikonuna tıklayarak; "Siparişlerim" bölümünden,\n\n-Ana sayfada bulunan "Kargom Nerde" butonuna tıklayarak,\n\n-Siparişiniz kargo firmasına teslim edildiğinde size gönderilecek e-posta ve SMS bilgilendirmelerinde yer alan "Kargo Takip Kodunuzla" birlikte ilgili kargo firmasıyla iletişime geçerek veya web sitesini ziyaret ederek, öğrenebilirsiniz...`,
      },
    ],
  },
  {
    id: 5,
    title: "İptal & İade & Değişim",
    icon: "FaUndoAlt",
    questions: [
      {
        id: 1,
        question: "Değişim ve İade politika ve prosedürleriniz nelerdir?",
        answer:
          "Arzuamber müşterisiyseniz değerlisiniz çünkü müşterilerimizin memnuniyeti ve beklentileri bizim için önemlidir. Bu nedenle değişim ve iade güvenceniz bulunmaktadır. Herhangi bir nedenle siparişinizden memnun kalmazsanız, satın aldığınız ürün ya da ürünlerinizi, orijinal ambalajında, kullanılmamış ve etiketleri çıkarılmamış olması koşuluyla teslim aldığınız tarihten itibaren 14 gün içinde değişim ve iade işlemi için geri gönderebilirsiniz. Değişim işlemleriniz için gönderdiğiniz ürünün faturadaki satın alım fiyatı kadar hesabınıza bakiye tanımlanır. Bakiyeniz ile tekrardan sipariş verebilirsiniz. İade işlemlerinde, siparişin size ulaşması için kargo firmasına ödenen kargo bedeli iade edilememektedir.",
      },
      {
        id: 2,
        question: "Değişim ve İade işlemini nasıl yapabilirim?",
        answer:
          "İade ve değişim sürecinizi, hesabınıza giriş yaptıktan sonra 'İade Taleplerim' alanından ilgili siparişinize ulaşarak veya anasayfada bulunan 'Kolay İade' sayfamızı ziyaret ederek gerçekleştirebilirsiniz. Değişim işlemleri için gönderdiğiniz ürünlerin faturanızda yazan tutarı hesabınıza bakiye olarak tanımlanır. Yeni siparişinizi bu bakiye ile oluşturabilirsiniz.",
      },
      {
        id: 3,
        question: "Değişim ve İade kargo masraflarını ben mi ödeyeceğim?",
        answer:
          "'Kolay İade' sayfasından alacağınız iade kodu ile kargonuzu 'MNG Kargo' aracılığıyla ücretsiz olarak gönderebilirsiniz. Değişim veya iade kargonuzu başka bir kargo firması ile göndermek isterseniz kargo ücretinin sizin tarafınızdan karşılanması gerektiğini unutmayınız. Yurt dışından verdiğiniz siparişlerinizin değişim ve iade işlemleri tarafınıza aittir. Etiketi koparılmış, kullanılmış, tekrar satışa sunulamayacak şekilde zarar görmüş ürünlerin değişim ve iade işlemi gerçekleştirilmemektedir.",
      },
      {
        id: 4,
        question: "İade işlemlerinde kesinti gerçekleşiyor mu?",
        answer:
          "Siparişinizin size ulaşması için kargo firmasına ödenen taşımacılık bedeli iade edilememektedir. Ocak 2025 itibariyle bu tutar 99 TL'dir. Ürünlerin size ulaşması amacıyla ödediğiniz Kargo Ücreti ve Kapıda Ödemeli siparişlerinizde tahsil edilen Kapıda Ödeme Hizmet Bedeli iade edilmemektedir.",
      },
    ],
  },
  {
    id: 6,
    title: "Gizlilik & Güvenlik",
    icon: "BiShieldAlt",
    questions: [
      {
        id: 1,
        question:
          "Arzuamber'in kişisel verileri toplamasının yasal dayanağı nedir?",
        answer:
          "Müşterilerimizin kişisel verilerinin kullanılması konusunda çeşitli kanunlarda düzenlemeler bulunmaktadır. En başta KVKK ile kişisel verilerin korunması esasları belirlenmiştir. Ayrıca 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun da kişisel verilerin korunmasına ilişkin hüküm içermektedir. 5237 Sayılı Türk Ceza Kanunu hükümleri yoluyla da kişisel verilerin korunması için bazı hallerde cezai yaptırımlar öngörülmüştür. Diğer yandan, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'nden doğan yükümlülüklerimizin ifası amacıyla verilerin toplanması ve kullanılması gerekmektedir.",
      },
      {
        id: 2,
        question:
          "Arzuamber kişisel verilerin toplanmasında hangi yöntemleri kullanıyor?",
        answer:
          "www.arzuamber.com web sitesinden veya mobil uygulamalardan işlem yapan müşterilerimizin verdikleri veriler, müşterilerimizin rızaları ve mevzuat hükümleri uyarınca Arzuamber tarafından işlenmektedir. Arzuamber'e ait olan www.arzuamber.com web sitesi çerez (cookie) kullanan bir sitedir. Çerez; kullanılmakta olan cihazın internet tarayıcısına ya da sabit diskine depolanarak söz konusu cihazın tespit edilmesine olanak tanıyan, çoğunlukla harf ve sayılardan oluşan bir dosyadır. www.arzuamber.com ziyaretçilerine daha iyi hizmet verebilmek amacıyla ve yasal yükümlülüğü çerçevesinde, işbu Kişisel Verilerin Korunması Hakkında Açıklama metninde belirlenen amaçlar ve kapsam dışında kullanılmamak kaydı ile gezinme bilgilerinizi toplayacak, işleyecek, üçüncü kişilerle paylaşacak ve güvenli olarak saklayacaktır.",
      },
      {
        id: 3,
        question: "İnternet Sitesi Çerezleri Nasıl Kullanılmaktadır?",
        answer:
          "www.arzuamber.com çerezleri; yaptığınız tercihleri hatırlamak ve web sitesi/mobil uygulama kullanımınızı kişiselleştirmek için kullanır. Bu kullanım parolanızı kaydeden ve web sitesi/mobil uygulama oturumunuzun sürekli açık kalmasını sağlayan, böylece her ziyaretinizde birden fazla kez parola girme zahmetinden kurtaran çerezleri ve web sitesi/mobil uygulamaya daha sonraki ziyaretlerinizde sizi hatırlayan ve tanıyan çerezleri içerir.",
      },
      {
        id: 4,
        question:
          "İnternet Sitesi üçüncü taraf çerezlerini reklam ve yeniden hedefleme için nasıl kullanmaktadır?",
        answer:
          "www.arzuamber.com web sitesi çerezleri ayrıca; arama motorlarını, web sitesi, mobil uygulamasını ve/veya web sitesinin reklam verdiği internet sitelerini ziyaret ettiğinizde ilginizi çekebileceğini düşündüğü reklamları size sunabilmek için 'reklam teknolojisini' devreye sokmak amacıyla kullanabilir. Reklam teknolojisi, size özel reklamlar sunabilmek için web sitesine/mobil uygulamaya ve web sitesinin reklam verdiği web sitelerine/mobil uygulamalarına yaptığınız önceki ziyaretlerle ilgili bilgileri kullanır.",
      },
      {
        id: 5,
        question: "Arzuamber kişisel verileri hangi amaçlarla kullanıyor?",
        answer:
          "Arzuamber, mevzuatın izin verdiği durumlarda ve ölçüde kişisel bilgilerinizi kaydedebilecek, saklayabilecek, güncelleyebilecek, üçüncü kişilere açıklayabilecek, devredebilecek, sınıflandırabilecek ve işleyebilecektir. Kişisel verileriniz şu amaçlarla kullanılmaktadır: Web sitesi/mobil uygulamalar üzerinden alışveriş yapanın/yaptıranın kimlik bilgilerini teyit etmek, iletişim için adres ve diğer gerekli bilgileri kaydetmek, mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun'un ilgili maddeleri tahtında akdettiğimiz sözleşmelerin koşulları, güncel durumu ve güncellemeler ile ilgili müşterilerimiz ile iletişime geçmek, gerekli bilgilendirmeleri yapabilmek.",
      },
      {
        id: 6,
        question: "Arzuamber kişisel verilerinizi nasıl koruyor?",
        answer:
          "Arzuamber, kişisel verilerinizin gizliliğini ve bütünlüğünü korumak için gerekli tüm organizasyonu kurmuş ve teknik önlemleri almıştır. Periyodik olarak sızma testleri yapılmakta ve veri işleme politikaları sürekli güncellenmektedir.",
      },
      {
        id: 7,
        question: "Arzuamber kişisel verilerinizi paylaşıyor mu?",
        answer:
          "Arzuamber, kişisel verilerinizi üçüncü kişilerle sadece sizin izninizle ve yasal yükümlülükler çerçevesinde paylaşır. Verileriniz, anlaşmalı kurumlar ve yasal zorunluluklar nedeniyle üçüncü şahıslarla paylaşılabilir.",
      },
      {
        id: 8,
        question:
          "Kişisel Verilerin Korunması Kanunu'ndan doğan haklarınız nelerdir?",
        answer:
          "KVKK'ya göre, kişisel verilerinizi öğrenme, düzeltme, silme ve üçüncü kişilere aktarılmasıyla ilgili haklarınız bulunmaktadır. Ayrıca, otomatik sistemlerle yapılan işlemlere itiraz etme hakkınız da vardır.",
      },
      {
        id: 9,
        question:
          "Kişisel verilerle ilgili mevzuat değişikliklerinden nasıl haberdar olabilirim?",
        answer:
          "Arzuamber, KVKK'ya uygun olarak kişisel verilerinizi işler ve mevzuat değişikliklerinden haberdar olmak için bu sayfada sürekli güncellemeler yapar. Yapılan değişiklikleri buradan takip edebilirsiniz.",
      },
      {
        id: 10,
        question:
          "Verinin güncel ve doğru tutulduğundan nasıl emin olabilirim?",
        answer:
          "KVKK'nın gerektirdiği şekilde, Arzuamber kişisel verilerinizi doğru ve güncel tutmakla yükümlüdür. Verilerinizde bir değişiklik olduğunda, bizimle iletişime geçerek güncelleyebilirsiniz.",
      },
      {
        id: 11,
        question:
          "Arzuamber'e kişisel verilerinizle ilgili soru sormak ister misiniz?",
        answer:
          "Kişisel verilerinizle ilgili sorularınız için destek@arzuamber.com e-posta adresine dilediğiniz zaman ulaşabilirsiniz.",
      },
    ],
  },
];
