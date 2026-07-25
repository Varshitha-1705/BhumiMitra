import { useEffect, useState } from "react";
import { getLandRecords } from "../../api/landApi";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

// ==========================================
// DISTRICTS
// ==========================================

const districts = [
  "Bangalore Urban",
  "Mysore",
  "Tumakuru",
  "Mandya",
];

// ==========================================
// TALUKS
// ==========================================

const taluks: Record<string, string[]> = {
  "Bangalore Urban": [
    "Bangalore North",
    "Bangalore South",
    "Anekal",
    "Yelahanka",
  ],

  Mysore: [
    "Mysore",
    "Nanjangud",
    "Hunsur",
  ],

  Tumakuru: [
    "Tumakuru",
    "Gubbi",
    "Turuvekere",
  ],

  Mandya: [
    "Mandya",
    "Maddur",
    "Malavalli",
  ],
};

// ==========================================
// VILLAGES
// ==========================================

const villages: Record<string, string[]> = {
  "Bangalore North": [
    "Yelahanka",
    "Hebbal",
    "Jakkur",
  ],

  "Bangalore South": [
    "Kengeri",
    "Uttarahalli",
    "Banashankari",
  ],

  Anekal: [
    "Attibele",
    "Chandapura",
    "Sarjapur",
  ],

  Yelahanka: [
    "Yelahanka",
  ],

  Mysore: [
    "Alanahalli",
    "Bogadi",
    "Jayapura",
  ],

  Nanjangud: [
    "Hullahalli",
    "Haradanahalli",
  ],

  Hunsur: [
    "Hunsur",
  ],

  Tumakuru: [
    "Kyathsandra",
    "Hirehalli",
  ],

  Gubbi: [
    "Gubbi",
  ],

  Turuvekere: [
    "Turuvekere",
  ],

  Mandya: [
    "Keragodu",
    "Nagamangala",
  ],

  Maddur: [
    "Maddur",
  ],

  Malavalli: [
    "Malavalli",
  ],
};

// ==========================================
// LAND RECORD TYPE
// ==========================================

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
}

// ==========================================
// RTC COMPONENT
// ==========================================

