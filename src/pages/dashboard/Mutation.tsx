import { useState } from "react";
import { getMutationRecord } from "../../api/mutationApi";

interface MutationRecord {
  id: number;
  application_no: string;
  owner_name: string;
  survey_number: string;
  status: string;
  updated_date: string;
  officer: string;
}

function Mutation() {
  const [applicationNo, setApplicationNo] = useState("");
  const [record, setRecord] = useState<MutationRecord | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    // Check empty input
    if (!applicationNo.trim()) {
      alert("Please enter the Application Number.");
      return;
    }

    setLoading(true);
    setShowResult(false);
    setRecord(null);

    try {
      const data = await getMutationRecord(
        applicationNo.trim()
      );

      if (data.success) {
        setRecord(data.mutation);
      }

      setShowResult(true);

    } catch (error: any) {
      console.error(
        "Mutation Search Error:",
        error
      );

      setRecord(null);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mutation-page">

      <h1>Mutation Status</h1>

      <div className="mutation-search">

        <input
          type="text"
          placeholder="Enter Application Number"
          value={applicationNo}
          onChange={(e) =>
            setApplicationNo(e.target.value)
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
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

      {/* =============================== */}
      {/* SEARCH RESULT */}
      {/* =============================== */}

      {showResult && (

        record ? (

          <div className="rtc-result">

            <h2>
              Mutation Record Found ✅
            </h2>

            <div className="rtc-details">

              <p>
                <strong>
                  Application No:
                </strong>{" "}
                {record.application_no}
              </p>

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
                  Status:
                </strong>{" "}
                {record.status}
              </p>

              <p>
                <strong>
                  Last Updated:
                </strong>{" "}
                {new Date(
                  record.updated_date
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

              <p>
                <strong>
                  Officer:
                </strong>{" "}
                {record.officer}
              </p>

            </div>

          </div>

        ) : (

          <div className="rtc-result">

            <h2>
              No Application Found ❌
            </h2>

            <p>
              Please check the Application Number.
            </p>

          </div>

        )

      )}

    </section>
  );
}

export default Mutation;