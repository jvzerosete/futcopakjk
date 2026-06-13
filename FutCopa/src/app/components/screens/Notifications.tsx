import { useState } from "react";
import { Bell, Trophy, Calendar, AlertTriangle, Info, Check, Trash2, Filter } from "lucide-react";

interface NotificationsProps { onNavigate: (s: any) => void; }

const initialNotifications = [
  { id: 1, type: "match", title: "Partida agendada", message: "Grêmio vs Internacional confirmada para 14/06 às 16:00 na Arena do Grêmio", time: "Agora", read: false, priority: "normal" },
  { id: 2, type: "alert", title: "Árbitro não confirmado", message: "A partida Botafogo vs Vasco (16/06) ainda não tem árbitro designado", time: "15 min atrás", read: false, priority: "high" },
  { id: 3, type: "trophy", title: "Resultado registrado", message: "Flamengo FC 3×1 Santos FC - Rodada 27 encerrada com sucesso", time: "2 horas atrás", read: false, priority: "normal" },
  { id: 4, type: "info", title: "Inscrições abertas", message: "Torneio Sub-20 está aceitando inscrições de equipes até 30/06/2025", time: "1 dia atrás", read: true, priority: "normal" },
  { id: 5, type: "alert", title: "Alteração de horário", message: "A partida São Paulo FC vs Athletico foi remarcada para 19:30", time: "1 dia atrás", read: true, priority: "high" },
  { id: 6, type: "match", title: "Classificação atualizada", message: "A tabela do Copa FutCopa 2025 foi atualizada após os jogos da rodada 27", time: "2 dias atrás", read: true, priority: "normal" },
  { id: 7, type: "info", title: "Novo patrocinador", message: "TechFit assinou contrato de patrocínio para a próxima temporada", time: "3 dias atrás", read: true, priority: "normal" },
  { id: 8, type: "alert", title: "Suspensão automática", message: "André Costa (São Paulo FC) está suspenso por acúmulo de cartões amarelos", time: "3 dias atrás", read: true, priority: "high" },
];

const typeIcon = (t: string) => {
  const icons: Record<string, { icon: any; color: string; bg: string }> = {
    match: { icon: Calendar, color: "text-primary", bg: "bg-primary/20" },
    alert: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/20" },
    trophy: { icon: Trophy, color: "text-accent", bg: "bg-accent/20" },
    info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/20" },
  };
  return icons[t] || { icon: Bell, color: "text-muted-foreground", bg: "bg-secondary" };
};

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("Todas");

  const filters = ["Todas", "Não lidas", "Alertas", "Partidas"];

  const filtered = notifications.filter(n => {
    if (filter === "Não lidas") return !n.read;
    if (filter === "Alertas") return n.type === "alert";
    if (filter === "Partidas") return n.type === "match";
    return true;
  });

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const remove = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center relative">
            <Bell size={22} className="text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>NOTIFICAÇÕES</h1>
            <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>{unreadCount} não lidas de {notifications.length} total</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 text-primary hover:text-blue-400 transition-colors border border-primary/30 px-3 py-2 rounded-lg" style={{ fontSize: "0.78rem" }}>
            <Check size={13} /> Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg border transition-colors ${filter === f ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`} style={{ fontSize: "0.82rem" }}>
            {f}
            {f === "Não lidas" && unreadCount > 0 && (
              <span className="ml-2 bg-accent/20 text-accent px-1.5 rounded-full" style={{ fontSize: "0.65rem" }}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Bell size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground" style={{ fontSize: "0.88rem" }}>Nenhuma notificação encontrada</p>
          </div>
        ) : (
          filtered.map(n => {
            const { icon: Icon, color, bg } = typeIcon(n.type);
            return (
              <div
                key={n.id}
                className={`bg-card border rounded-xl p-4 transition-all hover:border-primary/20 ${!n.read ? "border-primary/30" : "border-border"}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`${!n.read ? "text-foreground" : "text-muted-foreground"}`} style={{ fontSize: "0.88rem", fontWeight: !n.read ? 600 : 400 }}>{n.title}</h3>
                        {!n.read && <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                        {n.priority === "high" && (
                          <span className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded" style={{ fontSize: "0.6rem" }}>URGENTE</span>
                        )}
                      </div>
                      <span className="text-muted-foreground whitespace-nowrap" style={{ fontSize: "0.68rem" }}>{n.time}</span>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{n.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="flex items-center gap-1 text-primary hover:text-blue-400 transition-colors" style={{ fontSize: "0.72rem" }}>
                          <Check size={11} /> Marcar como lida
                        </button>
                      )}
                      <button onClick={() => remove(n.id)} className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors" style={{ fontSize: "0.72rem" }}>
                        <Trash2 size={11} /> Remover
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
