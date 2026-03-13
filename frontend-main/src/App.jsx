import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { useTheme } from './hooks/useTheme';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { PracticePage } from './pages/PracticePage';
import { MockTestsPage } from './pages/MockTestsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { NewsPage } from './pages/NewsPage';
import { CompanyPrepPage } from './pages/CompanyPrepPage';
import { ProfilePage } from './pages/ProfilePage';
import AptitudeTest from "./pages/AptitudeTest";
import AptitudeResult from "./pages/AptitudeResult";
import DSACoreRound from "./pages/DSACoreRound";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Routes>
      <Route element={<MainLayout theme={theme} onToggleTheme={toggleTheme} />}>

        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/mock-tests" element={<MockTestsPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/companies" element={<CompanyPrepPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test/aptitude" element={<AptitudeTest />} />
          <Route path="/test/result" element={<AptitudeResult />} />
          <Route path="/mock/dsa-core" element={<DSACoreRound />} />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  );
};

export default App;