import { useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./components/screens/Home";
import { Login } from "./components/screens/Login";
import { Register } from "./components/screens/Register";
import { Championships } from "./components/screens/Championships";
import { ChampionshipDetails } from "./components/screens/ChampionshipDetails";
import { Standings } from "./components/screens/Standings";
import { Statistics } from "./components/screens/Statistics";
import { OrganizerDashboard } from "./components/screens/OrganizerDashboard";
import { ManageChampionships } from "./components/screens/ManageChampionships";
import { ManageTeams } from "./components/screens/ManageTeams";
import { ManagePlayers } from "./components/screens/ManagePlayers";
import { ManageMatches } from "./components/screens/ManageMatches";
import { RefereeArea } from "./components/screens/RefereeArea";
import { AdminPanel } from "./components/screens/AdminPanel";
import { Sponsors } from "./components/screens/Sponsors";
import { Notifications } from "./components/screens/Notifications";
import { Reports } from "./components/screens/Reports";
import { FanArea } from "./components/screens/FanArea";
import { Settings } from "./components/screens/Settings";

type Screen =
  | "home" | "login" | "register" | "championships" | "championship-details"
  | "standings" | "statistics" | "organizer-dashboard" | "manage-championships"
  | "manage-teams" | "manage-players" | "manage-matches" | "referee-area"
  | "admin-panel" | "sponsors" | "notifications" | "reports" | "fan-area" | "settings";

type UserRole = "admin" | "organizer" | "referee" | "fan";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = (s: Screen) => setScreen(s);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === "admin") setScreen("home");
    else if (role === "organizer") setScreen("organizer-dashboard");
    else if (role === "referee") setScreen("referee-area");
    else setScreen("fan-area");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setScreen("login");
  };

  if (!isLoggedIn) {
    if (screen === "register") return <Register onNavigate={navigate} />;
    return <Login onNavigate={navigate} onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case "home": return <Home onNavigate={navigate} />;
      case "championships": return <Championships onNavigate={navigate} />;
      case "championship-details": return <ChampionshipDetails onNavigate={navigate} />;
      case "standings": return <Standings onNavigate={navigate} />;
      case "statistics": return <Statistics onNavigate={navigate} />;
      case "fan-area": return <FanArea onNavigate={navigate} />;
      case "organizer-dashboard": return <OrganizerDashboard onNavigate={navigate} />;
      case "manage-championships": return <ManageChampionships onNavigate={navigate} />;
      case "manage-teams": return <ManageTeams onNavigate={navigate} />;
      case "manage-players": return <ManagePlayers onNavigate={navigate} />;
      case "manage-matches": return <ManageMatches onNavigate={navigate} />;
      case "referee-area": return <RefereeArea onNavigate={navigate} />;
      case "admin-panel": return <AdminPanel onNavigate={navigate} />;
      case "sponsors": return <Sponsors onNavigate={navigate} />;
      case "notifications": return <Notifications onNavigate={navigate} />;
      case "reports": return <Reports onNavigate={navigate} />;
      case "settings": return <Settings onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <Layout
      currentScreen={screen}
      onNavigate={navigate}
      userRole={userRole}
      onLogout={handleLogout}
    >
      {renderScreen()}
    </Layout>
  );
}
