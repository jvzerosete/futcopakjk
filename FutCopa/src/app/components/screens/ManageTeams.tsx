import { useState } from "react";
import { Plus, Edit2, Trash2, Search, X, Save, Users } from "lucide-react";

interface ManageTeamsProps { onNavigate: (s: any) => void; }

const initialTeams = [
  { id: 1, name: "Flamengo FC", city: "Rio de Janeiro", coach: "Paulo Sousa", players: 25, founded: "1895", championship: "Copa FutCopa 2025", color: "#e11d48" },
  { id: 2, name: "Palmeiras SC", city: "São Paulo", coach: "Abel Ferreira", players: 24, founded: "1914", championship: "Copa FutCopa 2025", color: "#16a34a" },
  { id: 3, name: "Santos FC", city: "Santos", coach: "Fábio Carille", players: 23, founded: "1912", championship: "Copa FutCopa 2025", color: "#000000" },
  { id: 4, name: "Corinthians", city: "São Paulo", coach: "Ramón Díaz", players: 26, founded: "1910", championship: "Copa FutCopa 2025", color: "#1c1c1c" },
  { id: 5, name: "São Paulo FC", city: "São Paulo", coach: "Thiago Carpini", players: 24, founded: "1930", championship: "Liga Municipal Sul", color: "#cc0000" },
  { id: 6, name: "Grêmio", city: "Porto Alegre", coach: "Renato Gaúcho", players: 25, founded: "1903", championship: "Liga Municipal Sul", color: "#0057b8" },
  { id: 7, name: "Internacional", city: "Porto Alegre", coach: "Eduardo Coudet", players: 24, founded: "1909", championship: "Liga Municipal Sul", color: "#cc0000" },
  { id: 8, name: "Athletico", city: "Curitiba", coach: "Cuca", players: 23, founded: "1924", championship: "Copa FutCopa 2025", color: "#cc0000" },
];

export function ManageTeams({ onNavigate }: ManageTeamsProps) {
  const [teams, setTeams] = useState(initialTeams);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", city: "", coach: "", championship: "", color: "#1d6ae8" });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = teams.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.city.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (t: typeof initialTeams[0]) => {
    setForm({ name: t.name, city: t.city, coach: t.coach, championship: t.championship, color: t.color });
    setEditId(t.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editId) {
      setTeams(prev => prev.map(t => t.id === editId ? { ...t, ...form } : t));
    } else {
      setTeams(prev => [...prev, { id: Date.now(), ...form, players: 0, founded: "2025" }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: "", city: "", coach: "", championship: "", color: "#1d6ae8" });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>GESTÃO DE EQUIPES</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{teams.length} equipes cadastradas</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", city: "", coach: "", championship: "", color: "#1d6ae8" }); }}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          <Plus size={15} /> Nova Equipe
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{editId ? "EDITAR EQUIPE" : "NOVA EQUIPE"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>

            {/* Shield Preview */}
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center" style={{ borderColor: form.color, background: `${form.color}20` }}>
                <Users size={28} style={{ color: form.color }} />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Nome da Equipe", key: "name" as const, placeholder: "Ex: Flamengo FC" },
                { label: "Cidade", key: "city" as const, placeholder: "Ex: Rio de Janeiro" },
                { label: "Técnico", key: "coach" as const, placeholder: "Ex: José Silva" },
                { label: "Campeonato", key: "championship" as const, placeholder: "Ex: Copa FutCopa 2025" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Cor do Escudo</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
                  <span className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{form.color}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-muted-foreground hover:text-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
              <button onClick={handleSave} className="flex-1 bg-primary hover:bg-blue-600 text-white py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2" style={{ fontSize: "0.85rem" }}>
                <Save size={15} /> Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>EXCLUIR EQUIPE?</h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>Esta ação também removerá todos os jogadores associados a esta equipe.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-border text-muted-foreground hover:text-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
              <button onClick={() => { setTeams(prev => prev.filter(t => t.id !== deleteId)); setDeleteId(null); }} className="flex-1 bg-destructive hover:bg-red-600 text-white py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Buscar equipe ou cidade..." />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(t => (
          <div key={t.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-full border-3 flex items-center justify-center" style={{ borderColor: t.color, background: `${t.color}20`, borderWidth: 3 }}>
                <Users size={22} style={{ color: t.color }} />
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <h3 className="text-foreground mb-0.5" style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>{t.name}</h3>
            <p className="text-muted-foreground mb-3" style={{ fontSize: "0.72rem" }}>{t.city} • Fundado em {t.founded}</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Técnico:</span>
                <span className="text-foreground" style={{ fontSize: "0.75rem" }}>{t.coach}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Jogadores:</span>
                <span className="text-accent" style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>{t.players}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Campeonato:</span>
              </div>
              <span className="text-primary block truncate" style={{ fontSize: "0.68rem" }}>{t.championship}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
