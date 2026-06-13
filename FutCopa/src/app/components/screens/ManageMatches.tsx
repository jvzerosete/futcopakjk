import { useState } from "react";
import { Plus, Edit2, Calendar, MapPin, Clock, X, Save, Check } from "lucide-react";

interface ManageMatchesProps { onNavigate: (s: any) => void; }

const initialMatches = [
  { id: 1, home: "Flamengo FC", away: "Santos FC", homeScore: 3, awayScore: 1, date: "10/06/2025", time: "16:00", venue: "Maracanã, Rio de Janeiro", status: "Encerrado", referee: "Paulo Henrique", round: "Rodada 27" },
  { id: 2, home: "Palmeiras SC", away: "Corinthians", homeScore: 2, awayScore: 0, date: "10/06/2025", time: "18:30", venue: "Allianz Parque, São Paulo", status: "Encerrado", referee: "Marcos Silva", round: "Rodada 27" },
  { id: 3, home: "Grêmio", away: "Internacional", homeScore: null, awayScore: null, date: "14/06/2025", time: "16:00", venue: "Arena do Grêmio, Porto Alegre", status: "Agendado", referee: "Carlos Bezerra", round: "Rodada 28" },
  { id: 4, home: "Athletico", away: "São Paulo FC", homeScore: null, awayScore: null, date: "15/06/2025", time: "19:00", venue: "Arena da Baixada, Curitiba", status: "Agendado", referee: "José Martins", round: "Rodada 28" },
  { id: 5, home: "Botafogo", away: "Vasco", homeScore: null, awayScore: null, date: "16/06/2025", time: "20:00", venue: "Nilton Santos, Rio de Janeiro", status: "Agendado", referee: "A confirmar", round: "Rodada 28" },
];

const statusColor = (s: string) => s === "Encerrado" ? "bg-muted text-muted-foreground" : s === "Agendado" ? "bg-yellow-500/20 text-yellow-400" : "bg-accent/20 text-accent";

export function ManageMatches({ onNavigate }: ManageMatchesProps) {
  const [matches, setMatches] = useState(initialMatches);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [resultId, setResultId] = useState<number | null>(null);
  const [form, setForm] = useState({ home: "", away: "", date: "", time: "", venue: "", referee: "", round: "" });
  const [result, setResult] = useState({ homeScore: "", awayScore: "" });
  const [filter, setFilter] = useState("Todos");

  const filtered = matches.filter(m => filter === "Todos" || m.status === filter);

  const handleSave = () => {
    if (editId) {
      setMatches(prev => prev.map(m => m.id === editId ? { ...m, ...form } : m));
    } else {
      setMatches(prev => [...prev, { id: Date.now(), ...form, homeScore: null, awayScore: null, status: "Agendado" }]);
    }
    setShowForm(false);
    setEditId(null);
  };

  const handleResult = () => {
    if (resultId) {
      setMatches(prev => prev.map(m => m.id === resultId ? { ...m, homeScore: Number(result.homeScore), awayScore: Number(result.awayScore), status: "Encerrado" } : m));
      setResultId(null);
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>GESTÃO DE PARTIDAS</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{matches.length} partidas cadastradas</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ home: "", away: "", date: "", time: "", venue: "", referee: "", round: "" }); }}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          <Plus size={15} /> Nova Partida
        </button>
      </div>

      {/* New/Edit Match Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{editId ? "EDITAR PARTIDA" : "NOVA PARTIDA"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Equipe Mandante", key: "home" as const, placeholder: "Flamengo FC" }, { label: "Equipe Visitante", key: "away" as const, placeholder: "Santos FC" }].map(f => (
                  <div key={f.key}>
                    <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                    <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder={f.placeholder} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Data</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                </div>
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Horário</label>
                  <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                </div>
              </div>
              {[{ label: "Local / Estádio", key: "venue" as const, placeholder: "Maracanã, Rio de Janeiro" }, { label: "Árbitro", key: "referee" as const, placeholder: "Nome do árbitro" }, { label: "Rodada", key: "round" as const, placeholder: "Rodada 28" }].map(f => (
                <div key={f.key}>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder={f.placeholder} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-muted-foreground hover:text-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
              <button onClick={handleSave} className="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2" style={{ fontSize: "0.85rem" }}>
                <Save size={15} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {resultId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>REGISTRAR RESULTADO</h2>
              <button onClick={() => setResultId(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            {(() => {
              const m = matches.find(x => x.id === resultId);
              if (!m) return null;
              return (
                <>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex-1 text-center">
                      <p className="text-foreground mb-2" style={{ fontSize: "0.85rem" }}>{m.home}</p>
                      <input type="number" min={0} value={result.homeScore} onChange={e => setResult({ ...result, homeScore: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-3 text-foreground text-center focus:outline-none focus:border-primary" style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)" }} placeholder="0" />
                    </div>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>×</span>
                    <div className="flex-1 text-center">
                      <p className="text-foreground mb-2" style={{ fontSize: "0.85rem" }}>{m.away}</p>
                      <input type="number" min={0} value={result.awayScore} onChange={e => setResult({ ...result, awayScore: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-3 text-foreground text-center focus:outline-none focus:border-primary" style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)" }} placeholder="0" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setResultId(null)} className="flex-1 border border-border text-muted-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
                    <button onClick={handleResult} className="flex-1 bg-accent hover:bg-green-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2" style={{ fontSize: "0.85rem" }}>
                      <Check size={15} /> Confirmar
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {["Todos", "Agendado", "Encerrado"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg border transition-colors ${filter === f ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`} style={{ fontSize: "0.82rem" }}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(m => (
          <div key={m.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{m.round}</span>
                <span className={`px-2 py-0.5 rounded-full ${statusColor(m.status)}`} style={{ fontSize: "0.65rem" }}>{m.status}</span>
              </div>
              <div className="flex items-center gap-2">
                {m.status === "Agendado" && (
                  <button onClick={() => { setResultId(m.id); setResult({ homeScore: "", awayScore: "" }); }} className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1" style={{ fontSize: "0.72rem" }}>
                    <Check size={12} /> Resultado
                  </button>
                )}
                <button onClick={() => { setEditId(m.id); setForm({ home: m.home, away: m.away, date: m.date, time: m.time, venue: m.venue, referee: m.referee, round: m.round }); setShowForm(true); }} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                  <Edit2 size={14} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground flex-1 text-right" style={{ fontSize: "1rem" }}>{m.home}</span>
              <div className="mx-6 text-center min-w-[80px]">
                {m.homeScore !== null ? (
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--foreground)", fontWeight: 700 }}>
                    {m.homeScore} — {m.awayScore}
                  </span>
                ) : (
                  <div>
                    <span className="text-muted-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>vs</span>
                  </div>
                )}
              </div>
              <span className="text-foreground flex-1" style={{ fontSize: "1rem" }}>{m.away}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Calendar size={11} /> {m.date}</span>
              <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><Clock size={11} /> {m.time}</span>
              <span className="flex items-center gap-1" style={{ fontSize: "0.72rem" }}><MapPin size={11} /> {m.venue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
