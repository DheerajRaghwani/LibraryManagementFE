const baseUrl = "https://librarymanagement-jbdq.onrender.com/API/BookIssue";

function clearForm() {
    [
        "sno", "sid", "referenceNo", "bookName", "noOfBookIssue", "noOfBookReturn","issueBy",
        "dateOfIssue", "dateOfReturn", "fine", "AnyUpdate",
    ].forEach(id => document.getElementById(id).value = "");
}

// Add
async function addBookIssue() {
    const issue = getBookIssueInput(false);
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(issue)
        });
        alert(response.ok ? "Book issue added successfully" : "Failed to add");
        clearForm();
    } catch (err) {
        alert("Error: " + err.message);
    }
}

// Update
async function updateBookIssue() {
    const issue = getBookIssueInput(true);
    const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issue)
    });
    alert(response.ok ? "Book issue updated successfully" : "Update failed");
    clearForm();
}

// Delete
async function deleteBookIssue() {
    const sno = document.getElementById("sno").value;
    const response = await fetch(`${baseUrl}?Sno=${sno}`, {
        method: "DELETE"
    });
    alert(response.ok ? "Deleted successfully" : "Delete failed");
    clearForm();
}

 

// View all
async function getAllBookIssues() {
    const response = await fetch(`${baseUrl}/All`);
    if (response.ok) {
        const bookIssues = await response.json();
        const newWindow = window.open("", "_blank");
        let rowsHTML = "";
        bookIssues.forEach(b => {
            rowsHTML += `<tr>
                <td>${b.sno}</td>
                <td>${b.sid}</td>
                <td>${b.studentName}</td>
                <td>${b.referenceNo}</td>
                <td>${b.bookName}</td>
                <td>${b.noOfBookIssue}</td>
                <td>${b.noOfBookReturn}</td>
                <td>${b.dateOfIssue?.split("T")[0] || ""}</td>
                <td>${b.dateOfReturn?.split("T")[0] || ""}</td>
                <td>${b.fine}</td>
                <td>${b.issueBy}</td>
                <td>${b.anyUpdate}</td>
            </tr>`;
        });

        newWindow.document.write(`
            <html>
            <head>
                <title>All Book Issues</title>
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
			 background-color: #fff;
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

          //tr:nth-child(even) {
            //background-color: #f9f9f9;
         // }

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
                <h1>📘 All Book Issues</h1>
                <table>
                    <thead>
                      <tr>
                            <th>Sno</th><th>Student ID</th><th>Student Name</th><th>Ref No</th><th>Book</th>
                            <th>Issue</th><th>Return</th><th>Issue Date</th><th>Return Date</th>
                            <th>Fine</th><th>Issued By</th><th>Update</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHTML}</tbody>
                </table>
                <button onclick="window.close()">Back</button>
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert("Failed to fetch data");
    }
}

// Go Home
function goHome() {
    window.history.back(); 
}

// Helper - Get form data
function getBookIssueInput(includeSno = true) {
    const data = {
        Sid: parseInt(document.getElementById("sid").value),
        ReferenceNo: document.getElementById("referenceNo").value,
        BookName: document.getElementById("bookName").value,
        NoOfBookIssue: parseInt(document.getElementById("noOfBookIssue").value),
        NoOfBookReturn: parseInt(document.getElementById("noOfBookReturn").value),
        DateOfIssue: document.getElementById("dateOfIssue").value || null,
        DateOfReturn: document.getElementById("dateOfReturn").value || null,
        Fine: parseFloat(document.getElementById("fine").value),
        IssueBy: document.getElementById("issueBy").value,
        AnyUpdate: document.getElementById("AnyUpdate").value

    };
    if (includeSno) {
        data.Sno = parseInt(document.getElementById("sno").value);
    }
    return data;
}

// Helper - Fill form from fetched data
function fillBookIssueInput(data) {
    document.getElementById("sno").value = data.sno;
    document.getElementById("sid").value = data.sid;
    document.getElementById("referenceNo").value = data.referenceNo;
    document.getElementById("bookName").value = data.bookName;
    document.getElementById("noOfBookIssue").value = data.noOfBookIssue;
    document.getElementById("noOfBookReturn").value = data.noOfBookReturn;
    document.getElementById("dateOfIssue").value = data.dateOfIssue?.split("T")[0] || "";
    document.getElementById("dateOfReturn").value = data.dateOfReturn?.split("T")[0] || "";
    document.getElementById("fine").value = data.fine;
    document.getElementById("issueBy").value = data.issueBy;
    document.getElementById("teacherName").value = data.anyUpdate;
}

