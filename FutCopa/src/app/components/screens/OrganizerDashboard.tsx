import { Trophy, Users, User, Shield, Calendar, TrendingUp, Clock, ChevronRight, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardProps { onNavigate: (s: any) => void; }

const monthlyMatches = [
  { month: "Jan", partidas: 12 }, { month: "Fev", partidas: 18 }, { month: "Mar", partidas: 24 },
  { month: "Abr", partidas: 22 }, { month: "Mai", partidas: 28 }, { month: "Jun", partidas: 16 },
];

const upcoming = [
  { home: "Flamengo FC", away: "Santos FC", date: "14/06", time: "16:00", local: "Maracanã" },
  { home: "Palmeiras SC", away: "Corinthians", date: "14/06", time: "18:30", local: "Allianz Parque" },
  { home: "Grêmio", away: "Internacional", date: "15/06", time: "16:00", local: "Arena do Grêmio" },
  { home: "São Paulo FC", away: "Athletico", date: "15/06", time: "19:00", local: "MorumBIS" },
];

const recentActivity = [
  { type: "goal", text: "Rafael Moura marcou gol pelo Flamengo FC", time: "2 min atrás" },
  { type: "card", text: "Cartão amarelo para Bruno Torres (Corinthians)", time: "15 min atrás" },
  { type: "match", text: "Partida Palmeiras x Santos encerrada: 2-1", time: "1 hora atrás" },
  { type: "team", text: "Athletico adicionou 3 novos jogadores", time: "2 horas atrás" },
  { type: "alert", text: "Árbitro confirmado para jogo de amanhã", time: "3 horas atrás" },
];

const typeIcon = (t: string) => {
  const icons: Record<string, { icon: string; color: string }> = {
    goal: { icon: "⚽", color: "bg-accent/20" },
    card: { icon: "🟨", color: "bg-yellow-500/20" },
    match: { icon: "🏆", color: "bg-primary/20" },
    team: { icon: "👥", color: "bg-blue-500/20" },
    alert: { icon: "🔔", color: "bg-orange-500/20" },
  };
  return icons[t] || { icon: "📌", color: "bg-secondary" };
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-foreground mb-1" style={{ fontSize: "0.78rem" }}>{label}</p>
        <p className="text-primary" style={{ fontSize: "0.72rem" }}>Partidas: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function OrganizerDashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: "Campeonatos", value: "6", icon: Trophy, color: "bg-primary/20 text-primary", nav: "manage-championships" as const, change: "+2 ativos" },
    { label: "Equipes", value: "87", icon: Users, color: "bg-blue-500/20 text-blue-400", nav: "manage-teams" as const, change: "+5 este mês" },
    { label: "Jogadores", value: "1.248", icon: User, color: "bg-accent/20 text-accent", nav: "manage-players" as const, change: "+23 novos" },
    { label: "Árbitros", value: "34", icon: Shield, color: "bg-yellow-500/20 text-yellow-400", nav: "referee-area" as const, change: "12 ativos" },
    { label: "Partidas", value: "312", icon: Calendar, color: "bg-purple-500/20 text-purple-400", nav: "manage-matches" as const, change: "48 pendentes" },
    { label: "Próximos Jogos", value: "8", icon: Clock, color: "bg-orange-500/20 text-orange-400", nav: "manage-matches" as const, change: "Esta semana" },
  ];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>DASHBOARD DO ORGANIZADOR</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Bem-vindo de volta, Carlos • 13 de Junho de 2025</p>
        </div>
        <button
          onClick={() => onNavigate("manage-championships")}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          + Novo Campeonato
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {stats.map(s => (
          <button
            key={s.label}
            onClick={() => onNavigate(s.nav)}
            className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/40 transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} />
            </div>
            <p className="text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>{s.value}</p>
            <p className="text-muted-foreground mb-1" style={{ fontSize: "0.72rem" }}>{s.label}</p>
            <p className="text-accent" style={{ fontSize: "0.65rem" }}>{s.change}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>PARTIDAS POR MÊS</h3>
            <span className="text-accent flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
              <TrendingUp size={12} /> +18% vs ano anterior
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyMatches}>
              <XAxis dataKey="month" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="partidas" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>ATIVIDADE RECENTE</h3>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((a, i) => {
              const { icon, color } = typeIcon(a.type);
              return (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors">
                  <span className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center flex-shrink-0 text-sm`}>{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground" style={{ fontSize: "0.75rem", lineHeight: 1.4 }}>{a.text}</p>
                    <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.65rem" }}>{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>PRÓXIMOS JOGOS</h3>
          <button onClick={() => onNavigate("manage-matches")} className="flex items-center gap-1 text-primary" style={{ fontSize: "0.78rem" }}>
            Ver todos <ChevronRight size={13} />
          </button>
        </div>
        <div className="divide-y divide-border">
          {upcoming.map((m, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-center min-w-[70px]">
                  <p className="text-foreground" style={{ fontSize: "0.75rem" }}>{m.date}</p>
                  <p className="text-primary" style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{m.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-foreground text-right flex-1" style={{ fontSize: "0.88rem" }}>{m.home}</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-muted-foreground" style={{ fontSize: "0.68rem" }}>vs</span>
                  <span className="text-foreground flex-1" style={{ fontSize: "0.88rem" }}>{m.away}</span>
                </div>
              </div>
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{m.local}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
