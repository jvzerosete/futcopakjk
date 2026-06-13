import { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StandingsProps { onNavigate: (s: any) => void; }

const standings = [
  { pos: 1, prev: 1, team: "Flamengo FC", city: "Rio de Janeiro", j: 27, v: 18, e: 5, d: 4, gp: 62, gc: 28, sg: 34, pts: 59, form: ["W","W","W","D","W"] },
  { pos: 2, prev: 3, team: "Palmeiras SC", city: "São Paulo", j: 27, v: 16, e: 6, d: 5, gp: 54, gc: 31, sg: 23, pts: 54, form: ["W","W","D","W","L"] },
  { pos: 3, prev: 2, team: "Santos FC", city: "Santos", j: 27, v: 15, e: 5, d: 7, gp: 48, gc: 32, sg: 16, pts: 50, form: ["D","W","W","L","W"] },
  { pos: 4, prev: 4, team: "Corinthians", city: "São Paulo", j: 27, v: 14, e: 6, d: 7, gp: 45, gc: 36, sg: 9, pts: 48, form: ["L","D","W","W","D"] },
  { pos: 5, prev: 6, team: "São Paulo FC", city: "São Paulo", j: 27, v: 13, e: 6, d: 8, gp: 41, gc: 36, sg: 5, pts: 45, form: ["W","L","D","D","W"] },
  { pos: 6, prev: 5, team: "Grêmio", city: "Porto Alegre", j: 27, v: 12, e: 7, d: 8, gp: 42, gc: 38, sg: 4, pts: 43, form: ["L","W","D","W","L"] },
  { pos: 7, prev: 7, team: "Internacional", city: "Porto Alegre", j: 27, v: 11, e: 8, d: 8, gp: 38, gc: 35, sg: 3, pts: 41, form: ["W","D","W","D","L"] },
  { pos: 8, prev: 8, team: "Athletico", city: "Curitiba", j: 27, v: 10, e: 8, d: 9, gp: 36, gc: 40, sg: -4, pts: 38, form: ["D","L","W","L","D"] },
  { pos: 9, prev: 10, team: "Botafogo", city: "Rio de Janeiro", j: 27, v: 9, e: 9, d: 9, gp: 34, gc: 37, sg: -3, pts: 36, form: ["W","W","D","L","W"] },
  { pos: 10, prev: 9, team: "Vasco", city: "Rio de Janeiro", j: 27, v: 9, e: 8, d: 10, gp: 31, gc: 38, sg: -7, pts: 35, form: ["L","D","D","W","L"] },
  { pos: 11, prev: 11, team: "Cruzeiro", city: "Belo Horizonte", j: 27, v: 8, e: 9, d: 10, gp: 30, gc: 39, sg: -9, pts: 33, form: ["D","D","L","W","D"] },
  { pos: 12, prev: 12, team: "Atlético MG", city: "Belo Horizonte", j: 27, v: 8, e: 7, d: 12, gp: 29, gc: 43, sg: -14, pts: 31, form: ["L","L","D","W","L"] },
  { pos: 13, prev: 14, team: "Bahia", city: "Salvador", j: 27, v: 7, e: 8, d: 12, gp: 27, gc: 41, sg: -14, pts: 29, form: ["W","D","L","D","L"] },
  { pos: 14, prev: 13, team: "Fortaleza", city: "Fortaleza", j: 27, v: 6, e: 9, d: 12, gp: 26, gc: 42, sg: -16, pts: 27, form: ["D","L","D","L","D"] },
  { pos: 15, prev: 15, team: "Sport", city: "Recife", j: 27, v: 5, e: 7, d: 15, gp: 21, gc: 49, sg: -28, pts: 22, form: ["L","L","D","L","W"] },
  { pos: 16, prev: 16, team: "Ceará", city: "Fortaleza", j: 27, v: 3, e: 6, d: 18, gp: 18, gc: 56, sg: -38, pts: 15, form: ["L","L","L","D","L"] },
];

const formColor = (r: string) => r === "W" ? "bg-accent" : r === "D" ? "bg-yellow-500" : "bg-destructive";
const posChange = (curr: number, prev: number) => {
  if (curr < prev) return <TrendingUp size={11} className="text-accent" />;
  if (curr > prev) return <TrendingDown size={11} className="text-destructive" />;
  return <Minus size={11} className="text-muted-foreground" />;
};

const zoneColor = (pos: number) => {
  if (pos <= 4) return "border-l-2 border-l-primary";
  if (pos <= 6) return "border-l-2 border-l-yellow-500";
  if (pos >= 15) return "border-l-2 border-l-destructive";
  return "";
};

export function Standings({ onNavigate }: StandingsProps) {
  const [championship, setChampionship] = useState("Copa FutCopa 2025");

  const championships = ["Copa FutCopa 2025", "Liga Municipal Sul", "Copa Empresarial"];

  return (
    <div className="p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>CLASSIFICAÇÃO COMPLETA</h1>
          <p className="text-muted-foreground" style={{ fontSize: "0.82rem" }}>Atualizado em 13/06/2025 • 27ª rodada</p>
        </div>
      </div>

      {/* Championship selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {championships.map(c => (
          <button
            key={c}
            onClick={() => setChampionship(c)}
            className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-colors ${championship === c ? "bg-primary border-primary text-white" : "border-border text-muted-foreground hover:border-primary/50"}`}
            style={{ fontSize: "0.82rem" }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        {[
          { color: "bg-primary", label: "Classificação (1-4)" },
          { color: "bg-yellow-500", label: "Copa (5-6)" },
          { color: "bg-destructive", label: "Rebaixamento (15-16)" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${l.color}`} />
            <span className="text-muted-foreground" style={{ fontSize: "0.68rem" }}>{l.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left py-3 px-4 text-muted-foreground" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)" }}>#</th>
                <th className="text-left py-3 px-3 text-muted-foreground" style={{ fontSize: "0.68rem" }}>EQUIPE</th>
                {["J", "V", "E", "D", "GP", "GC", "SG", "FORMA", "PTS"].map(h => (
                  <th key={h} className="text-center py-3 px-2 text-muted-foreground" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {standings.map((s, i) => (
                <tr key={s.pos} className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${zoneColor(s.pos)}`}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className={`w-6 h-6 rounded flex items-center justify-center ${s.pos <= 4 ? "bg-primary text-white" : s.pos <= 6 ? "bg-yellow-500/20 text-yellow-400" : s.pos >= 15 ? "bg-destructive/20 text-destructive" : "bg-secondary text-muted-foreground"}`}
                        style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)" }}>
                        {s.pos}
                      </span>
                      {posChange(s.pos, s.prev)}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary" style={{ fontSize: "0.52rem", fontWeight: 700 }}>
                          {s.team.split(" ").map(w => w[0]).join("").slice(0, 3)}
                        </span>
                      </div>
                      <div>
                        <p className="text-foreground" style={{ fontSize: "0.82rem" }}>{s.team}</p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.62rem" }}>{s.city}</p>
                      </div>
                    </div>
                  </td>
                  {[s.j, s.v, s.e, s.d, s.gp, s.gc].map((v, vi) => (
                    <td key={vi} className="text-center py-3 px-2 text-muted-foreground" style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>{v}</td>
                  ))}
                  <td className="text-center py-3 px-2">
                    <span className={`font-bold ${s.sg > 0 ? "text-accent" : s.sg < 0 ? "text-destructive" : "text-muted-foreground"}`} style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>
                      {s.sg > 0 ? `+${s.sg}` : s.sg}
                    </span>
                  </td>
                  <td className="text-center py-3 px-2">
                    <div className="flex gap-0.5 justify-center">
                      {s.form.map((f, fi) => (
                        <span key={fi} className={`w-4 h-4 rounded-sm ${formColor(f)} flex items-center justify-center text-white`} style={{ fontSize: "0.5rem" }}>{f}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center py-3 px-3">
                    <span className="text-foreground" style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{s.pts}</span>
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
