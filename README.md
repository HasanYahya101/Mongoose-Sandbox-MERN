# Mongoose-Sandbox-MERN

**Mongoose-Sandbox-MERN** is a tool built with the MERN stack (MongoDB, Express, React, Node.js) that allows you to interactively test **25 essential MongoDB operations** in a **Postman-like UI**. Whether you're learning MongoDB or testing data interactions in Mongoose, this sandbox environment offers an intuitive way to explore the most widely used MongoDB queries.

## 🚀 Features

- 🌐 Full-stack MERN application
- 🧪 Postman-inspired UI for sending MongoDB operation requests
- 🔧 Covers 25 core MongoDB functions using Mongoose
- 🔍 Real-time response display (success, failure, returned data)
- 🧰 Plug-and-play environment for learning MongoDB queries

---

## 📦 Tech Stack

- **Frontend**: React, TailwindCSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose

---

## 📘 Supported MongoDB Operations

| Category      | Function               | Description |
|---------------|------------------------|-------------|
| **Insert**    | `insertOne()`          | Insert a single document |
|               | `insertMany()`         | Insert multiple documents |
| **Read**      | `find()`               | Query all matching documents |
|               | `findOne()`            | Find the first matching document |
|               | `find().limit()`       | Limit result set |
|               | `find().skip()`        | Skip records (pagination) |
|               | `find().sort()`        | Sort result set |
|               | `distinct()`           | Return distinct values |
|               | `countDocuments()`     | Count number of documents |
| **Update**    | `updateOne()`          | Update first matching document |
|               | `updateMany()`         | Update multiple documents |
|               | `replaceOne()`         | Replace a document entirely |
|               | `findOneAndUpdate()`   | Atomically find and update |
|               | `findOneAndReplace()`  | Find and replace a document |
| **Delete**    | `deleteOne()`          | Delete a single document |
|               | `deleteMany()`         | Delete multiple documents |
|               | `findOneAndDelete()`   | Atomically find and delete |
| **Advanced**  | `aggregate()`          | Aggregation pipeline support |
|               | `bulkWrite()`          | Perform multiple write operations |
| **Indexes**   | `createIndex()`        | Create an index |
|               | `dropIndex()`          | Drop a specific index |
|               | `getIndexes()`         | List all indexes |
| **Collection**| `renameCollection()`   | Rename a collection |
|               | `drop()`               | Drop a collection |
|               | `listCollections()`    | List all collections |

---

## 📷 UI Preview
![Screenshot 2025-05-11 083343](https://github.com/user-attachments/assets/bbb99d01-7697-4042-9b56-0a8239f5efc5)
![Screenshot 2025-05-11 083354](https://github.com/user-attachments/assets/02e731af-fa1d-43bf-b3ac-48224348561e)


## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HasanYahya101/Mongoose-Sandbox-MERN.git
cd Mongoose-Sandbox-MERN
```
### 2. Add Environment Variables

then create a .env file in both `client` and `server` folders and enter your `URL` and `MongoDB_URI` in them.

### 3. Install Packages and run Project

* For Server:

```bash
cd server
npm install
npm run dev
```

* For Client:

```bash
cd client
npm install
npm run dev
```
