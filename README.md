**🌸 Full-Stack Blogging Website Project**

Welcome to my *Full-Stack Blogging Website* project! 🎉  
This is a *secure blog platform* where users can *Sign Up, Log In, create blog posts with privacy settings,* and view their personal dashboard.  
It also includes an *Admin Panel* to manage users.

---

## 📖 Project Overview

This project demonstrates a *full-stack web application* with:

- *Frontend*: HTML, CSS, Bootstrap 5 🎨  
- *Backend*: Node.js, Express.js ⚡  
- *Database*: SQLite3 💾  
- *Authentication: Secure login & signup using **bcrypt password hashing* 🔒  
- *Session Management*: Express-session for logged-in users 🧑‍💻
  Key Features:**

1. 👤 **User Authentication** (Signup & Login)
2. 🏠 **Personal Dashboard** for logged-in users
3. ✍ **Post Blogs** with title, content, image URL, and privacy options
4. 🔒 **Privacy Control**:
   - Public
   - Friends only
   - Only me
5. 👑 **Admin Panel** to view and delete users
6. 📂 **Database**:
   - Users table
   - Blogs table
7. 🖥 **Frontend + Backend Integration**

---
# **Screenshots** 
*Commands to install packages*
1. go in server
   ![Server](Server.PNG)

## 🛠 Technologies Used

- **HTML5, CSS3, Bootstrap 5** 🎨 (Frontend)
- **JavaScript (ES6)** ✨
- **Node.js + Express.js** ⚡ (Backend)
- **SQLite3** 💾 (Database)
- **bcryptjs** 🔐 (Password encryption)
- **express-session** 🧑‍💻 (Session management)
- **Body-Parser** (Form handling)

---

## 📂 Project StructBlog_Project_Full_With_Backend/
│
├── public/ # Frontend files (HTML, CSS, JS)

│ ├── blog.html # Homepage with login/signup

│ ├── dashboard.html # User dashboard page

│ ├── script.js # Frontend functionality

│ └── style.css # Optional CSS

│
├── server/ # Backend folder

│ ├── server.js # Main Express.js server

│ └── db.sqlite # SQLite database file
│
├── package.json

├── package-lock.json

└── README.mdure

---

## 🚀 How to Run the Project

Follow these steps to **run the project locally**:

### 1️⃣ **Clone the Repository**

git clone https://github.com/yourusername/blog-project.git
cd blog-project/server 

**2️⃣ Install Dependencies**
Make sure Node.js is installed. Then, run:

*npm install*

**This will install:**

*express*

*express-session*

*sqlite3*

*bcryptjs*

*body-parser*

**3️⃣ Start the Server**

  node server.js
  
Server will start at:

http://localhost:3000

**4️⃣ Access the Website**

Open your browser and go to:
http://localhost:3000
Sign up → Log in → Explore your Dashboard! 🎉

🗄 **Database Info**
Database: SQLite3 (File-based)

Tables Created:

users → stores username, email, hashed password

blogs → stores user_id, title, content, visibility


**⚡ Admin Panel**


Visit:
http://localhost:3000/admin/users

You can view and delete users from here.


**👩‍💻 Author**


**Tahreem Fatima**

BS Software Engineering, 5th Semester @ PMAS Arid University

📧 Email: tahreemf362@gmail.com

🌸 Thank you for checking out my project! 🌸
