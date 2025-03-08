import React from "react";
import * as XLSX from "xlsx";

const StudentReportTable = ({ studentsData, filename, totalStudents }) => {
  const exportToExcel = () => {
    if (!studentsData || studentsData.length === 0) {
      console.error("No student data available for export.");
      return;
    }

    const sanitizedData = studentsData.map((student) => ({
      "Roll No": student.rollNumber ?? `N/A`,
      "FA Marks": student.faMarks ?? 0,
      "FA Grade": student.faGrade ?? "N/A",
      "SA Marks": student.saMarks ?? 0,
      "SA Grade": student.saGrade ?? "N/A",
      "Total Marks": student.totalMarks ?? 0,
      "Total Grade": student.totalGrade ?? "N/A",
    }));
    const worksheet = XLSX.utils.json_to_sheet(sanitizedData);
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [],
        ["No on Roll", totalStudents],
        ["No Present", studentsData.length],
        ["No Absent", totalStudents - studentsData.length],
        ["SOP", ""],
      ],
      { origin: -1 }
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="report-container">
      <button onClick={exportToExcel} className="download-btn">
        Download XLSX
      </button>

      <table className="report-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>FA Marks</th>
            <th>FA Grade</th>
            <th>SA Marks</th>
            <th>SA Grade</th>
            <th>Total Marks</th>
            <th>Total Grade</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNumber}</td>
              <td>{student.faMarks}</td>
              <td>{student.faGrade}</td>
              <td>{student.saMarks}</td>
              <td>{student.saGrade}</td>
              <td>{student.totalMarks}</td>
              <td>{student.totalGrade}</td>
            </tr>
          ))}

          <tr className="summary-row">
            <td colSpan="6">No on Roll</td>
            <td>{totalStudents}</td>
          </tr>
          <tr className="summary-row">
            <td colSpan="6">No Present</td>
            <td>{studentsData.length}</td>
          </tr>
          <tr className="summary-row">
            <td colSpan="6">No Absent</td>
            <td>{totalStudents - studentsData.length}</td>
          </tr>
          <tr className="summary-row">
            <td colSpan="6">SOP</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentReportTable;
