import { useState } from "react";
import { Shield, Calendar, Clock, MapPin, Check, AlertTriangle, X } from "lucide-react";

interface RefereeAreaProps { onNavigate: (s: any) => void; }

const assignedMatches = [
  { id: 1, home: "Grêmio", away: "Internacional", date: "14/06/2025", time: "16:00", venue: "Arena do Grêmio", status: "Pendente", championship: "Copa FutCopa 2025", round: "Rodada 28" },
  { id: 2, home: "Athletico", away: "São Paulo FC", date: "15/06/2025", time: "19:00", venue: "Arena da Baixada", status: "Pendente", championship: "Copa FutCopa 2025", round: "Rodada 28" },
  { id: 3, home: "Flamengo FC", away: "Santos FC", date: "10/06/2025", time: "16:00", venue: "Maracanã", status: "Encerrado", championship: "Copa FutCopa 2025", round: "Rodada 27" },
  { id: 4, home: "Palmeiras SC", away: "Corinthians", date: "10/06/2025", time: "18:30", venue: "Allianz Parque", status: "Encerrado", championship: "Copa FutCopa 2025", round: "Rodada 27" },
];

const occurrences = [
  { match: "Flamengo FC 3×1 Santos FC", type: "Gol", player: "Rafael Moura (FLA)", min: "23'", detail: "Gol de cabeça após cruzamento" },
  { match: "Flamengo FC 3×1 Santos FC", type: "Amarelo", player: "Diego Lima (SAN)", min: "38'", detail: "Falta dura na entrada da área" },
  { match: "Flamengo FC 3×1 Santos FC", type: "Gol", player: "Lucas Vieira (FLA)", min: "55'", detail: "Finalização da entrada da área" },
  { match: "Palmeiras SC 2×0 Corinthians", type: "Vermelho", player: "Bruno Torres (COR)", min: "67'", detail: "Segundo amarelo — falta em contra-ataque" },
  { match: "Palmeiras SC 2×0 Corinthians", type: "Gol", player: "Paulo Boia (PAL)", min: "78'", detail: "Pênalti convertido" },
];

const typeIcon = (t: string) => {
  if (t === "Gol") return { bg: "bg-accent/20", text: "text-accent", icon: "⚽" };
  if (t === "Amarelo") return { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: "🟨" };
  if (t === "Vermelho") return { bg: "bg-destructive/20", text: "text-destructive", icon: "🟥" };
  return { bg: "bg-secondary", text: "text-muted-foreground", icon: "📌" };
};

