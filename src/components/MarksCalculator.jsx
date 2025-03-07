"use client";
import React, { useState } from "react";
import "./MarksCalculator.css";

function MarksCalculator() {
  const [totalMarks, setTotalMarks] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [faMarks, setFaMarks] = useState("");
  const [error, setError] = useState("");

  const calculateValues = () => {
    const total = parseFloat(totalMarks);
    const obtained = obtainedMarks === "a" ? "a" : parseFloat(obtainedMarks);
    if (
      isNaN(total) ||
      (isNaN(obtained) && obtained !== "a") ||
      total <= 0 ||
      obtained < 0 ||
      obtained > total
    )
      return null;

    const sa = obtained === "a" ? obtained : parseInt((obtained / total) * 60);
    return {
      percentage: (obtained / total) * 100,
      sa,
    };
  };

  const calculatePercentageForFA = () => {
    const obtained = parseInt(faMarks);
    if (isNaN(obtained)) return null;
    return { percentage: (obtained / 40) * 100, marks: obtained };
  };

  const getGrade = (marks, type) => {
    const thresholds = {
      FA: [36, 32, 28, 24, 20, 16, 12, 8],
      SA: [54, 48, 42, 36, 30, 24, 18, 12],
      Total: [90, 80, 70, 60, 50, 40, 32, 20],
    };
    if (type === "SA" && marks === "a") return "-";
    const grades = ["A1", "A2", "B1", "B2", "C1", "C2", "D", "E1", "E2"];
    const index = thresholds[type].findIndex((threshold) => marks > threshold);
    return grades[index >= 0 ? index : grades.length - 1];
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!totalMarks || !obtainedMarks || !faMarks)
      setError("Please fill in all fields");
    else setError("");
  };

  const results = calculateValues();
  const faResults = calculatePercentageForFA();
  const totalMarksCalculated =
    (parseInt(faMarks) || 0) + (results?.sa !== "a" ? results?.sa || 0 : 0);

  return (
    <div className="calculator-container">
      <h1>Marks Calculator</h1>
      <form onSubmit={handleCalculate}>
        <div className="input-group">
          <label>
            Total Marks:{" "}
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
            FA Marks:{" "}
            <input
              type="number"
              step="0.01"
              min="0"
              max="40"
              value={faMarks}
              onChange={(e) => setFaMarks(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            SA Marks:{" "}
            <input
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

      <div className="results">
        <table>
          <tbody>
            <tr>
              <th>FA (40)</th>
              <td>{faMarks}</td>
            </tr>
            <tr>
              <th>FA Grade</th>
              <td>{getGrade(faResults?.marks, "FA")}</td>
            </tr>
            <tr>
              <th>SA (60)</th>
              <td>{results?.sa}</td>
            </tr>
            <tr>
              <th>SA Grade</th>
              <td>{getGrade(results?.sa, "SA")}</td>
            </tr>
            <tr>
              <th>Total Marks (100)</th>
              <td>{totalMarksCalculated}</td>
            </tr>
            <tr>
              <th>Grade</th>
              <td>{getGrade(totalMarksCalculated, "Total")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarksCalculator;
