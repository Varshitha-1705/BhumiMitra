import {
  Bot,
  Mic,
  Languages,
  ScanText,
  ShieldAlert,
  Clock3,
  Map,
  BrainCircuit,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Mic size={42} />,
      title: t.voiceAssistant,
      desc: t.voiceAssistantDesc,
    },
    {
      icon: <Languages size={42} />,
      title: t.multilingual,
      desc: t.multilingualDesc,
    },
    {
      icon: <ScanText size={42} />,
      title: t.smartOCR,
      desc: t.smartOCRDesc,
    },
    {
      icon: <ShieldAlert size={42} />,
      title: t.fraudDetection,
      desc: t.fraudDetectionDesc,
    },
    {
      icon: <Clock3 size={42} />,
      title: t.landTimeline,
      desc: t.landTimelineDesc,
    },
    {
      icon: <Map size={42} />,
      title: t.gisMaps,
      desc: t.gisMapsDesc,
    },
    {
      icon: <BrainCircuit size={42} />,
      title: t.landIntelligence,
      desc: t.landIntelligenceDesc,
    },
    {
      icon: <Bot size={42} />,
      title: t.legalAssistant,
      desc: t.legalAssistantDesc,
    },
  ];

  return (
    <section id="features" className="features-section">

      {/* Header */}

      <div className="features-header">

        <h1>
          {t.featuresTitle}
        </h1>

        <p>
          {t.featuresDescription}
        </p>

      </div>

      {/* Features */}

      <div className="features-grid">

        {features.map((feature) => (

          <div
            className="feature-card"
            key={feature.title}
          >

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h2>
              {feature.title}
            </h2>

            <p>
              {feature.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;