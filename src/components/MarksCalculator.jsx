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
    const obtained = parseFloat(obtainedMarks);

    if (isNaN(total) || isNaN(obtained)) return null;
    if (total <= 0) return null;
    if (obtained < 0 || obtained > total) return null;

    return {
      percentage: (obtained / total) * 100,
      sa: parseInt((obtained / total) * 60),
    };
  };

  const calculateTotalMarks = (faMarks, saMarks) => {
    return parseInt(faMarks) + parseInt(saMarks);
  }

  const calculatePercentageForFA = () => {
    const total = 40;
    const obtained = parseInt(faMarks);

    if (isNaN(total) || isNaN(obtained)) return null;
    if (total <= 0) return null;
    if (obtained < 0 || obtained > total) return null;

    return {
      percentage: (obtained / total) * 100,
      marks: obtained,
    };
  };

  const getGradeAndFeedbackForFA = (marks) => {
    if (marks > 36) return { grade: "A1" };
    if (marks > 32) return { grade: "A2" };
    if (marks > 28) return { grade: "B1" };
    if (marks > 24) return { grade: "B2" };
    if (marks > 20) return { grade: "C1" };
    if (marks > 16) return { grade: "C2" };
    if (marks > 12) return { grade: "D" };
    if (marks > 8) return { grade: "E1" };
    return { grade: "E2" };
  };

  const getGradeAndFeedbackForSA = (marks) => {
    if (marks > 54) return { grade: "A1" };
    if (marks > 48) return { grade: "A2" };
    if (marks > 42) return { grade: "B1" };
    if (marks > 36) return { grade: "B2" };
    if (marks > 30) return { grade: "C1" };
    if (marks > 24) return { grade: "C2" };
    if (marks > 18) return { grade: "D" };
    if (marks > 12) return { grade: "E1" };
    return { grade: "E2" };
  };

  const getGradeAndFeedbackForTotal = (percentage) => {
    console.log(percentage)
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
    if (!totalMarks || !obtainedMarks || !faMarks) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
  };

  const results = calculateValues();
  const faResults = calculatePercentageForFA();
  const gradeInfo = results
    ? getGradeAndFeedbackForTotal(calculateTotalMarks(faMarks, results.sa))
    : null;
  const faGrade = faResults ? getGradeAndFeedbackForFA(faResults?.marks) : null;
  const saGrade = results ? getGradeAndFeedbackForSA(results?.sa) : null;

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

        <div className="input-group">
          <label>
            FA Marks:
            <input
              type="number"
              step="0.01"
              min="0"
              max={"40"}
              value={faMarks}
              onChange={(e) => setFaMarks(e.target.value)}
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
                <td>{obtainedMarks}</td>
              </tr>
              <tr>
                <th>Total Marks</th>
                <td>{totalMarks}</td>
              </tr>
              <tr>
                <th>FA (40)</th>
                <td>{faMarks}</td>
              </tr>
              <tr>
                <th>FA Grade</th>
                <td>{faGrade?.grade}</td>
              </tr>
              <tr>
                <th>SA (60)</th>
                <td>{results.sa}</td>
              </tr>
              <tr>
                <th>SA Grade</th>
                <td>{saGrade?.grade}</td>
              </tr>
              <tr>
                <th>Total Marks (100)</th>
                <td>{calculateTotalMarks(faMarks, results.sa)}</td>
              </tr>
              <tr>
                <th>Grade</th>
                <td>
                  {gradeInfo.grade}
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
