
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import Home from './pages/Home';
import PatientCohort from './pages/PatientCohort';
import Explorer from './pages/Explorer';
import Reports from './pages/Reports';
import Documentation from './pages/Documentation';
import FAQ from './pages/FAQ';
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
                            <Route path="/cohort" element={<PatientCohort />} />
                            <Route path="/explorer" element={<Explorer />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/faq" element={<FAQ />} />
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
