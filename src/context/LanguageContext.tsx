import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { ReactNode } from "react";

/* =========================================================
   LANGUAGE TYPES
========================================================= */

export type Language =
  | "English"
  | "Kannada"
  | "Hindi"
  | "Tamil"
  | "Telugu";

/* =========================================================
   THEME TYPES
========================================================= */

export type Theme =
  | "Dark"
  | "Light";

/* =========================================================
   TRANSLATION INTERFACE
========================================================= */

export interface Translation {

  /* =========================
     NAVBAR
  ========================= */

  home: string;
  services: string;
  features: string;
  about: string;

  language: string;
  theme: string;

  login: string;
  register: string;


  /* =========================
     HERO
  ========================= */

  heroBadge: string;
  heroTitle: string;
  heroDescription: string;

  searchPlaceholder: string;
  searchButton: string;
  search: string;

  askAI: string;


  /* =========================
     SERVICES
  ========================= */

  servicesTitle: string;
  servicesDescription: string;

  viewRTC: string;
  surveyMaps: string;
  mutationStatus: string;
  aiAssistant: string;
  ocrDocuments: string;
  voiceAssistant: string;

  clickToAccess: string;


  /* =========================
     FEATURES
  ========================= */

  featuresTitle: string;
  featuresDescription: string;

  multilingual: string;
  smartOCR: string;
  fraudDetection: string;
  landTimeline: string;
  gisMaps: string;
  landIntelligence: string;
  legalAssistant: string;

  voiceAssistantDesc: string;
  multilingualDesc: string;
  smartOCRDesc: string;
  fraudDetectionDesc: string;
  landTimelineDesc: string;
  gisMapsDesc: string;
  landIntelligenceDesc: string;
  legalAssistantDesc: string;


  /* =========================
     ABOUT
  ========================= */
  aboutTag: string;
  aboutTitle: string;
  aboutDescription: string;

  exploreServices: string;

  artificialIntelligence: string;
  multilingualAccess: string;
  governmentReady: string;
  securePlatform: string;


  /* =========================
     FOOTER
  ========================= */

  footerDescription: string;

  quickLinks: string;
  footerServices: string;

  contactUs: string;

  rtc: string;
  pahani: string;
  mutation: string;

  builtBy: string;
  allRightsReserved: string;

  location: string;

  /* =========================
     SERVICES / FOOTER
  ========================= */

  surveyMapsFooter: string;
  aiAssistantFooter: string;
}


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations: Record<
  Language,
  Translation
