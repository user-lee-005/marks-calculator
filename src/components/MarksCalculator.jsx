"use client";
import React, { useState } from "react";
import "./MarksCalculator.css";

function MarksCalculator() {
  const [totalMarks, setTotalMarks] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [error, setError] = useState("");

  const calculateValues = () => {
    const total = parseFloat(totalMarks);
    const obtained = parseFloat(obtainedMarks);

    if (isNaN(total) || isNaN(obtained)) return null;
    if (total <= 0) return null;
    if (obtained < 0 || obtained > total) return null;

    return {
      percentage: (obtained / total) * 100,
      fa: (obtained / total) * 40,
      sa: (obtained / total) * 60,
    };
  };

  const getGradeAndFeedback = (percentage) => {
    if (percentage > 90) return { grade: "A1" };
    if (percentage > 80) return { grade: "A2" };
    if (percentage > 70) return { grade: "B1" };
    if (percentage > 60) return { grade: "B2" };
    if (percentage > 50) return { grade: "C1" };
    if (percentage > 40) return { grade: "C2" };
    if (percentage > 32) return { grade: "D" };
    if (percentage > 20) return { grade: "E1" };
    return { grade: "E2" };
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!totalMarks || !obtainedMarks) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
  };

  const results = calculateValues();
  const gradeInfo = results ? getGradeAndFeedback(results.percentage) : null;

  return (
    <div className="calculator-container">
      <h1>Marks Calculator</h1>
      <form onSubmit={handleCalculate}>
        <div className="input-group">
          <label>
            Total Marks:
            <input
              type="number"
              step="0.01"
              min="1"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </label>
        </div>

        <div className="input-group">
          <label>
            Marks Obtained:
            <input
              type="number"
              step="0.01"
              min="0"
              max={totalMarks || ""}
              value={obtainedMarks}
              onChange={(e) => setObtainedMarks(e.target.value)}
            />
          </label>
        </div>

        {error && <div className="error">{error}</div>}
        <button type="submit">Calculate</button>
      </form>

      {results && (
        <div className="results">
          <table>
            <tbody>
              <tr>
                <th>Marks Obtained</th>
                <td>{parseFloat(obtainedMarks).toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total Marks</th>
                <td>{parseFloat(totalMarks).toFixed(2)}</td>
              </tr>
              <tr>
                <th>FA (40)</th>
                <td>{results.fa.toFixed(2)}</td>
              </tr>
              <tr>
                <th>SA (60)</th>
                <td>{results.sa.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Grade</th>
                <td>
                  {gradeInfo.grade} ({results.percentage.toFixed(2)}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MarksCalculator;
