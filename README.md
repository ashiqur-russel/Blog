<div align="center">

# Blog Project (REST API)

<p>A robust backend for a blogging platform with secure authentication, role-based access control, and advanced API functionalities. This project supports two roles: <strong>Admin</strong> and <strong>User</strong>, ensuring tailored access permissions.</p>

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)](https://mongoosejs.com/)

</div>

## ✨ Features

### 🧑‍💻 User Roles

<ul>
  <li><strong>Admin</strong>
    <ul>
      <li>Predefined credentials in the database.</li>
      <li>Can delete any blog.</li>
      <li>Can block users by updating the <code>isBlocked</code> property.</li>
      <li>Cannot update blogs.</li>
    </ul>
  </li>
  <li><strong>User</strong>
    <ul>
      <li>Can register, log in, and manage their own blogs.</li>
      <li>Restricted from admin-level actions.</li>
      <li>Only logged-in users can create, update, and delete blogs.</li>
    </ul>
  </li>
</ul>

---

### 🔒 Authentication & Authorization

<ul>
  <li><strong>Authentication</strong>: 
    <ul>
      <li>Register and login with JWT-based tokens for secure access.</li>
      <li>Only authenticated users can manage their blogs.</li>
    </ul>
  </li>
  <li><strong>Authorization</strong>: 
    <ul>
      <li>Role-based access control to differentiate between <strong>Admin</strong> and <strong>User</strong> roles.</li>
    </ul>
  </li>
</ul>

---

### 📚 Blog API

<ul>
  <li><strong>Public Blog Features</strong>: 
    <ul>
      <li>Read blogs without authentication.</li>
      <li>Search, sort, and filter blogs by title, content, creation date, or author.</li>
    </ul>
  </li>
  <li><strong>CRUD Operations</strong>: 
    <ul>
      <li>Create, update, and delete blogs (based on role).</li>
      <li>Admin can delete any blog, but not update.</li>
    </ul>
  </li>
</ul>

---

## 🚀 API Endpoints

### 👥 **User Endpoints**

| Method   | URI         | Action                                     |
| -------- | ----------- | ------------------------------------------ |
| `POST`   | `/register` | Register a new user                        |
| `POST`   | `/login`    | Login and obtain a JWT token               |
| `GET`    | `/user`     | Retrieve logged-in user's details (Admin only) |

### 👨‍💼 **Admin Endpoints**

| Method   | URI                              | Action                                     |
| -------- | -------------------------------- | ------------------------------------------ |
| `PATCH`  | `/api/admin/users/:userId/block` | Block a user by setting `isBlocked` to true |
| `DELETE` | `/api/admin/blogs/:id`           | Delete any blog by its ID                  |

### 📝 **Blog Endpoints**

| Method   | URI                   | Action                                             |
| -------- | --------------------- | -------------------------------------------------- |
| `GET`    | `/api/blogs`          | Retrieve all blogs (with search, sort, and filter options) |
| `GET`    | `/api/blogs/:id`      | Retrieve a specific blog by ID                    |
| `POST`   | `/api/blogs`          | Create a new blog (authenticated users only)      |
| `PATCH`  | `/api/blogs/:id`      | Update an existing blog (only by the author)      |
| `DELETE` | `/api/blogs/:id`      | Delete a blog (only by the author)                |



---

## ⚡️ Quick Start (Localhost)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ashiqur-russel/Blog.git
cd Blog
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Install Dependencies
<p>Create a <code>.env</code> file in the root directory and include:</p>

```bash
PORT=5000

# JWT Configuration
JWT_ACCESS_SECRET=your_access_token_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_key_here
JWT_ACCESS_EXPIRATION=10d
JWT_REFRESH_EXPIRATION=356d

# MongoDB Configuration
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog?retryWrites=true&w=majority

# Salt for password hashing
SALT=10
NODE_ENV=production
```
4️⃣ Start the Server

```bash
npm run start:dev
```
<p>Access the API at: <a href="http://localhost:5000" target="_blank">http://localhost:5000</a></p>

🔑 Authentication Flow
<ol> <li><strong>Register</strong>: Users register with a username, email, and password.</li> <li><strong>Login</strong>: Users log in to receive a JWT token for authenticated access.</li> <li><strong>Token Usage</strong>: Include the JWT token in the <code>Authorization</code> header for all protected routes.</li> </ol>

🛡️ Security Considerations
<ul> <li><strong>Password Hashing</strong>: All passwords are securely hashed using <code>bcrypt</code>.</li> <li><strong>JWT Authentication</strong>: Tokens ensure secure, stateless user authentication.</li> <li><strong>Role Validation</strong>: Middleware enforces admin/user permissions for endpoints.</li> </ul>

