const baseUrl = "https://librarymanagement-jbdq.onrender.com/API/TeacherRecord";



function clearForm() {
    ["Tid", "TeacherName", "FatherName", "Address", "Contact", "OtherContact"]
        .forEach(id => document.getElementById(id).value = "");
}

document.getElementById("btnAdd").addEventListener("click", async () => {
    const teacher = getTeacherInput(false); // exclude Tid
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacher)
        });
        alert(response.ok ? "Teacher added successfully" : "Failed to add teacher");
		clearForm() ;
    } catch (err) {
        alert("Network or server error: " + err.message);
    }
});

 

document.getElementById("btnUpdate").addEventListener("click", async () => {
    const teacher = getTeacherInput();
    const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacher)
    });
    alert(response.ok ? "Teacher updated successfully" : "Failed to update teacher");
	clearForm();
});

document.getElementById("btnDelete").addEventListener("click", async () => {
    const Tid = document.getElementById("Tid").value;
    const response = await fetch(`${baseUrl}?Tid=${Tid}`, {
        method: "DELETE"
    });
    alert(response.ok ? "Teacher deleted successfully" : "Failed to delete teacher");
	clearForm();
});

document.getElementById("btnView").addEventListener("click", async () => {
    const Tid = document.getElementById("Tid").value;
    const response = await fetch(`${baseUrl}?Tid=${Tid}`);
    if (response.ok) {
        const data = await response.json();
        fillTeacherInput(data);
    } else {
        alert("Teacher not found");
    }
	 
});

document.getElementById("btnViewAll").addEventListener("click", async () => {
    const response = await fetch(`${baseUrl}/All`);
    if (response.ok) {
        const teachers = await response.json();
        const newWindow = window.open('', '_blank');
        let rowsHTML = '';
        teachers.forEach(t => {
            rowsHTML += `<tr>
                <td>${t.tid}</td>
                <td>${t.teacherName}</td>
                <td>${t.fatherName}</td>
                <td>${t.address}</td>
                <td>${t.contact}</td>
                <td>${t.otherContact}</td>
            </tr>`;
        });

        newWindow.document.write(`
            <html>
            <head>
                <title>All Teachers</title>
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
                <h1>👨‍🏫 All Teachers</h1>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Father</th><th>Address</th><th>Contact</th><th>Other Contact</th></tr>
                    </thead>
                    <tbody>${rowsHTML}</tbody>
                </table>
                <button onclick="window.close()">Back</button>
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert("Failed to fetch teachers");
    }
});


document.getElementById("btnHome").addEventListener("click", () => {
    window.history.back();  // Change as needed
});

function getTeacherInput(includeTid = true) {
    const data = {
        TeacherName: document.getElementById("TeacherName").value,
        FatherName: document.getElementById("FatherName").value,
        Address: document.getElementById("Address").value,
        Contact: document.getElementById("Contact").value,
        OtherContact: document.getElementById("OtherContact").value
    };

    if (includeTid) {
        const tidValue = document.getElementById("Tid").value;
        if (tidValue) data.Tid = parseInt(tidValue);
    }

    return data;
}
function fillTeacherInput(data) {
    document.getElementById("Tid").value = data.tid;
    document.getElementById("TeacherName").value = data.teacherName;
    document.getElementById("FatherName").value = data.fatherName;
    document.getElementById("Address").value = data.address;
    document.getElementById("Contact").value = data.contact;
    document.getElementById("OtherContact").value = data.otherContact;
	
	
}