function RTC() {
  const downloadPDF = () => {
  if (!record) {
    alert("No land record available.");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("BhumiMitra - RTC Land Record", 20, 20);

  doc.setFontSize(12);

  doc.text(`Owner Name: ${record.owner_name}`, 20, 40);
  doc.text(`Survey Number: ${record.survey_number}`, 20, 50);
  doc.text(`Village: ${record.village}`, 20, 60);
  doc.text(`Taluk: ${record.taluk}`, 20, 70);
  doc.text(`District: ${record.district}`, 20, 80);
  doc.text(`Area: ${record.area} Acres`, 20, 90);
  doc.text(`Land Type: ${record.land_type}`, 20, 100);

  doc.save(
    `RTC_${record.survey_number}.pdf`
  );
};

  // ========================================
  // SEARCH STATES
  // ========================================

  const [district, setDistrict] =
    useState("");

  const [taluk, setTaluk] =
    useState("");

  const [village, setVillage] =
    useState("");

  const [surveyNumber, setSurveyNumber] =
    useState("");
  const navigate = useNavigate();


  // ========================================
  // LAND RECORD STATES
  // ========================================

  const [allLandRecords, setAllLandRecords] =
    useState<LandRecord[]>([]);

  const [record, setRecord] =
    useState<LandRecord | null>(null);


  // ========================================
  // UI STATES
  // ========================================

  const [showResult, setShowResult] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ========================================
  // LOAD LAND RECORDS FROM BACKEND
  // ========================================

  useEffect(() => {

    const loadLandRecords = async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getLandRecords();

        console.log(
          "Land records received:",
          data
        );

        if (data.success) {

          setAllLandRecords(
            data.lands || []
          );

        } else {

          setError(
            data.message ||
            "Unable to load land records."
          );

        }

      } catch (error) {

        console.error(
          "Error loading land records:",
          error
        );

        setError(
          "Unable to connect to the backend."
        );

      } finally {

        setLoading(false);

      }

    };

    loadLandRecords();

  }, []);


  // ========================================
  // HANDLE DISTRICT CHANGE
  // ========================================

  const handleDistrictChange = (
    value: string
  ) => {

    setDistrict(value);

    // Reset dependent fields

    setTaluk("");

    setVillage("");

    setSurveyNumber("");

    setRecord(null);

    setShowResult(false);

  };


  // ========================================
  // HANDLE TALUK CHANGE
  // ========================================

  const handleTalukChange = (
    value: string
  ) => {

    setTaluk(value);

    // Reset dependent fields

    setVillage("");

    setSurveyNumber("");

    setRecord(null);

    setShowResult(false);

  };


  // ========================================
  // HANDLE VILLAGE CHANGE
  // ========================================

  const handleVillageChange = (
    value: string
  ) => {

    setVillage(value);

    setSurveyNumber("");

    setRecord(null);

    setShowResult(false);

  };


  // ========================================
  // SEARCH LAND RECORD
  // ========================================

  const handleSearch = () => {

    // Reset previous result

    setRecord(null);

    setShowResult(false);


    // Validate fields

    if (
      !district ||
      !taluk ||
      !village ||
      !surveyNumber.trim()
    ) {

      alert(
        "Please fill all the fields."
      );

      return;

    }


    // ======================================
    // SEARCH BACKEND RECORD
    // ======================================

    const foundRecord =
      allLandRecords.find(
        (item) =>

          item.district
            .toLowerCase()
            .trim() ===
          district
            .toLowerCase()
            .trim()

          &&

          item.taluk
            .toLowerCase()
            .trim() ===
          taluk
            .toLowerCase()
            .trim()

          &&

          item.village
            .toLowerCase()
            .trim() ===
          village
            .toLowerCase()
            .trim()

          &&

          item.survey_number
            .toLowerCase()
            .trim() ===
          surveyNumber
            .toLowerCase()
            .trim()
      );


    // ======================================
    // SET RESULT
    // ======================================

    setRecord(
      foundRecord || null
    );

    setShowResult(true);

  };


  // ========================================
  // RETURN UI
  // ========================================

  return (

    <section className="rtc-page">

      {/* ================================== */}
      {/* PAGE TITLE */}
      {/* ================================== */}

      <h1>
        RTC Search
      </h1>


      {/* ================================== */}
      {/* LOADING */}
      {/* ================================== */}

      {loading && (

        <p>
          Loading land records...
        </p>

      )}


      {/* ================================== */}
      {/* BACKEND ERROR */}
      {/* ================================== */}

      {error && (

        <div className="rtc-error">

          ⚠️ {error}

        </div>

      )}


      {/* ================================== */}
      {/* SEARCH BOX */}
      {/* ================================== */}

      <div className="rtc-search-box">


        {/* DISTRICT */}

        <select
          value={district}
          onChange={(e) =>
            handleDistrictChange(
              e.target.value
            )
          }
        >

          <option value="">
            Select District
          </option>

          {districts.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )}

        </select>


        {/* TALUK */}

        <select
          value={taluk}
          onChange={(e) =>
            handleTalukChange(
              e.target.value
            )
          }
          disabled={!district}
        >

          <option value="">
            Select Taluk
          </option>

          {district &&
            taluks[district]?.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

        </select>


        {/* VILLAGE */}

        <select
          value={village}
          onChange={(e) =>
            handleVillageChange(
              e.target.value
            )
          }
          disabled={!taluk}
        >

          <option value="">
            Select Village
          </option>

          {taluk &&
            villages[taluk]?.map(
              (item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              )
            )}

        </select>


        {/* SURVEY NUMBER */}

        <input
          type="text"
          placeholder="Enter Survey Number"
          value={surveyNumber}
          onChange={(e) =>
            setSurveyNumber(
              e.target.value
            )
          }
        />


        {/* SEARCH BUTTON */}

        <button
          onClick={handleSearch}
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : "Search"}
        </button>

      </div>


      {/* ================================== */}
      {/* SEARCH RESULT */}
      {/* ================================== */}

      {showResult && (

        record ? (

          <div className="rtc-result">

            <h2>
              Land Record Found ✅
            </h2>


            <div className="rtc-details">

              <p>
                <strong>
                  Owner:
                </strong>{" "}
                {record.owner_name}
              </p>


              <p>
                <strong>
                  Survey No:
                </strong>{" "}
                {record.survey_number}
              </p>


              <p>
                <strong>
                  Village:
                </strong>{" "}
                {record.village}
              </p>


              <p>
                <strong>
                  Taluk:
                </strong>{" "}
                {record.taluk}
              </p>


              <p>
                <strong>
                  District:
                </strong>{" "}
                {record.district}
              </p>


              <p>
                <strong>
                  Area:
                </strong>{" "}
                {record.area}
              </p>


              <p>
                <strong>
                  Land Type:
                </strong>{" "}
                {record.land_type}
              </p>

            </div>


            {/* ACTION BUTTONS */}

            <div className="rtc-actions">

              <button
                onClick={downloadPDF}
              >
                Download PDF
              </button>


              <button
                  onClick={() => navigate("/assistant")}
                
              >
                Ask AI
              </button>

            </div>

          </div>

        ) : (

          <div className="rtc-result">

            <h2>
              No Record Found ❌
            </h2>

            <p>
              Please check your Survey Number
              or selected location.
            </p>

          </div>

        )

      )}

    </section>

  );

}

export default RTC;