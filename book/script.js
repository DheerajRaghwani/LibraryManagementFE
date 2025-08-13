// book.js
const baseUrl = "https://librarymanagement-jbdq.onrender.com/API/Book";

const getInput = id => document.getElementById(id).value;
const setInput = (id, value) => document.getElementById(id).value = value;
const showMessage = (msg, isError = false) => {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.className = isError ? "error" : "";
};

const getBookDataFromForm = () => ({
  referenceNo: Number(getInput("ReferenceNo")),
  bookName: getInput("BookName"),
  author: getInput("Author"),
  department: getInput("Department"),
  language: getInput("Language"),
  totalNoBooks: Number(getInput("TotalNoBooks")),
  availableBook: Number(getInput("AvailableBook")),
  shelf: getInput("Shelf"),
  registedDate: getInput("RegistedDate"),
  bookCost: Number(getInput("BookCost")),
  anyUpdate: getInput("AnyUpdate")
});

const fillFormWithBook = (book) => {
  setInput("ReferenceNo", book.referenceNo);
  setInput("BookName", book.bookName);
  setInput("Author", book.author);
  setInput("Department", book.department);
  setInput("Language", book.language);
  setInput("TotalNoBooks", book.totalNoBooks);
  setInput("AvailableBook", book.availableBook);
  setInput("Shelf", book.shelf);
  setInput("RegistedDate", book.registedDate?.substring(0, 10));
  setInput("BookCost", book.bookCost);
  setInput("AnyUpdate", book.anyUpdate);
};

const clearForm = () => {
  document.getElementById("bookForm").reset();
};

// CRUD Operations
async function addBook() {
  const book = getBookDataFromForm();
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    if (response.ok) {
      showMessage("Book added successfully.");
      clearForm();
    } else {
      throw new Error("Failed to add book");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function updateBook() {
  const book = getBookDataFromForm();
  try {
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    if (response.ok) {
      showMessage("Book updated successfully.");
    } else {
      throw new Error("Failed to update book");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function deleteBook() {
  const referenceNo = getInput("ReferenceNo");
  if (!referenceNo) return showMessage("Enter Reference No", true);

  try {
    const response = await fetch(`${baseUrl}?ReferenceNo=${referenceNo}`, {
      method: "DELETE"
    });
    if (response.ok) {
      showMessage("Book deleted successfully.");
      clearForm();
    } else {
      throw new Error("Failed to delete book");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function viewBook() {
  const referenceNo = getInput("ReferenceNo");
  if (!referenceNo) return showMessage("Enter Reference No", true);

  try {
    const response = await fetch(`${baseUrl}?ReferenceNo=${referenceNo}`);
    if (response.ok) {
      const book = await response.json();
      if (book) {
        fillFormWithBook(book);
        showMessage("Book fetched successfully.");
      } else {
        showMessage("Book not found.", true);
      }
    } else {
      throw new Error("Failed to fetch book");
    }
  } catch (error) {
    showMessage(error.message, true);
  }
}

async function viewAllBooks() {
  try {
    const response = await fetch(`${baseUrl}/All`);
    if (!response.ok) throw new Error("Failed to fetch books");

    const books = await response.json();
    const bookRows = books.map(book => `
      <tr>
        <td>${book.referenceNo}</td>
        <td>${book.bookName}</td>
        <td>${book.author}</td>
        <td>${book.department}</td>
        <td>${book.language}</td>
        <td>${book.totalNoBooks}</td>
        <td>${book.availableBook}</td>
        <td>${book.shelf}</td>
        <td>${book.registedDate?.substring(0, 10)}</td>
        <td>${book.bookCost}</td>
        <td>${book.anyUpdate}</td>
      </tr>
    `).join("");

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Library - All Books</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
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
            color: #f1c40f;
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
            border-bottom: 1px solid #ddd;
          }

          th {
            background-color: #34495e;
            color: #fff;
            position: sticky;
            top: 0;
          }

          tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          tr:hover {
            background-color: #eaeaea;
          }

          .back-btn {
            display: block;
            margin: 30px auto 0;
            padding: 12px 25px;
            background-color: #2980b9;
            color: #fff;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          }

          .back-btn:hover {
            background-color: #1f5f8b;
          }

          @media screen and (max-width: 768px) {
            body { padding: 20px; }
            h1 { font-size: 2rem; }
          }
        </style>
      </head>
      <body>
        <h1>📚 Library - All Books</h1>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Ref No</th>
                <th>Name</th>
                <th>Author</th>
                <th>Dept</th>
                <th>Language</th>
                <th>Total</th>
                <th>Available</th>
                <th>Shelf</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              ${bookRows}
            </tbody>
          </table>
        </div>
        <button class="back-btn" onclick="window.close()">⬅ Back</button>
      </body>
      </html>
    `);
    newWindow.document.close();
  } catch (error) {
    showMessage(error.message, true);
  }
}

// Hooking up buttons
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnAdd").addEventListener("click", addBook);
  document.getElementById("btnUpdate").addEventListener("click", updateBook);
  document.getElementById("btnDelete").addEventListener("click", deleteBook);
  document.getElementById("btnView").addEventListener("click", viewBook);
  document.getElementById("btnViewAll").addEventListener("click", viewAllBooks);
  document.getElementById("btnHome").addEventListener("click", () => {
     window.history.back(); 
  });
});

