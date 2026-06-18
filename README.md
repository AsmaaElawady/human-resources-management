# Human Resources Management System

A modern, full-featured **HR Management System** frontend built with **React 19**, **TypeScript**, and **Tailwind CSS**. The application supports role-based access control for admins, HR staff, and employees — with real-time notifications, vacation management, and full employee lifecycle CRUD.

---

## Preview

> A responsive, professional dashboard experience powered by a Node.js/Express backend.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Redux Toolkit (RTK) + RTK Query |
| **Routing** | React Router DOM v7 |
| **Forms** | React Hook Form |
| **Validation** | Zod |
| **HTTP Client** | Axios |
| **Real-time** | Socket.IO Client |
| **Notifications** | React Hot Toast |
| **Linting** | ESLint + TypeScript-ESLint |

---

## Features

### Authentication & Security
- JWT-based login with **access token** and **refresh token** support
- Automatic token refresh on expiry via Axios interceptors
- Secure **logout** that clears all session data
- **Change password** functionality for authenticated users

### Employee Management *(Admin & HR only)*
- **List all employees** with pagination support
- **Add new employee** with full profile details and photo upload
- **Edit employee** profile (admins/HR can edit any; employees can edit their own)
- **Search employees** by name or other attributes with debounced input
- Employee profile includes: name, email, phone, address, gender, marital status, date of birth, salary, vacation days, and profile photo

### Vacation & Leave Management
- **Submit a vacation request** with date range and reason *(all roles)*
- **View my vacations** — employees see their own submitted requests and statuses *(all roles)*
- **Review all submitted vacations** — approve or reject requests *(Admin & HR only)*
- Vacation statuses: `submitted`, `approved`, `rejected`
- Tracks **available** and **approved vacation days** per employee
- **Dashboard stats**: top employees by approved days, and breakdown by status

### Real-time Notifications
- Live **Socket.IO** integration for instant vacation status update alerts
- **Toast notifications** appear immediately when an admin approves/rejects a request
- Cross-tab isolation to avoid conflicting browser storage sessions

### Role-Based Access Control (RBAC)
- Three roles supported: **`admin`**, **`hr`**, **`employee`**
- **ProtectedRoute** — redirects unauthenticated users to the login page
- **RoleBasedRoute** — restricts sensitive pages (employee list, search, add, submitted vacations) to `admin` and `hr` only

---

## Project Structure

```
human-resources-management/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Images, icons, and static media
│   ├── components/
│   │   ├── employees/
│   │   │   ├── EmployeeForm.tsx          # Reusable add/edit employee form
│   │   │   └── ProfilePhotoUpload.tsx    # Profile photo upload component
│   │   ├── vacations/
│   │   │   └── VacationForm.tsx          # Reusable vacation request form
│   │   └── guards/
│   │       ├── ProtectedRoute.tsx        # Redirects unauthenticated users
│   │       └── RoleBasedRoute.tsx        # Restricts pages by user role
│   ├── hooks/
│   │   ├── useDebounce.ts                # Generic debounce hook for search
│   │   └── useSocketNotifications.ts    # Socket.IO real-time notifications hook
│   ├── layouts/
│   │   ├── Navbar.tsx                    # Top navigation bar
│   │   ├── Sidebar.tsx                   # Collapsible sidebar navigation
│   │   └── PageWrapper.tsx               # Main layout wrapper with sidebar + navbar
│   ├── pages/
│   │   ├── HomePage.tsx                  # Dashboard / landing page
│   │   ├── LoginPage.tsx                 # Login page
│   │   ├── NotFoundPage.tsx              # 404 page
│   │   ├── employees/
│   │   │   ├── EmployeeListPage.tsx      # Paginated list of employees
│   │   │   ├── AddEmployeePage.tsx       # Add new employee
│   │   │   ├── EditEmployeePage.tsx      # Edit existing employee
│   │   │   └── EmployeeSearchPage.tsx    # Search employees
│   │   └── vacations/
│   │       ├── VacationFormPage.tsx      # Submit a vacation request
│   │       ├── MyVacationsPage.tsx       # View my vacation requests
│   │       └── SubmittedVacationsPage.tsx # Review all vacations (admin/hr)
│   ├── schemas/
│   │   ├── login.schema.ts               # Zod schema for login form
│   │   ├── employee.schema.ts            # Zod schema for employee form
│   │   └── vacation.schema.ts            # Zod schema for vacation form
│   ├── services/
│   │   ├── axios.ts                      # Axios instance with interceptors
│   │   ├── baseQuery.ts                  # RTK Query base query using Axios
│   │   ├── authApi.ts                    # Auth endpoints (login, register, refresh, me)
│   │   ├── employeeApi.ts                # Employee CRUD endpoints
│   │   └── vacationApi.ts                # Vacation request endpoints
│   ├── store/
│   │   ├── store.ts                      # Redux store configuration
│   │   ├── hooks.ts                      # Typed useAppDispatch & useAppSelector
│   │   └── slices/
│   │       ├── authSlice.ts              # Auth state (user, tokens)
│   │       ├── employeeSlice.ts          # Employee UI state
│   │       └── vacationSlice.ts          # Vacation UI state
│   ├── types/
│   │   ├── auth.types.ts                 # User, LoginResponse interfaces
│   │   ├── employee.types.ts             # Employee, PaginatedEmployees, CreateEmployeeInput
│   │   └── vacation.types.ts             # Vacation, VacationStats, CreateVacationInput
│   ├── App.tsx                           # Root app with route definitions
│   ├── main.tsx                          # Entry point, Redux + Router providers
│   ├── index.css                         # Global Tailwind styles
│   └── App.css                           # App-level styles
├── .env                                  # Environment variables (not committed)
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

---

## Application Routes

| Route | Page | Access |
|---|---|---|
| `/login` | Login Page | Public |
| `/` | Home / Dashboard | All authenticated users |
| `/vacations` | Submit Vacation Request | All authenticated users |
| `/vacations/my` | My Vacation Requests | All authenticated users |
| `/employees/:id` | Edit Employee Profile | All authenticated users |
| `/employees` | Employee List | Admin & HR only |
| `/employees/add` | Add New Employee | Admin & HR only |
| `/employees/search` | Search Employees | Admin & HR only |
| `/vacations/submitted` | Review All Vacations | Admin & HR only |
| `*` | 404 Not Found | Public |

---

## User Roles

| Role | Description |
|---|---|
| `admin` | Full access to all features and management pages |
| `hr` | Access to employee and vacation management, same as admin |
| `employee` | Can submit vacations, view their own requests, and edit their own profile |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/AsmaaElawady/human-resources-management.git
cd human-resources-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

> Make sure the backend server is running and accessible at these URLs.

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## Backend

This frontend connects to an Express.js + MongoDB backend that handles:
- JWT Authentication (access & refresh tokens)
- Employee CRUD with image uploads (Multer)
- Vacation request management and approval workflow
- Real-time events via Socket.IO
- Email notifications on vacation status changes

> Make sure the backend is running before starting the frontend.

---

## Key Dependencies

```json
{
  "react": "^19.2.6",
  "react-router-dom": "^7.17.0",
  "@reduxjs/toolkit": "^2.12.0",
  "react-redux": "^9.3.0",
  "react-hook-form": "^7.79.0",
  "zod": "^4.4.3",
  "axios": "^1.17.0",
  "socket.io-client": "^4.8.3",
  "react-hot-toast": "^2.6.0",
  "tailwindcss": "^4.3.1"
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.
