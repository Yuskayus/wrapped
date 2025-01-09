import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "./components/ProgressBar"; // Pastikan path ini sesuai
import "./ProgressPage.css"; // Untuk styling halaman

const ProgressPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const encryptedUrl = new URLSearchParams(location.search).get("encryptedUrl");

  const steps = [
    "Langkah 1: Mulai",
    "Langkah 2: Proses",
    "Langkah 3: Verifikasi",
    "Langkah 4: Selesai",
  ];

  useEffect(() => {
    if (encryptedUrl) {
      console.log("URL terenkripsi diterima:", encryptedUrl);
      const decryptedStep = decryptUrl(encryptedUrl);
      setActiveIndex(decryptedStep);
    }
  }, [encryptedUrl]);

  const decryptUrl = (url) => {
    const mapping = {
      "encrypted-step-1": 0,
      "encrypted-step-2": 1,
      "encrypted-step-3": 2,
      "encrypted-step-4": 3,
    };
    return mapping[url] || 0;
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 1 < steps.length ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="progress-page">
      <h1>Progress Page</h1>
      <ProgressBar totalSteps={steps.length} activeStep={activeIndex} />
      <div className="step-content">
        <p>{steps[activeIndex]}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={activeIndex === 0}>
          &#8592; Sebelumnya
        </button>
        <button onClick={handleNext} disabled={activeIndex === steps.length - 1}>
          Selanjutnya &#8594;
        </button>
      </div>
    </div>
  );
};

export default ProgressPage;
