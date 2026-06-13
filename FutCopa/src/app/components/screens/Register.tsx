import { useState } from "react";
import { Trophy, User, Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";

interface RegisterProps { onNavigate: (s: any) => void; }

export function Register({ onNavigate }: RegisterProps) {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("fan");

  const roles = [
    { id: "fan", label: "Torcedor", desc: "Acompanhe jogos e resultados" },
    { id: "organizer", label: "Organizador", desc: "Crie e gerencie campeonatos" },
    { id: "referee", label: "Árbitro", desc: "Registre partidas e ocorrências" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <span className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}>
            FUT<span className="text-accent">COPA</span>
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="text-foreground mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>CRIAR CONTA</h1>
          <p className="text-muted-foreground mb-6" style={{ fontSize: "0.82rem" }}>Preencha os dados para se cadastrar na plataforma</p>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>Tipo de perfil</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`border rounded-lg p-3 text-left transition-all ${role === r.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"}`}
                >
                  <p className={`${role === r.id ? "text-primary" : "text-foreground"}`} style={{ fontSize: "0.78rem", fontWeight: 600 }}>{r.label}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Nome</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input className="w-full bg-input-background border border-border rounded-lg pl-8 pr-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="João" />
              </div>
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Sobrenome</label>
              <input className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Silva" />
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>E-mail</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input className="w-full bg-input-background border border-border rounded-lg pl-8 pr-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Telefone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input className="w-full bg-input-background border border-border rounded-lg pl-8 pr-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="(11) 99999-9999" />
              </div>
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Senha</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPass ? "text" : "password"} className="w-full bg-input-background border border-border rounded-lg pl-8 pr-10 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Mínimo 8 caracteres" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>Confirmar senha</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="password" className="w-full bg-input-background border border-border rounded-lg pl-8 pr-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} placeholder="Repita a senha" />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2 mb-6 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded" />
            <span className="text-muted-foreground" style={{ fontSize: "0.78rem" }}>
              Concordo com os{" "}
              <button className="text-primary hover:underline">Termos de Uso</button>{" "}e{" "}
              <button className="text-primary hover:underline">Política de Privacidade</button>
            </span>
          </label>

          <button className="w-full bg-primary hover:bg-blue-600 text-white py-3 rounded-lg transition-colors mb-4" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            Criar Conta
          </button>

          <p className="text-center text-muted-foreground" style={{ fontSize: "0.78rem" }}>
            Já tem conta?{" "}
            <button onClick={() => onNavigate("login")} className="text-primary hover:text-blue-400 transition-colors">Entrar</button>
          </p>
        </div>
      </div>
    </div>
  );
}
