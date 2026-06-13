import { useState } from "react";
import { Trophy, Calendar, BarChart2, Star, Clock, MapPin, Heart } from "lucide-react";

interface FanAreaProps { onNavigate: (s: any) => void; }

const matches = [
  { home: "Flamengo FC", away: "Santos FC", homeScore: 2, awayScore: 1, time: "78'", live: true, competition: "Copa FutCopa", date: "" },
  { home: "Grêmio", away: "Internacional", homeScore: null, awayScore: null, time: "16:00", live: false, competition: "Copa FutCopa", date: "14/06" },
  { home: "Athletico", away: "São Paulo FC", homeScore: null, awayScore: null, time: "19:00", live: false, competition: "Copa FutCopa", date: "15/06" },
];

const results = [
  { home: "Palmeiras SC", away: "Corinthians", homeScore: 2, awayScore: 0, date: "10/06", competition: "Copa FutCopa" },
  { home: "Botafogo", away: "Vasco", homeScore: 3, awayScore: 1, date: "08/06", competition: "Liga Municipal" },
  { home: "Bahia", away: "Ceará", homeScore: 1, awayScore: 1, date: "07/06", competition: "Copa FutCopa" },
];

const standings = [
  { pos: 1, team: "Flamengo FC", pts: 59, form: ["W","W","W","D","W"] },
  { pos: 2, team: "Palmeiras SC", pts: 54, form: ["W","W","D","W","L"] },
  { pos: 3, team: "Santos FC", pts: 50, form: ["D","W","W","L","W"] },
  { pos: 4, team: "Corinthians", pts: 48, form: ["L","D","W","W","D"] },
  { pos: 5, team: "São Paulo FC", pts: 45, form: ["W","L","D","D","W"] },
];

const scorers = [
  { name: "Rafael Moura", team: "Flamengo FC", goals: 14 },
  { name: "Lucas Alves", team: "Palmeiras SC", goals: 11 },
  { name: "Diego Lima", team: "Santos FC", goals: 9 },
  { name: "Bruno Torres", team: "Corinthians", goals: 8 },
];

const formColor = (r: string) => r === "W" ? "bg-accent" : r === "D" ? "bg-yellow-500" : "bg-destructive";
const tabs = ["Jogos", "Resultados", "Classificação", "Estatísticas"];

const favoriteTeams = ["Flamengo FC", "Santos FC"];