export function RefereeArea({ onNavigate }: RefereeAreaProps) {
  const [activeMatch, setActiveMatch] = useState<number | null>(null);
  const [showOccurrence, setShowOccurrence] = useState(false);
  const [occurrence, setOccurrence] = useState({ type: "Gol", player: "", minute: "", detail: "" });
  const [result, setResult] = useState({ homeScore: "", awayScore: "" });
  const [tab, setTab] = useState<"assigned" | "occurrences">("assigned");

  const matchForOccurrence = assignedMatches.find(m => m.id === activeMatch);

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
          <Shield size={22} className="text-yellow-400" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>ÁREA DO ÁRBITRO</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Paulo Henrique da Silva • Árbitro FIFA</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Jogos Apitados", value: "47", color: "text-primary" },
          { label: "Esta Temporada", value: "12", color: "text-accent" },
          { label: "Cartões Emitidos", value: "89", color: "text-yellow-400" },
          { label: "Próximos Jogos", value: "2", color: "text-orange-400" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className={`${s.color}`} style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6">
        <button onClick={() => setTab("assigned")} className={`flex-1 py-2 rounded-lg transition-all ${tab === "assigned" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} style={{ fontSize: "0.82rem" }}>
          Jogos Designados
        </button>
        <button onClick={() => setTab("occurrences")} className={`flex-1 py-2 rounded-lg transition-all ${tab === "occurrences" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} style={{ fontSize: "0.82rem" }}>
          Ocorrências Registradas
        </button>
      </div>

      {tab === "assigned" && (
        <div className="space-y-4">
          {assignedMatches.map(m => (
            <div key={m.id} className={`bg-card border rounded-xl p-5 transition-all ${activeMatch === m.id ? "border-primary" : "border-border hover:border-primary/30"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{m.championship}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{m.round}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground" style={{ fontSize: "1.05rem" }}>{m.home}</span>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>vs</span>
                    <span className="text-foreground" style={{ fontSize: "1.05rem" }}>{m.away}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full ${m.status === "Encerrado" ? "bg-muted text-muted-foreground" : "bg-yellow-500/20 text-yellow-400"}`} style={{ fontSize: "0.65rem" }}>
                  {m.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Calendar size={11} /> {m.date}</span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Clock size={11} /> {m.time}</span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><MapPin size={11} /> {m.venue}</span>
              </div>

              {m.status === "Pendente" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveMatch(activeMatch === m.id ? null : m.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeMatch === m.id ? "bg-primary text-white" : "border border-primary text-primary hover:bg-primary/10"}`}
                    style={{ fontSize: "0.78rem" }}
                  >
                    {activeMatch === m.id ? <><Check size={13} /> Selecionado</> : "Gerenciar Partida"}
                  </button>
                  {activeMatch === m.id && (
                    <button onClick={() => setShowOccurrence(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.78rem" }}>
                      <AlertTriangle size={13} /> Registrar Ocorrência
                    </button>
                  )}
                </div>
              )}

              {/* Result Input for active match */}
              {activeMatch === m.id && m.status === "Pendente" && (
                <div className="mt-4 p-4 bg-secondary/50 rounded-xl border border-border">
                  <p className="text-muted-foreground mb-3" style={{ fontSize: "0.78rem" }}>RESULTADO FINAL</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 text-center">
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.7rem" }}>{m.home}</p>
                      <input type="number" min={0} value={result.homeScore} onChange={e => setResult({ ...result, homeScore: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-foreground text-center focus:outline-none focus:border-primary"
                        style={{ fontSize: "1.3rem", fontFamily: "var(--font-display)" }} placeholder="0" />
                    </div>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>×</span>
                    <div className="flex-1 text-center">
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.7rem" }}>{m.away}</p>
                      <input type="number" min={0} value={result.awayScore} onChange={e => setResult({ ...result, awayScore: e.target.value })}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-foreground text-center focus:outline-none focus:border-primary"
                        style={{ fontSize: "1.3rem", fontFamily: "var(--font-display)" }} placeholder="0" />
                    </div>
                    <button className="bg-accent hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2" style={{ fontSize: "0.78rem" }}>
                      <Check size={13} /> Encerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "occurrences" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                {["PARTIDA", "TIPO", "JOGADOR", "MIN", "DETALHE"].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {occurrences.map((o, i) => {
                const style = typeIcon(o.type);
                return (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.78rem" }}>{o.match}</td>
                    <td className="py-3 px-4">
                      <span className={`${style.bg} ${style.text} px-2 py-1 rounded-full flex items-center gap-1 w-fit`} style={{ fontSize: "0.65rem" }}>
                        {style.icon} {o.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground" style={{ fontSize: "0.82rem" }}>{o.player}</td>
                    <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{o.min}</td>
                    <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.78rem" }}>{o.detail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Occurrence Modal */}
      {showOccurrence && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>REGISTRAR OCORRÊNCIA</h2>
              <button onClick={() => setShowOccurrence(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>Tipo de Ocorrência</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Gol", "Amarelo", "Vermelho"].map(t => {
                    const s = typeIcon(t);
                    return (
                      <button key={t} onClick={() => setOccurrence({ ...occurrence, type: t })}
                        className={`border rounded-lg py-2 px-3 flex items-center gap-2 justify-center transition-all ${occurrence.type === t ? `border-current ${s.bg} ${s.text}` : "border-border text-muted-foreground hover:border-primary/40"}`}
                        style={{ fontSize: "0.78rem" }}>
                        <span>{s.icon}</span> {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              {[{ label: "Jogador", key: "player" as const, placeholder: "Nome do jogador (Equipe)" }, { label: "Minuto", key: "minute" as const, placeholder: "Ex: 45'" }, { label: "Detalhe", key: "detail" as const, placeholder: "Descrição da ocorrência" }].map(f => (
                <div key={f.key}>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                  <input value={occurrence[f.key]} onChange={e => setOccurrence({ ...occurrence, [f.key]: e.target.value })}
                    className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowOccurrence(false)} className="flex-1 border border-border text-muted-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
              <button onClick={() => setShowOccurrence(false)} className="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Registrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
