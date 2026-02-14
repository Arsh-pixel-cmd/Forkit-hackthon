'use client';

import { useState } from 'react';
import { Tag, ShoppingBag, Truck, Apple, Stethoscope, Check, Copy, ArrowRight } from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'All', icon: Tag },
    { id: 'food', label: 'Food', icon: Truck },
    { id: 'health', label: 'Health', icon: Stethoscope },
    { id: 'grocery', label: 'Grocery', icon: Apple },
];

const DEALS = [
    { id: 'd1', title: '50% Off Zomato', sub: 'Orders above ₹299', category: 'food', cost: 200, emoji: '🍕', coupon: 'VFOOD50', hot: true },
    { id: 'd2', title: 'Free Health Checkup', sub: 'Full body analysis', category: 'health', cost: 500, emoji: '🩺', coupon: 'VERIHEALTH', hot: false },
    { id: 'd3', title: '₹100 Off BigBasket', sub: 'Min order ₹500', category: 'grocery', cost: 150, emoji: '🥬', coupon: 'VERIGROCERY', hot: false },
    { id: 'd4', title: '30% Off Swiggy', sub: 'First 3 orders', category: 'food', cost: 100, emoji: '🍔', coupon: 'SWIGVERI30', hot: true },
    { id: 'd5', title: 'Protein Sample', sub: 'MuscleBlaze 250g', category: 'health', cost: 300, emoji: '💪', coupon: 'VERIPROTEIN', hot: false },
    { id: 'd6', title: 'Organic Fruit Box', sub: 'Farm-to-door', category: 'grocery', cost: 250, emoji: '🍎', coupon: 'VERIFARM', hot: false },
];

export default function DealsPage() {
    const [cat, setCat] = useState('all');
    const [points] = useState(350);
    const [claimed, setClaimed] = useState<Record<string, boolean>>({});
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});

    const filtered = cat === 'all' ? DEALS : DEALS.filter(d => d.category === cat);

    return (
        <div className="min-h-screen bg-[#e2e5b3] pl-0 md:pl-[72px]">
            <header className="px-6 md:px-10 pt-8 md:pt-10 max-w-[1300px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#ff6b35] animate-blink" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 font-[family-name:var(--font-mono)]">
                        marketplace // rewards
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.88] tracking-tight">
                    Smart<br />Deals
                </h1>
            </header>

            <main className="px-6 md:px-10 max-w-[1300px] mx-auto pb-36 mt-8 space-y-6">

                {/* ─── Balance strip ─── */}
                <div className="bg-black rounded-2xl p-5 text-white flex items-center justify-between relative overflow-hidden grain">
                    <div className="absolute inset-0 dot-grid opacity-10" />
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ff6b35]/20 rounded-xl flex items-center justify-center">
                            <Tag size={22} className="text-[#ff6b35]" />
                        </div>
                        <div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 block">Available Balance</span>
                            <span className="text-3xl font-bold font-[family-name:var(--font-mono)]">{points}<span className="text-white/20 text-sm ml-1">pts</span></span>
                        </div>
                    </div>
                    <span className="relative z-10 text-[9px] text-white/20 font-bold uppercase tracking-wider hidden md:block">
                        Earn more in Reviews →
                    </span>
                </div>

                {/* ─── Categories as pills ─── */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {CATEGORIES.map(c => {
                        const Icon = c.icon;
                        const active = cat === c.id;
                        return (
                            <button
                                key={c.id}
                                onClick={() => setCat(c.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${active ? 'bg-black text-white' : 'bg-white/40 text-black/35 hover:bg-white/60 hover:text-black/50'
                                    }`}
                            >
                                <Icon size={14} /> {c.label}
                            </button>
                        );
                    })}
                </div>

                {/* ─── Deals list — not a grid, a list with unique layout ─── */}
                <div className="space-y-3">
                    {filtered.map((deal, i) => {
                        const isClaimed = claimed[deal.id];
                        const isRevealed = revealed[deal.id];
                        const canAfford = points >= deal.cost;

                        return (
                            <div
                                key={deal.id}
                                className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 p-5 flex items-center gap-5 hover:border-black/[0.06] transition-all group animate-reveal"
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                {/* Emoji */}
                                <div className="w-14 h-14 bg-black/[0.03] rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                    {deal.emoji}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm truncate">{deal.title}</h4>
                                        {deal.hot && (
                                            <span className="text-[8px] font-bold uppercase tracking-wider bg-[#ff6b35] text-white px-1.5 py-0.5 rounded">hot</span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-black/30 mt-0.5">{deal.sub}</p>
                                </div>

                                {/* Cost */}
                                <div className="text-right shrink-0 mr-2 hidden sm:block">
                                    <span className="text-lg font-bold font-[family-name:var(--font-mono)]">{deal.cost}</span>
                                    <span className="text-[10px] text-black/25 block">pts</span>
                                </div>

                                {/* Action button */}
                                <div className="shrink-0 w-28">
                                    {!isClaimed ? (
                                        <button
                                            onClick={() => canAfford && setClaimed(p => ({ ...p, [deal.id]: true }))}
                                            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${canAfford
                                                    ? 'bg-black text-white hover:bg-black/85 active:scale-95'
                                                    : 'bg-black/[0.04] text-black/20 cursor-not-allowed'
                                                }`}
                                        >
                                            {canAfford ? <>Redeem <ArrowRight size={12} /></> : 'Low pts'}
                                        </button>
                                    ) : !isRevealed ? (
                                        <button
                                            onClick={() => setRevealed(p => ({ ...p, [deal.id]: true }))}
                                            className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#10b981] text-white flex items-center justify-center gap-1 hover:brightness-110 active:scale-95 transition-all"
                                        >
                                            <Check size={12} /> Reveal
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-1 bg-[#10b981]/10 border border-dashed border-[#10b981]/20 rounded-xl px-2.5 py-2">
                                            <span className="text-[11px] font-bold font-[family-name:var(--font-mono)] text-[#10b981] truncate">{deal.coupon}</span>
                                            <Copy size={12} className="text-[#10b981]/50 shrink-0 cursor-pointer hover:text-[#10b981] transition-colors" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
