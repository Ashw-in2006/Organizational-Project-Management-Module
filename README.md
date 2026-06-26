# 📊 APJ Project Management System

A full-stack project management application built with the MERN stack (MongoDB, Express.js, React, Node.js) for managing projects, tasks, team members, time tracking, performance evaluation, and deliveries.

## 📸 Screenshots

*Dashboard Overview*
<img width="1915" height="1026" alt="Screenshot 2026-06-26 004407" src="https://github.com/user-attachments/assets/5fce8262-6605-4dfd-b0c8-3d7dd5927938" />


*Project Time Logs*
<img width="1913" height="967" alt="Screenshot 2026-06-26 010436" src="https://github.com/user-attachments/assets/1e4ceabd-a203-4f5c-a376-75dd8342f2c6" />


*Performance Report*
<img width="1918" height="977" alt="Screenshot 2026-06-26 010448" src="https://github.com/user-attachments/assets/ffee7c6b-f149-4a22-9868-e493c8e79f21" />


## 🚀 Features

### Core Features
- **📊 Dashboard** - Overview of all project metrics and statistics
- **📋 Project Management** - Create, read, update, and delete projects
- **✅ Task Management** - Create, assign, and track tasks with status updates
- **👥 Team Assignments** - Assign team members to projects with roles
- **⏱️ Time Logging** - Track time spent on tasks
- **📈 Performance Records** - Evaluate team member performance
- **💰 Project Estimations** - Create and manage project estimates
- **📦 Delivery Management** - Track project deliveries and milestones
- **📊 Reports & Analytics** - Generate project reports and insights

### Technical Features
- 🔄 Real-time CRUD operations
- 📱 Responsive design (Mobile & Desktop)
- 🎨 Modern UI with intuitive navigation
- 🔒 Environment variables for security
- 📝 Input validation and error handling
- 🚀 Fast and efficient MongoDB queries

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variables management |
| Nodemon | Development auto-reload |

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI library |
| React Router DOM | Navigation |
| Axios | HTTP client |
| CSS3 | Styling |

## 📁 Project Structure
organizational-project-management/
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ ├── Project.js
│ │ ├── Estimation.js
│ │ ├── TeamMember.js
│ │ ├── ProjectAssignment.js
│ │ ├── Task.js
│ │ ├── TimeLog.js
│ │ ├── BreachLog.js
│ │ ├── PerformanceRecord.js
│ │ └── ProjectDelivery.js
│ ├── server.js
│ ├── package.json
│ ├── .env
│ └── .gitignore
│
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── Dashboard.js
│ │ │ ├── Projects.js
│ │ │ ├── Estimation.js
│ │ │ ├── Assignment.js
│ │ │ ├── Tasks.js
│ │ │ ├── TimeLogs.js
│ │ │ ├── Performance.js
│ │ │ ├── Delivery.js
│ │ │ └── Reports.js
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.js
│ │ ├── App.css
│ │ ├── index.js
│ │ └── index.css
│ ├── package.json
│ └── .gitignore
│
├── README.md
└── LICENSE



## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation

### 1. Clone the Repository


git clone https://github.com/Ashw-in2006/apj-project-management.git
cd apj-project-management

### 2. Backend Setup

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy and paste the following:
Create .env file in backend directory:

env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/apj_db?retryWrites=true&w=majority
JWT_SECRET=apj_secret_key_2026
bash
# Start the backend server
npm run dev
Expected Output:


✅ MongoDB Connected
✅ Server running on port 5000
📡 Test API at: http://localhost:5000
🔧 Create sample data: POST http://localhost:5000/api/test/create-all
### 3. Frontend Setup

# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
Expected Output:


Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000

### 4. Seed Sample Data (Optional)
To populate the database with sample data for testing:


# Using curl
curl -X POST http://localhost:5000/api/test/create-all

