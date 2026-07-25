import { useState } from "react";

interface Update {
  id: number;
  icon: string;
  category: string;
  title: string;
  date: string;
  description: string;
  source: string;
}

function Updates() {
  const [selectedUpdate, setSelectedUpdate] =
    useState<Update | null>(null);

  const updates: Update[] = [
    {
      id: 1,
      icon: "📢",
      category: "Land Records",
      title: "Bhoomi Land Records Service Update",
      date: "18 July 2026",
      description:
        "Stay informed about the latest developments and service updates related to Karnataka's Bhoomi land record services.",
      source: "Karnataka Land Records",
    },
    {
      id: 2,
      icon: "🔄",
      category: "Mutation",
      title: "Land Mutation Service Update",
      date: "15 July 2026",
      description:
        "Important information regarding land ownership changes, mutation applications, and updates to land records.",
      source: "Karnataka Revenue Department",
    },
    {
      id: 3,
      icon: "🗺️",
      category: "Survey",
      title: "Survey and Land Map Update",
      date: "12 July 2026",
      description:
        "Latest information related to land surveys, survey boundaries, and digital land map services.",
      source: "Karnataka Survey Department",
    },
    {
      id: 4,
      icon: "📋",
      category: "RTC / Pahani",
      title: "RTC and Pahani Record Update",
      date: "10 July 2026",
      description:
        "Information related to accessing and verifying RTC / Pahani land records and other important property details.",
      source: "Karnataka Land Records",
    },
    {
      id: 5,
      icon: "🏛️",
      category: "Government",
      title: "Karnataka Revenue Department Notification",
      date: "08 July 2026",
      description:
        "Latest government information and notifications that may be relevant to landowners and agricultural property holders.",
      source: "Karnataka Revenue Department",
    },
  ];

  return (
    <section className="feature-page updates-page">

      {/* HEADER */}

      <div className="updates-header">

        <div className="updates-header-content">

          <span className="updates-label">
            📰 Latest Updates
          </span>

          <h1>
            Land Updates
          </h1>

          <p>
            Stay informed about the latest updates,
            notifications, and announcements related
            to Karnataka land records and services.
          </p>

        </div>

        <div className="updates-header-icon">
          📰
        </div>

      </div>


      {/* INFO BANNER */}

      <div className="updates-info-banner glass-card">

        <div className="updates-info-icon">
          ℹ️
        </div>

        <div>

          <h3>
            Latest Karnataka Land Record Updates
          </h3>

          <p>
            Find important updates related to land
            records, mutation, RTC, surveys, and
            government notifications in one place.
          </p>

        </div>

      </div>


      {/* UPDATES SECTION HEADER */}

      <div className="updates-section-header">

        <div>

          <h2>
            Recent Updates
          </h2>

          <p>
            Latest information for landowners
          </p>

        </div>

        <span className="updates-count">
          {updates.length} Updates
        </span>

      </div>


      {/* UPDATES LIST */}

      <div className="updates-list">

        {updates.map((update) => (

          <div
            key={update.id}
            className="update-card glass-card"
          >

            {/* Icon */}

            <div className="update-card-icon">
              {update.icon}
            </div>


            {/* Content */}

            <div className="update-card-content">

              <div className="update-card-top">

                <span className="update-category">
                  {update.category}
                </span>

                <span className="update-date">
                  📅 {update.date}
                </span>

              </div>


              <h3>
                {update.title}
              </h3>


              <p>
                {update.description}
              </p>


              <div className="update-card-bottom">

                <span className="update-source">
                  🏛️ {update.source}
                </span>

                <button
                  className="read-update-button"
                  onClick={() =>
                    setSelectedUpdate(update)
                  }
                >
                  Read More →
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* OFFICIAL SOURCE NOTICE */}

      <div className="updates-source-notice glass-card">

        <div className="source-notice-icon">
          🏛️
        </div>

        <div>

          <h3>
            Verify Important Information
          </h3>

          <p>
            Land-related information may change over
            time. Always verify important legal or
            property-related information through
            official Karnataka government sources.
          </p>

        </div>

      </div>


      {/* UPDATE MODAL */}

      {selectedUpdate && (

        <div
          className="update-modal-overlay"
          onClick={() =>
            setSelectedUpdate(null)
          }
        >

          <div
            className="update-modal glass-card"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="update-modal-header">

              <div className="update-modal-title">

                <span className="modal-update-icon">
                  {selectedUpdate.icon}
                </span>

                <div>

                  <span className="update-category">
                    {selectedUpdate.category}
                  </span>

                  <h2>
                    {selectedUpdate.title}
                  </h2>

                </div>

              </div>


              <button
                className="close-update-modal"
                onClick={() =>
                  setSelectedUpdate(null)
                }
              >
                ✕
              </button>

            </div>


            {/* Modal Content */}

            <div className="update-modal-content">

              <div className="modal-update-date">
                📅 Published: {selectedUpdate.date}
              </div>

              <p>
                {selectedUpdate.description}
              </p>

              <div className="modal-update-source">
                🏛️ Source: {selectedUpdate.source}
              </div>


              <div className="modal-demo-notice">

                <span>
                  ℹ️
                </span>

                <p>
                  This is currently sample information
                  for the BhumiMitra application.
                  Official update links and live
                  notifications will be connected
                  when the backend is integrated.
                </p>

              </div>

            </div>


            {/* Modal Footer */}

            <div className="update-modal-footer">

              <button
                className="close-modal-button"
                onClick={() =>
                  setSelectedUpdate(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default Updates;