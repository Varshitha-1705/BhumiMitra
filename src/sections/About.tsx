import {
  ShieldCheck,
  Cpu,
  Globe,
  Landmark,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">

      {/* =========================
          LEFT SIDE
      ========================== */}

      <div className="about-left">

        {/* About Tag */}

        <span className="about-tag">
          {t.aboutTag}
        </span>


        {/* Main Heading */}

        <h1>
          {t.aboutTitle}
        </h1>


        {/* Description */}

        <p>
          {t.aboutDescription}
        </p>


        {/* Explore Services Button */}

        <a
          href="#services"
          className="about-btn"
        >
          {t.exploreServices}
        </a>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================== */}

      <div className="about-right">

        {/* Artificial Intelligence */}

        <div className="about-box">

          <Cpu size={40} />

          <h3>
            {t.artificialIntelligence}
          </h3>

        </div>


        {/* Multilingual Access */}

        <div className="about-box">

          <Globe size={40} />

          <h3>
            {t.multilingualAccess}
          </h3>

        </div>


        {/* Government Ready */}

        <div className="about-box">

          <Landmark size={40} />

          <h3>
            {t.governmentReady}
          </h3>

        </div>


        {/* Secure Platform */}

        <div className="about-box">

          <ShieldCheck size={40} />

          <h3>
            {t.securePlatform}
          </h3>

        </div>

      </div>

    </section>
  );
}

export default About;