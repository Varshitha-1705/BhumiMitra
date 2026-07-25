import { MapPinned, Mail, Phone } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">

      {/* =====================================================
          FOOTER MAIN CONTENT
      ====================================================== */}

      <div className="footer-container">

        {/* =================================================
            ABOUT
        ================================================== */}

        <div className="footer-about">

          <h2>
            🌱 BhumiMitra
          </h2>

          <p>
            {t.footerDescription}
          </p>

        </div>


        {/* =================================================
            QUICK LINKS
        ================================================== */}

        <div className="footer-links">

          <h3>
            {t.quickLinks}
          </h3>

          <a href="#home">
            {t.home}
          </a>

          <a href="#services">
            {t.services}
          </a>

          <a href="#features">
            {t.features}
          </a>

          <a href="#about">
            {t.about}
          </a>

        </div>


        {/* =================================================
            SERVICES
        ================================================== */}

        <div className="footer-links">

          <h3>
            {t.footerServices}
          </h3>

          <a href="#services">
            {t.viewRTC}
          </a>

          <a href="#services">
            {t.pahani}
          </a>

          <a href="#services">
            {t.mutationStatus}
          </a>

          <a href="#services">
            {t.surveyMaps}
          </a>

          <a href="#services">
            {t.aiAssistant}
          </a>

        </div>


        {/* =================================================
            CONTACT
        ================================================== */}

        <div className="footer-contact">

          <h3>
            {t.contactUs}
          </h3>


          {/* Location */}

          <p>
            <MapPinned size={18} />

            <span>
              {t.location}
            </span>
          </p>


          {/* Email */}

          <p>
            <Mail size={18} />

            <span>
              support@bhumimitra.ai
            </span>
          </p>


          {/* Phone */}

          <p>
            <Phone size={18} />

            <span>
              +91 98765 43210
            </span>
          </p>


          {/* =================================================
              SOCIAL MEDIA
          ================================================== */}

          <div className="social-icons">

            <a
              href="#"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ====================================================== */}

      <div className="footer-bottom">

        <p>
          {t.allRightsReserved}
        </p>

        <p>
          {t.builtBy}
        </p>

      </div>

    </footer>
  );
}

export default Footer;