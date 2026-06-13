import { useState } from "react";
import { Trophy, Users, Calendar, BarChart2, FileText, ArrowLeft, MapPin, Clock, Star } from "lucide-react";

interface ChampionshipDetailsProps { onNavigate: (s: any) => void; }

const teams = [
  { name: "Flamengo FC", city: "Rio de Janeiro", wins: 7, draws: 1, losses: 1, pts: 22, gf: 24, ga: 8 },
  { name: "Palmeiras SC", city: "São Paulo", wins: 6, draws: 2, losses: 1, pts: 20, gf: 19, ga: 9 },
  { name: "Santos FC", city: "Santos", wins: 5, draws: 3, losses: 1, pts: 18, gf: 16, ga: 10 },
  { name: "Corinthians", city: "São Paulo", wins: 5, draws: 2, losses: 2, pts: 17, gf: 14, ga: 12 },
  { name: "São Paulo FC", city: "São Paulo", wins: 4, draws: 3, losses: 2, pts: 15, gf: 13, ga: 11 },
  { name: "Grêmio", city: "Porto Alegre", wins: 4, draws: 2, losses: 3, pts: 14, gf: 15, ga: 14 },
  { name: "Internacional", city: "Porto Alegre", wins: 3, draws: 4, losses: 2, pts: 13, gf: 12, ga: 12 },
  { name: "Athletico", city: "Curitiba", wins: 3, draws: 2, losses: 4, pts: 11, gf: 11, ga: 16 },
];

const matches = [
  { home: "Flamengo FC", away: "Santos FC", homeScore: 3, awayScore: 1, date: "10/06/2025", time: "16:00", local: "Maracanã, Rio de Janeiro", status: "Encerrado" },
  { home: "Palmeiras SC", away: "Corinthians", homeScore: 2, awayScore: 0, date: "10/06/2025", time: "18:30", local: "Allianz Parque, São Paulo", status: "Encerrado" },
  { home: "Grêmio", away: "Internacional", homeScore: null, awayScore: null, date: "14/06/2025", time: "16:00", local: "Arena do Grêmio, Porto Alegre", status: "Agendado" },
  { home: "Athletico", away: "São Paulo FC", homeScore: null, awayScore: null, date: "15/06/2025", time: "19:00", local: "Arena da Baixada, Curitiba", status: "Agendado" },
];

const tabs = [
  { id: "overview", label: "Visão Geral", icon: Trophy },
  { id: "teams", label: "Equipes", icon: Users },
  { id: "matches", label: "Jogos", icon: Calendar },
  { id: "standings", label: "Classificação", icon: BarChart2 },
  { id: "rules", label: "Regulamento", icon: FileText },
];

