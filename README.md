<div>
  <h1>Blog Project</h1>

  <p>
    This is the backend for a blogging platform where users can create, update, and delete their own blogs. 
    The platform supports two user roles—<strong>Admin</strong> and <strong>User</strong>—with different levels of access and permissions. 
    Admin users can manage other users, while regular users can only manage their own blogs. 
    The platform includes secure authentication, role-based access control, and a public API for viewing blogs with advanced search, sort, and filter functionalities.
  </p>

  <h2>Technologies</h2>
  <ul>
    <li>TypeScript</li>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB (with Mongoose)</li>
  </ul>

  <h2>Features</h2>
  <h3>1. User Roles</h3>
  <ul>
    <li><strong>Admin</strong>
      <ul>
        <li>Predefined credentials in the database.</li>
        <li>Can delete any blog.</li>
        <li>Can block any user by updating the <code>isBlocked</code> property.</li>
        <li>Cannot update any blog.</li>
      </ul>
    </li>
  </ul>
      <ul>
    <li><strong>User</strong>
      <ul>
        <li>Can register, log in, and authenticate.</li>
        <li>Can create blogs (only when logged in).</li>
        <li>Can update and delete their own blogs.</li>
        <li>Cannot perform admin actions.</li>
      </ul>
    </li>
  </ul>

  <h3>2. Authentication & Authorization</h3>
  <ul>
    <li><strong>Authentication</strong>: 
      <ul>
        <li>Users must register and log in to perform operations like creating, updating, and deleting blogs.</li>
        <li>JWT tokens are used for authentication, ensuring secure access.</li>
      </ul>
    </li>
    <li><strong>Authorization</strong>: 
      <ul>
        <li>Admin and User roles are differentiated through role-based access control.</li>
        <li>Admin has elevated permissions (e.g., blocking users, deleting any blog).</li>
        <li>Regular users have limited permissions (only able to manage their own blogs).</li>
      </ul>
    </li>
  </ul>

  <h3>3. Blog API</h3>
  <ul>
    <li><strong>Public API for Reading Blogs</strong>: 
      <ul>
        <li>Exposes the list of blogs, including title, content, author details, and other necessary information.</li>
        <li>Blogs are displayed publicly and can be accessed without authentication.</li>
      </ul>
    </li>
    <li><strong>Search, Sort, and Filter</strong>: 
      <ul>
        <li>Users can search for blogs by title or content.</li>
        <li>Blogs can be sorted by creation date or title.</li>
        <li>Users can filter blogs by author or other relevant parameters.</li>
      </ul>
    </li>
  </ul>

  <h3>4. CRUD Operations on Blogs</h3>
  <ul>
    <li><strong>Create Blog</strong>: 
      <ul>
        <li>Users can create their own blogs by providing a title, content, and any other necessary fields.</li>
        <li>Only authenticated users can create blogs.</li>
      </ul>
    </li>
    <li><strong>Update Blog</strong>: 
      <ul>
        <li>Users can update their own blogs after creation.</li>
        <li>Admin cannot update user blogs but can delete any blog.</li>
      </ul>
    </li>
    <li><strong>Delete Blog</strong>: 
      <ul>
        <li>Users can delete their own blogs.</li>
        <li>Admin can delete any blog created by any user.</li>
      </ul>
    </li>
  </ul>

  <h2>API Endpoints</h2>

  <h3>User Endpoints</h3>
  <ul>
    <li><strong>POST /register</strong> - Register a new user.</li>
    <li><strong>POST /login</strong> - Login and obtain a JWT token.</li>
    <li><strong>GET /user</strong> - Get details of the logged-in user (requires authentication).</li>
    <li><strong>PUT /user/block/:id</strong> - Block a user by setting <code>isBlocked</code> to <code>true</code> (Admin only).</li>
  </ul>

  <h3>Blog Endpoints</h3>
  <ul>
    <li><strong>GET /blogs</strong> - Retrieve all blogs with optional search, sort, and filter parameters.</li>
    <li><strong>GET /blogs/:id</strong> - Retrieve a specific blog by its ID.</li>
    <li><strong>POST /blogs</strong> - Create a new blog (only for authenticated users).</li>
    <li><strong>PUT /blogs/:id</strong> - Update an existing blog (only for the author of the blog).</li>
    <li><strong>DELETE /blogs/:id</strong> - Delete a blog (only for the author of the blog, or Admin).</li>
  </ul>

  <h3>Public Blog Features</h3>
  <ul>
    <li><strong>Search</strong> - Search blogs by title, content, or author.</li>
    <li><strong>Sort</strong> - Sort blogs by creation date, title, or other fields.</li>
    <li><strong>Filter</strong> - Filter blogs by author or category.</li>
  </ul>

  <h2>Project Setup</h2>

  <h3>1. Clone the repository</h3>
  <pre><code>git clone https://github.com/your-repository/blogging-platform-backend.git</code></pre>

  <h3>2. Install Dependencies</h3>
  <p>Navigate to the project folder and install the required dependencies:</p>
  <pre><code>cd blog
npm install</code></pre>

  <h3>3. Environment Variables</h3>
  <p>Make sure to create a <code>.env</code> file in the root directory and include the following variables:</p>
    # Server Configuration

 ```bash
PORT=5000

# JWT Configuration
JWT_ACCESS_SECRET=your_access_token_secret_key_here
JWT_REFRESH_SECRET=your_refresh_token_secret_key_here
JWT_ACCESS_EXPIRATION=10d
JWT_REFRESH_EXPIRATION=356d

# MongoDB Configuration (Replace with your actual MongoDB URI)
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.irpitar.mongodb.net/ph-blog?retryWrites=true&w=majority

# Salt for password hashing
SALT=10
# Environment (production or development)
NODE_ENV=production
```

  </pre>

  <h3>4. Run the application</h3>
  <p>Once the environment variables are set up, you can start the server:</p>
  <pre><code>npm run start:dev</code></pre>
  <p>By default, the server will run on port <code>5000</code>.</p>


  <h2>Authentication Flow</h2>
  <ol>
    <li><strong>Register</strong>: The user can register by providing a username, email, and password. This will store user details in the database with a hashed password.</li>
    <li><strong>Login</strong>: After successful login, the user receives a JWT token, which should be included in the <code>Authorization</code> header for any subsequent requests requiring authentication.</li>
    <li><strong>JWT Token</strong>: The token will be used to authenticate users for protected routes (e.g., creating, updating, or deleting blogs).</li>
  </ol>

  <h2>Role-Based Access Control (RBAC)</h2>
  <ul>
    <li><strong>User Role</strong>: Regular users can only manage their own blogs and view others' blogs. They are restricted from performing admin tasks (e.g., blocking users or deleting any blog).</li>
    <li><strong>Admin Role</strong>: Admin users have elevated permissions. They can manage other users and delete any blog, but they cannot update blogs created by other users.</li>
  </ul>

  <h2>Security Considerations</h2>
  <ul>
    <li><strong>Password Hashing</strong>: Passwords are hashed before storing them in the database using <code>bcrypt</code>.</li>
    <li><strong>JWT Authentication</strong>: JWT tokens are used for securing endpoints, ensuring only authorized users can perform restricted actions.</li>
    <li><strong>Role Validation</strong>: Middleware checks the role of the user (Admin vs. User) before allowing access to specific routes.</li>
  </ul>


</div>
