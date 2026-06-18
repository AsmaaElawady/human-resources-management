import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/guards/ProtectedRoute'
import RoleBasedRoute from './components/guards/RoleBasedRoute'
import HomePage from './pages/HomePage'
import PageWrapper from './layouts/PageWrapper'
import EmployeeListPage from './pages/employees/EmployeeListPage'
import AddEmployeePage from './pages/employees/AddEmployeePage'
import EditEmployeePage from './pages/employees/EditEmployeePage'
import EmployeeSearchPage from './pages/employees/EmployeeSearchPage'
import VacationFormPage from './pages/vacations/VacationFormPage'
import SubmittedVacationsPage from './pages/vacations/SubmittedVacationsPage'
import MyVacationsPage from './pages/vacations/MyVacationsPage'


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />} >
          <Route element={<PageWrapper/>}>
            <Route path='/' element={<HomePage />} />
            <Route path='/vacations' element={<VacationFormPage />} />
            
            {/* Accessible to admin, hr, and employee (employees can only edit their own profile) */}
            <Route path='/employees/:id' element={<EditEmployeePage />} />
            <Route path='/vacations/my' element={<MyVacationsPage />} />
            
            {/* Admin and HR only routes */}
            <Route element={<RoleBasedRoute allowedRoles={['admin', 'hr']} />}>
              <Route path='/employees' element={<EmployeeListPage />} />
              <Route path='/employees/add' element={<AddEmployeePage />} />
              <Route path='/employees/search' element={<EmployeeSearchPage />} />
              <Route path='/vacations/submitted' element={<SubmittedVacationsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