export function ChampionshipDetails({ onNavigate }: ChampionshipDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-4 lg:p-6">
      {/* Back & Header */}
      <button onClick={() => onNavigate("championships")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4" style={{ fontSize: "0.82rem" }}>
        <ArrowLeft size={15} /> Voltar para Campeonatos
      </button>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-6"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3560 60%, #0d2e0a 100%)", minHeight: 180 }}>
        <div className="p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <Trophy size={36} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 rounded-full" style={{ fontSize: "0.65rem" }}>Em andamento</span>
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>12ª Edição</span>
            </div>
            <h1 className="text-white mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>COPA FUTCOPA 2025</h1>
            <div className="flex flex-wrap gap-4 text-blue-200" style={{ fontSize: "0.78rem" }}>
              <span className="flex items-center gap-1"><Calendar size={12} /> 01/03/2025 — 30/08/2025</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> São Paulo, SP</span>
              <span className="flex items-center gap-1"><Users size={12} /> 16 equipes</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[{ label: "Fase", value: "Quartas" }, { label: "Partidas", value: "64" }, { label: "Gols", value: "187" }].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>{s.value}</p>
                <p className="text-blue-200" style={{ fontSize: "0.65rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${activeTab === t.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            style={{ fontSize: "0.82rem" }}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "Artilheiro", value: "Rafael Moura", sub: "14 gols" }, { label: "Melhor Defesa", value: "Flamengo FC", sub: "8 gols sofridos" }, { label: "Mais Cartões", value: "Athletico", sub: "24 cartões" }].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                  <p className="text-muted-foreground mb-1" style={{ fontSize: "0.68rem" }}>{s.label}</p>
                  <p className="text-foreground" style={{ fontSize: "0.88rem", fontWeight: 600 }}>{s.value}</p>
                  <p className="text-accent" style={{ fontSize: "0.72rem" }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Next Matches */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>PRÓXIMAS PARTIDAS</h3>
              </div>
              {matches.filter(m => m.status === "Agendado").map((m, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-foreground" style={{ fontSize: "0.88rem" }}>{m.home}</span>
                      <span className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>vs</span>
                      <span className="text-foreground" style={{ fontSize: "0.88rem" }}>{m.away}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-muted-foreground">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.68rem" }}><Calendar size={10} /> {m.date}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.68rem" }}><Clock size={10} /> {m.time}</span>
                      <span className="flex items-center gap-1" style={{ fontSize: "0.68rem" }}><MapPin size={10} /> {m.local}</span>
                    </div>
                  </div>
                  <span className="bg-secondary px-2 py-1 rounded text-muted-foreground" style={{ fontSize: "0.68rem" }}>Agendado</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Scorers Side */}
          <div className="bg-card border border-border rounded-xl overflow-hidden h-fit">
            <div className="px-4 py-3 border-b border-border">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>ARTILHEIROS</h3>
            </div>
            {[{ name: "Rafael Moura", team: "Flamengo FC", goals: 14 }, { name: "Lucas Alves", team: "Palmeiras SC", goals: 11 }, { name: "Diego Lima", team: "Santos FC", goals: 9 }].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
                <span className="text-muted-foreground w-5 text-center" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star size={12} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground" style={{ fontSize: "0.82rem" }}>{s.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{s.team}</p>
                </div>
                <span className="text-accent" style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.goals}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "teams" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map(t => (
            <div key={t.name} className="bg-card border border-border rounded-xl p-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary" style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700 }}>
                  {t.name.split(" ").map(w => w[0]).join("").slice(0, 3)}
                </span>
              </div>
              <h3 className="text-foreground text-center mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "0.92rem" }}>{t.name}</h3>
              <p className="text-muted-foreground text-center mb-3" style={{ fontSize: "0.68rem" }}>{t.city}</p>
              <div className="grid grid-cols-3 gap-1 text-center">
                {[{ label: "V", value: t.wins, color: "text-accent" }, { label: "E", value: t.draws, color: "text-yellow-400" }, { label: "D", value: t.losses, color: "text-destructive" }].map(s => (
                  <div key={s.label}>
                    <p className={s.color} style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.value}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "matches" && (
        <div className="space-y-3">
          {matches.map((m, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Calendar size={11} /> {m.date}</span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Clock size={11} /> {m.time}</span>
                  <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><MapPin size={11} /> {m.local}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full ${m.status === "Encerrado" ? "bg-muted text-muted-foreground" : "bg-yellow-500/20 text-yellow-400"}`} style={{ fontSize: "0.65rem" }}>
                  {m.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground flex-1 text-right" style={{ fontSize: "1rem" }}>{m.home}</span>
                <div className="mx-6 text-center">
                  {m.homeScore !== null ? (
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--foreground)" }}>
                      {m.homeScore} — {m.awayScore}
                    </span>
                  ) : (
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>vs</span>
                  )}
                </div>
                <span className="text-foreground flex-1" style={{ fontSize: "1rem" }}>{m.away}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "standings" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["#", "Equipe", "J", "V", "E", "D", "GP", "GC", "SG", "PTS"].map(h => (
                  <th key={h} className="text-muted-foreground text-center py-3 px-2" style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.sort((a, b) => b.pts - a.pts).map((t, i) => {
                const j = t.wins + t.draws + t.losses;
                return (
                  <tr key={t.name} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="text-center py-3 px-2">
                      <span className={`w-5 h-5 rounded flex items-center justify-center mx-auto ${i < 4 ? "bg-primary text-white" : "text-muted-foreground"}`} style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                    </td>
                    <td className="py-3 px-3 text-foreground" style={{ fontSize: "0.82rem" }}>{t.name}</td>
                    {[j, t.wins, t.draws, t.losses, t.gf, t.ga, t.gf - t.ga].map((v, vi) => (
                      <td key={vi} className="text-center py-3 px-2 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{v}</td>
                    ))}
                    <td className="text-center py-3 px-2 text-foreground" style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{t.pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "rules" && (
        <div className="max-w-3xl space-y-4">
          {[
            { title: "1. Formato do Campeonato", content: "O campeonato será disputado em fase de grupos seguida de eliminatórias. Na fase de grupos, cada equipe jogará contra todas as outras equipes do grupo, uma única vez." },
            { title: "2. Sistema de Pontuação", content: "Vitória: 3 pontos | Empate: 1 ponto | Derrota: 0 pontos. Em caso de empate nos pontos, os critérios de desempate seguem: Saldo de gols, Gols pró, Confronto direto." },
            { title: "3. Cartões e Suspensões", content: "3 cartões amarelos acumulados resultam em suspensão automática por 1 jogo. Cartão vermelho direto resulta em suspensão de 2 jogos, podendo ser ampliado a critério da Comissão Disciplinar." },
            { title: "4. Inscrição de Jogadores", content: "Cada equipe pode inscrever até 25 jogadores. O prazo de inscrição encerra 48 horas antes da primeira partida da equipe. Transferências são permitidas apenas na janela estabelecida." },
            { title: "5. Adiamentos e Cancelamentos", content: "Partidas só poderão ser adiadas com aviso mínimo de 72 horas e mediante aprovação da organização. Casos de força maior serão analisados individualmente." },
          ].map(rule => (
            <div key={rule.title} className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{rule.title}</h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>{rule.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
