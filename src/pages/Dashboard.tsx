import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkBackendHealth } from "../api/backend";

import {
  Search,
  User,
  FileText,
  ClipboardList,
  Map,
  Bot,
  ScanText,
  Mic,
  FolderOpen,
  Newspaper,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react";

interface DashboardCard {
  title: string;
  icon: React.ReactNode;
  desc: string;
  path: string;
  keywords: string[];
}

function Dashboard() {
  const navigate = useNavigate();

  // ==========================================
  // BACKEND CONNECTION STATE
  // ==========================================

  const [backendMessage, setBackendMessage] =
    useState("Connecting to backend...");

  // ==========================================
  // USER STATE
  // ==========================================

  const [userName, setUserName] =
    useState("User");

  const [profileOpen, setProfileOpen] =
    useState(false);

  // ==========================================
  // SEARCH STATE
  // ==========================================

  const [searchQuery, setSearchQuery] =
    useState("");

  const searchRef =
    useRef<HTMLDivElement>(null);

  // ==========================================
  // CHECK BACKEND CONNECTION
  // ==========================================

  useEffect(() => {
    const connectToBackend = async () => {
      try {
        const data = await checkBackendHealth();

        if (data.success) {
          setBackendMessage(
            data.message || "Backend connected successfully"
          );
        } else {
          setBackendMessage(
            "Backend is running, but something went wrong."
          );
        }
      } catch (error) {
        console.error(
          "Backend Connection Error:",
          error
        );

        setBackendMessage(
          "Backend connection failed."
        );
      }
    };

    connectToBackend();
  }, []);

  // ==========================================
  // GET USER NAME
  // ==========================================

  useEffect(() => {
  const storedUser =
    localStorage.getItem("bhumiMitraUser");

  if (!storedUser) {
    navigate("/login");
    return;
  }

  try {
    const user = JSON.parse(storedUser);

    setUserName(
      user.name ||
      "User"
    );

  } catch (error) {
    console.error(
      "Error reading user data:",
      error
    );

    localStorage.removeItem(
      "bhumiMitraUser"
    );

    localStorage.removeItem(
      "bhumiMitraToken"
    );

    navigate("/login");
  }
}, [navigate]);

  // ==========================================
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // DASHBOARD SERVICES
  // ==========================================

  const dashboardCards: DashboardCard[] = [
    {
      title: "RTC / Pahani",
      icon: <FileText size={32} />,
      desc: "View land ownership and RTC records.",
      path: "/rtc",
      keywords: [
        "rtc",
        "pahani",
        "land record",
        "ownership",
        "rights",
      ],
    },

    {
      title: "Mutation Status",
      icon: <ClipboardList size={32} />,
      desc: "Track mutation requests and updates.",
      path: "/mutation",
      keywords: [
        "mutation",
        "status",
        "ownership transfer",
        "transfer",
      ],
    },

    {
      title: "Survey Maps",
      icon: <Map size={32} />,
      desc: "Explore survey boundaries and maps.",
      path: "/survey",
      keywords: [
        "survey",
        "map",
        "boundary",
        "land map",
      ],
    },

    {
      title: "AI Assistant",
      icon: <Bot size={32} />,
      desc: "Ask AI about Karnataka land records.",
      path: "/assistant",
      keywords: [
        "ai",
        "assistant",
        "chat",
        "question",
        "ask",
      ],
    },

    {
      title: "OCR Documents",
      icon: <ScanText size={32} />,
      desc: "Upload and understand land documents.",
      path: "/ocr",
      keywords: [
        "ocr",
        "document",
        "scan",
        "extract",
        "text",
        "upload",
      ],
    },

    {
      title: "Voice Assistant",
      icon: <Mic size={32} />,
      desc: "Search land records using voice commands.",
      path: "/voice",
      keywords: [
        "voice",
        "speech",
        "microphone",
        "talk",
      ],
    },

    {
      title: "My Documents",
      icon: <FolderOpen size={32} />,
      desc: "View your saved land documents.",
      path: "/documents",
      keywords: [
        "documents",
        "saved",
        "files",
        "my documents",
      ],
    },

    {
      title: "Land Updates",
      icon: <Newspaper size={32} />,
      desc: "Stay informed about recent land updates.",
      path: "/updates",
      keywords: [
        "updates",
        "news",
        "notifications",
        "government",
        "latest",
      ],
    },
  ];

  // ==========================================
  // SEARCH RESULTS
  // ==========================================

  const filteredCards =
    searchQuery.trim() === ""
      ? []
      : dashboardCards.filter((card) => {
          const query =
            searchQuery.toLowerCase().trim();

          return (
            card.title
              .toLowerCase()
              .includes(query) ||
            card.desc
              .toLowerCase()
              .includes(query) ||
            card.keywords.some((keyword) =>
              keyword
                .toLowerCase()
                .includes(query)
            )
          );
        });

  // ==========================================
  // GET GREETING
  // ==========================================

  const getGreeting = () => {
    const hour =
      new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 17) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
  console.log("LOGOUT BUTTON CLICKED");

  localStorage.removeItem("bhumiMitraUser");
  localStorage.removeItem("bhumiMitraToken");

  console.log("LocalStorage cleared");

  setProfileOpen(false);

  navigate("/login");

  console.log("Navigating to login");
};
  // ==========================================
  // NAVIGATE TO SERVICE
  // ==========================================

  const openService = (
    path: string
  ) => {
    setSearchQuery("");
    navigate(path);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const clearSearch = () => {
    setSearchQuery("");
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <section className="dashboard">

      {/* ================================= */}
      {/* BACKGROUND DECORATIONS */}
      {/* ================================= */}

      <div className="dashboard-bg-glow glow-one" />
      <div className="dashboard-bg-glow glow-two" />
      <div className="dashboard-bg-glow glow-three" />

      {/* ================================= */}
      {/* TOP NAVBAR */}
      {/* ================================= */}

      <header className="dashboard-topbar">

        {/* BRAND */}

        <div className="dashboard-brand">

          <div className="dashboard-brand-icon">
            🌿
          </div>

          <div>
            <h2>
              BhumiMitra
            </h2>

            <span>
              Your Land, Your Rights
            </span>
          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="topbar-right">

          {/* SEARCH */}

          <div
            className="dashboard-search-wrapper"
            ref={searchRef}
          >

            <div className="dashboard-search">

              <Search size={19} />

              <input
                type="text"
                value={searchQuery}
                placeholder="Search services..."
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
              />

              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </button>
              )}

            </div>

            {/* SEARCH RESULTS */}

            {searchQuery && (

              <div className="search-results">

                {filteredCards.length > 0 ? (

                  filteredCards.map(
                    (card) => (

                      <button
                        key={card.title}
                        className="search-result-item"
                        onClick={() =>
                          openService(
                            card.path
                          )
                        }
                      >

                        <div className="search-result-icon">
                          {card.icon}
                        </div>

                        <div className="search-result-text">

                          <strong>
                            {card.title}
                          </strong>

                          <span>
                            {card.desc}
                          </span>

                        </div>

                      </button>

                    )
                  )

                ) : (

                  <div className="no-search-results">

                    <Search size={22} />

                    <p>
                      No service found
                    </p>

                    <span>
                      Try searching for RTC,
                      Mutation, OCR or Survey.
                    </span>

                  </div>

                )}

              </div>

            )}

          </div>

          {/* USER PROFILE */}

          <div className="profile-wrapper">

            <button
              className="profile-button"
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
            >

              <div className="profile-avatar">
                <User size={20} />
              </div>

              <div className="profile-info">

                <strong>
                  {userName}
                </strong>

                <span>
                  Land Record User
                </span>

              </div>

              <ChevronDown
                size={17}
                className={
                  profileOpen
                    ? "rotate-chevron"
                    : ""
                }
              />

            </button>

            {/* PROFILE DROPDOWN */}

            {profileOpen && (

              <div className="profile-dropdown">

                <div className="profile-dropdown-header">

                  <div className="profile-avatar large">
                    <User size={22} />
                  </div>

                  <div>

                    <strong>
                      {userName}
                    </strong>

                    <span>
                      BhumiMitra User
                    </span>

                  </div>

                </div>

                <div className="profile-divider" />

                <button
                  type="button"
                  className="profile-menu-item logout-item"
                  onClick={() => {
                    alert("Logout clicked!");
                    handleLogout();
                  }}
                >
                  <LogOut size={19} />

                  <span>
                    Log Out
                  </span>
                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      {/* ================================= */}
      {/* BACKEND STATUS */}
      {/* ================================= */}

      <div className="backend-status">
        <span className="backend-status-dot" />

        <span>
          {backendMessage}
        </span>
      </div>

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}

      <div className="dashboard-hero">

        <div className="hero-content">

          <div className="hero-badge">

            <span>
              ✨
            </span>

            Your Digital Land Companion

          </div>

          <h1>

            {getGreeting()},

            <br />

            <span>
              {userName}.
            </span>

          </h1>

          <h2>

            Your land records,

            <br />

            <span>
              simplified.
            </span>

          </h2>

          <p>
            Manage your land records, track
            mutations, understand documents,
            and get AI-powered assistance —
            all in one secure place.
          </p>

          <div className="hero-decoration">
            <span />
            <span />
            <span />
          </div>

        </div>

        {/* DECORATIVE LAND CARD */}

        <div className="hero-visual">

          <div className="floating-land-card">

            <div className="land-card-top">

              <span>
                🌾
              </span>

              <span className="verified-badge">
                ✓ VERIFIED
              </span>

            </div>

            <div className="land-card-content">

              <small>
                YOUR LAND RECORDS
              </small>

              <h3>
                Managed
                <br />
                Digitally
              </h3>

              <div className="fake-lines">
                <span />
                <span />
                <span />
              </div>

            </div>

            <div className="land-card-footer">

              <span>
                BhumiMitra
              </span>

              <span>
                Karnataka
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* SERVICES SECTION */}
      {/* ================================= */}

      <div className="dashboard-services">

        <div className="services-heading">

          <div>

            <span>
              EXPLORE
            </span>

            <h2>
              Your Land Services
            </h2>

            <p>
              Everything you need to manage
              and understand your land records.
            </p>

          </div>

          <div className="services-line" />

        </div>

        {/* SERVICE CARDS */}

        <div className="dashboard-grid">

          {dashboardCards.map(
            (card, index) => (

              <div
                key={card.title}
                className="dashboard-card"
                onClick={() =>
                  navigate(
                    card.path
                  )
                }
                style={{
                  animationDelay:
                    `${index * 0.08}s`,
                }}
              >

                <div className="card-icon">
                  {card.icon}
                </div>

                <div className="card-content">

                  <h3>
                    {card.title}
                  </h3>

                  <p>
                    {card.desc}
                  </p>

                </div>

                <span className="card-arrow">
                  →
                </span>

              </div>

            )
          )}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;