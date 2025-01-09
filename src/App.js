import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar"; // Komponen ProgressBar
import "./index.css";
import * as htmlToImage from 'html-to-image';


// Import gambar dari folder src/assets/images
import Image1 from "./assets/images/image1.png";
import Image2 from "./assets/images/image2.png";
import Image3 from "./assets/images/image3.png";
import Image4 from "./assets/images/image4.png";
import Image5 from "./assets/images/image5.png";
import Image6 from "./assets/images/image6.png";
import Image7 from "./assets/images/image7.png";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [joinDate, setJoinDate] = useState(null);

  // Array gambar dengan konten berbeda
  const slides = [
    { image: Image1, content: "Konten untuk Gambar 1" },
    { image: Image2, content: "Konten untuk Gambar 2" },
    { image: Image3, content: "Konten untuk Gambar 3" },
    { image: Image4, content: "Konten untuk Gambar 4" },
    { image: Image5, content: "Konten untuk Gambar 5" },
    { image: Image6, content: "Konten untuk Gambar 6" },
    { image: Image7, content: "Konten untuk Gambar 7" },
  ];

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/client/A0003Y");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClientData(data); // Simpan data ke state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 1 < slides.length ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleShare = () => {
    const node = document.getElementById('tab-content');
    
    if (!node) {
      console.error('Error: Element with ID "tab-content" not found.');
      return;
    }// Ambil elemen HTML untuk diubah jadi gambar

      // Tambahkan class background sesuai tab yang aktif
    if (activeIndex === 1) {
      node.style.backgroundImage = `url('/images/image1.png')`; // Background khusus Tab 2
      node.style.backgroundSize = 'cover'; // Sesuaikan ukuran gambar
      node.style.backgroundPosition = 'center';
    } else {
      node.style.backgroundImage = ''; // Bersihkan background untuk tab lainnya
    }
  

  // Convert elemen ke gambar
  htmlToImage
    .toPng(node)
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'tab-image.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('Error generating image:', error);
    })
    .finally(() => {
      // Bersihkan perubahan style agar tidak memengaruhi UI asli
      node.style.backgroundImage = '';
    });
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      {/* Judul dan Pesan hanya di konten pertama */}
      {activeIndex === 0 && (
        <>
          <h1 className="greeting">Halo, {clientData.ClientName}</h1>
          <div className="message-box">
            <p>
              Terima kasih telah bersama kami di sepanjang 2024! Tahun lalu,
              kita telah melewati berbagai momen menarik di dunia saham. Kami
              sangat menghargai kepercayaan Anda sebagai nasabah di Alpha
              Investasi. Semoga kita terus bisa tumbuh bersama dan meraih sukses
              finansial di tahun-tahun mendatang.
            </p>
            <p>Salam Hangat, Alpha Investasi</p>
          </div>
        </>
      )}

      {/* Judul dan Pesan hanya di konten kedua */}
    {activeIndex === 1 && (
      <>
        <h1 className="greeting">Halo, {clientData.ClientName}</h1>
        <div  id="tab-content" className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>Semangat terus dan tetap fokus pada tujuan Anda!</p>
        </div>
            {/* Tombol Share */}
    <button onClick={handleShare}>Share as Image</button>
      </>
    )}

          {/* Judul dan Pesan hanya di konten ketiga */}
          {activeIndex === 2 && (
      <>
        <h1 className="greeting">Tiga, {clientData.ClientName}</h1>
        <div className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>ok</p>
        </div>
      </>
    )}

              {/* Judul dan Pesan hanya di konten keempat */}
              {activeIndex === 3 && (
      <>
        <h1 className="greeting">Empat, {clientData.ClientName}</h1>
        <div className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>ok</p>
        </div>
      </>
    )}

                  {/* Judul dan Pesan hanya di konten kelima */}
                  {activeIndex === 4 && (
      <>
        <h1 className="greeting">Lima, {clientData.ClientName}</h1>
        <div className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>ok</p>
        </div>
      </>
    )}


                    {/* Judul dan Pesan hanya di konten keenam */}
                    {activeIndex === 5 && (
      <>
        <h1 className="greeting">Enam, {clientData.ClientName}</h1>
        <div className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>ok</p>
        </div>
      </>
    )}

                        {/* Judul dan Pesan hanya di konten ketujuh */}
                        {activeIndex === 6 && (
      <>
        <h1 className="greeting">Tujuh, {clientData.ClientName}</h1>
        <div className="message-box">
          <p>
            Kamu Bersama Alpha<br/> investasi Sejak
          </p>
          <p>ok</p>
        </div>
      </>
    )}

      {/* Konten gambar */}
      <div className="image-container">
        <img
          src={slides[activeIndex].image}
          alt={`Gambar ${activeIndex + 1}`}
          className="background-image"
        />
      </div>

      {/* Konten yang berbeda untuk setiap gambar */}
      <div className="content-box">
        <p>{slides[activeIndex].content}</p>
      </div>

      {/* Navigasi Panah */}
      <div className="navigation">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="prev-button"
        >
          &#8592; {/* Panah Kiri */}
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === slides.length - 1}
          className="next-button"
        >
          &#8594; {/* Panah Kanan */}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <ProgressBar totalSteps={slides.length} activeStep={activeIndex} />
      </div>

      {/* Tombol Share */}
      <button className="share-btn">Share</button>
    </div>
  );
};

export default App;
