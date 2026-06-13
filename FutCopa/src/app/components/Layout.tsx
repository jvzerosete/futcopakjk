import { useState } from "react";
import {
  Home, Trophy, BarChart2, Users, Calendar, Shield, UserCheck,
  Star, Bell, FileText, Settings, ChevronLeft, ChevronRight,
  Menu, X, LogOut, User, ClipboardList, Megaphone, LayoutDashboard,
  Swords, Award
} from "lucide-react";

type Screen =
  | "home" | "login" | "register" | "championships" | "championship-details"
  | "standings" | "statistics" | "organizer-dashboard" | "manage-championships"
  | "manage-teams" | "manage-players" | "manage-matches" | "referee-area"
  | "admin-panel" | "sponsors" | "notifications" | "reports" | "fan-area" | "settings";

interface LayoutProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  userRole: "admin" | "organizer" | "referee" | "fan";
  onLogout: () => void;
  children: React.ReactNode;
}

const navGroups = [
  {
    label: "PÚBLICO",
    items: [
      { id: "home" as Screen, label: "Home", icon: Home },
      { id: "championships" as Screen, label: "Campeonatos", icon: Trophy },
      { id: "standings" as Screen, label: "Classificação", icon: BarChart2 },
      { id: "statistics" as Screen, label: "Estatísticas", icon: Star },
      { id: "fan-area" as Screen, label: "Área do Torcedor", icon: Megaphone },
    ]
  },
  {
    label: "GESTÃO",
    roles: ["admin", "organizer"],
    items: [
      { id: "organizer-dashboard" as Screen, label: "Dashboard", icon: LayoutDashboard },
      { id: "manage-championships" as Screen, label: "Campeonatos", icon: Trophy },
      { id: "manage-teams" as Screen, label: "Equipes", icon: Users },
      { id: "manage-players" as Screen, label: "Jogadores", icon: User },
      { id: "manage-matches" as Screen, label: "Partidas", icon: Calendar },
      { id: "sponsors" as Screen, label: "Patrocinadores", icon: Award },
    ]
  },
  {
    label: "ÁRBITRO",
    roles: ["admin", "referee"],
    items: [
      { id: "referee-area" as Screen, label: "Área do Árbitro", icon: Swords },
    ]
  },
  {
    label: "ADMINISTRAÇÃO",
    roles: ["admin"],
    items: [
      { id: "admin-panel" as Screen, label: "Painel Admin", icon: Shield },
      { id: "reports" as Screen, label: "Relatórios", icon: FileText },
      { id: "settings" as Screen, label: "Configurações", icon: Settings },
    ]
  },
];

const roleColors: Record<string, string> = {
  admin: "bg-red-500/20 text-red-400",
  organizer: "bg-blue-500/20 text-blue-400",
  referee: "bg-yellow-500/20 text-yellow-400",
  fan: "bg-green-500/20 text-green-400",
};

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  organizer: "Organizador",
  referee: "Árbitro",
  fan: "Torcedor",
};

export function Layout({ currentScreen, onNavigate, userRole, onLogout, children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`flex flex-col bg-sidebar border-r border-sidebar-border h-full transition-all duration-300 ${
        mobile ? "w-72" : collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sidebar-border ${collapsed && !mobile ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Trophy size={18} className="text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div>
            <span className="text-white font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
              FUT<span className="text-accent">COPA</span>
            </span>
            <p className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>Gestão de Campeonatos</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => {
          if (group.roles && !group.roles.includes(userRole)) return null;
          return (
            <div key={group.label} className="mb-4">
              {(!collapsed || mobile) && (
                <p className="text-muted-foreground px-3 mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", fontFamily: "var(--font-display)" }}>
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const active = currentScreen === item.id ||
                  (item.id === "championship-details" && currentScreen === "championship-details");
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); if (mobile) setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all duration-150 group ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    } ${collapsed && !mobile ? "justify-center" : ""}`}
                  >
                    <item.icon size={17} className={active ? "text-white" : "text-muted-foreground group-hover:text-foreground"} />
                    {(!collapsed || mobile) && (
                      <span style={{ fontSize: "0.82rem" }}>{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className={`border-t border-sidebar-border p-3 ${collapsed && !mobile ? "flex justify-center" : ""}`}>
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate" style={{ fontSize: "0.8rem" }}>Carlos Admin</p>
              <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${roleColors[userRole]}`} style={{ fontSize: "0.6rem" }}>
                {roleLabels[userRole]}
              </span>
            </div>
            <button onClick={onLogout} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button onClick={onLogout} className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col">
        <Sidebar />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-card border border-border rounded-r-full w-5 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all z-50"
          style={{ left: collapsed ? "3.5rem" : "15.5rem" }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 flex-shrink-0">
          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 flex items-center gap-2">
            <Trophy size={14} className="text-primary" />
            <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>FutCopa</span>
            <ChevronRight size={12} className="text-muted-foreground" />
            <span className="text-foreground" style={{ fontSize: "0.8rem" }}>
              {navGroups.flatMap(g => g.items).find(i => i.id === currentScreen)?.label || ""}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("notifications")}
              className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
            </button>
            <button
              onClick={() => onNavigate("settings")}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings size={17} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