> = {


  /* =======================================================
     ENGLISH
  ======================================================= */

  English: {

    /* NAVBAR */

    home: "Home",
    services: "Services",
    features: "Features",
    about: "About",

    language: "Language",
    theme: "Theme",

    login: "Login",
    register: "Register",


    /* HERO */

    heroBadge:
      "🟢 Karnataka Digital Land Records",

    heroTitle:
      "AI Powered Land Records Platform",

    heroDescription:
      "Access RTC, Pahani, Mutation, Survey Maps and AI assistance in multiple Indian languages.",

    searchPlaceholder:
      "Search Survey Number",

    searchButton:
      "Search",

    search:
      "Search",

    askAI:
      "Ask AI Assistant",


    /* SERVICES */

    servicesTitle:
      "Popular Services",

    servicesDescription:
      "Access all Karnataka land services from one intelligent platform.",

    viewRTC:
      "View RTC",

    surveyMaps:
      "Survey Maps",

    mutationStatus:
      "Mutation Status",

    aiAssistant:
      "AI Assistant",

    ocrDocuments:
      "OCR Documents",

    voiceAssistant:
      "Voice Assistant",

    clickToAccess:
      "Click to access this service.",


    /* FEATURES */

    featuresTitle:
      "Exclusive AI Features",

    featuresDescription:
      "Innovative AI capabilities designed to simplify land management and make BhumiMitra different from traditional land record systems.",

    multilingual:
      "Multilingual AI",

    smartOCR:
      "Smart OCR",

    fraudDetection:
      "Fraud Detection",

    landTimeline:
      "Land Timeline",

    gisMaps:
      "GIS Smart Maps",

    landIntelligence:
      "Land Intelligence",

    legalAssistant:
      "AI Legal Assistant",


    voiceAssistantDesc:
      "Navigate the portal and retrieve land records using voice commands.",

    multilingualDesc:
      "Interact naturally in English, Kannada, Hindi, Tamil and Telugu.",

    smartOCRDesc:
      "Upload land documents and get AI-generated explanations instantly.",

    fraudDetectionDesc:
      "AI identifies suspicious ownership patterns and record inconsistencies.",

    landTimelineDesc:
      "Visualize the ownership history of a property over time.",

    gisMapsDesc:
      "Explore survey boundaries with interactive AI-powered maps.",

    landIntelligenceDesc:
      "Receive insights and recommendations based on land data.",

    legalAssistantDesc:
      "Ask questions about land records and understand legal terminology.",


    /* ABOUT */
    aboutTag: "About BhumiMitra",

    aboutTitle:
      "About BhumiMitra",

    aboutDescription:
      "BhumiMitra is an AI-powered multimodal land registry platform developed to simplify access to Karnataka land records. It combines Artificial Intelligence, OCR, multilingual support, GIS mapping and voice assistance into one secure platform for citizens, farmers and government officials.",

    exploreServices:
      "Explore Services",

    artificialIntelligence:
      "Artificial Intelligence",

    multilingualAccess:
      "Multilingual Access",

    governmentReady:
      "Government Ready",

    securePlatform:
      "Secure Platform",


    /* FOOTER */

    footerDescription:
      "BhumiMitra is an AI-powered multimodal land registry platform designed to simplify access to Karnataka land records through intelligent search, multilingual support, voice assistance, OCR, and GIS integration.",

    quickLinks:
      "Quick Links",

    footerServices:
      "Services",

    contactUs:
      "Contact Us",

    rtc:
      "RTC",

    pahani:
      "Pahani",

    mutation:
      "Mutation",

    surveyMapsFooter:
      "Survey Maps",

    aiAssistantFooter:
      "AI Assistant",

    builtBy:
      "Built by Varshitha N",

    allRightsReserved:
      "All Rights Reserved.",

    location:
      "Bengaluru, Karnataka",
  },


  /* =======================================================
     KANNADA
  ======================================================= */

  Kannada: {

    /* NAVBAR */

    home: "ಮುಖಪುಟ",
    services: "ಸೇವೆಗಳು",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",

    language: "ಭಾಷೆ",
    theme: "ಥೀಮ್",

    login: "ಲಾಗಿನ್",
    register: "ನೋಂದಣಿ",


    /* HERO */

    heroBadge:
      "🟢 ಕರ್ನಾಟಕ ಡಿಜಿಟಲ್ ಭೂ ದಾಖಲೆಗಳು",

    heroTitle:
      "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಭೂ ದಾಖಲೆ ವೇದಿಕೆ",

    heroDescription:
      "RTC, ಪಹಣಿ, ರೂಪಾಂತರ, ಸರ್ವೇ ನಕ್ಷೆಗಳು ಮತ್ತು AI ಸಹಾಯವನ್ನು ವಿವಿಧ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಪ್ರವೇಶಿಸಿ.",

    searchPlaceholder:
      "ಸರ್ವೇ ಸಂಖ್ಯೆಯನ್ನು ಹುಡುಕಿ",

    searchButton:
      "ಹುಡುಕಿ",

    search:
      "ಹುಡುಕಿ",

    askAI:
      "AI ಸಹಾಯಕರನ್ನು ಕೇಳಿ",


    /* SERVICES */

    servicesTitle:
      "ಜನಪ್ರಿಯ ಸೇವೆಗಳು",

    servicesDescription:
      "ಎಲ್ಲಾ ಕರ್ನಾಟಕ ಭೂ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಬುದ್ಧಿವಂತ ವೇದಿಕೆಯಿಂದ ಪ್ರವೇಶಿಸಿ.",

    viewRTC:
      "RTC ವೀಕ್ಷಿಸಿ",

    surveyMaps:
      "ಸರ್ವೇ ನಕ್ಷೆಗಳು",

    mutationStatus:
      "ರೂಪಾಂತರ ಸ್ಥಿತಿ",

    aiAssistant:
      "AI ಸಹಾಯಕ",

    ocrDocuments:
      "OCR ದಾಖಲೆಗಳು",

    voiceAssistant:
      "ಧ್ವನಿ ಸಹಾಯಕ",

    clickToAccess:
      "ಈ ಸೇವೆಯನ್ನು ಪ್ರವೇಶಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ.",


    /* FEATURES */

    featuresTitle:
      "ವಿಶೇಷ AI ವೈಶಿಷ್ಟ್ಯಗಳು",

    featuresDescription:
      "ಭೂ ನಿರ್ವಹಣೆಯನ್ನು ಸರಳಗೊಳಿಸಲು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಭೂ ದಾಖಲೆ ವ್ಯವಸ್ಥೆಗಳಿಂದ ಭೂಮಿಮಿತ್ರವನ್ನು ವಿಭಿನ್ನಗೊಳಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ನವೀನ AI ಸಾಮರ್ಥ್ಯಗಳು.",

    multilingual:
      "ಬಹುಭಾಷಾ AI",

    smartOCR:
      "ಸ್ಮಾರ್ಟ್ OCR",

    fraudDetection:
      "ವಂಚನೆ ಪತ್ತೆ",

    landTimeline:
      "ಭೂ ಮಾಲೀಕತ್ವದ ಕಾಲರೇಖೆ",

    gisMaps:
      "GIS ಸ್ಮಾರ್ಟ್ ನಕ್ಷೆಗಳು",

    landIntelligence:
      "ಭೂಮಿಯ ಬುದ್ಧಿವಂತಿಕೆ",

    legalAssistant:
      "AI ಕಾನೂನು ಸಹಾಯಕ",


    voiceAssistantDesc:
      "ಧ್ವನಿ ಆಜ್ಞೆಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ ಮತ್ತು ಭೂ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ.",

    multilingualDesc:
      "ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ, ಹಿಂದಿ, ತಮಿಳು ಮತ್ತು ತೆಲುಗಿನಲ್ಲಿ ಸಹಜವಾಗಿ ಸಂವಹನ ನಡೆಸಿ.",

    smartOCRDesc:
      "ಭೂ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ತಕ್ಷಣ AI ರಚಿಸಿದ ವಿವರಣೆಗಳನ್ನು ಪಡೆಯಿರಿ.",

    fraudDetectionDesc:
      "AI ಅನುಮಾನಾಸ್ಪದ ಮಾಲೀಕತ್ವದ ಮಾದರಿಗಳು ಮತ್ತು ದಾಖಲೆಗಳಲ್ಲಿನ ಅಸಂಗತತೆಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.",

    landTimelineDesc:
      "ಕಾಲಾನಂತರದಲ್ಲಿ ಆಸ್ತಿಯ ಮಾಲೀಕತ್ವದ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಿ.",

    gisMapsDesc:
      "ಸಂವಾದಾತ್ಮಕ AI ಆಧಾರಿತ ನಕ್ಷೆಗಳೊಂದಿಗೆ ಸರ್ವೇ ಗಡಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",

    landIntelligenceDesc:
      "ಭೂ ಡೇಟಾದ ಆಧಾರದ ಮೇಲೆ ಒಳನೋಟಗಳು ಮತ್ತು ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.",

    legalAssistantDesc:
      "ಭೂ ದಾಖಲೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಕಾನೂನು ಪದಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",


    /* ABOUT */
    aboutTag: "ಭೂಮಿಮಿತ್ರದ ಬಗ್ಗೆ",

    aboutTitle:
      "ಭೂಮಿಮಿತ್ರದ ಬಗ್ಗೆ",

    aboutDescription:
      "ಭೂಮಿಮಿತ್ರವು ಕರ್ನಾಟಕದ ಭೂ ದಾಖಲೆಗಳಿಗೆ ಸುಲಭ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸಲು ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾದ AI ಆಧಾರಿತ ಮಲ್ಟಿಮೋಡಲ್ ಭೂ ನೋಂದಣಿ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ, OCR, ಬಹುಭಾಷಾ ಬೆಂಬಲ, GIS ಮ್ಯಾಪಿಂಗ್ ಮತ್ತು ಧ್ವನಿ ಸಹಾಯವನ್ನು ನಾಗರಿಕರು, ರೈತರು ಮತ್ತು ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಗಳಿಗಾಗಿ ಒಂದೇ ಸುರಕ್ಷಿತ ವೇದಿಕೆಯಲ್ಲಿ ಸಂಯೋಜಿಸುತ್ತದೆ.",

    exploreServices:
      "ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",

    artificialIntelligence:
      "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ",

    multilingualAccess:
      "ಬಹುಭಾಷಾ ಪ್ರವೇಶ",

    governmentReady:
      "ಸರ್ಕಾರಿ ಬಳಕೆಗೆ ಸಿದ್ಧ",

    securePlatform:
      "ಸುರಕ್ಷಿತ ವೇದಿಕೆ",


    /* FOOTER */

    footerDescription:
      "ಭೂಮಿಮಿತ್ರವು ಬುದ್ಧಿವಂತ ಹುಡುಕಾಟ, ಬಹುಭಾಷಾ ಬೆಂಬಲ, ಧ್ವನಿ ಸಹಾಯ, OCR ಮತ್ತು GIS ಏಕೀಕರಣದ ಮೂಲಕ ಕರ್ನಾಟಕದ ಭೂ ದಾಖಲೆಗಳಿಗೆ ಸುಲಭ ಪ್ರವೇಶವನ್ನು ಒದಗಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ AI ಆಧಾರಿತ ಮಲ್ಟಿಮೋಡಲ್ ಭೂ ನೋಂದಣಿ ವೇದಿಕೆಯಾಗಿದೆ.",

    quickLinks:
      "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    
    footerServices:
      "ಸೇವೆಗಳು",

    contactUs:
      "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",

    rtc:
      "RTC",

    pahani:
      "ಪಹಣಿ",

    mutation:
      "ರೂಪಾಂತರ",

    surveyMapsFooter:
      "ಸರ್ವೇ ನಕ್ಷೆಗಳು",

    aiAssistantFooter:
      "AI ಸಹಾಯಕ",

    builtBy:
      "ವರ್ಷಿತಾ ಎನ್ ಅವರಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ",

    allRightsReserved:
      "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",

    location:
      "ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ",
  },


  /* =======================================================
     HINDI
  ======================================================= */

  Hindi: {

    /* NAVBAR */

    home: "होम",
    services: "सेवाएँ",
    features: "विशेषताएँ",
    about: "हमारे बारे में",

    language: "भाषा",
    theme: "थीम",

    login: "लॉगिन",
    register: "पंजीकरण",


    /* HERO */

    heroBadge:
      "🟢 कर्नाटक डिजिटल भूमि रिकॉर्ड",

    heroTitle:
      "AI संचालित भूमि रिकॉर्ड प्लेटफॉर्म",

    heroDescription:
      "कई भारतीय भाषाओं में RTC, पहानी, म्यूटेशन, सर्वे मैप और AI सहायता प्राप्त करें।",

    searchPlaceholder:
      "सर्वे नंबर खोजें",

    searchButton:
      "खोजें",

    search:
      "खोजें",

    askAI:
      "AI सहायक से पूछें",


    /* SERVICES */

    servicesTitle:
      "लोकप्रिय सेवाएँ",

    servicesDescription:
      "एक बुद्धिमान प्लेटफॉर्म से कर्नाटक की सभी भूमि सेवाओं तक पहुँचें।",

    viewRTC:
      "RTC देखें",

    surveyMaps:
      "सर्वे मैप",

    mutationStatus:
      "म्यूटेशन स्थिति",

    aiAssistant:
      "AI सहायक",

    ocrDocuments:
      "OCR दस्तावेज़",

    voiceAssistant:
      "वॉयस असिस्टेंट",

    clickToAccess:
      "इस सेवा तक पहुँचने के लिए क्लिक करें।",


    /* FEATURES */

    featuresTitle:
      "विशेष AI सुविधाएँ",

    featuresDescription:
      "भूमि प्रबंधन को सरल बनाने और भुमिमित्र को पारंपरिक भूमि रिकॉर्ड प्रणालियों से अलग बनाने के लिए डिज़ाइन की गई नवीन AI क्षमताएँ।",

    multilingual:
      "बहुभाषी AI",

    smartOCR:
      "स्मार्ट OCR",

    fraudDetection:
      "धोखाधड़ी का पता लगाना",

    landTimeline:
      "भूमि समयरेखा",

    gisMaps:
      "GIS स्मार्ट मैप्स",

    landIntelligence:
      "भूमि इंटेलिजेंस",

    legalAssistant:
      "AI कानूनी सहायक",


    voiceAssistantDesc:
      "वॉयस कमांड का उपयोग करके पोर्टल पर नेविगेट करें और भूमि रिकॉर्ड प्राप्त करें।",

    multilingualDesc:
      "अंग्रेज़ी, कन्नड़, हिंदी, तमिल और तेलुगु में स्वाभाविक रूप से संवाद करें।",

    smartOCRDesc:
      "भूमि दस्तावेज़ अपलोड करें और तुरंत AI द्वारा तैयार स्पष्टीकरण प्राप्त करें।",

    fraudDetectionDesc:
      "AI संदिग्ध स्वामित्व पैटर्न और रिकॉर्ड की विसंगतियों की पहचान करता है।",

    landTimelineDesc:
      "समय के साथ किसी संपत्ति के स्वामित्व इतिहास को देखें।",

    gisMapsDesc:
      "इंटरैक्टिव AI-संचालित मैप के साथ सर्वे सीमाओं का अन्वेषण करें।",

    landIntelligenceDesc:
      "भूमि डेटा के आधार पर जानकारी और सुझाव प्राप्त करें।",

    legalAssistantDesc:
      "भूमि रिकॉर्ड के बारे में प्रश्न पूछें और कानूनी शब्दावली को समझें।",


    /* ABOUT */
    aboutTag: "भूमिमित्र के बारे में",

    aboutTitle:
      "भुमिमित्र के बारे में",

    aboutDescription:
      "भुमिमित्र एक AI-संचालित मल्टीमॉडल भूमि रजिस्ट्री प्लेटफॉर्म है जिसे कर्नाटक भूमि रिकॉर्ड तक आसान पहुँच प्रदान करने के लिए विकसित किया गया है। यह नागरिकों, किसानों और सरकारी अधिकारियों के लिए AI, OCR, बहुभाषी सहायता, GIS मैपिंग और वॉयस असिस्टेंस को एक सुरक्षित प्लेटफॉर्म में जोड़ता है।",

    exploreServices:
      "सेवाएँ देखें",

    artificialIntelligence:
      "कृत्रिम बुद्धिमत्ता",

    multilingualAccess:
      "बहुभाषी पहुँच",

    governmentReady:
      "सरकारी उपयोग के लिए तैयार",

    securePlatform:
      "सुरक्षित प्लेटफॉर्म",


    /* FOOTER */

    footerDescription:
      "भुमिमित्र एक AI-संचालित मल्टीमॉडल भूमि रजिस्ट्री प्लेटफॉर्म है जो स्मार्ट सर्च, बहुभाषी सहायता, वॉयस असिस्टेंस, OCR और GIS एकीकरण के माध्यम से कर्नाटक भूमि रिकॉर्ड तक आसान पहुँच प्रदान करता है।",

    quickLinks:
      "त्वरित लिंक",

    footerServices:
      "सेवाएँ",

    contactUs:
      "संपर्क करें",

    rtc:
      "RTC",

    pahani:
      "पहानी",

    mutation:
      "म्यूटेशन",

    surveyMapsFooter:
      "सर्वे मैप",

    aiAssistantFooter:
      "AI सहायक",

    builtBy:
      "वर्षिता एन द्वारा निर्मित",

    allRightsReserved:
      "सर्वाधिकार सुरक्षित।",

    location:
      "बेंगलुरु, कर्नाटक",
  },


  /* =======================================================
     TAMIL
  ======================================================= */

  Tamil: {

    /* NAVBAR */

    home: "முகப்பு",
    services: "சேவைகள்",
    features: "அம்சங்கள்",
    about: "எங்களைப் பற்றி",

    language: "மொழி",
    theme: "தீம்",

    login: "உள்நுழை",
    register: "பதிவு",


    /* HERO */

    heroBadge:
      "🟢 கர்நாடக டிஜிட்டல் நில பதிவுகள்",

    heroTitle:
      "AI இயக்கப்படும் நில பதிவு தளம்",

    heroDescription:
      "பல இந்திய மொழிகளில் RTC, பஹானி, மாற்றம், சர்வே வரைபடங்கள் மற்றும் AI உதவியை அணுகவும்.",

    searchPlaceholder:
      "சர்வே எண்ணைத் தேடுங்கள்",

    searchButton:
      "தேடல்",

    search:
      "தேடல்",

    askAI:
      "AI உதவியாளரிடம் கேளுங்கள்",


    /* SERVICES */

    servicesTitle:
      "பிரபலமான சேவைகள்",

    servicesDescription:
      "அனைத்து கர்நாடக நில சேவைகளையும் ஒரே புத்திசாலித்தனமான தளத்தில் அணுகுங்கள்.",

    viewRTC:
      "RTC பார்க்கவும்",

    surveyMaps:
      "சர்வே வரைபடங்கள்",

    mutationStatus:
      "மாற்ற நிலை",

    aiAssistant:
      "AI உதவியாளர்",

    ocrDocuments:
      "OCR ஆவணங்கள்",

    voiceAssistant:
      "குரல் உதவியாளர்",

    clickToAccess:
      "இந்த சேவையை அணுக கிளிக் செய்யவும்.",


    /* FEATURES */

    featuresTitle:
      "சிறப்பு AI அம்சங்கள்",

    featuresDescription:
      "நில மேலாண்மையை எளிதாக்கவும், பாரம்பரிய நில பதிவு அமைப்புகளிலிருந்து பூமிமித்ராவை வேறுபடுத்தவும் வடிவமைக்கப்பட்ட புதுமையான AI திறன்கள்.",

    multilingual:
      "பலமொழி AI",

    smartOCR:
      "ஸ்மார்ட் OCR",

    fraudDetection:
      "மோசடி கண்டறிதல்",

    landTimeline:
      "நில காலவரிசை",

    gisMaps:
      "GIS ஸ்மார்ட் வரைபடங்கள்",

    landIntelligence:
      "நில நுண்ணறிவு",

    legalAssistant:
      "AI சட்ட உதவியாளர்",


    voiceAssistantDesc:
      "குரல் கட்டளைகளைப் பயன்படுத்தி போர்ட்டலில் செல்லவும் மற்றும் நில பதிவுகளைப் பெறவும்.",

    multilingualDesc:
      "ஆங்கிலம், கன்னடம், இந்தி, தமிழ் மற்றும் தெலுங்கில் இயல்பாக தொடர்பு கொள்ளுங்கள்.",

    smartOCRDesc:
      "நில ஆவணங்களைப் பதிவேற்றி, உடனடியாக AI உருவாக்கிய விளக்கங்களைப் பெறுங்கள்.",

    fraudDetectionDesc:
      "AI சந்தேகத்திற்கிடமான உரிமை முறைகள் மற்றும் பதிவு முரண்பாடுகளை கண்டறிகிறது.",

    landTimelineDesc:
      "காலப்போக்கில் ஒரு சொத்தின் உரிமை வரலாற்றைப் பார்க்கவும்.",

    gisMapsDesc:
      "ஊடாடும் AI இயக்கப்படும் வரைபடங்களுடன் சர்வே எல்லைகளை ஆராயுங்கள்.",

    landIntelligenceDesc:
      "நிலத் தரவின் அடிப்படையில் நுண்ணறிவுகளையும் பரிந்துரைகளையும் பெறுங்கள்.",

    legalAssistantDesc:
      "நில பதிவுகள் குறித்து கேள்விகள் கேட்டு சட்ட சொற்களைப் புரிந்துகொள்ளுங்கள்.",


    /* ABOUT */
    aboutTag: "பூமிமித்ரா பற்றி",

    aboutTitle:
      "பூமிமித்ரா பற்றி",

    aboutDescription:
      "பூமிமித்ரா என்பது கர்நாடக நில பதிவுகளை எளிதாக அணுகுவதற்காக உருவாக்கப்பட்ட AI அடிப்படையிலான மல்டிமோடல் நில பதிவு தளமாகும். இது செயற்கை நுண்ணறிவு, OCR, பலமொழி ஆதரவு, GIS வரைபடம் மற்றும் குரல் உதவியை குடிமக்கள், விவசாயிகள் மற்றும் அரசு அதிகாரிகளுக்காக ஒரு பாதுகாப்பான தளத்தில் ஒருங்கிணைக்கிறது.",

    exploreServices:
      "சேவைகளை ஆராயுங்கள்",

    artificialIntelligence:
      "செயற்கை நுண்ணறிவு",

    multilingualAccess:
      "பலமொழி அணுகல்",

    governmentReady:
      "அரசாங்க பயன்பாட்டிற்கு தயாராக உள்ளது",

    securePlatform:
      "பாதுகாப்பான தளம்",


    /* FOOTER */

    footerDescription:
      "பூமிமித்ரா என்பது அறிவார்ந்த தேடல், பலமொழி ஆதரவு, குரல் உதவி, OCR மற்றும் GIS ஒருங்கிணைப்பு மூலம் கர்நாடக நில பதிவுகளை எளிதாக அணுக உதவும் AI அடிப்படையிலான மல்டிமோடல் நில பதிவு தளமாகும்.",

    quickLinks:
      "விரைவு இணைப்புகள்",

    footerServices:
     "சேவைகள்",

    contactUs:
      "எங்களை தொடர்பு கொள்ளுங்கள்",

    rtc:
      "RTC",

    pahani:
      "பஹானி",

    mutation:
      "மாற்றம்",

    surveyMapsFooter:
      "சர்வே வரைபடங்கள்",

    aiAssistantFooter:
      "AI உதவியாளர்",

    builtBy:
      "வர்ஷிதா என் அவர்களால் உருவாக்கப்பட்டது",

    allRightsReserved:
      "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    location:
      "பெங்களூரு, கர்நாடகா",
  },


  /* =======================================================
     TELUGU
  ======================================================= */

  Telugu: {

    /* NAVBAR */

    home: "హోమ్",
    services: "సేవలు",
    features: "ఫీచర్లు",
    about: "మా గురించి",

    language: "భాష",
    theme: "థీమ్",

    login: "లాగిన్",
    register: "నమోదు",


    /* HERO */

    heroBadge:
      "🟢 కర్ణాటక డిజిటల్ భూ రికార్డులు",

    heroTitle:
      "AI ఆధారిత భూ రికార్డుల వేదిక",

    heroDescription:
      "అనేక భారతీయ భాషల్లో RTC, పహాణి, మ్యుటేషన్, సర్వే మ్యాప్స్ మరియు AI సహాయాన్ని పొందండి.",

    searchPlaceholder:
      "సర్వే నంబర్‌ను శోధించండి",

    searchButton:
      "శోధించండి",

    search:
      "శోధించండి",

    askAI:
      "AI సహాయకుడిని అడగండి",


    /* SERVICES */

    servicesTitle:
      "ప్రసిద్ధ సేవలు",

    servicesDescription:
      "అన్ని కర్ణాటక భూ సేవలను ఒకే తెలివైన వేదిక నుండి యాక్సెస్ చేయండి.",

    viewRTC:
      "RTC చూడండి",

    surveyMaps:
      "సర్వే మ్యాప్స్",

    mutationStatus:
      "మ్యుటేషన్ స్థితి",

    aiAssistant:
      "AI సహాయకుడు",

    ocrDocuments:
      "OCR పత్రాలు",

    voiceAssistant:
      "వాయిస్ అసిస్టెంట్",

    clickToAccess:
      "ఈ సేవను యాక్సెస్ చేయడానికి క్లిక్ చేయండి.",


    /* FEATURES */

    featuresTitle:
      "ప్రత్యేక AI ఫీచర్లు",

    featuresDescription:
      "భూ నిర్వహణను సులభతరం చేయడానికి మరియు సాంప్రదాయ భూ రికార్డు వ్యవస్థల నుండి భూమిమిత్రను భిన్నంగా చేయడానికి రూపొందించిన వినూత్న AI సామర్థ్యాలు.",

    multilingual:
      "బహుభాషా AI",

    smartOCR:
      "స్మార్ట్ OCR",

    fraudDetection:
      "మోసం గుర్తింపు",

    landTimeline:
      "భూమి టైమ్‌లైన్",

    gisMaps:
      "GIS స్మార్ట్ మ్యాప్స్",

    landIntelligence:
      "ల్యాండ్ ఇంటెలిజెన్స్",

    legalAssistant:
      "AI లీగల్ అసిస్టెంట్",


    voiceAssistantDesc:
      "వాయిస్ కమాండ్లను ఉపయోగించి పోర్టల్‌లో నావిగేట్ చేయండి మరియు భూ రికార్డులను పొందండి.",

    multilingualDesc:
      "ఇంగ్లీష్, కన్నడ, హిందీ, తమిళం మరియు తెలుగులో సహజంగా సంభాషించండి.",

    smartOCRDesc:
      "భూ పత్రాలను అప్‌లోడ్ చేసి వెంటనే AI రూపొందించిన వివరణలను పొందండి.",

    fraudDetectionDesc:
      "AI అనుమానాస్పద యాజమాన్య నమూనాలు మరియు రికార్డు అసమానతలను గుర్తిస్తుంది.",

    landTimelineDesc:
      "కాలక్రమేణా ఆస్తి యాజమాన్య చరిత్రను చూడండి.",

    gisMapsDesc:
      "ఇంటరాక్టివ్ AI ఆధారిత మ్యాప్‌లతో సర్వే సరిహద్దులను అన్వేషించండి.",

    landIntelligenceDesc:
      "భూమి డేటా ఆధారంగా అంతర్దృష్టులు మరియు సిఫార్సులను పొందండి.",

    legalAssistantDesc:
      "భూ రికార్డుల గురించి ప్రశ్నలు అడగండి మరియు చట్టపరమైన పదజాలాన్ని అర్థం చేసుకోండి.",


    /* ABOUT */
    aboutTag: "భూమిమిత్ర గురించి",

    aboutTitle:
      "భూమిమిత్ర గురించి",

    aboutDescription:
      "భూమిమిత్ర అనేది కర్ణాటక భూ రికార్డులకు సులభమైన ప్రాప్యతను అందించడానికి అభివృద్ధి చేయబడిన AI ఆధారిత మల్టీమోడల్ ల్యాండ్ రిజిస్ట్రీ ప్లాట్‌ఫారమ్. ఇది పౌరులు, రైతులు మరియు ప్రభుత్వ అధికారుల కోసం కృత్రిమ మేధస్సు, OCR, బహుభాషా మద్దతు, GIS మ్యాపింగ్ మరియు వాయిస్ సహాయాన్ని ఒకే సురక్షిత వేదికలో కలుపుతుంది.",

    exploreServices:
      "సేవలను అన్వేషించండి",

    artificialIntelligence:
      "కృత్రిమ మేధస్సు",

    multilingualAccess:
      "బహుభాషా ప్రాప్యత",

    governmentReady:
      "ప్రభుత్వ వినియోగానికి సిద్ధంగా ఉంది",

    securePlatform:
      "సురక్షిత వేదిక",


    /* FOOTER */

    footerDescription:
      "భూమిమిత్ర అనేది తెలివైన శోధన, బహుభాషా మద్దతు, వాయిస్ సహాయం, OCR మరియు GIS ఇంటిగ్రేషన్ ద్వారా కర్ణాటక భూ రికార్డులకు సులభమైన ప్రాప్యతను అందించడానికి రూపొందించబడిన AI ఆధారిత మల్టీమోడల్ ల్యాండ్ రిజిస్ట్రీ ప్లాట్‌ఫారమ్.",

    quickLinks:
      "త్వరిత లింకులు",

    footerServices:
      "సేవలు",

    contactUs:
      "మమ్మల్ని సంప్రదించండి",

    rtc:
      "RTC",

    pahani:
      "పహాణి",

    mutation:
      "మ్యుటేషన్",

    surveyMapsFooter:
      "సర్వే మ్యాప్స్",

    aiAssistantFooter:
      "AI సహాయకుడు",

    builtBy:
      "వర్షిత ఎన్ ద్వారా నిర్మించబడింది",

    allRightsReserved:
      "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",

    location:
      "బెంగళూరు, కర్ణాటక",
  },

};


