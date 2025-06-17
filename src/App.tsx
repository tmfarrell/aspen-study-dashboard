
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Apps from './pages/Apps';
import PatientCohort from './pages/PatientCohort';
import Explorer from './pages/Explorer';
import { AppSidebar } from './components/AppSidebar';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full">
                    <AppSidebar />
                    <SidebarInset>
                      <div className="flex h-full w-full flex-col">
                        <div className="flex-1">
                          <Routes>
                            <Route path="/" element={<Navigate to="/home" replace />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/apps" element={<Apps />} />
                            <Route path="/cohort" element={<PatientCohort />} />
                            <Route path="/explorer" element={<Explorer />} />
                          </Routes>
                        </div>
                      </div>
                    </SidebarInset>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
