import { useState } from 'react'

// Import 10 foto lokal dari folder src/image/
import foto1 from './image/foto1.jpg'
import foto2 from './image/foto2.jpg'
import foto3 from './image/foto3.jpg'
import foto4 from './image/foto4.jpg'
import foto5 from './image/foto5.jpg'
import foto6 from './image/foto6.jpg'
import foto7 from './image/foto7.jpg'
import foto8 from './image/foto8.jpg'
import foto9 from './image/foto9.jpg'
import foto10 from './image/foto10.jpg'
import foto11 from './image/foto11.jpg'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // State untuk Toggle Hamburger Menu Navbar Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // State untuk Filter Brand & Kategori
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // State untuk Modal Detail Produk & Opsi Varian
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('40')
  const [selectedColor, setSelectedColor] = useState('Classic')

  // State untuk Form Contact Me
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  // Data produk lengkap dengan Brand & Kategori
  const [products] = useState([
    { 
      id: 1, 
      name: 'Sepatu Adidas Samba OG', 
      brand: 'Adidas',
      category: 'Lifestyle',
      price: 450000, 
      image: foto1,
      description: 'Sepatu klasik legendaris dengan desain retro ikonik khas Adidas Originals. Nyaman dipakai seharian.' 
    },
    { 
      id: 2, 
      name: 'Sepatu Adidas Blue Samba', 
      brand: 'Adidas',
      category: 'Lifestyle',
      price: 275000, 
      image: foto2,
      description: 'Varian warna biru menawan dari lini Samba. Bikin OOTD-mu makin standout.' 
    },
    { 
      id: 3, 
      name: 'Sepatu Adidas Green Samba', 
      brand: 'Adidas',
      category: 'Running',
      price: 320000, 
      image: foto3,
      description: 'Sentuhan warna hijau segar memberikan kesan fresh dan youthful pada gaya streetwear-mu.' 
    },
    { 
      id: 4, 
      name: 'Sepatu Nike Air Force 1 Low', 
      brand: 'Nike',
      category: 'Sneakers',
      price: 450000, 
      image: foto4,
      description: 'Sneakers legendaris Nike Air Force 1 dengan sol tebal empuk dan upper kulit sintetis premium.' 
    },
    { 
      id: 5, 
      name: 'Sepatu Nike Air Jordan 1 Mid', 
      brand: 'Nike',
      category: 'Basketball',
      price: 550000, 
      image: foto5,
      description: 'Gaya high-top basket klasik yang diadaptasi sempurna untuk gaya hidup urban modern.' 
    },
    { 
      id: 6, 
      name: 'Sepatu Nike SB Blazer Mid', 
      brand: 'Nike',
      category: 'Skate',
      price: 320000, 
      image: foto6,
      description: 'Desain ramping ala skater dengan traksi luar biasa dan durabilitas tinggi.' 
    },
    { 
      id: 7, 
      name: 'Sepatu Puma Women s Velocity', 
      brand: 'Puma',
      category: 'Running',
      price: 550000, 
      image: foto7,
      description: 'Gaya high-top basket klasik yang diadaptasi sempurna untuk gaya hidup urban modern.' 
    },
    { 
      id: 8, 
      name: 'Sepatu Puma Zapatillas Unisex Park Lifestyle SD', 
      brand: 'Puma',
      category: 'Lifestyle',
      price: 1500000, 
      image: foto8,
      description: 'Desain ramping ala skater dengan traksi luar biasa dan durabilitas tinggi.' 
    },
    { 
      id: 9, 
      name: 'Sepatu Baskets CA Pro Classic', 
      brand: 'Puma',
      category: 'Basketball',
      price: 2000000, 
      image: foto9,
      description: 'Gaya high-top basket klasik yang diadaptasi sempurna untuk gaya hidup urban modern.' 
    },
    { 
      id: 10, 
      name: 'Sepatu Puma Slipstream Lo FG, Off White Green', 
      brand: 'Puma',
      category: 'Sneakers',
      price: 1500000, 
      image: foto10,
      description: 'Desain ramping ala skater dengan traksi luar biasa dan durabilitas tinggi.' 
    },  
    { 
      id: 11, 
      name: 'Sepatu Onitsuka Tiger Serang Orange', 
      brand: 'Onitsuka',
      category: 'Sneakers',
      price: 1000000, 
      image: foto11,
      description: 'Desain ramping ala skater dengan traksi luar biasa dan durabilitas tinggi.' 
    },  
    
  ])

  // Filter Produk berdasarkan Brand dan Kategori
  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesBrand && matchesCategory
  })

  const handleAddToCart = (product, size, color) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.size === size && item.color === color)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id && item.size === size && item.color === color 
            ? { ...item, qty: item.qty + 1 } 
            : item
        )
      }
      return [...prevCart, { ...product, qty: 1, size, color }]
    })
    setSelectedProduct(null)
  }

  const handleRemoveItem = (indexToRemove) => {
    setCart(prevCart => prevCart.filter((_, index) => index !== indexToRemove))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0)

  // Fungsi Checkout ke WhatsApp secara Otomatis
  const handleCheckoutWhatsApp = () => {
    const phoneNumber = "6287825677105" 
    
    let message = "Halo STORE.VALL, saya ingin memesan produk berikut:\n\n"
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   - Brand: ${item.brand}\n`
      message += `   - Size: ${item.size}\n`
      message += `   - Warna: ${item.color}\n`
      message += `   - Jumlah: ${item.qty} pcs\n`
      message += `   - Harga: Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n\n`
    })
    
    message += `*Total Pembelanjaan: Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`
    message += "Mohon info ketersediaan dan proses selanjutnya. Terima kasih!"

    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappURL, '_blank')
  }

  // Fungsi Kirim Pesan Contact Me ke WhatsApp
  const handleContactSubmit = (e) => {
    e.preventDefault()
    const phoneNumber = "6287825677105"
    let message = `Halo STORE.VALL, saya ada pertanyaan/pesan:\n\n`
    message += `*Nama:* ${contactForm.name}\n`
    message += `*Email/Kontak:* ${contactForm.email}\n`
    message += `*Pesan:* ${contactForm.message}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className={darkMode ? "dark bg-gray-900 text-gray-100 min-h-screen transition-colors duration-300" : "bg-gray-50 text-gray-900 min-h-screen transition-colors duration-300"}>
      
      {/* Custom Styles untuk Animasi Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }
      `}</style>

      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400 animate-fade-in">STORE.VALL</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer active:scale-95"
              title="Ganti Tema"
            >
              {darkMode ? 'Night' : 'Light'}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            >
              🛒 Keranjang ({totalItems})
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-indigo-600 text-white p-2.5 rounded-xl font-semibold shadow-md active:scale-95"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2.5 rounded-xl font-bold cursor-pointer active:scale-95 transition-colors"
              title="Menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 flex flex-col gap-3 animate-fade-in shadow-lg">
            <button 
              onClick={() => {
                setDarkMode(!darkMode)
                setIsMobileMenuOpen(false)
              }}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold px-4 py-3 rounded-xl text-sm text-center transition-all cursor-pointer"
            >
              {darkMode ? 'Mode Terang (Light)' : 'Mode Malam (Night)'}
            </button>
          </div>
        )}
      </header>

      {/* Hero Section dengan Animasi Fade-In & Floating */}
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={foto1} 
            alt="Hero Banner" 
            className="w-full h-full object-cover opacity-40 scale-105 filter brightness-90 contrast-110 animate-pulse-glow transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/95"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center animate-fade-in">
          <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-float">
            VALL COLLECTION
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold mt-6 mb-4 text-white tracking-tight leading-tight drop-shadow-lg">
            Welcome To My Store
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-8 font-medium max-w-2xl drop-shadow">
            Jelajahi koleksi eksklusif sepatu pilihan dari berbagai brand ternama dunia dengan kualitas terjamin dan harga terbaik.
          </p>
          <a 
            href="#katalog" 
            className="bg-white text-black hover:bg-gray-200 font-extrabold px-8 py-3.5 rounded-xl shadow-2xl transition-all duration-300 inline-block hover:scale-105 hover:shadow-indigo-500/20 active:scale-95"
          >
            Jelajahi Katalog Sekarang
          </a>
        </div>
      </section>

      {/* Brand Bar / Filter Brand */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:justify-center">
          <div className="flex sm:hidden w-full items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Filter Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['All', 'Nike', 'Adidas', 'Puma', 'Onitsuka'].map((brand) => (
                <option key={brand} value={brand}>
                  {brand === 'All' ? 'ALL BRANDS' : brand}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-16 overflow-x-auto scrollbar-none">
            {['All', 'Nike', 'Adidas', 'Puma', 'Onitsuka'].map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`font-black text-sm tracking-[0.2em] uppercase cursor-pointer whitespace-nowrap pb-1.5 border-b-2 transition-all duration-300 ${
                  selectedBrand === brand 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 scale-105' 
                    : 'border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:scale-105'
                }`}
              >
                {brand === 'All' ? 'ALL BRANDS' : brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content / Katalog */}
      <main id="katalog" className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
          <div>
            <h3 className="text-2xl font-extrabold">Featured Products</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Pilih gaya sepatu impianmu dan amankan sebelum kehabisan.</p>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['All', 'Lifestyle', 'Running', 'Basketball', 'Sneakers', 'Skate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer hover:scale-105 ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 animate-fade-in">
            <p className="text-4xl mb-2">🔍</p>
            <p className="font-medium">Produk dengan kategori/brand tersebut belum tersedia, bre!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => {
                  setSelectedProduct(product)
                  setSelectedSize('40')
                  setSelectedColor('Classic')
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 flex flex-col cursor-pointer group hover:-translate-y-1.5 animate-fade-in"
              >
                <div className="h-52 overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider z-10">
                    {product.brand}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{product.category}</span>
                    <h4 className="text-lg font-bold mt-1 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{product.name}</h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-extrabold mt-2 text-xl">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="w-full mt-4 bg-indigo-600 group-hover:bg-indigo-700 dark:bg-indigo-500 dark:group-hover:bg-indigo-600 text-white font-semibold py-2.5 rounded-xl text-center transition-all duration-300 shadow-sm group-hover:shadow-md">
                    Pilih Ukuran & Warna
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Contact Me Section */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-16 px-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
            <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-indigo-200 dark:border-indigo-800">
              Hubungi Saya
            </span>
            <h3 className="text-3xl font-extrabold mt-4 text-gray-900 dark:text-white">STORE.VALL</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Punya pertanyaan seputar produk, kendala pesanan, atau ingin mampir ke lokasi? Cek info dan peta di bawah ini!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">Informasi & Lokasi Toko</h4>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold">
                  📍
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">Alamat Store</h5>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Kecamatan Sidoarjo, Kabupaten Sidoarjo, Jawa Timur</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-xl shrink-0 font-bold">
                  💬
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-sm">WhatsApp Only</h5>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">+62 878-2567-7105</p>
                </div>
              </div>

              <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner">
                <iframe 
                  title="Store Location Map"
                  src="https://www.google.com/maps?q=-7.4405832,112.6939621&z=16&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kirim Pesan Cepat</h4>
              
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Nama Anda:</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masukkan nama lengkap..."
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Email / Kontak:</label>
                <input 
                  type="text" 
                  required
                  placeholder="Masukkan email / nomor HP..."
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Pesan:</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Tulis pesan atau pertanyaanmu di sini..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium text-sm px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                Kirim Pesan via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-6 text-xs border-t border-gray-800">
        <p>© 2026 STORE.VALL. All rights reserved.</p>
      </footer>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-colors animate-fade-in">
            <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{selectedProduct.brand} • {selectedProduct.category}</span>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-lg cursor-pointer transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="text-2xl font-extrabold mt-1 text-gray-900 dark:text-white">{selectedProduct.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-extrabold text-xl mt-1">
                  Rp {selectedProduct.price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Pilihan Ukuran */}
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Pilih Ukuran (Size):</label>
                  <div className="flex gap-2">
                    {['39', '40', '41', '42', '43'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all duration-200 cursor-pointer hover:scale-105 ${
                          selectedSize === size 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-indigo-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pilihan Warna */}
                <div className="mt-4">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">Pilih Edisi / Warna:</label>
                  <div className="flex gap-2">
                    {['Classic', 'Limited', 'Special'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all duration-200 cursor-pointer hover:scale-105 ${
                          selectedColor === color 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-indigo-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleAddToCart(selectedProduct, selectedSize, selectedColor)}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer shadow-md active:scale-95 hover:scale-[1.02]"
              >
                Masukkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer / Modal Keranjang */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 h-full p-6 flex flex-col shadow-2xl transition-colors animate-fade-in">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keranjang Belanja Kamu</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 py-20">
                  <p className="text-4xl mb-2">🛒</p>
                  <p className="font-medium">Keranjangmu masih kosong, bre!</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition-all hover:border-indigo-400">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                          {item.brand} | Size: {item.size} | {item.color}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Rp {item.price.toLocaleString('id-ID')} x {item.qty}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm p-2 cursor-pointer transition-colors"
                      title="Hapus Item"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between items-center text-base font-bold">
                  <span className="text-gray-600 dark:text-gray-400">Total Harga:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
                <button 
                  onClick={handleCheckoutWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02]"
                >
                  💬 Checkout via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}