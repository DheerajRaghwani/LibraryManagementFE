const baseUrl = "https://librarymanagement-jbdq.onrender.com/API/StudentRecord";

// Utility
const getInput = id => document.getElementById(id).value;
const setInput = (id, value) => document.getElementById(id).value = value;
//const clearForm = () => document.getElementById("studentForm").reset();
const clearForm = () => {
  setInput("Sid", "");
  setInput("StudentName", "");
  setInput("FatherName", "");
  setInput("Address", "");
  setInput("Contact", "");
  setInput("OtherContact", "");
};

const showMessage = (msg, isError = false) => {
  const message = document.getElementById("message");
  if (message) {
    message.textContent = msg;
    message.className = isError ? "error" : "";
  } else {
    alert(msg);
  }
};

// Extract data from form
const getStudentDataFromForm = () => ({
  sid: Number(getInput("Sid")),
  studentName: getInput("StudentName"),
  fatherName: getInput("FatherName"),
  address: getInput("Address"),
  contact: getInput("Contact"),
  otherContact: getInput("OtherContact")
});

// Fill form with student data
const fillFormWithStudent = student => {
  setInput("Sid", student.sid);
  setInput("StudentName", student.studentName);
  setInput("FatherName", student.fatherName);
  setInput("Address", student.address);
  setInput("Contact", student.contact);
  setInput("OtherContact", student.otherContact);
};

// CRUD Operations
async function addStudent() {
  const student = getStudentDataFromForm();
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    if (response.ok) {
      showMessage("Student added successfully.");
      clearForm();
    } else {
      throw new Error("Failed to add student");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function updateStudent() {
  const student = getStudentDataFromForm();
  try {
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    if (response.ok) {
      showMessage("Student updated successfully.");
      clearForm();
    } else {
      throw new Error("Failed to update student");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function deleteStudent() {
  const sid = getInput("Sid");
  if (!sid) return showMessage("Enter Student ID", true);

  try {
    const response = await fetch(`${baseUrl}?Sid=${sid}`, {
      method: "DELETE"
    });
    if (response.ok) {
      showMessage("Student deleted successfully.");
      clearForm();
    } else {
      throw new Error("Failed to delete student");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function viewStudent() {
  const sid = getInput("Sid");
  console.log("ViewStudent called. Sid:", sid);

  if (!sid) return showMessage("Enter Student ID", true);

  try {
    const url = `${baseUrl}?Sid=${sid}`;
    console.log("Fetching:", url);
    const response = await fetch(url);

    console.log("Response Status:", response.status);

    if (response.ok) {
      const student = await response.json();
      console.log("Student fetched:", student);

      if (student) {
        fillFormWithStudent(student);
        showMessage("Student fetched successfully.");
      } else {
        clearForm();
        showMessage("Student not found.", true);
      }
    } else {
      clearForm();
      throw new Error("Failed to fetch student");
    }
  } catch (error) {
    console.error("Error:", error);
    clearForm();
    showMessage(error.message, true);
  }
}



async function viewAllStudents() {
  try {
    const response = await fetch(`${baseUrl}/All`);
    if (!response.ok) throw new Error("Failed to fetch students");

    const students = await response.json();
    const studentRows = students.map(s => `
      <tr>
        <td>${s.sid}</td>
        <td>${s.studentName}</td>
        <td>${s.fatherName}</td>
        <td>${s.address}</td>
        <td>${s.contact}</td>
        <td>${s.otherContact}</td>
      </tr>
    `).join("");

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>All Students</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
                        url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac') no-repeat center center fixed;
            background-size: cover;
            color: #fff;
            margin: 0;
            padding: 40px;
          }

          h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: #2ecc71;
            text-shadow: 2px 2px 4px #000;
          }

          .table-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            color: #333;
          }

          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ccc;
          }

          th {
            background-color: #27ae60;
            color: white;
            position: sticky;
            top: 0;
          }

          tr:nth-child(even) {
            background-color: #f9f9f9;
          }

          tr:hover {
            background-color: #eee;
          }

          button {
            margin-top: 30px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            padding: 10px 25px;
            background-color: #27ae60;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
          }

          button:hover {
            background-color: #1e8449;
          }
        </style>
      </head>
      <body>
        <h1>👩‍🎓 Library - All Students</h1>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Father</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Other Contact</th>
              </tr>
            </thead>
            <tbody>
              ${studentRows}
            </tbody>
          </table>
        </div>
        <button onclick="window.close()">⬅ Back</button>
      </body>
      </html>
    `);
    newWindow.document.close();
  } catch (error) {
    showMessage(error.message, true);
  }
}

// Bind buttons on page load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAdd").addEventListener("click", addStudent);
  document.getElementById("btnUpdate").addEventListener("click", updateStudent);
  document.getElementById("btnDelete").addEventListener("click", deleteStudent);
  document.getElementById("btnView").addEventListener("click", viewStudent);
  document.getElementById("btnViewAll").addEventListener("click", viewAllStudents);
  document.getElementById("btnHome").addEventListener("click", () => {
    window.history.back(); ; // Make sure this file exists in your project
  });
});
