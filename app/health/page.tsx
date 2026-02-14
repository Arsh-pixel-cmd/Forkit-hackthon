'use client';

import { useState } from 'react';
import { Activity, TrendingUp, ChevronDown, ChevronUp, Thermometer, ShieldAlert, FileText, Flame, Droplets } from 'lucide-react';

const HISTORY = [
    {
        id: 'h1', date: 'Today', time: '14:30', name: 'Grilled Chicken Salad', score: 92, status: 'Safe', calories: 310,
        details: { temp: '4°C (Optimal)', allergens: ['None'], notes: 'Fresh ingredients verified. Dressing consistency matches standard. No bacterial indicators present in surface analysis.' }
    },
    {
        id: 'h2', date: 'Yesterday', time: '20:15', name: 'Paneer Tikka Wrap', score: 65, status: 'Caution', calories: 480,
        details: { temp: '8°C (Elevated)', allergens: ['Dairy', 'Gluten'], notes: 'Slight discoloration on paneer edges. Wrap integrity acceptable but moisture content elevated.' }
    },
    {
        id: 'h3', date: 'Feb 12', time: '12:45', name: 'Mixed Fruit Bowl', score: 28, status: 'Unsafe', calories: 180,
        details: { temp: '12°C (High)', allergens: ['Tree Nuts'], notes: 'Mold detected on strawberry surface. Banana oxidation beyond threshold. Auto-refund triggered.' }
    },
    {
        id: 'h4', date: 'Feb 11', time: '19:00', name: 'Veg Biryani', score: 88, status: 'Safe', calories: 520,
        details: { temp: '65°C (Hot)', allergens: ['None'], notes: 'Rice grain integrity excellent. Spice profile matches RecipeDB #8421. Vegetable freshness confirmed.' }
    },
];

const scoreColor = (s: number) => s > 70 ? 'text-[#10b981]' : s > 40 ? 'text-[#ff6b35]' : 'text-red-500';
const statusBg = (s: string) => s === 'Safe' ? 'bg-[#10b981]/10 text-[#10b981]' : s === 'Caution' ? 'bg-[#ff6b35]/10 text-[#ff6b35]' : 'bg-red-500/10 text-red-500';

export default function HealthPage() {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[#e2e5b3] pl-0 md:pl-[72px]">
            <header className="px-6 md:px-10 pt-8 md:pt-10 max-w-[1300px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-blink" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 font-[family-name:var(--font-mono)]">
                        community_node // health
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.88] tracking-tight">
                    Health<br />Report
                </h1>
            </header>

            <main className="px-6 md:px-10 max-w-[1300px] mx-auto pb-36 mt-8 space-y-6">

                {/* ─── Insight Banner: asymmetric split ─── */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-[2] bg-[#10b981] text-white rounded-[2rem] p-7 relative overflow-hidden grain">
                        <div className="absolute inset-0 dot-grid opacity-10" />
                        <div className="relative z-10">
                            <TrendingUp size={28} className="mb-4 opacity-60" />
                            <h3 className="text-2xl font-bold leading-tight mb-2">+15% protein intake<br />this week</h3>
                            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                Your dietary pattern shows healthier choices. Average safety score rose to <strong className="text-white">87/100</strong> across 12 scans.
                            </p>
                        </div>
                    </div>

                    {/* Side stats — stacked vertically */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="bg-white/50 rounded-2xl p-5 border border-white/20 flex items-center gap-4">
                            <Flame size={20} className="text-[#ff6b35]" />
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 block">Avg Calories</span>
                                <span className="text-2xl font-bold font-[family-name:var(--font-mono)]">372</span>
                            </div>
                        </div>
                        <div className="bg-white/50 rounded-2xl p-5 border border-white/20 flex items-center gap-4">
                            <Droplets size={20} className="text-blue-400" />
                            <div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 block">Refunds</span>
                                <span className="text-2xl font-bold font-[family-name:var(--font-mono)]">₹567</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Analysis Log ─── */}
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <Activity size={16} className="text-[#10b981]" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Scan Log</span>
                        <div className="flex-1 h-px bg-black/5" />
                        <span className="text-[10px] text-black/25 font-[family-name:var(--font-mono)]">{HISTORY.length} entries</span>
                    </div>

                    <div className="space-y-3">
                        {HISTORY.map((item, i) => (
                            <div
                                key={item.id}
                                className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:border-black/10 animate-reveal"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="w-full text-left p-5 flex items-center gap-4">
                                    {/* Score pill */}
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold font-[family-name:var(--font-mono)] ${scoreColor(item.score)} bg-black/[0.03]`}>
                                        {item.score}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${statusBg(item.status)}`}>{item.status}</span>
                                        </div>
                                        <p className="text-[11px] text-black/30 font-[family-name:var(--font-mono)] mt-0.5">
                                            {item.date} · {item.time} · {item.calories} kcal
                                        </p>
                                    </div>

                                    {expanded === item.id ? <ChevronUp size={16} className="text-black/20 shrink-0" /> : <ChevronDown size={16} className="text-black/20 shrink-0" />}
                                </button>

                                {expanded === item.id && (
                                    <div className="px-5 pb-5 pt-0 border-t border-black/[0.04] animate-reveal">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                            {[
                                                { icon: Thermometer, color: 'text-[#ff6b35]', label: 'Temperature', value: item.details.temp },
                                                { icon: ShieldAlert, color: 'text-red-400', label: 'Allergens', value: item.details.allergens.join(', ') },
                                                { icon: FileText, color: 'text-black/30', label: 'Lab Notes', value: item.details.notes },
                                            ].map(d => (
                                                <div key={d.label} className="flex items-start gap-3 bg-black/[0.03] p-4 rounded-xl">
                                                    <d.icon size={15} className={`${d.color} mt-0.5 shrink-0`} />
                                                    <div>
                                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 block mb-1">{d.label}</span>
                                                        <span className="text-xs font-medium text-black/60 leading-relaxed">{d.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
