# FİTBRO - Sağlıklı Yaşam Takibi

FİTBRO, kullanıcıların günlük spor ve yemek takibini yaparak sağlıklı alışkanlıklar kazanmasını sağlayan modern web uygulamasıdır.

## 🎯 Özellikler

### 👤 Kullanıcı Yönetimi
- **Kayıt ve Giriş**: Kullanıcı adı, e-posta ve şifre ile hesap oluşturma
- **Kişisel Alan**: Her kullanıcının kendi spor ve yemek verileri
- **Oturum Yönetimi**: Güvenli giriş/çıkış sistemi

### 💪 Spor Takibi
- **Günlük Egzersiz Listesi**: Şınav, mekik, plank, squat, burpee
- **İlerleme Takibi**: Tamamlanan egzersizlerin işaretlenmesi
- **Başarı Sistemi**: Günlük hedefi tamamlayınca tebrik mesajı
- **Görsel Geri Bildirim**: Tamamlanan egzersizler yeşil renkte gösterilir

### 🍽️ Yemek Takibi
- **Kalori Girişi**: Yemek adı ve kalori miktarı ekleme
- **Günlük Liste**: Bugün yenen yemeklerin listesi
- **Toplam Kalori**: Günlük toplam kalori hesaplama
- **Hedef Uyarısı**: 2000 kcal üzerine çıkınca uyarı
- **Yemek Silme**: Sağ tık ile yemek silme özelliği

### 📊 Veri Yönetimi
- **LocalStorage**: Kullanıcı verileri tarayıcıda güvenli şekilde saklanır
- **Günlük Kayıtlar**: Her gün için ayrı spor ve yemek kayıtları
- **Başarı Geçmişi**: Tamamlanan hedeflerin kaydı

## 🚀 Kurulum ve Kullanım

### 1. Dosyaları İndirin
```bash
# Proje dosyalarını bilgisayarınıza indirin
index.html
style.css
script.js
```

### 2. Tarayıcıda Açın
- `index.html` dosyasını herhangi bir modern web tarayıcısında açın
- Uygulama otomatik olarak yüklenecektir

### 3. Hesap Oluşturun
- "Kayıt Ol" butonuna tıklayın
- Kullanıcı adı, e-posta ve şifre girin
- Kayıt tamamlandığında otomatik giriş yapılır

### 4. Kullanmaya Başlayın
- **Spor Takibi**: Egzersizleri işaretleyin, "Sporu Bitir" ile hedefi kontrol edin
- **Yemek Takibi**: Yemek adı ve kalori girerek günlük takip yapın

## 📱 Mobil Uyumluluk

FİTBRO tamamen responsive tasarıma sahiptir:
- **Mobil Cihazlar**: Telefon ve tabletlerde mükemmel görünüm
- **Dokunmatik Optimizasyon**: Mobil cihazlarda kolay kullanım
- **Adaptif Tasarım**: Farklı ekran boyutlarına uyum

## 🎨 Tasarım Özellikleri

- **Modern Arayüz**: Gradient arka plan ve yumuşak gölgeler
- **Kullanıcı Dostu**: Sezgisel navigasyon ve temiz tasarım
- **Renk Kodlaması**: 
  - Yeşil: Hedef altında kalori
  - Turuncu: Hedef yakınında kalori
  - Kırmızı: Hedef üzerinde kalori

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler
- **HTML5**: Semantik yapı ve modern formlar
- **CSS3**: Flexbox, Grid, Animasyonlar ve Responsive tasarım
- **JavaScript (ES6+)**: Modern JavaScript özellikleri
- **LocalStorage API**: Veri saklama

### Veri Yapısı
```javascript
// Kullanıcı Verisi
{
  id: "unique_id",
  username: "kullanici_adi",
  email: "email@example.com",
  password: "sifre",
  createdAt: "2024-01-01T00:00:00.000Z"
}

// Kullanıcı Aktivite Verisi
{
  completedWorkouts: {
    "Mon Jan 01 2024": [0, 1, 2], // Tamamlanan egzersiz indeksleri
  },
  meals: {
    "Mon Jan 01 2024": [
      { name: "Kahvaltı", calories: 300, time: "08:30:00" }
    ]
  },
  achievements: [
    { date: "Mon Jan 01 2024", type: "daily_workout", message: "..." }
  ]
}
```

## 🔮 Gelecek Özellikler

### Planlanan Geliştirmeler
- **Bulut Senkronizasyon**: Firebase ile gerçek kullanıcı yönetimi
- **İstatistikler**: Haftalık/aylık grafikler ve analizler
- **Bildirimler**: Push notification desteği
- **Sosyal Özellikler**: Arkadaş ekleme ve karşılaştırma
- **Özelleştirme**: Kişisel hedef ayarlama

### Android Uygulaması
- **Cordova/Capacitor**: Web uygulamasını Android'e sarma
- **Play Store**: Google Play Store'da yayınlama
- **Native Özellikler**: Kamera, GPS, sensör entegrasyonu

## 🐛 Bilinen Sorunlar

- Veriler sadece aynı tarayıcıda saklanır (farklı cihazlarda erişilemez)
- Şifreler plain text olarak saklanır (güvenlik için hash'lenmeli)
- Offline çalışma desteği sınırlı

## 📞 Destek

Herhangi bir sorun yaşarsanız veya önerileriniz varsa:
- GitHub Issues üzerinden bildirim yapabilirsiniz
- E-posta ile iletişime geçebilirsiniz

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**FİTBRO** ile sağlıklı yaşam hedeflerinize ulaşın! 💪 