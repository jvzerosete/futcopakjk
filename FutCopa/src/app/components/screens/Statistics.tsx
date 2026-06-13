import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface StatisticsProps { onNavigate: (s: any) => void; }

const scorers = [
  { name: "Rafael Moura", team: "Flamengo FC", goals: 14, assists: 5, games: 25 },
  { name: "Lucas Alves", team: "Palmeiras SC", goals: 11, assists: 8, games: 26 },
  { name: "Diego Lima", team: "Santos FC", goals: 9, assists: 3, games: 24 },
  { name: "Bruno Torres", team: "Corinthians", goals: 8, assists: 7, games: 27 },
  { name: "André Costa", team: "São Paulo FC", goals: 7, assists: 4, games: 22 },
  { name: "Marcos Vieira", team: "Grêmio", goals: 7, assists: 2, games: 25 },
  { name: "Felipe Souza", team: "Internacional", goals: 6, assists: 6, games: 26 },
  { name: "Gabriel Neto", team: "Athletico", goals: 6, assists: 1, games: 24 },
];

const teamGoals = [
  { team: "Flamengo", gf: 62, gc: 28 },
  { team: "Palmeiras", gf: 54, gc: 31 },
  { team: "Santos", gf: 48, gc: 32 },
  { team: "Corinthians", gf: 45, gc: 36 },
  { team: "São Paulo", gf: 41, gc: 36 },
  { team: "Grêmio", gf: 42, gc: 38 },
];

const goalsPerRound = [
  { round: "R1", goals: 18 }, { round: "R2", goals: 22 }, { round: "R3", goals: 15 },
  { round: "R4", goals: 28 }, { round: "R5", goals: 20 }, { round: "R6", goals: 24 },
  { round: "R7", goals: 19 }, { round: "R8", goals: 26 }, { round: "R9", goals: 31 },
];

const cardsPie = [
  { name: "Amarelos", value: 284, color: "#f59e0b" },
  { name: "Vermelhos", value: 23, color: "#ef4444" },
];

const tabs = ["Artilheiros", "Assistências", "Cartões", "Equipes", "Gráficos"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-foreground mb-1" style={{ fontSize: "0.78rem" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color, fontSize: "0.72rem" }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function Statistics({ onNavigate }: StatisticsProps) {
  const [tab, setTab] = useState("Artilheiros");

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>ESTATÍSTICAS</h1>
        <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Copa FutCopa 2025 • Dados até 13/06/2025</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total de Gols", value: "487", sub: "+12 esta rodada", color: "text-accent" },
          { label: "Média por Jogo", value: "2.7", sub: "gols por partida", color: "text-primary" },
          { label: "Cartões Amarelos", value: "284", sub: "no campeonato", color: "text-yellow-400" },
          { label: "Cartões Vermelhos", value: "23", sub: "no campeonato", color: "text-destructive" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className={`${s.color}`} style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", lineHeight: 1 }}>{s.value}</p>
            <p className="text-foreground mt-1" style={{ fontSize: "0.78rem" }}>{s.label}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${tab === t ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            style={{ fontSize: "0.82rem" }}
          >
            {t}
          </button>
        ))}
      </div>

      {(tab === "Artilheiros" || tab === "Assistências") && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>#</th>
                <th className="text-left py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>JOGADOR</th>
                <th className="text-left py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>EQUIPE</th>
                <th className="text-center py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>JOGOS</th>
                <th className="text-center py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{tab === "Artilheiros" ? "GOLS" : "ASSIST."}</th>
                <th className="text-center py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>MÉDIA</th>
              </tr>
            </thead>
            <tbody>
              {scorers.sort((a, b) => tab === "Artilheiros" ? b.goals - a.goals : b.assists - a.assists).map((s, i) => {
                const stat = tab === "Artilheiros" ? s.goals : s.assists;
                const avg = (stat / s.games).toFixed(2);
                return (
                  <tr key={s.name} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-amber-700 text-white" : "bg-secondary text-muted-foreground"}`}
                        style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary" style={{ fontSize: "0.55rem", fontWeight: 700 }}>
                            {s.name.split(" ").map(w => w[0]).join("")}
                          </span>
                        </div>
                        <span className="text-foreground" style={{ fontSize: "0.85rem" }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{s.team}</td>
                    <td className="text-center py-3 px-3 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{s.games}</td>
                    <td className="text-center py-3 px-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-foreground" style={{ fontSize: "0.95rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{stat}</span>
                        <div className="bg-accent/10 rounded-full h-1.5 w-20 overflow-hidden">
                          <div className="bg-accent h-full rounded-full" style={{ width: `${(stat / 14) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-3 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{avg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Cartões" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>DISTRIBUIÇÃO DE CARTÕES</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={cardsPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {cardsPie.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              {cardsPie.map(c => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: c.color }} />
                  <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{c.name}: <strong className="text-foreground">{c.value}</strong></span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>EQUIPES MAIS INDISCIPLINADAS</h3>
            </div>
            {[
              { team: "Athletico", yellow: 38, red: 5 },
              { team: "Corinthians", yellow: 35, red: 4 },
              { team: "Botafogo", yellow: 30, red: 3 },
              { team: "Grêmio", yellow: 28, red: 2 },
              { team: "Vasco", yellow: 27, red: 3 },
            ].map((t, i) => (
              <div key={t.team} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground w-4 text-center" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                  <span className="text-foreground" style={{ fontSize: "0.85rem" }}>{t.team}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{t.yellow} 🟨</span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{t.red} 🟥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "Equipes" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  {["EQUIPE", "JOGOS", "GOLS MARCADOS", "GOLS SOFRIDOS", "SALDO", "% VITÓRIAS"].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamGoals.map((t, i) => (
                  <tr key={t.team} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-foreground" style={{ fontSize: "0.85rem" }}>{t.team}</td>
                    <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>27</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-accent" style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{t.gf}</span>
                        <div className="bg-accent/10 rounded-full h-1.5 w-16 overflow-hidden">
                          <div className="bg-accent h-full rounded-full" style={{ width: `${(t.gf / 62) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-destructive" style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{t.gc}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`${(t.gf - t.gc) > 0 ? "text-accent" : "text-destructive"}`} style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                        {t.gf - t.gc > 0 ? "+" : ""}{t.gf - t.gc}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-primary" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{Math.round(60 - i * 5)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "Gráficos" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>GOLS POR RODADA</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={goalsPerRound}>
                <XAxis dataKey="round" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="goals" name="Gols" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>GOLS POR EQUIPE</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={teamGoals} layout="vertical">
                <XAxis type="number" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="team" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} width={65} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gf" name="Gols Pró" fill="var(--primary)" radius={[0, 3, 3, 0]} />
                <Bar dataKey="gc" name="Gols Contra" fill="var(--destructive)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
