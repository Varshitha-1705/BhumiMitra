import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import LoginRequiredModal from "../components/LoginRequiredModal";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

const images = [hero1, hero2, hero3];

function Hero() {
  const { t } = useLanguage();

  const [current, setCurrent] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section id="home" className="hero">

      {/* ============================= */}
      {/* BACKGROUND IMAGES */}
      {/* ============================= */}

      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`BhumiMitra land records ${index + 1}`}
          className={`hero-image ${
            index === current ? "active" : ""
          }`}
        />
      ))}

      {/* ============================= */}
      {/* DARK OVERLAY */}
      {/* ============================= */}

      <div className="hero-overlay"></div>

      {/* ============================= */}
      {/* HERO CONTENT */}
      {/* ============================= */}

      <div className="hero-content">

        {/* Badge */}

        <div className="hero-badge">
          {t.heroBadge}
        </div>

        {/* Main Heading */}

        <h1 className="hero-title">
          {t.heroTitle}
        </h1>

        {/* Description */}

        <p className="hero-subtitle">
          {t.heroDescription}
        </p>

        {/* ============================= */}
        {/* SEARCH BAR */}
        {/* ============================= */}

        <div className="hero-search">

          <div className="search-input">

            <Search size={28} />

            <input
              type="text"
              placeholder={t.searchPlaceholder}
            />

          </div>

          <button className="search-btn" onClick={() => setShowLoginModal(true)}>
            {t.search}
          </button>

        </div>

        {/* ============================= */}
        {/* AI BUTTON */}
        {/* ============================= */}

        <button className="ai-btn" onClick={() => setShowLoginModal(true)}>
          {t.askAI}
        </button>

      </div>

      {/* ============================= */}
      {/* SLIDER DOTS */}
      {/* ============================= */}

      <div className="slider-dots">

        {images.map((_, index) => (

          <button
            key={index}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            className={`dot ${
              current === index ? "active-dot" : ""
            }`}
            onClick={() => setCurrent(index)}
          />

        ))}

      </div>
       {/* LOGIN REQUIRED MODAL */}
      {showLoginModal && (
        <LoginRequiredModal
         onClose={() => setShowLoginModal(false)}
        />
      )}

    </section>
  );
}

export default Hero;