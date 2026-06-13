import { Trophy, ChevronRight, Clock, MapPin, Star, TrendingUp, Zap } from "lucide-react";

interface HomeProps { onNavigate: (s: any) => void; }

const matches = [
  { home: "Flamengo FC", away: "Palmeiras SC", homeScore: 2, awayScore: 1, time: "90+3'", live: true, competition: "Copa FutCopa" },
  { home: "Santos FC", away: "Corinthians", homeScore: 0, awayScore: 0, time: "34'", live: true, competition: "Liga Municipal" },
  { home: "São Paulo FC", away: "Grêmio", homeScore: null, awayScore: null, time: "15:00", date: "14/06", live: false, competition: "Copa FutCopa" },
  { home: "Athletico", away: "Internacional", homeScore: null, awayScore: null, time: "17:30", date: "14/06", live: false, competition: "Liga Municipal" },
];

const results = [
  { home: "Botafogo", away: "Vasco", homeScore: 3, awayScore: 0, date: "12/06" },
  { home: "Cruzeiro", away: "Atlético MG", homeScore: 1, awayScore: 2, date: "12/06" },
  { home: "Bahia", away: "Ceará", homeScore: 2, awayScore: 2, date: "11/06" },
  { home: "Fortaleza", away: "Sport", homeScore: 1, awayScore: 0, date: "11/06" },
];

const standings = [
  { pos: 1, team: "Flamengo FC", pts: 28, gd: 18, form: ["W","W","W","D","W"] },
  { pos: 2, team: "Palmeiras SC", pts: 25, gd: 14, form: ["W","W","D","W","L"] },
  { pos: 3, team: "Santos FC", pts: 22, gd: 9, form: ["D","W","W","L","W"] },
  { pos: 4, team: "Corinthians", pts: 19, gd: 3, form: ["L","D","W","W","D"] },
  { pos: 5, team: "São Paulo FC", pts: 17, gd: 1, form: ["W","L","D","D","W"] },
];

const scorers = [
  { name: "Rafael Moura", team: "Flamengo FC", goals: 14, photo: "RM" },
  { name: "Lucas Alves", team: "Palmeiras SC", goals: 11, photo: "LA" },
  { name: "Diego Lima", team: "Santos FC", goals: 9, photo: "DL" },
  { name: "Bruno Torres", team: "Corinthians", goals: 8, photo: "BT" },
  { name: "André Costa", team: "São Paulo FC", goals: 7, photo: "AC" },
];

const championships = [
  { name: "Copa FutCopa 2025", teams: 16, status: "Em andamento", phase: "Quartas de Final", color: "bg-primary" },
  { name: "Liga Municipal", teams: 12, status: "Em andamento", phase: "Fase de Grupos", color: "bg-accent" },
  { name: "Torneio Início", teams: 8, status: "Inscrições abertas", phase: "Pré-temporada", color: "bg-yellow-500" },
];

const sponsors = ["SportBet", "NutriSport", "AutoCar", "BeerPro", "TechFit", "MegaCom"];

