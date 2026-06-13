import { useState } from "react";
import { Plus, Edit2, Trash2, Award, Link, X, Save, ExternalLink } from "lucide-react";

interface SponsorsProps { onNavigate: (s: any) => void; }

const initialSponsors = [
  { id: 1, name: "SportBet", category: "Master", website: "www.sportbet.com.br", contact: "marketing@sportbet.com.br", contract: "31/12/2025", value: "R$ 50.000", active: true },
  { id: 2, name: "NutriSport", category: "Ouro", website: "www.nutrisport.com.br", contact: "parceria@nutrisport.com.br", contract: "30/06/2025", value: "R$ 25.000", active: true },
  { id: 3, name: "AutoCar Motors", category: "Prata", website: "www.autocar.com.br", contact: "mkt@autocar.com.br", contract: "15/09/2025", value: "R$ 15.000", active: true },
  { id: 4, name: "BeerPro", category: "Ouro", website: "www.beerpro.com.br", contact: "eventos@beerpro.com.br", contract: "31/12/2025", value: "R$ 20.000", active: false },
  { id: 5, name: "TechFit", category: "Bronze", website: "www.techfit.com.br", contact: "contato@techfit.com.br", contract: "30/11/2025", value: "R$ 8.000", active: true },
  { id: 6, name: "MegaCom", category: "Bronze", website: "www.megacom.com.br", contact: "marketing@megacom.com.br", contract: "30/09/2025", value: "R$ 8.000", active: true },
];

const catColor: Record<string, string> = {
  Master: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Ouro: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Prata: "bg-gray-400/20 text-gray-400 border-gray-400/30",
  Bronze: "bg-orange-700/20 text-orange-400 border-orange-700/30",
};

const catBg: Record<string, string> = {
  Master: "bg-yellow-500",
  Ouro: "bg-amber-500",
  Prata: "bg-gray-400",
  Bronze: "bg-orange-700",
};

export function Sponsors({ onNavigate }: SponsorsProps) {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", category: "Bronze", website: "", contact: "", contract: "", value: "" });

  const handleEdit = (s: typeof initialSponsors[0]) => {
    setForm({ name: s.name, category: s.category, website: s.website, contact: s.contact, contract: s.contract, value: s.value });
    setEditId(s.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editId) {
      setSponsors(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s));
    } else {
      setSponsors(prev => [...prev, { id: Date.now(), ...form, active: true }]);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: "", category: "Bronze", website: "", contact: "", contract: "", value: "" });
  };

  const byCategory = ["Master", "Ouro", "Prata", "Bronze"];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>PATROCINADORES</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{sponsors.filter(s => s.active).length} patrocinadores ativos</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", category: "Bronze", website: "", contact: "", contract: "", value: "" }); }}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          style={{ fontSize: "0.82rem" }}
        >
          <Plus size={15} /> Novo Patrocinador
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{editId ? "EDITAR PATROCINADOR" : "NOVO PATROCINADOR"}</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Categoria</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Master", "Ouro", "Prata", "Bronze"].map(cat => (
                    <button key={cat} onClick={() => setForm({ ...form, category: cat })} className={`border rounded-lg py-2 text-center transition-all ${form.category === cat ? `${catColor[cat]} border-current` : "border-border text-muted-foreground"}`} style={{ fontSize: "0.72rem" }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: "Nome da Empresa", key: "name" as const, placeholder: "Ex: SportBet" },
                { label: "Website", key: "website" as const, placeholder: "www.empresa.com.br" },
                { label: "E-mail de Contato", key: "contact" as const, placeholder: "contato@empresa.com.br" },
                { label: "Valor do Contrato", key: "value" as const, placeholder: "R$ 0.000" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Vencimento do Contrato</label>
                <input type="date" value={form.contract} onChange={e => setForm({ ...form, contract: e.target.value })} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
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

      {/* Sponsors by category */}
      {byCategory.map(cat => {
        const catSponsors = sponsors.filter(s => s.category === cat);
        if (catSponsors.length === 0) return null;
        return (
          <div key={cat} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-6 rounded ${catBg[cat]}`} />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>PATROCINADORES {cat.toUpperCase()}</h2>
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{catSponsors.length} empresa{catSponsors.length > 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catSponsors.map(s => (
                <div key={s.id} className={`bg-card border rounded-xl p-5 transition-all ${s.active ? "border-border hover:border-primary/30" : "border-border/50 opacity-60"}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${catColor[s.category]}`}>
                        <Award size={20} />
                      </div>
                      <div>
                        <h3 className="text-foreground" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{s.name}</h3>
                        <span className={`inline-block border px-2 py-0.5 rounded-full ${catColor[s.category]}`} style={{ fontSize: "0.62rem" }}>{s.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"><Edit2 size={13} /></button>
                      <button onClick={() => setSponsors(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Link size={12} />
                      <span style={{ fontSize: "0.72rem" }}>{s.website}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Contrato até:</span>
                      <span className="text-foreground" style={{ fontSize: "0.75rem" }}>{s.contract}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>Valor:</span>
                      <span className="text-accent" style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{s.value}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className={`${s.active ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"} px-2 py-0.5 rounded-full`} style={{ fontSize: "0.65rem" }}>
                      {s.active ? "Ativo" : "Inativo"}
                    </span>
                    <button className="flex items-center gap-1 text-primary hover:text-blue-400 transition-colors" style={{ fontSize: "0.72rem" }}>
                      <ExternalLink size={11} /> Site
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
