import { useState } from "react";
import { Settings as SettingsIcon, Palette, Trophy, Users, Bell, Shield, Save } from "lucide-react";

interface SettingsProps { onNavigate: (s: any) => void; }

export function Settings({ onNavigate }: SettingsProps) {
  const [theme, setTheme] = useState("dark");
  const [primaryColor, setPrimaryColor] = useState("#1d6ae8");
  const [accentColor, setAccentColor] = useState("#22c55e");
  const [platformName, setPlatformName] = useState("FutCopa");
  const [notifications, setNotifications] = useState({
    goals: true, cards: true, matches: true, standings: false, reports: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsSections = [
    { id: "general", label: "Geral", icon: SettingsIcon },
    { id: "appearance", label: "Aparência", icon: Palette },
    { id: "platform", label: "Plataforma", icon: Trophy },
    { id: "users", label: "Usuários", icon: Users },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
  ];

  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
          <SettingsIcon size={22} className="text-foreground" />
        </div>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>CONFIGURAÇÕES</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Personalize a plataforma FutCopa</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {settingsSections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border last:border-0 ${activeSection === s.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
                style={{ fontSize: "0.82rem" }}
              >
                <s.icon size={15} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {activeSection === "general" && (
            <>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>INFORMAÇÕES GERAIS</h3>
                <div className="space-y-4">
                  {[
                    { label: "Nome da Plataforma", value: platformName, setter: setPlatformName, type: "text" },
                    { label: "E-mail Administrativo", value: "admin@futcopa.com", setter: () => {}, type: "email" },
                    { label: "Telefone de Contato", value: "(11) 99999-9999", setter: () => {}, type: "tel" },
                    { label: "Website", value: "www.futcopa.com.br", setter: () => {}, type: "url" },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{f.label}</label>
                      <input defaultValue={f.value} onChange={e => f.setter(e.target.value)} type={f.type} className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>CONFIGURAÇÕES REGIONAIS</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: "Idioma", options: ["Português (BR)", "English", "Español"] }, { label: "Fuso Horário", options: ["America/Sao_Paulo", "America/Manaus", "America/Belem"] }].map(s => (
                    <div key={s.label}>
                      <label className="text-muted-foreground mb-1.5 block" style={{ fontSize: "0.78rem" }}>{s.label}</label>
                      <select className="w-full bg-input-background border border-border rounded-lg px-3 py-2.5 text-foreground focus:outline-none focus:border-primary" style={{ fontSize: "0.85rem" }}>
                        {s.options.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeSection === "appearance" && (
            <>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>TEMA</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "dark", label: "Escuro", preview: "bg-gray-900 border-gray-700" },
                    { id: "light", label: "Claro", preview: "bg-white border-gray-200" },
                    { id: "auto", label: "Automático", preview: "bg-gradient-to-r from-gray-900 to-white border-gray-400" },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`border-2 rounded-xl p-4 text-left transition-all ${theme === t.id ? "border-primary" : "border-border"}`}
                    >
                      <div className={`h-16 rounded-lg mb-3 border ${t.preview}`} />
                      <p className={`${theme === t.id ? "text-primary" : "text-foreground"}`} style={{ fontSize: "0.82rem" }}>{t.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>CORES DA PLATAFORMA</h3>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>Cor Primária</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-12 h-12 rounded-lg border border-border cursor-pointer" />
                      <div>
                        <p className="text-foreground" style={{ fontSize: "0.82rem" }}>{primaryColor}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>Botões e links</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-muted-foreground mb-2 block" style={{ fontSize: "0.78rem" }}>Cor de Destaque</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="w-12 h-12 rounded-lg border border-border cursor-pointer" />
                      <div>
                        <p className="text-foreground" style={{ fontSize: "0.82rem" }}>{accentColor}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>Gols e vitórias</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>LOGO DA PLATAFORMA</h3>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Trophy size={32} className="text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Arraste e solte o logo aqui</p>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: "0.72rem" }}>PNG, SVG • Máximo 2MB</p>
                  <button className="mt-3 border border-border text-muted-foreground hover:text-foreground px-4 py-1.5 rounded-lg" style={{ fontSize: "0.78rem" }}>
                    Selecionar arquivo
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection === "notifications" && (
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>PREFERÊNCIAS DE NOTIFICAÇÃO</h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, val]) => {
                  const labels: Record<string, { label: string; desc: string }> = {
                    goals: { label: "Gols marcados", desc: "Notificações quando um gol é registrado" },
                    cards: { label: "Cartões emitidos", desc: "Alertas sobre cartões amarelos e vermelhos" },
                    matches: { label: "Início de partidas", desc: "Aviso quando uma partida começa" },
                    standings: { label: "Atualização de classificação", desc: "Quando a tabela é atualizada" },
                    reports: { label: "Relatórios disponíveis", desc: "Quando novos relatórios são gerados" },
                  };
                  const info = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-foreground" style={{ fontSize: "0.85rem" }}>{info.label}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{info.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                        className={`w-11 h-6 rounded-full transition-all relative ${val ? "bg-primary" : "bg-secondary"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${val ? "left-5.5" : "left-0.5"}`} style={{ left: val ? "calc(100% - 1.375rem)" : "0.125rem" }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(activeSection === "platform" || activeSection === "users" || activeSection === "security") && (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <SettingsIcon size={32} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-foreground mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                {activeSection === "platform" ? "CONFIGURAÇÕES DA PLATAFORMA" : activeSection === "users" ? "CONFIGURAÇÕES DE USUÁRIOS" : "CONFIGURAÇÕES DE SEGURANÇA"}
              </h3>
              <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Estas configurações estão disponíveis para administradores do sistema.</p>
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all ${saved ? "bg-accent text-white" : "bg-primary hover:bg-blue-600 text-white"}`} style={{ fontSize: "0.85rem" }}>
              <Save size={15} /> {saved ? "Configurações salvas!" : "Salvar alterações"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