const formColor = (r: string) => r === "W" ? "bg-accent" : r === "D" ? "bg-yellow-500" : "bg-destructive";

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1d3d6b 50%, #0e4d1f 100%)", minHeight: 220 }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=400&fit=crop&auto=format')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent/20 text-accent border border-accent/30 px-2.5 py-1 rounded-full" style={{ fontSize: "0.7rem", fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
                ⚽ AO VIVO AGORA
              </span>
            </div>
            <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", lineHeight: 1.1 }}>
              COPA FUTCOPA 2025
            </h1>
            <p className="text-blue-200 mb-4" style={{ fontSize: "0.9rem" }}>Quartas de Final • 8 partidas esta semana</p>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigate("championship-details")}
                className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-colors"
                style={{ fontSize: "0.85rem" }}
              >
                Ver Campeonato
              </button>
              <button
                onClick={() => onNavigate("standings")}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg transition-colors border border-white/20"
                style={{ fontSize: "0.85rem" }}
              >
                Classificação
              </button>
            </div>
          </div>
          {/* Live Score Feature */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-white/10 min-w-[260px]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400" style={{ fontSize: "0.72rem", fontFamily: "var(--font-display)" }}>AO VIVO</span>
              <span className="text-muted-foreground ml-auto" style={{ fontSize: "0.7rem" }}>90+3'</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold" style={{ fontSize: "0.7rem" }}>FLA</span>
                </div>
                <p className="text-white" style={{ fontSize: "0.72rem" }}>Flamengo</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>2</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>1</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-1">
                  <span className="text-white font-bold" style={{ fontSize: "0.7rem" }}>PAL</span>
                </div>
                <p className="text-white" style={{ fontSize: "0.72rem" }}>Palmeiras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Championships Highlight */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--foreground)" }}>CAMPEONATOS EM DESTAQUE</h2>
          <button onClick={() => onNavigate("championships")} className="flex items-center gap-1 text-primary hover:text-blue-400 transition-colors" style={{ fontSize: "0.8rem" }}>
            Ver todos <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {championships.map((c) => (
            <button
              key={c.name}
              onClick={() => onNavigate("championship-details")}
              className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
                <Trophy size={16} className="text-white" />
              </div>
              <p className="text-foreground mb-1" style={{ fontSize: "0.85rem", fontFamily: "var(--font-display)" }}>{c.name}</p>
              <p className="text-muted-foreground mb-2" style={{ fontSize: "0.72rem" }}>{c.phase} • {c.teams} equipes</p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                c.status === "Em andamento" ? "bg-accent/20 text-accent" : "bg-yellow-500/20 text-yellow-400"
              }`} style={{ fontSize: "0.65rem" }}>{c.status}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live / Next Matches */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>PRÓXIMAS PARTIDAS</h2>
              <span className="flex items-center gap-1 text-accent" style={{ fontSize: "0.72rem" }}>
                <Zap size={12} /> {matches.filter(m => m.live).length} ao vivo
              </span>
            </div>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer" onClick={() => onNavigate("championship-details")}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{m.competition}</span>
                    {m.live ? (
                      <span className="flex items-center gap-1 text-red-400" style={{ fontSize: "0.68rem" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> {m.time}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground" style={{ fontSize: "0.68rem" }}>
                        <Clock size={10} /> {m.date} {m.time}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground flex-1 text-right" style={{ fontSize: "0.88rem" }}>{m.home}</span>
                    <div className="mx-4 flex items-center gap-2 min-w-[70px] justify-center">
                      {m.live ? (
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--foreground)" }}>
                          {m.homeScore} - {m.awayScore}
                        </span>
                      ) : (
                        <span className="bg-secondary px-3 py-1 rounded text-muted-foreground" style={{ fontSize: "0.75rem" }}>vs</span>
                      )}
                    </div>
                    <span className="text-foreground flex-1" style={{ fontSize: "0.88rem" }}>{m.away}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Results */}
          <section>
            <h2 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>ÚLTIMOS RESULTADOS</h2>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground flex-1 text-right" style={{ fontSize: "0.88rem" }}>{r.home}</span>
                    <div className="mx-4 text-center min-w-[70px]">
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--foreground)" }}>
                        {r.homeScore} - {r.awayScore}
                      </span>
                      <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>{r.date}</p>
                    </div>
                    <span className="text-foreground flex-1" style={{ fontSize: "0.88rem" }}>{r.away}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Standings Mini */}
          <section className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>CLASSIFICAÇÃO</h2>
              <button onClick={() => onNavigate("standings")} className="text-primary" style={{ fontSize: "0.72rem" }}>Ver completo</button>
            </div>
            <div className="p-2">
              {standings.map((s) => (
                <div key={s.pos} className={`flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-secondary transition-colors ${s.pos <= 4 ? "" : ""}`}>
                  <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${s.pos === 1 ? "bg-accent text-white" : s.pos <= 4 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}
                    style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>
                    {s.pos}
                  </span>
                  <span className="flex-1 text-foreground truncate" style={{ fontSize: "0.78rem" }}>{s.team}</span>
                  <div className="flex gap-0.5">
                    {s.form.map((f, fi) => (
                      <span key={fi} className={`w-4 h-4 rounded-sm ${formColor(f)} flex items-center justify-center text-white`} style={{ fontSize: "0.52rem" }}>{f}</span>
                    ))}
                  </div>
                  <span className="text-foreground ml-1" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: "1.5rem", textAlign: "right" }}>{s.pts}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Scorers */}
          <section className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>ARTILHEIROS</h2>
              <button onClick={() => onNavigate("statistics")} className="text-primary" style={{ fontSize: "0.72rem" }}>Ver mais</button>
            </div>
            <div className="p-2">
              {scorers.map((s, i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary transition-colors">
                  <span className="text-muted-foreground w-4 text-center" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary" style={{ fontSize: "0.55rem", fontWeight: 700 }}>{s.photo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground truncate" style={{ fontSize: "0.78rem" }}>{s.name}</p>
                    <p className="text-muted-foreground truncate" style={{ fontSize: "0.65rem" }}>{s.team}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-accent/20 px-2 py-0.5 rounded">
                    <span className="text-accent" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{s.goals}</span>
                    <span className="text-accent" style={{ fontSize: "0.6rem" }}>⚽</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sponsors */}
          <section className="bg-card border border-border rounded-xl p-4">
            <h2 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>PATROCINADORES</h2>
            <div className="grid grid-cols-3 gap-2">
              {sponsors.map((s) => (
                <div key={s} className="bg-secondary rounded-lg py-2 px-1 flex items-center justify-center">
                  <span className="text-muted-foreground" style={{ fontSize: "0.65rem", fontWeight: 600 }}>{s}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
