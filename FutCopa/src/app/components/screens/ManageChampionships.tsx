import { useState } from "react";
import { Plus, Edit2, Trash2, Trophy, Eye, X, Save } from "lucide-react";

interface ManageChampionshipsProps { onNavigate: (s: any) => void; }

const initialChampionships = [
  { id: 1, name: "Copa FutCopa 2025", type: "Eliminatório", teams: 16, status: "Em andamento", start: "2025-03-01", end: "2025-08-30", scoring: { win: 3, draw: 1, loss: 0 } },
  { id: 2, name: "Liga Municipal Sul", type: "Pontos corridos", teams: 12, status: "Em andamento", start: "2025-04-15", end: "2025-09-20", scoring: { win: 3, draw: 1, loss: 0 } },
  { id: 3, name: "Torneio Sub-20", type: "Misto", teams: 8, status: "Inscrições abertas", start: "2025-07-01", end: "2025-10-30", scoring: { win: 3, draw: 1, loss: 0 } },
  { id: 4, name: "Copa Empresarial", type: "Suíço", teams: 20, status: "Em andamento", start: "2025-02-10", end: "2025-07-15", scoring: { win: 2, draw: 1, loss: 0 } },
];

export function ManageChampionships({ onNavigate }: ManageChampionshipsProps) {
  const [championships, setChampionships] = useState(initialChampionships);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", type: "Pontos corridos", teams: 16, start: "", end: "", winPts: 3, drawPts: 1 });
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleEdit = (c: typeof initialChampionships[0]) => {
    setForm({ name: c.name, type: c.type, teams: c.teams, start: c.start, end: c.end, winPts: c.scoring.win, drawPts: c.scoring.draw });
    setEditId(c.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editId) {
      setChampionships(prev => prev.map(c => c.id === editId ? { ...c, name: form.name, type: form.type, teams: form.teams, start: form.start, end: form.end, scoring: { win: form.winPts, draw: form.drawPts, loss: 0 } } : c));
    } else {
      setChampionships(prev => [...prev, { id: Date.now(), name: form.name, type: form.type, teams: form.teams, status: "Inscrições abertas", start: form.start, end: form.end, scoring: { win: form.winPts, draw: form.drawPts, loss: 0 } }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: "", type: "Pontos corridos", teams: 16, start: "", end: "", winPts: 3, drawPts: 1 });
  };

  const handleDelete = () => {
    if (deleteId) {
      setChampionships(prev => prev.filter(c => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  const statusColor = (s: string) => s === "Em andamento" ? "bg-accent/20 text-accent" : s === "Inscrições abertas" ? "bg-yellow-500/20 text-yellow-400" : "bg-muted text-muted-foreground";

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>GESTÃO DE CAMPEONATOS</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{championships.length} campeonatos cadastrados</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", type: "Pontos corridos", teams: 16, start: "", end: "", winPts: 3, drawPts: 1 }); }}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          <Plus size={15} /> Novo Campeonato
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{editId ? "EDITAR CAMPEONATO" : "NOVO CAMPEONATO"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Nome do Campeonato</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Ex: Copa FutCopa 2025" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Tipo</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }}>
                    {["Pontos corridos", "Eliminatório", "Misto", "Suíço"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Nº de Equipes</label>
                  <input type="number" value={form.teams} onChange={e => setForm({ ...form, teams: Number(e.target.value) })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Data de Início</label>
                  <input type="date" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                </div>
                <div>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Data de Término</label>
                  <input type="date" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                </div>
              </div>
              <div>
                <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>Sistema de Pontuação</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Vitória", key: "winPts" as const }, { label: "Empate", key: "drawPts" as const }].map(f => (
                    <div key={f.key}>
                      <label className="text-muted-foreground mb-1 block" style={{ fontSize: "0.68rem" }}>{f.label} (pts)</label>
                      <input type="number" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: Number(e.target.value) })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                    </div>
                  ))}
                  <div>
                    <label className="text-muted-foreground mb-1 block" style={{ fontSize: "0.68rem" }}>Derrota (pts)</label>
                    <input type="number" value={0} disabled className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-muted-foreground" style={{ fontSize: "0.85rem" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-border text-muted-foreground hover:text-foreground py-2.5 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>Cancelar</button>
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
            <h2 className="text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>EXCLUIR CAMPEONATO?</h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>Esta ação não pode ser desfeita. Todos os dados relacionados serão perdidos.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-border text-muted-foreground hover:text-foreground py-2.5 rounded-lg" style={{ fontSize: "0.85rem" }}>Cancelar</button>
              <button onClick={handleDelete} className="flex-1 bg-destructive hover:bg-red-600 text-white py-2.5 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                {["CAMPEONATO", "TIPO", "EQUIPES", "PONTUAÇÃO", "PERÍODO", "STATUS", "AÇÕES"].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {championships.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Trophy size={14} className="text-primary" />
                      </div>
                      <span className="text-foreground" style={{ fontSize: "0.85rem" }}>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{c.type}</td>
                  <td className="py-4 px-4 text-muted-foreground" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{c.teams}</td>
                  <td className="py-4 px-4">
                    <span className="text-muted-foreground" style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
                      V:{c.scoring.win} E:{c.scoring.draw} D:0
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground" style={{ fontSize: "0.75rem" }}>{c.start} → {c.end}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full ${statusColor(c.status)}`} style={{ fontSize: "0.65rem" }}>{c.status}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onNavigate("championship-details")} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors" title="Ver detalhes">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => handleEdit(c)} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Editar">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteId(c.id)} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors" title="Excluir">
                        <Trash2 size={14} />
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
