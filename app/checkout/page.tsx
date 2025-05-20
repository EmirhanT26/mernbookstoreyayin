"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { LuX } from "react-icons/lu";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const price = 29.99; // Sabit fiyat
  const totalPrice = (price * quantity).toFixed(2); // Toplam fiyat hesaplanıyor

  // SweetAlert2 popup işlevi
  const showAlert = () => {
    Swal.fire({
      title: 'Ön Bilgilendirme Koşulları ve Mesafeli Satış Sözleşmesi',
      text: 'Aldığınız Ürünler En Geç 14 Güne Kadar Teslim Edilecektir.',
      icon: 'info',
      confirmButtonText: 'Tamam'
    });
  };

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Sol Taraf: Kitap Kartları */}
        <div className="flex-1">
          <div className="bg-violet-100 rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center relative">
            <LuX className="absolute top-2 right-2 text-2xl text-gray-500 cursor-pointer" />
            <img 
              src="images/matilda.png" 
              alt="Kitap Resmi" 
              className="w-full md:w-24 h-32 object-cover rounded-md mb-4 md:mb-0" 
            />
            <div className="flex-1 ml-0 md:ml-4">
              <h3 className="text-xl font-semibold text-black">Kitap ismi</h3>
              <p className="text-gray-700">Yazarın İsmi</p>
            </div>
            <div className="ml-0 md:ml-auto flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={decrement} 
                  className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-white"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button 
                  onClick={increment} 
                  className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold text-white"
                >
                  +
                </button>
              </div>
              <span className="text-xl font-bold text-black">₺{totalPrice}</span>
            </div>
          </div>

          {/* Diğer Kitap Kartları buraya eklenebilir */}
        </div>

        {/* Sağ Taraf: Sipariş Özeti (Sticky) */}
        <div className="md:w-1/4 flex-shrink-0 sticky top-20">
          <div className="bg-violet-100 rounded-xl shadow-lg p-4">
            <h4 className="text-xl font-semibold text-black mb-2">Sipariş Özeti</h4>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-black">Toplam:</span>
              <span className="text-lg font-bold text-black">₺{totalPrice}</span>
            </div>

            {/* Teslimat Ücreti Bilgisi */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-700">Teslimat Ücreti</span>
              <span className="text-sm font-semibold text-purple-600">Ücretsiz!</span>
            </div>

            {/* Checkbox ve Yazı */}
            <div className="flex flex-col mb-4 space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="checkbox1" className="mr-2" />
                <label 
                  htmlFor="checkbox1" 
                  className="text-sm text-gray-700 underline cursor-pointer"
                  onClick={showAlert}
                >
                  Ön Bilgilendirme Koşullarını ve Mesafeli Satış Sözleşmesi'ni okudum, onaylıyorum.
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="checkbox2" className="mr-2" />
                <label htmlFor="checkbox2" className="text-sm text-gray-700">Hediye Paketleme</label>
              </div>
            </div>

            <button className="bg-purple-600 text-white w-full py-2 rounded-lg font-bold">
              Ödemeye Geç
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;