const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOSTNAME,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: true,
  },
  searchPath: ["knex", "public"],
});

db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected!");
    startServer();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

function startServer() {
  const app = express();

  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ngo-library-management-system.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  app.get("/countbook", async (req, res) => {
    try {
      const data = await db("books").count();
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  app.get("/countavlbook", async (req, res) => {
    try {
      const data = await db("books").count().where("availablecopies", ">", 0);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  app.get("/countstudent", async (req, res) => {
    try {
      const data = await db("students").count();
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  app.get("/", (req, res) => {
    res.send("Server is running!!");
  });

  // Fetch all the books
  app.get("/book", async (req, res) => {
    try {
      const data = await db.select("*").orderBy("id").from("books");
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Fetch Book By ID from books table
  app.get("/bookinfo/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db.select("*").from("books").where("id", "=", id);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Fetch All Entries from Issue-return Table: Issued books and Issue History
  app.get("/getissuereturn", async (req, res) => {
    try {
      const data = await db.select("*").from("issuereturn");
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Fetch Book Issue-Return History from issuereturn Table
  app.get("/issuereturn/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db
        .select("*")
        .from("issuereturn")
        .where("bookid", "=", id);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Fetch Student Issue-Return History from issuereturn Table
  app.get("/issuereturnstd/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db
        .select("*")
        .from("issuereturn")
        .where("studentid", "=", id);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  app.get("/searchfromissued/:search", async (req, res) => {
    let { search } = req.params;
    if (search) search = search.toUpperCase();
    search = "%" + search + "%";

    try {
      const data = await db
        .select("*")
        .from("issuereturn")
        .where((builder) => {
          builder
            .where("bookname", "like", search)
            .orWhere("roll", "like", search)
            .orWhere("studentname", "like", search)
            .orWhere("isbn", "like", search)
            .orWhere("author", "like", search)
            .orWhere("publisher", "like", search);
        });
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Search Books by Name, ISBN, Author, or Publisher
  app.get("/book/:search", async (req, res) => {
    let { search } = req.params;
    search = search.toUpperCase();
    search = "%" + search + "%";

    try {
      const data = await db
        .select("*")
        .from("books")
        .where((builder) => {
          builder
            .where("name", "like", search)
            .orWhere("isbn", "like", search)
            .orWhere("author", "like", search)
            .orWhere("publisher", "like", search);
        });
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal Server Error");
    }
  });

  // Add a BOOK
  app.post("/book/add", async (req, res) => {
    let bookData = req.body;
    if (!bookData.name) return res.status(400).json("Name cannot be blank");

    bookData.name = bookData.name.toUpperCase();
    if (bookData.isbn) bookData.isbn = bookData.isbn.toUpperCase();
    if (bookData.author) bookData.author = bookData.author.toUpperCase();
    if (bookData.publisher)
      bookData.publisher = bookData.publisher.toUpperCase();

    try {
      await db("books").insert(bookData);
      res.status(200).json("Book Added Successfully!!");
    } catch (err) {
      console.log(err);
      res.status(500).json("Failed to add book");
    }
  });

  //Book Issue

  // app.post("/bookissue", async (req, res) => {
  //   let { bookid, studentid, roll } = req.body;
  //   roll = roll.toUpperCase();
  //   let issue = new Date().toString();
  //   try {
  //     await db
  //       .insert({
  //         bookid: bookid,
  //         studentid: studentid,
  //         roll: roll,
  //         issue: issue,
  //       })
  //       .into("issuereturn")
  //       .then(() => res.status(200).json("successfully added"))
  //       .catch((err) => res.status(400).json("unable to add"));
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json("Internal Server Error");
  //   }
  // });

  app.get("/students", (req, res) => {
    db.select("*")
      .orderBy("name")
      .from("students")
      .then((data) => res.send(data));
  });

  //Search Student by name,roll,year,branch
  app.get("/students/:search", (req, res) => {
    let { search } = req.params;
    search = search.toUpperCase();
    search = "%" + search + "%";
    db.select("*")
      .from("students")
      .where("name", "like", search)
      .orWhere("roll", "like", search)
      .orWhere("year", "like", search)
      .orWhere("branch", "like", search)
      .then((data) => res.send(data));
  });

  //Fetch Student by id from Students Table

  app.get("/studentinfo/:id", (req, res) => {
    let { id } = req.params;

    db.select("*")
      .from("students")
      .where("id", "=", id)
      .then((data) => res.send(data))
      .catch((err) => res.status(400));
  });
  app.post("/students/add", (req, res) => {
    let { roll, name, phone, year, branch } = req.body;

    roll = roll.toUpperCase();
    name = name.toUpperCase();
    branch = branch.toUpperCase();

    if (!roll) return res.status(400).json("Roll cant be blank");

    db.insert({
      name: name,
      roll: roll,
      phone: phone,
      year: year,
      branch: branch,
      issued: 0,
    })
      .into("students")
      .then(() => res.status(200).json("successfully added"))
      .catch((err) => res.status(400).json("unable to add"));
  });

  app.post("/book/update", (req, res) => {
    let author = "I am the new Author";
    let st = ["ECE17u011", "ECE17o01"];
    let nst = { name: "fahad", roll: "ece17u011" };
    nst = JSON.stringify(nst);
    let d = [];
    d.push(nst);
    //st.map((item)=>{nst.push(item.toUpperCase())})
    db("books")
      .where("id", 916)
      .update({ issuearr: d })
      .then((data) => {
        console.log(data);
        res.status(200).json("updated successfully");
      })
      .catch((err) => res.status(400).json("unable to update"));
  });

  app.post("/student/update", (req, res) => {
    let author = "I am the new Author";

    db("students")
      .where("id", 7)
      .update({ issued: 1 })
      .then((data) => {
        console.log(data);
        res.status(200).json("updated successfully");
      })
      .catch((err) => res.status(400).json("unable to update"));
  });

  app.post("/bookissue", (req, res) => {
    let {
      bookid,
      studentid,
      roll,
      bookname,
      studentname,
      author,
      publisher,
      edition,
      isbn,
    } = req.body;

    if (!studentid || !bookid)
      return res.status(400).json("Student ID/Book ID Cant be blank");
    if (roll) roll = roll.toUpperCase();
    if (bookname) bookname = bookname.toUpperCase();
    if (studentname) studentname = studentname.toUpperCase();
    if (author) author = author.toUpperCase();
    if (publisher) publisher = publisher.toUpperCase();
    if (isbn) isbn = isbn.toUpperCase();

    // Get the current date and format it as 'YYYY-MM-DD HH:mm:ss'
    let date = new Date().toISOString().slice(0, 19).replace("T", " ");

    db.insert({
      bookid: bookid,
      studentid: studentid,
      roll: roll,
      issue: date, // Use the formatted date
      bookname: bookname,
      studentname: studentname,
      author: author,
      publisher: publisher,
      isbn: isbn,
      edition: edition,
    })
      .into("issuereturn")
      .catch((err) => {
        console.log(err);
        res.status(400).json("failure");
      });
    db("books")
      .where("id", "=", bookid)
      .decrement("availablecopies", 1)
      .catch((err) => {
        console.log(err);
        res.status(400).json("failure");
      });
    db("students")
      .where("id", "=", studentid)
      .increment("issued", 1)
      .then(() => {
        res.status(200).json("successfully added");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("unable to add");
      });
  });

  app.post("/bookreturn", (req, res) => {
    let { bookid, studentid, fine } = req.body;

    if (!studentid || !bookid)
      return res.status(400).json("Student ID/Book ID Cant be blank");

    let ret = new Date().toISOString().slice(0, 19).replace("T", " ");

    db("issuereturn")
      .update({ return: ret, fine: fine })
      .where("bookid", "=", bookid)
      .andWhere("studentid", "=", studentid)
      .catch((err) => {
        console.log(err);
        res.status(400).json("failure");
      });
    db("books")
      .where("id", "=", bookid)
      .increment("availablecopies", 1)
      .catch((err) => {
        console.log(err);
        res.status(400).json("failure");
      });
    db("students")
      .where("id", "=", studentid)
      .decrement("issued", 1)
      .then(() => res.status(200).json("successfully added"))
      .catch((err) => res.status(400).json("unable to add"));
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT || 3000}`);
  });
}
