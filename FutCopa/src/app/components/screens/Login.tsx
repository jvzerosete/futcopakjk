import { useState } from "react";
import { Trophy, Eye, EyeOff, Lock, Mail } from "lucide-react";

interface LoginProps {
  onNavigate: (s: any) => void;
  onLogin: (role: "admin" | "organizer" | "referee" | "fan") => void;
}

const quickAccess = [
  { role: "admin" as const, label: "Admin", color: "bg-red-500/20 text-red-400 border-red-500/30", desc: "Acesso total" },
  { role: "organizer" as const, label: "Organizador", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", desc: "Gerir campeonatos" },
  { role: "referee" as const, label: "Árbitro", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", desc: "Registrar partidas" },
  { role: "fan" as const, label: "Torcedor", color: "bg-green-500/20 text-green-400 border-green-500/30", desc: "Acompanhar jogos" },
];

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@futcopa.com");
  const [password, setPassword] = useState("••••••••");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "recover">("login");

  const handleLogin = (role: "admin" | "organizer" | "referee" | "fan") => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role); }, 600);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 p-10"
        style={{ background: "linear-gradient(160deg, #091420 0%, #0d2a4a 60%, #0e3d1a 100%)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
            FUT<span className="text-accent">COPA</span>
          </span>
        </div>

        <div>
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop&auto=format"
              alt="Football stadium"
              className="w-full rounded-2xl object-cover opacity-60"
              style={{ maxHeight: 280 }}
            />
          </div>
          <h2 className="text-white mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", lineHeight: 1.2 }}>
            Gerencie seus campeonatos de futebol com profissionalismo
          </h2>
          <p className="text-blue-200" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
            Plataforma completa para organização de torneios, gestão de equipes, árbitros, estatísticas e muito mais.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Campeonatos", value: "48" },
            { label: "Equipes", value: "320+" },
            { label: "Jogadores", value: "4.800+" },
            { label: "Partidas", value: "1.200+" },
          ].map(s => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>{s.value}</p>
              <p className="text-blue-200" style={{ fontSize: "0.72rem" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Trophy size={20} className="text-white" />
            </div>
            <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
              FUT<span className="text-accent">COPA</span>
            </span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            {tab === "login" ? (
              <>
                <h1 className="text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>ENTRAR NA PLATAFORMA</h1>
                <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>Acesse sua conta FutCopa</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>E-mail</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-input-background border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                        style={{ fontSize: "0.85rem" }}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Senha</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-input-background border border-border rounded-lg pl-9 pr-10 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
                        style={{ fontSize: "0.85rem" }}
                        placeholder="••••••••"
                      />
                      <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>Lembrar-me</span>
                    </label>
                    <button onClick={() => setTab("recover")} className="text-primary hover:text-blue-400 transition-colors" style={{ fontSize: "0.78rem" }}>
                      Esqueci minha senha
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleLogin("admin")}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg transition-colors mb-4 disabled:opacity-60"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>

                {/* Quick Access Demo */}
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground text-center mb-3" style={{ fontSize: "0.72rem" }}>ACESSO RÁPIDO — DEMONSTRAÇÃO</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickAccess.map(qa => (
                      <button
                        key={qa.role}
                        onClick={() => handleLogin(qa.role)}
                        className={`border rounded-lg px-3 py-2 text-left transition-all hover:opacity-80 ${qa.color}`}
                      >
                        <p style={{ fontSize: "0.78rem", fontWeight: 600 }}>{qa.label}</p>
                        <p style={{ fontSize: "0.65rem", opacity: 0.8 }}>{qa.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-center text-muted-foreground mt-4" style={{ fontSize: "0.78rem" }}>
                  Não tem conta?{" "}
                  <button onClick={() => onNavigate("register")} className="text-primary hover:text-blue-400 transition-colors">
                    Cadastre-se
                  </button>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>RECUPERAR SENHA</h1>
                <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>Digite seu e-mail para receber o link de recuperação</p>
                <div className="mb-6">
                  <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>E-mail cadastrado</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input className="w-full bg-input-background border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="seu@email.com" />
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg transition-colors mb-4" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  Enviar link de recuperação
                </button>
                <button onClick={() => setTab("login")} className="w-full text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: "0.82rem" }}>
                  ← Voltar ao login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