# Or using Postman
# POST request to: http://localhost:5000/api/test/create-all
📡 API Endpoints
Projects
Method	Endpoint	Description
GET	/api/projects	Get all projects
GET	/api/projects/:id	Get single project
POST	/api/projects	Create a project
PUT	/api/projects/:id	Update a project
DELETE	/api/projects/:id	Delete a project
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create a task
PATCH	/api/tasks/:id/status	Update task status
Performance Records
Method	Endpoint	Description
GET	/api/performance	Get all performance records
POST	/api/performance	Create a performance record
Users
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get single user
POST	/api/users	Create a user
Other Endpoints
Method	Endpoint	Description
GET/POST	/api/estimations	Project estimations CRUD
GET/POST	/api/teammembers	Team member management
GET/POST	/api/timelogs	Time logging CRUD
GET/POST	/api/deliveries	Project delivery management
GET	/api/reports	Generate reports
🚦 Running the Application
Development Mode
Terminal 1 - Backend:


cd backend
npm run dev
Terminal 2 - Frontend:


cd frontend
npm start
Production Mode

# Build frontend
cd frontend
npm run build

# Serve frontend build with backend
cd ../backend
npm start
📊 Database Schema
User Schema
javascript
{
  name: String,
  email: String (unique),
  password: String,
  role: String (admin, project_manager, team_member, client),
  department: String,
  designation: String,
  skills: [String],
  isActive: Boolean
}
Project Schema
javascript
{
  name: String,
  description: String,
  clientName: String,
  clientEmail: String,
  startDate: Date,
  endDate: Date,
  status: String (planned, active, on_hold, completed, cancelled),
  priority: String (low, medium, high, critical),
  budget: Number,
  projectManager: ObjectId (ref: User)
}
Task Schema
javascript
{
  projectId: ObjectId (ref: Project),
  assignedTo: ObjectId (ref: User),
  createdBy: ObjectId (ref: User),
  title: String,
  description: String,
  status: String (todo, in_progress, review, blocked, completed),
  priority: String (low, medium, high, critical),
  estimatedHours: Number,
  actualHours: Number,
  dueDate: Date
}
🎨 UI Features
✅ Responsive Design - Works on desktop and mobile devices

✅ Modern Dashboard - Key metrics at a glance

✅ Interactive Tables - Sort and filter data

✅ Status Badges - Visual indicators for project/task status

✅ Form Validation - Client-side validation for data entry

✅ Real-time Updates - Automatic data refresh after CRUD operations

✅ Clean Navigation - Easy access to all modules

🧪 Testing
Backend API Testing
Using curl:

bash
# Test health endpoint
curl http://localhost:5000/health

# Create a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","status":"active"}'

# Get all projects
curl http://localhost:5000/api/projects

# Create performance record
curl -X POST http://localhost:5000/api/performance \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "your_user_id",
    "projectId": "your_project_id",
    "tasksCompleted": 5,
    "qualityScore": 85,
    "productivityScore": 90
  }'
Frontend Testing
Open browser at http://localhost:3000

Navigate through all sections

Test CRUD operations:

Create new projects

Add tasks

Log time

Create performance records

View reports

🔒 Environment Variables
Backend (.env)
env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/apj_db
JWT_SECRET=your_super_secret_jwt_key
Frontend (.env - Optional)
env
REACT_APP_API_URL=http://localhost:5000/api
🐛 Common Issues & Solutions
MongoDB Connection Error
✅ Check if your IP is whitelisted in MongoDB Atlas

✅ Verify your connection string in .env

✅ Ensure MongoDB service is running

CORS Errors
✅ Make sure CORS is enabled in backend (app.use(cors()))

✅ Check if frontend is making requests to correct port

Port Already in Use

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
Module Not Found Errors
bash
# Clear node_modules and reinstall
rm -rf node_modules
rm package-lock.json
npm install
📈 Future Enhancements
User Authentication & Authorization (JWT)

Real-time notifications (WebSocket)

File attachments for tasks

Advanced reporting with charts (Chart.js)

Email notifications

Mobile app (React Native)

Project templates

Gantt charts for project timelines

Export reports (PDF/Excel)

Role-based access control

Activity logs

Team chat integration

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Contribution Guidelines
Follow the existing code style

Write clear commit messages

Update documentation when needed

Add tests for new features

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Ashwin R

GitHub: @Ashw-in2006

Email: rajaashwin2006@gmail.com

🙏 Acknowledgments
MongoDB Atlas for cloud database

Express.js community

React team for amazing frontend library

All open-source contributors

Special thanks to everyone who contributed to this project

📞 Support
For support, email rajaashwin2006@gmail.com or create an issue in the GitHub repository.
