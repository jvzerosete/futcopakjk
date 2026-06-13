import { useState } from "react";
import { Trophy, Search, Filter, Calendar, Users, ChevronRight, MapPin } from "lucide-react";

interface ChampionshipsProps { onNavigate: (s: any) => void; }

const championships = [
  { id: 1, name: "Copa FutCopa 2025", sport: "Futebol", teams: 16, phase: "Quartas de Final", status: "Em andamento", start: "01/03/2025", end: "30/08/2025", city: "São Paulo", edition: "12ª Edição", category: "Adulto" },
  { id: 2, name: "Liga Municipal Sul", sport: "Futebol", teams: 12, phase: "Fase de Grupos", status: "Em andamento", start: "15/04/2025", end: "20/09/2025", city: "Porto Alegre", edition: "5ª Edição", category: "Adulto" },
  { id: 3, name: "Torneio Sub-20", sport: "Futebol", teams: 8, phase: "Pré-temporada", status: "Inscrições abertas", start: "01/07/2025", end: "30/10/2025", city: "Rio de Janeiro", edition: "3ª Edição", category: "Sub-20" },
  { id: 4, name: "Copa Empresarial", sport: "Futebol Suíço", teams: 20, phase: "Classificatória", status: "Em andamento", start: "10/02/2025", end: "15/07/2025", city: "Belo Horizonte", edition: "7ª Edição", category: "Amador" },
  { id: 5, name: "Liga Nordeste FC", sport: "Futebol", teams: 14, phase: "Eliminatórias", status: "Em andamento", start: "20/01/2025", end: "30/06/2025", city: "Fortaleza", edition: "9ª Edição", category: "Adulto" },
  { id: 6, name: "Torneio Feminino", sport: "Futebol Feminino", teams: 10, phase: "Encerrado", status: "Encerrado", start: "01/01/2025", end: "30/04/2025", city: "Curitiba", edition: "2ª Edição", category: "Feminino" },
];

const statusColor = (s: string) => {
  if (s === "Em andamento") return "bg-accent/20 text-accent";
  if (s === "Inscrições abertas") return "bg-yellow-500/20 text-yellow-400";
  if (s === "Encerrado") return "bg-muted text-muted-foreground";
  return "bg-muted text-muted-foreground";
};

export function Championships({ onNavigate }: ChampionshipsProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [view, setView] = useState<"grid" | "list">("grid");

  const statuses = ["Todos", "Em andamento", "Inscrições abertas", "Encerrado"];

  const filtered = championships.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Todos" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>CAMPEONATOS</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{championships.length} campeonatos cadastrados</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary"
            style={{ fontSize: "0.85rem" }}
            placeholder="Buscar campeonato ou cidade..."
          />
        </div>
        <div className="flex gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${statusFilter === s ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`}
              style={{ fontSize: "0.78rem" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Em andamento", value: championships.filter(c => c.status === "Em andamento").length, color: "text-accent" },
          { label: "Inscrições abertas", value: championships.filter(c => c.status === "Inscrições abertas").length, color: "text-yellow-400" },
          { label: "Encerrados", value: championships.filter(c => c.status === "Encerrado").length, color: "text-muted-foreground" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={`${s.color}`} style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>{s.value}</p>
            <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Championship Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(c => (
          <button
            key={c.id}
            onClick={() => onNavigate("championship-details")}
            className="bg-card border border-border rounded-xl p-5 text-left hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                <Trophy size={22} className="text-primary" />
              </div>
              <span className={`px-2 py-1 rounded-full ${statusColor(c.status)}`} style={{ fontSize: "0.65rem" }}>
                {c.status}
              </span>
            </div>

            <h3 className="text-foreground mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{c.name}</h3>
            <p className="text-muted-foreground mb-3" style={{ fontSize: "0.75rem" }}>{c.edition} • {c.category}</p>

            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users size={12} />
                <span style={{ fontSize: "0.75rem" }}>{c.teams} equipes • {c.phase}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={12} />
                <span style={{ fontSize: "0.75rem" }}>{c.start} — {c.end}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={12} />
                <span style={{ fontSize: "0.75rem" }}>{c.city}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{c.sport}</span>
              <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all" style={{ fontSize: "0.78rem" }}>
                Ver detalhes <ChevronRight size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