export function FanArea({ onNavigate }: FanAreaProps) {
  const [tab, setTab] = useState("Jogos");
  const [favs, setFavs] = useState(favoriteTeams);

  const toggleFav = (team: string) => {
    setFavs(prev => prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]);
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-6"
        style={{ background: "linear-gradient(135deg, #0a1628 0%, #1d3d6b 40%, #0e3d1a 100%)", minHeight: 140 }}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={16} className="text-red-400" />
            <span className="text-blue-200" style={{ fontSize: "0.78rem" }}>Área do Torcedor</span>
          </div>
          <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>BEM-VINDO, TORCEDOR!</h1>
          <p className="text-blue-200" style={{ fontSize: "0.85rem" }}>Acompanhe tudo sobre seus times favoritos</p>
          <div className="flex gap-2 mt-4">
            {favs.map(t => (
              <span key={t} className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5" style={{ fontSize: "0.72rem" }}>
                <Heart size={10} className="text-red-400 fill-red-400" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg whitespace-nowrap transition-all ${tab === t ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} style={{ fontSize: "0.82rem" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Jogos" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400" style={{ fontSize: "0.78rem" }}>{matches.filter(m => m.live).length} partidas ao vivo</span>
          </div>
          {matches.map((m, i) => (
            <div key={i} className={`bg-card border rounded-xl p-4 ${m.live ? "border-red-500/30 bg-red-500/5" : "border-border"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{m.competition}</span>
                {m.live ? (
                  <span className="flex items-center gap-1 text-red-400" style={{ fontSize: "0.72rem" }}>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> {m.time}
                  </span>
                ) : (
                  <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                    {m.date} • {m.time}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span className={`${favs.includes(m.home) ? "text-accent" : "text-foreground"}`} style={{ fontSize: "1rem", fontWeight: favs.includes(m.home) ? 700 : 400 }}>{m.home}</span>
                  <button onClick={() => toggleFav(m.home)} className={`${favs.includes(m.home) ? "text-red-400" : "text-muted-foreground"} hover:text-red-400 transition-colors`}>
                    <Heart size={13} className={favs.includes(m.home) ? "fill-red-400" : ""} />
                  </button>
                </div>
                <div className="mx-5 text-center min-w-[70px]">
                  {m.homeScore !== null ? (
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--foreground)" }}>{m.homeScore} - {m.awayScore}</span>
                  ) : (
                    <span className="bg-secondary px-3 py-1 rounded text-muted-foreground" style={{ fontSize: "0.75rem" }}>vs</span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <button onClick={() => toggleFav(m.away)} className={`${favs.includes(m.away) ? "text-red-400" : "text-muted-foreground"} hover:text-red-400 transition-colors`}>
                    <Heart size={13} className={favs.includes(m.away) ? "fill-red-400" : ""} />
                  </button>
                  <span className={`${favs.includes(m.away) ? "text-accent" : "text-foreground"}`} style={{ fontSize: "1rem", fontWeight: favs.includes(m.away) ? 700 : 400 }}>{m.away}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Resultados" && (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{r.competition}</span>
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{r.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground flex-1 text-right" style={{ fontSize: "1rem" }}>{r.home}</span>
                <div className="mx-6 text-center min-w-[80px]">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--foreground)" }}>{r.homeScore} - {r.awayScore}</span>
                </div>
                <span className="text-foreground flex-1" style={{ fontSize: "1rem" }}>{r.away}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Classificação" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {standings.map((s, i) => (
            <div key={s.pos} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
              <span className={`w-7 h-7 rounded flex items-center justify-center ${s.pos === 1 ? "bg-accent text-white" : s.pos <= 4 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`} style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)" }}>{s.pos}</span>
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                <span className="text-primary" style={{ fontSize: "0.5rem", fontWeight: 700 }}>{s.team.split(" ").map(w => w[0]).join("").slice(0, 3)}</span>
              </div>
              <span className={`flex-1 ${favs.includes(s.team) ? "text-accent" : "text-foreground"}`} style={{ fontSize: "0.88rem", fontWeight: favs.includes(s.team) ? 700 : 400 }}>{s.team}</span>
              <div className="flex gap-0.5">
                {s.form.map((f, fi) => (
                  <span key={fi} className={`w-4 h-4 rounded-sm ${formColor(f)} flex items-center justify-center text-white`} style={{ fontSize: "0.5rem" }}>{f}</span>
                ))}
              </div>
              <span className="text-foreground w-8 text-right" style={{ fontSize: "0.88rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.pts}</span>
              {favs.includes(s.team) && <Heart size={12} className="text-red-400 fill-red-400" />}
            </div>
          ))}
        </div>
      )}

      {tab === "Estatísticas" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>🏆 ARTILHEIROS DA COPA</h3>
            </div>
            {scorers.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
                <span className={`w-6 h-6 rounded flex items-center justify-center ${i === 0 ? "bg-yellow-500 text-white" : "bg-secondary text-muted-foreground"}`} style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                <div className="flex-1">
                  <p className="text-foreground" style={{ fontSize: "0.85rem" }}>{s.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{s.team}</p>
                </div>
                <div className="bg-accent/20 px-3 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-accent" style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.goals}</span>
                  <span style={{ fontSize: "0.8rem" }}>⚽</span>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => onNavigate("statistics")} className="w-full bg-card border border-border rounded-xl p-4 text-center hover:border-primary/40 transition-colors">
            <Star size={20} className="text-primary mx-auto mb-2" />
            <p className="text-foreground" style={{ fontSize: "0.88rem" }}>Ver estatísticas completas</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>Gráficos, cartões, equipes e mais</p>
          </button>
        </div>
      )}
    </div>
  );
}
