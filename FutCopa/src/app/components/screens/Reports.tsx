import { useState } from "react";
import { FileText, Download, BarChart2, Users, Trophy, Star, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface ReportsProps { onNavigate: (s: any) => void; }

const teamReport = [
  { team: "Flamengo FC", j: 27, v: 18, e: 5, d: 4, gf: 62, gc: 28, pts: 59 },
  { team: "Palmeiras SC", j: 27, v: 16, e: 6, d: 5, gf: 54, gc: 31, pts: 54 },
  { team: "Santos FC", j: 27, v: 15, e: 5, d: 7, gf: 48, gc: 32, pts: 50 },
  { team: "Corinthians", j: 27, v: 14, e: 6, d: 7, gf: 45, gc: 36, pts: 48 },
  { team: "São Paulo FC", j: 27, v: 13, e: 6, d: 8, gf: 41, gc: 36, pts: 45 },
];

const scorerReport = [
  { name: "Rafael Moura", team: "Flamengo FC", goals: 14, assists: 5, games: 25 },
  { name: "Lucas Alves", team: "Palmeiras SC", goals: 11, assists: 8, games: 26 },
  { name: "Diego Lima", team: "Santos FC", goals: 9, assists: 3, games: 24 },
  { name: "Bruno Torres", team: "Corinthians", goals: 8, assists: 7, games: 27 },
  { name: "André Costa", team: "São Paulo FC", goals: 7, assists: 4, games: 22 },
];

const goalsData = [
  { round: "R23", goals: 18 }, { round: "R24", goals: 22 }, { round: "R25", goals: 15 },
  { round: "R26", goals: 28 }, { round: "R27", goals: 20 },
];

const reportTypes = [
  { id: "teams", label: "Equipes", icon: Users, desc: "Desempenho completo de todas as equipes" },
  { id: "players", label: "Jogadores", icon: Star, desc: "Estatísticas individuais dos jogadores" },
  { id: "matches", label: "Partidas", icon: Trophy, desc: "Histórico e resultados de todas as partidas" },
  { id: "scorers", label: "Artilheiros", icon: BarChart2, desc: "Ranking de gols e assistências" },
];

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

export function Reports({ onNavigate }: ReportsProps) {
  const [activeReport, setActiveReport] = useState("teams");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>RELATÓRIOS</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Copa FutCopa 2025 • Dados até 13/06/2025</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-accent hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
          style={{ fontSize: "0.82rem" }}
        >
          <Download size={15} />
          {downloading ? "Exportando..." : "Exportar PDF"}
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {reportTypes.map(r => (
          <button
            key={r.id}
            onClick={() => setActiveReport(r.id)}
            className={`bg-card border rounded-xl p-4 text-left transition-all ${activeReport === r.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${activeReport === r.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground"}`}>
              <r.icon size={18} />
            </div>
            <p className={`mb-1 ${activeReport === r.id ? "text-primary" : "text-foreground"}`} style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>{r.label}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{r.desc}</p>
          </button>
        ))}
      </div>

      {activeReport === "teams" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>GOLS POR EQUIPE (TOP 5)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={teamReport.map(t => ({ team: t.team.split(" ")[0], gols: t.gf }))}>
                <XAxis dataKey="team" stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="gols" name="Gols" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>RELATÓRIO POR EQUIPE</h3>
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Rodada 27 • 5 equipes</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    {["EQUIPE", "J", "V", "E", "D", "GP", "GC", "SG", "PTS"].map(h => (
                      <th key={h} className="py-3 px-4 text-muted-foreground text-left" style={{ fontSize: "0.68rem" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teamReport.map((t, i) => (
                    <tr key={t.team} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded flex items-center justify-center ${i === 0 ? "bg-accent text-white" : i < 4 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`} style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                          <span className="text-foreground" style={{ fontSize: "0.85rem" }}>{t.team}</span>
                        </div>
                      </td>
                      {[t.j, t.v, t.e, t.d, t.gf, t.gc, t.gf - t.gc].map((v, vi) => (
                        <td key={vi} className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{v > 0 && vi === 6 ? `+${v}` : v}</td>
                      ))}
                      <td className="py-3 px-4 text-foreground" style={{ fontSize: "0.88rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{t.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeReport === "scorers" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>GOLS POR RODADA</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={goalsData}>
                <XAxis dataKey="round" stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
                <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="goals" name="Gols" stroke="var(--accent)" strokeWidth={2} dot={{ fill: "var(--accent)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>RANKING DE ARTILHEIROS</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    {["#", "JOGADOR", "EQUIPE", "JOGOS", "GOLS", "ASSISTÊNCIAS", "MÉDIA"].map(h => (
                      <th key={h} className="py-3 px-4 text-muted-foreground text-left" style={{ fontSize: "0.68rem" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scorerReport.map((s, i) => (
                    <tr key={s.name} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : i === 2 ? "bg-amber-700 text-white" : "bg-secondary text-muted-foreground"}`} style={{ fontSize: "0.65rem" }}>{i + 1}</span>
                      </td>
                      <td className="py-3 px-4 text-foreground" style={{ fontSize: "0.85rem" }}>{s.name}</td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{s.team}</td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{s.games}</td>
                      <td className="py-3 px-4">
                        <span className="text-accent" style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.goals}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{s.assists}</td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{(s.goals / s.games).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {(activeReport === "players" || activeReport === "matches") && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <FileText size={40} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
            RELATÓRIO DE {activeReport === "players" ? "JOGADORES" : "PARTIDAS"}
          </h3>
          <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>
            {activeReport === "players" ? "1.248 jogadores" : "312 partidas"} registrados na plataforma
          </p>
          <button onClick={handleDownload} className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 mx-auto" style={{ fontSize: "0.85rem" }}>
            <Download size={15} /> Exportar Relatório Completo
          </button>
        </div>
      )}

      {/* PDF Export info */}
      <div className="mt-6 bg-secondary/50 border border-border rounded-xl p-4 flex items-start gap-3">
        <FileText size={18} className="text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-foreground" style={{ fontSize: "0.82rem", fontWeight: 600 }}>Exportação PDF</p>
          <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Os relatórios são gerados em PDF com o logo FutCopa e podem ser compartilhados com equipes, árbitros e patrocinadores. Inclui gráficos, tabelas e estatísticas completas.</p>
        </div>
      </div>
    </div>
  );
}
