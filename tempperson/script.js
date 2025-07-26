const baseUrl = "https://localhost:7291/API/TempPersonRecord";

function clearForm() {
    ["tempId", "PersonName", "FatherName", "Address", "Contact", "OtherContact"]
        .forEach(id => document.getElementById(id).value = "");
}

document.getElementById("btnAdd").addEventListener("click", async () => {
    const person = getPersonInput(false); // exclude Pid for add
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(person)
        });
        alert(response.ok ? "Person added successfully" : "Failed to add person");
        clearForm();
    } catch (err) {
        alert("Network or server error: " + err.message);
    }
});

document.getElementById("btnUpdate").addEventListener("click", async () => {
    const person = getPersonInput();
    const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person)
    });
    alert(response.ok ? "Person updated successfully" : "Failed to update person");
    clearForm();
});

document.getElementById("btnDelete").addEventListener("click", async () => {
    const tempId = document.getElementById("tempId").value;
    const response = await fetch(`${baseUrl}?tempId=${tempId}`, {
        method: "DELETE"
    });
    alert(response.ok ? "Person deleted successfully" : "Failed to delete person");
    clearForm();
});

document.getElementById("btnView").addEventListener("click", async () => {
    const tempId = document.getElementById("tempId").value;
    const response = await fetch(`${baseUrl}?tempId=${tempId}`);
    if (response.ok) {
        const data = await response.json();
        fillPersonInput(data);
    } else {
        alert("Person not found");
    }
});

document.getElementById("btnViewAll").addEventListener("click", async () => {
    const response = await fetch(`${baseUrl}/All`);
    if (response.ok) {
        const people = await response.json();
        const newWindow = window.open('', '_blank');
        let rowsHTML = '';
        people.forEach(p => {
            rowsHTML += `<tr>
                <td>${p.tempId}</td>
                <td>${p.personName}</td>
                <td>${p.fatherName}</td>
                <td>${p.address}</td>
                <td>${p.contact}</td>
                <td>${p.otherContact}</td>
            </tr>`;
        });

        newWindow.document.write(`
            <html>
            <head>
                <title>All Persons</title>
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
                        background-color: #fff;
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
                <h1>👤 All Persons</h1>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr><th>ID</th><th>Name</th><th>Father</th><th>Address</th><th>Contact</th><th>Other Contact</th></tr>
                        </thead>
                        <tbody>${rowsHTML}</tbody>
                    </table>
                </div>
                <button onclick="window.close()">Back</button>
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert("Failed to fetch persons");
    }
});

document.getElementById("btnHome").addEventListener("click", () => {
    window.history.back();  // Adjust if needed
});

function getPersonInput(includetempId = true) {
    const data = {
        PersonName: document.getElementById("PersonName").value,
        FatherName: document.getElementById("FatherName").value,
        Address: document.getElementById("Address").value,
        Contact: document.getElementById("Contact").value,
        OtherContact: document.getElementById("OtherContact").value
    };

    if (includetempId) {
        const tempIdValue = document.getElementById("tempId").value;
        if (tempIdValue) data.tempId = parseInt(tempIdValue);
    }

    return data;
}

function fillPersonInput(data) {
    document.getElementById("tempId").value = data.tempId;
    document.getElementById("PersonName").value = data.personName;
    document.getElementById("FatherName").value = data.fatherName;
    document.getElementById("Address").value = data.address;
    document.getElementById("Contact").value = data.contact;
    document.getElementById("OtherContact").value = data.otherContact;
}