/* =========================================================
   LANGUAGE CONTEXT TYPE
========================================================= */

interface LanguageContextType {

  language: Language;

  changeLanguage:
    (language: Language) => void;

  t: Translation;

  theme: Theme;

  changeTheme:
    (theme: Theme) => void;
}


/* =========================================================
   CREATE CONTEXT
========================================================= */

const LanguageContext =
  createContext<
    LanguageContextType | undefined
  >(undefined);


/* =========================================================
   LANGUAGE PROVIDER
========================================================= */

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {


  /* =======================================================
     LANGUAGE STATE
  ======================================================= */

  const [
    language,
    setLanguage,
  ] = useState<Language>(() => {

    const savedLanguage =
      localStorage.getItem(
        "language"
      ) as Language | null;

    if (
      savedLanguage &&
      [
        "English",
        "Kannada",
        "Hindi",
        "Tamil",
        "Telugu",
      ].includes(savedLanguage)
    ) {
      return savedLanguage;
    }

    return "English";
  });


  /* =======================================================
     THEME STATE
  ======================================================= */

  const [
    theme,
    setTheme,
  ] = useState<Theme>(() => {

    const savedTheme =
      localStorage.getItem(
        "theme"
      ) as Theme | null;

    if (
      savedTheme === "Dark" ||
      savedTheme === "Light"
    ) {
      return savedTheme;
    }

    return "Dark";
  });


  /* =======================================================
     CHANGE LANGUAGE
  ======================================================= */

  const changeLanguage = (
    newLanguage: Language
  ) => {

    setLanguage(newLanguage);

    localStorage.setItem(
      "language",
      newLanguage
    );
  };


  /* =======================================================
     CHANGE THEME
  ======================================================= */

  const changeTheme = (
    newTheme: Theme
  ) => {

    setTheme(newTheme);

    localStorage.setItem(
      "theme",
      newTheme
    );
  };


  /* =======================================================
     APPLY THEME TO BODY
  ======================================================= */

  useEffect(() => {

    const body =
      document.body;

    /* Remove old theme classes */

    body.classList.remove(
      "dark-theme",
      "light-theme"
    );

    /* Add current theme */

    if (theme === "Dark") {

      body.classList.add(
        "dark-theme"
      );

    } else {

      body.classList.add(
        "light-theme"
      );

    }

  }, [theme]);


  /* =======================================================
     PROVIDER
  ======================================================= */

  return (

    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,

        t:
          translations[
            language
          ],

        theme,
        changeTheme,
      }}
    >

      {children}

    </LanguageContext.Provider>

  );
}


/* =========================================================
   CUSTOM HOOK
========================================================= */

export function useLanguage() {

  const context =
    useContext(
      LanguageContext
    );


  if (!context) {

    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );

  }


  return context;

}