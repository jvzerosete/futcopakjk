import { useState } from "react";
import { Plus, Edit2, Trash2, Search, X, Save, User } from "lucide-react";

interface ManagePlayersProps { onNavigate: (s: any) => void; }

const positions = ["Goleiro", "Zagueiro", "Lateral", "Volante", "Meia", "Atacante"];
const teams = ["Flamengo FC", "Palmeiras SC", "Santos FC", "Corinthians", "São Paulo FC", "Grêmio"];

const initialPlayers = [
  { id: 1, name: "Rafael Moura", age: 28, number: 9, position: "Atacante", team: "Flamengo FC", goals: 14, status: "Ativo" },
  { id: 2, name: "Lucas Alves", age: 25, number: 10, position: "Meia", team: "Palmeiras SC", goals: 11, status: "Ativo" },
  { id: 3, name: "Diego Lima", age: 30, number: 11, position: "Atacante", team: "Santos FC", goals: 9, status: "Ativo" },
  { id: 4, name: "Bruno Torres", age: 27, number: 8, position: "Meia", team: "Corinthians", goals: 8, status: "Ativo" },
  { id: 5, name: "André Costa", age: 26, number: 7, position: "Atacante", team: "São Paulo FC", goals: 7, status: "Suspenso" },
  { id: 6, name: "Carlos Souza", age: 24, number: 1, position: "Goleiro", team: "Grêmio", goals: 0, status: "Ativo" },
  { id: 7, name: "Pedro Santos", age: 22, number: 4, position: "Zagueiro", team: "Flamengo FC", goals: 2, status: "Lesionado" },
  { id: 8, name: "Marcos Vieira", age: 29, number: 6, position: "Lateral", team: "Grêmio", goals: 3, status: "Ativo" },
  { id: 9, name: "Felipe Neto", age: 23, number: 5, position: "Volante", team: "Santos FC", goals: 1, status: "Ativo" },
  { id: 10, name: "Gabriel Lima", age: 31, number: 3, position: "Zagueiro", team: "Corinthians", goals: 1, status: "Ativo" },
];

const posColor = (p: string) => {
  const m: Record<string, string> = {
    "Goleiro": "bg-yellow-500/20 text-yellow-400",
    "Zagueiro": "bg-blue-500/20 text-blue-400",
    "Lateral": "bg-cyan-500/20 text-cyan-400",
    "Volante": "bg-purple-500/20 text-purple-400",
    "Meia": "bg-primary/20 text-primary",
    "Atacante": "bg-accent/20 text-accent",
  };
  return m[p] || "bg-secondary text-muted-foreground";
};

const statusColor = (s: string) => s === "Ativo" ? "bg-accent/20 text-accent" : s === "Suspenso" ? "bg-yellow-500/20 text-yellow-400" : "bg-destructive/20 text-destructive";

export function ManagePlayers({ onNavigate }: ManagePlayersProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("Todas");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", age: "", number: "", position: "Atacante", team: "Flamengo FC" });

  const filtered = players.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase());
    const matchPos = posFilter === "Todas" || p.position === posFilter;
    return matchSearch && matchPos;
  });

  const handleEdit = (p: typeof initialPlayers[0]) => {
    setForm({ name: p.name, age: String(p.age), number: String(p.number), position: p.position, team: p.team });
    setEditId(p.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editId) {
      setPlayers(prev => prev.map(p => p.id === editId ? { ...p, name: form.name, age: Number(form.age), number: Number(form.number), position: form.position, team: form.team } : p));
    } else {
      setPlayers(prev => [...prev, { id: Date.now(), name: form.name, age: Number(form.age), number: Number(form.number), position: form.position, team: form.team, goals: 0, status: "Ativo" }]);
    }
    setShowForm(false);
    setEditId(null);
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>GESTÃO DE JOGADORES</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{players.length} jogadores cadastrados</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", age: "", number: "", position: "Atacante", team: "Flamengo FC" }); }}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          <Plus size={15} /> Novo Jogador
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{editId ? "EDITAR JOGADOR" : "NOVO JOGADOR"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            {/* Avatar */}
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <User size={32} className="text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Nome Completo</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Nome do jogador" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Idade</label>
                  <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Ex: 25" />
                </div>
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Número da Camisa</label>
                  <input type="number" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Ex: 9" />
                </div>
              </div>
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Posição</label>
                <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }}>
                  {positions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Equipe</label>
                <select value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }}>
                  {teams.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
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

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Buscar jogador ou equipe..." />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {["Todas", ...positions].map(p => (
            <button key={p} onClick={() => setPosFilter(p)} className={`px-3 py-2 rounded-lg border whitespace-nowrap transition-colors ${posFilter === p ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`} style={{ fontSize: "0.75rem" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                {["JOGADOR", "Nº", "POSIÇÃO", "EQUIPE", "GOLS", "STATUS", "AÇÕES"].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground" style={{ fontSize: "0.85rem" }}>{p.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{p.age} anos</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-secondary w-7 h-7 rounded flex items-center justify-center text-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                      {p.number}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full ${posColor(p.position)}`} style={{ fontSize: "0.65rem" }}>{p.position}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{p.team}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-accent" style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{p.goals}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full ${statusColor(p.status)}`} style={{ fontSize: "0.65rem" }}>{p.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => setPlayers(prev => prev.filter(pl => pl.id !== p.id))} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
