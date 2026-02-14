'use client';

import { useState } from 'react';
import { Shield, Award, Target, Wallet, Settings, ChevronRight, Edit3, Check, LogOut, Lock, UserCircle, Fingerprint, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('Vikesh K.');
    const [handle, setHandle] = useState('@vikesh_veri');

    return (
        <div className="min-h-screen bg-[#e2e5b3] pl-0 md:pl-[72px]">
            <header className="px-6 md:px-10 pt-8 md:pt-10 max-w-[1300px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-blink" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 font-[family-name:var(--font-mono)]">
                        identity // profile
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.88] tracking-tight">
                    Your<br />Profile
                </h1>
            </header>

            <main className="px-6 md:px-10 max-w-[1300px] mx-auto pb-36 mt-8 space-y-5">

                {/* ─── Identity Card ─── */}
                <div className="bg-black text-white rounded-[2rem] relative overflow-hidden grain">
                    <div className="absolute inset-0 dot-grid opacity-10" />

                    <div className="relative z-10 p-7 md:p-9">
                        <div className="flex items-start gap-5">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#10b981]/50 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg">
                                    {name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10b981] rounded-lg flex items-center justify-center">
                                    <Shield size={10} />
                                </div>
                            </div>

                            {/* Name */}
                            <div className="flex-1 min-w-0 pt-1">
                                {editing ? (
                                    <div className="space-y-2">
                                        <input value={name} onChange={e => setName(e.target.value)} className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white text-lg font-bold focus:outline-none focus:ring-1 ring-[#10b981]/50 w-full" />
                                        <input value={handle} onChange={e => setHandle(e.target.value)} className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white/50 text-xs font-[family-name:var(--font-mono)] focus:outline-none focus:ring-1 ring-[#10b981]/50 w-full" />
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold leading-tight">{name}</h2>
                                        <p className="text-white/30 text-xs font-[family-name:var(--font-mono)] mt-0.5">{handle}</p>
                                    </>
                                )}
                            </div>

                            <button
                                onClick={() => setEditing(!editing)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${editing ? 'bg-[#10b981] text-white' : 'bg-white/[0.06] text-white/30 hover:bg-white/10'}`}
                            >
                                {editing ? <Check size={16} /> : <Edit3 size={16} />}
                            </button>
                        </div>

                        {/* Role badge */}
                        <div className="mt-5 flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.06] px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                <Fingerprint size={12} className="text-[#10b981]" /> Verified Food Analyst
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-[#ff6b35]/10 border border-[#ff6b35]/10 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff6b35]">
                                <Award size={12} /> Gold Tier
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── Stats: asymmetric layout ─── */}
                <div className="flex gap-3">
                    {/* Big stat */}
                    <div className="flex-[2] bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Target size={16} className="text-[#10b981]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">Total Scans</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold font-[family-name:var(--font-mono)]">24</span>
                            <span className="text-xs font-bold text-[#10b981] flex items-center gap-0.5"><TrendingUp size={12} /> +3 this week</span>
                        </div>
                    </div>
                    {/* Small stat */}
                    <div className="flex-1 bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 block mb-2">Accuracy</span>
                        <span className="text-4xl font-bold font-[family-name:var(--font-mono)]">94</span>
                        <span className="text-sm text-black/15 font-bold">%</span>
                    </div>
                </div>

                {/* ─── VeriWallet ─── */}
                <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Wallet size={18} className="text-[#ff6b35]" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">VeriWallet</span>
                            <div className="flex-1 h-px bg-black/5" />
                        </div>

                        <div className="bg-black rounded-2xl p-6 text-white flex items-end justify-between relative overflow-hidden">
                            <div className="absolute inset-0 crosshatch opacity-40" />
                            <div className="relative z-10">
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25 block mb-1">balance</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold font-[family-name:var(--font-mono)] text-[#ff6b35]">350</span>
                                    <span className="text-white/20 text-sm font-bold">pts</span>
                                </div>
                            </div>
                            <div className="relative z-10 text-right">
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 block mb-1">value</span>
                                <span className="text-xl font-bold text-white/50">≈ ₹175</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Settings ─── */}
                <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div className="px-6 pt-5 pb-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 flex items-center gap-1.5">
                            <Settings size={13} className="text-black/25" /> Settings
                        </span>
                    </div>
                    {[
                        { icon: UserCircle, label: 'Personal Info', sub: 'Name, email, phone' },
                        { icon: Lock, label: 'Privacy', sub: 'Data & security preferences' },
                        { icon: LogOut, label: 'Sign Out', sub: 'Log out of VeriFood', danger: true },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-black/[0.02] transition-colors ${i > 0 ? 'border-t border-black/[0.04]' : ''}`}>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.danger ? 'bg-red-500/10' : 'bg-black/[0.03]'}`}>
                                <item.icon size={16} className={item.danger ? 'text-red-500' : 'text-black/30'} />
                            </div>
                            <div className="flex-1 text-left">
                                <span className={`font-bold text-sm ${item.danger ? 'text-red-500' : ''}`}>{item.label}</span>
                                <span className="block text-[11px] text-black/25">{item.sub}</span>
                            </div>
                            <ChevronRight size={16} className="text-black/10 shrink-0" />
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
}
