import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { getLandRecords } from "../../api/landApi";

// =====================================
// LAND RECORD TYPE
// =====================================

interface LandRecord {
  id: number;
  owner_name: string;
  survey_number: string;
  village: string;
  taluk: string;
  district: string;
  area: string | number;
  land_type: string;
  created_by?: number | null;
  created_at?: string;
}

// =====================================
// MAP CONTROLLER
// =====================================

function MapController({
  searchTriggered,
  selectedParcel,
}: {
  searchTriggered: boolean;
  selectedParcel: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!searchTriggered) {
      return;
    }

    // Temporary demo coordinates
    // We will later connect actual GPS coordinates
    // from the database.

    if (selectedParcel === "145/2A") {
      map.setView([12.9725, 77.5925], 16);
    }

    if (selectedParcel === "87/1") {
      map.setView([12.9725, 77.5975], 16);
    }

    if (selectedParcel === "54/3") {
      map.setView([12.9675, 77.5925], 16);
    }
  }, [searchTriggered, selectedParcel, map]);

  return null;
}

// =====================================
// MAIN SURVEY COMPONENT
// =====================================

function Survey() {
  // =====================================
  // STATES
  // =====================================

  const [surveyNumber, setSurveyNumber] = useState("");

  const [selectedParcel, setSelectedParcel] =
    useState("");

  const [searchTriggered, setSearchTriggered] =
    useState(false);

  const [allLandRecords, setAllLandRecords] =
    useState<LandRecord[]>([]);

  const [selectedLand, setSelectedLand] =
    useState<LandRecord | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =====================================
  // FETCH LAND RECORDS
  // =====================================

  useEffect(() => {
    const fetchLandRecords = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getLandRecords();

        console.log(
          "Land Records:",
          data
        );

        if (data.success) {
          setAllLandRecords(
            data.lands || []
          );
        } else {
          setError(
            "Failed to load land records."
          );
        }
      } catch (error) {
        console.error(
          "Error fetching land records:",
          error
        );

        setError(
          "Unable to connect to backend."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLandRecords();
  }, []);

  // =====================================
  // SEARCH
  // =====================================

  const handleSearch = () => {
    const searchValue =
      surveyNumber.trim();

    if (searchValue === "") {
      alert(
        "Please enter a Survey Number"
      );
      return;
    }

    // Case-insensitive search
    const found =
      allLandRecords.find(
        (item) =>
          item.survey_number
            .toLowerCase()
            === searchValue.toLowerCase()
      );

    if (!found) {
      setSelectedParcel("");
      setSelectedLand(null);
      setSearchTriggered(false);

      alert(
        "Survey Number not found."
      );

      return;
    }

    // Set selected survey number
    setSelectedParcel(
      found.survey_number
    );

    // Set selected land record
    setSelectedLand(found);

    // Trigger map movement
    setSearchTriggered(true);
  };

  // =====================================
  // CLEAR
  // =====================================

  const handleClear = () => {
    setSurveyNumber("");

    setSelectedParcel("");

    setSelectedLand(null);

    setSearchTriggered(false);
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <section className="survey-page">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="survey-header">

        <h1>
          Survey Maps
        </h1>

        <p className="survey-subtitle">
          Find your land using Survey Number.
        </p>

      </div>


      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div className="survey-search">

        <input
          type="text"
          placeholder="Enter Survey Number"
          value={surveyNumber}
          onChange={(e) =>
            setSurveyNumber(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
        >
          🔍 Search Map
        </button>

        {searchTriggered && (

          <button
            className="survey-clear-button"
            onClick={handleClear}
          >
            Clear
          </button>

        )}

      </div>


      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (

        <div className="survey-message">

          Loading land records...

        </div>

      )}


      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (

        <div className="survey-error">

          {error}

        </div>

      )}


      {/* ================================= */}
      {/* MAP + LAND DETAILS */}
      {/* ================================= */}

      <div className="survey-content">


        {/* ================================= */}
        {/* MAP */}
        {/* ================================= */}

        <div className="survey-map">

          <h2>
            🗺️ Map Preview
          </h2>

          <div className="map-container">

            <MapContainer
              center={[
                12.9716,
                77.5946,
              ]}
              zoom={12}
              style={{
                height: "500px",
                width: "100%",
              }}
            >

              <MapController
                searchTriggered={
                  searchTriggered
                }
                selectedParcel={
                  selectedParcel
                }
              />


              {/* ================================= */}
              {/* OPEN STREET MAP */}
              {/* ================================= */}

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              {/* ================================= */}
              {/* MAIN MARKER */}
              {/* ================================= */}

              <Marker
                position={[
                  12.9716,
                  77.5946,
                ]}
              >

                <Popup>

                  <strong>
                    BhumiMitra Survey Map
                  </strong>

                  <br />

                  Survey Number:{" "}

                  {selectedParcel ||
                    "Select a survey"}

                  <br />

                  Bangalore, Karnataka

                </Popup>

              </Marker>


              {/* ================================= */}
              {/* PARCEL 1 */}
              {/* ================================= */}

              <Polygon
                positions={[
                  [12.9750, 77.5900],
                  [12.9750, 77.5950],
                  [12.9700, 77.5950],
                  [12.9700, 77.5900],
                ]}
                pathOptions={{
                  color:
                    selectedParcel ===
                    "145/2A"
                      ? "red"
                      : "green",

                  fillColor:
                    selectedParcel ===
                    "145/2A"
                      ? "red"
                      : "green",

                  fillOpacity:
                    selectedParcel ===
                    "145/2A"
                      ? 0.6
                      : 0.3,

                  weight:
                    selectedParcel ===
                    "145/2A"
                      ? 4
                      : 2,
                }}
              >

                <Popup>

                  <strong>
                    Survey No: 145/2A
                  </strong>

                  <br />

                  Owner: Varshitha N

                  <br />

                  Bangalore

                </Popup>

              </Polygon>


              {/* ================================= */}
              {/* PARCEL 2 */}
              {/* ================================= */}

              <Polygon
                positions={[
                  [12.9750, 77.5950],
                  [12.9750, 77.6000],
                  [12.9700, 77.6000],
                  [12.9700, 77.5950],
                ]}
                pathOptions={{
                  color:
                    selectedParcel ===
                    "87/1"
                      ? "red"
                      : "blue",

                  fillColor:
                    selectedParcel ===
                    "87/1"
                      ? "red"
                      : "blue",

                  fillOpacity:
                    selectedParcel ===
                    "87/1"
                      ? 0.6
                      : 0.3,

                  weight:
                    selectedParcel ===
                    "87/1"
                      ? 4
                      : 2,
                }}
              >

                <Popup>

                  <strong>
                    Survey No: 87/1
                  </strong>

                  <br />

                  Owner: Ramesh Kumar

                  <br />

                  Bangalore

                </Popup>

              </Polygon>


              {/* ================================= */}
              {/* PARCEL 3 */}
              {/* ================================= */}

              <Polygon
                positions={[
                  [12.9700, 77.5900],
                  [12.9700, 77.5950],
                  [12.9650, 77.5950],
                  [12.9650, 77.5900],
                ]}
                pathOptions={{
                  color:
                    selectedParcel ===
                    "54/3"
                      ? "red"
                      : "orange",

                  fillColor:
                    selectedParcel ===
                    "54/3"
                      ? "red"
                      : "orange",

                  fillOpacity:
                    selectedParcel ===
                    "54/3"
                      ? 0.6
                      : 0.3,

                  weight:
                    selectedParcel ===
                    "54/3"
                      ? 4
                      : 2,
                }}
              >

                <Popup>

                  <strong>
                    Survey No: 54/3
                  </strong>

                  <br />

                  Owner: Anitha Devi

                  <br />

                  Bangalore

                </Popup>

              </Polygon>

            </MapContainer>

          </div>

        </div>


        {/* ================================= */}
        {/* LAND DETAILS */}
        {/* ================================= */}

        {selectedLand && (

          <div className="survey-details">

            {/* ================================= */}
            {/* DETAILS HEADER */}
            {/* ================================= */}

            <div className="details-header">

              <span className="details-icon">
                📋
              </span>

              <div>

                <h2>
                  Land Details
                </h2>

                <p>

                  Survey Number:{" "}

                  <strong>
                    {
                      selectedLand.survey_number
                    }
                  </strong>

                </p>

              </div>

            </div>


            {/* ================================= */}
            {/* DETAILS GRID */}
            {/* ================================= */}

            <div className="land-details-grid">


              {/* OWNER */}

              <div className="land-detail-item">

                <span>
                  👤 Owner Name
                </span>

                <strong>
                  {
                    selectedLand.owner_name
                  }
                </strong>

              </div>


              {/* AREA */}

              <div className="land-detail-item">

                <span>
                  📐 Land Area
                </span>

                <strong>
                  {
                    selectedLand.area
                  }{" "}
                  Acres
                </strong>

              </div>


              {/* VILLAGE */}

              <div className="land-detail-item">

                <span>
                  🏘️ Village
                </span>

                <strong>
                  {
                    selectedLand.village
                  }
                </strong>

              </div>


              {/* DISTRICT */}

              <div className="land-detail-item">

                <span>
                  📍 District
                </span>

                <strong>
                  {
                    selectedLand.district
                  }
                </strong>

              </div>


              {/* TALUK */}

              <div className="land-detail-item">

                <span>
                  🏛️ Taluk
                </span>

                <strong>
                  {
                    selectedLand.taluk
                  }
                </strong>

              </div>


              {/* LAND TYPE */}

              <div className="land-detail-item">

                <span>
                  🚜 Land Type
                </span>

                <strong>
                  {
                    selectedLand.land_type
                  }
                </strong>

              </div>

            </div>


            {/* ================================= */}
            {/* SELECTED MESSAGE */}
            {/* ================================= */}

            <div className="selected-parcel-message">

              📍

              <span>

                Survey parcel{" "}

                <strong>
                  {
                    selectedLand.survey_number
                  }
                </strong>{" "}

                is currently highlighted
                on the map.

              </span>

            </div>

          </div>

        )}

      </div>


      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {!selectedParcel && !loading && (

        <div className="survey-empty">

          <div className="empty-icon">
            🗺️
          </div>

          <h2>
            Search for a Survey Number
          </h2>

          <p>

            Enter a survey number above
            to view the land parcel and
            detailed information.

          </p>

        </div>

      )}

    </section>
  );
}

export default Survey;