"use client";
import React, { useState } from "react";
import "./MarksCalculator.css";
import StudentReportTable from "./StudentsDataTable";
import ErrorModal from "./ErrorModal";

function MarksCalculator() {
  const [totalMarks, setTotalMarks] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [faMarks, setFaMarks] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [showStudentsData, setShowStudentsData] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);
  const [className, setClassName] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    if (!totalMarks || !obtainedMarks || !faMarks || !rollNo)
      setError("Please fill in all fields");
    else setError("");
  };

  const handleAddStudents = () => {
    console.log("clicked");
    if (totalStudents == 0) {
      setShowError(true);
      setErrorMsg("Please enter total number of students");
      return;
    }

    const studentData = {
      rollNumber: rollNo,
      faMarks: faMarks,
      saMarks: results?.sa,
      faGrade: getGrade(faResults?.marks, "FA"),
      saGrade: getGrade(results?.sa, "SA"),
      totalMarks: totalMarksCalculated,
      totalGrade: getGrade(totalMarksCalculated, "Total"),
    };

    setStudentsData((prev) => {
      const existingStudentIndex = prev.findIndex(
        (student) => student.rollNumber === rollNo
      );

      if (existingStudentIndex !== -1) {
        const updatedStudents = [...prev];
        updatedStudents[existingStudentIndex] = studentData;
        return updatedStudents;
      } else {
        return [...prev, studentData];
      }
    });

    setShowStudentsData(true);
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
            Class:{" "}
            <input
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Total Students:{" "}
            <input
              type="number"
              step="1"
              min="1"
              value={totalStudents}
              onChange={(e) => setTotalStudents(e.target.value)}
            />
          </label>
        </div>
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
            Roll No:{" "}
            <input
              type="number"
              step="1"
              min="1"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
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
              type="number"
              step="0.01"
              min="0"
              max={totalMarks || ""}
              value={obtainedMarks}
              onChange={(e) => setObtainedMarks(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={handleAddStudents}>
            Add Student
          </button>
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

      <div>
        {showStudentsData && (
          <StudentReportTable
            studentsData={studentsData || []}
            filename={className}
            totalStudents={totalStudents}
          />
        )}
      </div>

      {showError && (
        <ErrorModal message={errorMsg} closeModal={setShowError(false)} />
      )}
    </div>
  );
}

export default MarksCalculator;
