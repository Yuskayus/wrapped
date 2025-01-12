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
  const [kerajinanData, setKerajinanData] = useState(null);
  
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

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Membuat objek Date dari string tanggal
    const day = String(date.getDate()).padStart(2, '0'); // Mendapatkan hari dengan format 2 digit
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mendapatkan bulan dengan format 2 digit (0-based)
    const year = date.getFullYear(); // Mendapatkan tahun
  
    return `${day} ${month} ${year}`; // Mengembalikan format dd mm yyyy
  };



  // function formatDate(dateString, formatType = "default") {
  //   const date = new Date(dateString);
  
  //   if (isNaN(date)) {
  //     return "Invalid Date"; // Jika tanggal tidak valid
  //   }
  
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  
  //   switch (formatType) {
  //     case "calendar":
  //       // Format untuk kalender: "DD\nMM\nYYYY"
  //       return `${day}\br${month}\br${year}`;
  //     case "default":
  //       // Format default Anda sebelumnya
  //       return `${day}-${month}-${year}`;
  //     case "slash":
  //       // Format dengan slash (untuk contoh)
  //       return `${day}/${month}/${year}`;
  //     default:
  //       // Format fallback jika tipe tidak dikenali
  //       return `${day}-${month}-${year}`;
  //   }
  // }

  // Fetch data dari API
  function formatDateVertical(dateString) {
    const date = new Date(dateString);
  
    if (isNaN(date)) {
      return "Invalid Date";
    }
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return (
      <div style={{ textAlign: "center" }}>
        <div>{day}</div>
        <div>{month}</div>
        <div>{year}</div>
      </div>
    );
  }

  
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

  useEffect(() => {
    if (clientData) {
      const fetchKerajinanData = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/tingkat-kerajinan");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
  
          // Cari data kerajinan yang sesuai dengan ClientID
          const filteredData = data.find(item => item.ClientID === clientData.ClientID);
  
          if (filteredData) {
            setKerajinanData(filteredData); // Simpan data jika ditemukan
          } else {
            setKerajinanData(null); // Jika tidak ditemukan, set null
          }
        } catch (err) {
          console.error("Error fetching tingkat kerajinan:", err.message);
          setError(err.message);
        }
      };
  
      fetchKerajinanData();
    }
  }, [clientData]); // Jalankan ulang ketika clientData berubah
  

  

  // useEffect(() => {
  //   const fetchKerajinanData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3001/api/tingkat-kerajinan");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("Data tingkat kerajinan:", data); // Debug log
  //       const filteredData = data.find(item => item.ClientID === clientData.ClientID);
  //       setKerajinanData(filteredData || null);
  //     } catch (err) {
  //       console.error("Error fetching tingkat kerajinan:", err.message);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchKerajinanData();
  // }, [clientData]);
  



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
            <p
             style={{
              textAlign: "left", // Menjadikan teks rata kiri
              margin: "10px 0", // Memberikan jarak atas dan bawah
              lineHeight: "1.6", // Menambah jarak antar baris agar lebih rapi
              fontSize: "16px", // Ukuran font yang nyaman
              color: 'white', // Warna teks lebih gelap agar mudah dibaca
            }}
            >
              Terima kasih telah bersama kami<br/> 
              di sepanjang 2024! Tahun lalu,
              kita<br/> telah melewati berbagai momen<br/> menarik di dunia saham. Kami<br/>
              sangat menghargai kepercayaan<br/> Anda sebagai nasabah di Alpha<br/>
              Investasi. Semoga kita terus bisa<br/> tumbuh bersama dan meraih<br/> sukses
              finansial di tahun-tahun<br/> mendatang.<br/>
              <br/>
              Salam Hangat,<br/> Alpha Investasi
            </p>
          </div>
        </>
      )}

      {/* Judul dan Pesan hanya di konten kedua */}
    {activeIndex === 1 && (
      <>
        <h1 className="greeting">Halo, {clientData.ClientName}</h1>
        <div  id="tab-content" className="message-box">
        <p>
        Kamu Bersama Alpha<br /> investasi Sejak
      </p>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Gambar Kalender */}
        <img
          src="/images/calendar1.png"
          alt="Calendar"
          className="calendar-image"
          style={{ width: '150px', height: '150px' }}
        />

        {/* Tanggal di Atas Gambar */}
        <div
          style={{
            position: 'absolute',
            top: '60%', // Atur posisi ke tengah
            left: '50%', // Atur posisi ke tengah
            transform: 'translate(-50%, -50%)', // Sesuaikan agar tepat di tengah
            color: 'white', // Warna teks
            fontSize: '20px', // Ukuran font
            fontWeight: 'bold', // Tebalkan teks
            textAlign: 'center', // Pusatkan teks
          }}
        >
          {formatDateVertical(clientData.TanggalPembuatan)}
        </div>
      </div>

      <p>
        Kamu telah bersama Alpha Investasi Selama{' '}
        {clientData.LamaMenjadiNasabahDalamHari} hari. Wow!. Terima kasih telah
        menjadi bagian dari perjalanan kami hingga saat ini.
      </p>
    </div>

    {/* Tombol Share */}
    <button onClick={handleShare}>Share as Image</button>
  </>
)}

          {/* Judul dan Pesan hanya di konten ketiga */}
          {activeIndex === 2 && (
      <>
        <h1 className="greeting">Frekuensi Transaksi<br/>kamu tahun 2024</h1>
        <div className="message-box">
             {/* Gambar Kalender */}
        <img
          src="/images/Vector.png"
          alt="Calendar"
          className="calendar-image"
          style={{ width: '150px', height: '150px' }}
        />
          <p>
           Tanggal Terakhir Transaksi<br/> {formatDate(clientData.TransaksiTerakhirNasabah)}
          </p>
     {kerajinanData ? (
  <div>
    {/* <p>Client ID: {kerajinanData.ClientID}</p>
    <p>Tingkat Kerajinan (TK): {kerajinanData.TK}%</p> */}
    <p>Grade: {kerajinanData.Grade}</p>
  </div>
) : (
  <p>Data tingkat kerajinan untuk ClientID ini tidak ditemukan.</p>
)}
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
            Saham Favoritmu di 2024 <br/> investasi Sejak
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
