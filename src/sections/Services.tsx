import { useState } from "react";

import {
  FileText,
  Map,
  Bot,
  ScanText,
  Mic,
  ClipboardList,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import LoginRequiredModal from "../components/LoginRequiredModal";

function Services() {
  const { t } = useLanguage();

  // Controls whether the Login Required modal is visible
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Services displayed on the landing page
  const services = [
    {
      title: t.viewRTC,
      icon: <FileText size={42} />,
    },
    {
      title: t.surveyMaps,
      icon: <Map size={42} />,
    },
    {
      title: t.mutationStatus,
      icon: <ClipboardList size={42} />,
    },
    {
      title: t.aiAssistant,
      icon: <Bot size={42} />,
    },
    {
      title: t.ocrDocuments,
      icon: <ScanText size={42} />,
    },
    {
      title: t.voiceAssistant,
      icon: <Mic size={42} />,
    },
  ];

  return (
    <section id="services" className="services-section">

      {/* =========================
          SERVICES HEADER
      ========================== */}

      <div className="services-header">

        <h1>
          {t.servicesTitle}
        </h1>

        <p>
          {t.servicesDescription}
        </p>

      </div>


      {/* =========================
          SERVICES GRID
      ========================== */}

      <div className="services-grid">

        {services.map((service) => (

          <div
            key={service.title}
            className="service-card"
            onClick={() => {
              console.log(
                "Service clicked:",
                service.title
              );

              setShowLoginModal(true);
            }}
          >

            {/* Icon */}

            <div className="service-icon">

              {service.icon}

            </div>


            {/* Service Title */}

            <h2>
              {service.title}
            </h2>


            {/* Service Description */}

            <p>
              {t.clickToAccess}
            </p>


            {/* Arrow */}

            <span>
              →
            </span>

          </div>

        ))}

      </div>


      {/* =========================
          LOGIN REQUIRED MODAL
      ========================== */}

      {showLoginModal && (

        <LoginRequiredModal
          onClose={() => setShowLoginModal(false)}
        />

      )}

    </section>
  );
}

export default Services;