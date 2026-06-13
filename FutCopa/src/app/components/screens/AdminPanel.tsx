import { useState } from "react";
import { Users, Shield, FileText, Settings, Search, Edit2, Trash2, Plus, Check, X } from "lucide-react";

interface AdminPanelProps { onNavigate: (s: any) => void; }

const initialUsers = [
  { id: 1, name: "Carlos Admin", email: "admin@futcopa.com", role: "admin", status: "Ativo", lastLogin: "13/06/2025" },
  { id: 2, name: "João Organizador", email: "joao@futcopa.com", role: "organizer", status: "Ativo", lastLogin: "12/06/2025" },
  { id: 3, name: "Paulo Árbitro", email: "paulo@futcopa.com", role: "referee", status: "Ativo", lastLogin: "11/06/2025" },
  { id: 4, name: "Maria Silva", email: "maria@futcopa.com", role: "organizer", status: "Ativo", lastLogin: "10/06/2025" },
  { id: 5, name: "Pedro Costa", email: "pedro@futcopa.com", role: "fan", status: "Ativo", lastLogin: "09/06/2025" },
  { id: 6, name: "Ana Ribeiro", email: "ana@futcopa.com", role: "referee", status: "Inativo", lastLogin: "05/06/2025" },
  { id: 7, name: "Lucas Torcedor", email: "lucas@futcopa.com", role: "fan", status: "Ativo", lastLogin: "13/06/2025" },
];

const roleColors: Record<string, string> = {
  admin: "bg-red-500/20 text-red-400",
  organizer: "bg-blue-500/20 text-blue-400",
  referee: "bg-yellow-500/20 text-yellow-400",
  fan: "bg-green-500/20 text-green-400",
};

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  organizer: "Organizador",
  referee: "Árbitro",
  fan: "Torcedor",
};

const tabs = [
  { id: "users", label: "Usuários", icon: Users },
  { id: "permissions", label: "Permissões", icon: Shield },
  { id: "reports", label: "Relatórios", icon: FileText },
  { id: "config", label: "Configurações", icon: Settings },
];

const permissions = [
  { role: "Administrador", perms: ["Criar campeonatos", "Editar campeonatos", "Excluir campeonatos", "Gerenciar usuários", "Gerenciar equipes", "Gerenciar jogadores", "Registrar resultados", "Ver relatórios", "Configurações do sistema"] },
  { role: "Organizador", perms: ["Criar campeonatos", "Editar campeonatos", "Gerenciar equipes", "Gerenciar jogadores", "Registrar resultados", "Ver relatórios"] },
  { role: "Árbitro", perms: ["Ver jogos designados", "Registrar resultado", "Registrar cartões", "Registrar ocorrências"] },
  { role: "Torcedor", perms: ["Ver campeonatos", "Ver classificação", "Ver estatísticas", "Ver partidas"] },
];

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("users");
  const [editId, setEditId] = useState<number | null>(null);
  const [editRole, setEditRole] = useState("");

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Shield size={22} className="text-red-400" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>PAINEL ADMINISTRATIVO</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Controle total da plataforma</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Usuários", value: users.length, color: "text-primary", icon: Users },
          { label: "Administradores", value: users.filter(u => u.role === "admin").length, color: "text-red-400", icon: Shield },
          { label: "Organizadores", value: users.filter(u => u.role === "organizer").length, color: "text-blue-400", icon: Users },
          { label: "Árbitros", value: users.filter(u => u.role === "referee").length, color: "text-yellow-400", icon: Shield },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className={`${s.color}`} style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${tab === t.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`} style={{ fontSize: "0.82rem" }}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <>
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Buscar usuário..." />
            </div>
            <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2" style={{ fontSize: "0.82rem" }}>
              <Plus size={15} /> Novo Usuário
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    {["USUÁRIO", "E-MAIL", "PERFIL", "STATUS", "ÚLTIMO ACESSO", "AÇÕES"].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                              {u.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-foreground" style={{ fontSize: "0.85rem" }}>{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.82rem" }}>{u.email}</td>
                      <td className="py-3 px-4">
                        {editId === u.id ? (
                          <select value={editRole} onChange={e => setEditRole(e.target.value)} className="bg-input-background border border-border rounded px-2 py-1 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.75rem" }}>
                            {Object.keys(roleLabels).map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full ${roleColors[u.role]}`} style={{ fontSize: "0.65rem" }}>{roleLabels[u.role]}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full ${u.status === "Ativo" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`} style={{ fontSize: "0.65rem" }}>{u.status}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{u.lastLogin}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {editId === u.id ? (
                            <>
                              <button onClick={() => { setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: editRole } : x)); setEditId(null); }} className="p-1.5 rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-accent transition-colors"><Check size={13} /></button>
                              <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"><X size={13} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => { setEditId(u.id); setEditRole(u.role); }} className="p-1.5 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"><Edit2 size={13} /></button>
                              <button onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))} className="p-1.5 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={13} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "permissions" && (
        <div className="space-y-4">
          {permissions.map(p => (
            <div key={p.role} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{p.role.toUpperCase()}</h3>
                <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{p.perms.length} permissões</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.perms.map(perm => (
                  <span key={perm} className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-lg" style={{ fontSize: "0.72rem" }}>
                    <Check size={10} /> {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "reports" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Usuários por Perfil", desc: "Distribuição dos tipos de usuário na plataforma", count: "248 registros" },
            { title: "Acessos por Data", desc: "Histórico de logins e acessos ao sistema", count: "1.243 acessos" },
            { title: "Ações Administrativas", desc: "Log de operações realizadas pelos admins", count: "89 ações" },
            { title: "Erros e Exceções", desc: "Registro de erros do sistema", count: "3 ocorrências" },
            { title: "Campeonatos por Período", desc: "Estatísticas de campeonatos criados", count: "48 campeonatos" },
            { title: "Auditoria Geral", desc: "Relatório completo de auditoria da plataforma", count: "Completo" },
          ].map(r => (
            <button key={r.title} className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                <FileText size={18} className="text-primary" />
              </div>
              <h3 className="text-foreground mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem" }}>{r.title}</h3>
              <p className="text-muted-foreground mb-2" style={{ fontSize: "0.75rem" }}>{r.desc}</p>
              <span className="text-accent" style={{ fontSize: "0.68rem" }}>{r.count}</span>
            </button>
          ))}
        </div>
      )}

      {tab === "config" && (
        <div className="max-w-2xl space-y-4">
          {[
            { label: "Nome da Plataforma", value: "FutCopa", type: "text" },
            { label: "E-mail de Contato", value: "contato@futcopa.com", type: "email" },
            { label: "Fuso Horário", value: "America/Sao_Paulo", type: "text" },
            { label: "Limite de Equipes por Campeonato", value: "32", type: "number" },
          ].map(c => (
            <div key={c.label} className="bg-card border border-border rounded-xl p-5">
              <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>{c.label}</label>
              <input defaultValue={c.value} type={c.type} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
            </div>
          ))}
          <button className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors" style={{ fontSize: "0.85rem" }}>
            Salvar Configurações
          </button>
        </div>
      )}
    </div>
  );
}
