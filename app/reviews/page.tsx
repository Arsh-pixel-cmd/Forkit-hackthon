'use client';

import { useState } from 'react';
import { Star, Send, Award, MessageCircle, Sparkles, ArrowUpRight } from 'lucide-react';

const REVIEWS = [
    { id: 'r1', user: 'Priya S.', initial: 'P', bg: 'bg-[#10b981]', rating: 5, text: 'Green Bowl knocked it out today. The avocado was perfectly ripe. Dressing was insane — chef-kiss level. Already ordering for tomorrow.', tags: ['Fresh', 'Premium'], time: '2h ago' },
    { id: 'r2', user: 'Arjun M.', initial: 'A', bg: 'bg-[#ff6b35]', rating: 3, text: 'Pizza was okay-ish. Arrived lukewarm, cheese had started to solidify. Taste-wise fine but they need better thermal packaging honestly.', tags: ['Lukewarm', 'Packaging Issue'], time: '5h ago' },
    { id: 'r3', user: 'Sara K.', initial: 'S', bg: 'bg-red-500', rating: 1, text: 'Found. Hair. In. My. Biryani. Filed a claim through VeriFood scan and got refund in 12 seconds. At least the platform works even if the restaurant doesn\'t.', tags: ['Contaminated', 'Auto-Refunded'], time: '1d ago' },
    { id: 'r4', user: 'Dev R.', initial: 'D', bg: 'bg-blue-500', rating: 4, text: 'Ocean Bites sushi was legit. Fish was cold and fresh, rice was well-seasoned. One piece was a little warm but I\'d still give them a solid 4.', tags: ['Fresh', 'Reliable'], time: '1d ago' },
];

export default function ReviewsPage() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [points] = useState(350);

    return (
        <div className="min-h-screen bg-[#e2e5b3] pl-0 md:pl-[72px]">
            <header className="px-6 md:px-10 pt-8 md:pt-10 max-w-[1300px] mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#10b981] animate-blink" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/30 font-[family-name:var(--font-mono)]">
                        community_feed // live
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.88] tracking-tight">
                    Live<br />Reviews
                </h1>
            </header>

            <main className="px-6 md:px-10 max-w-[1300px] mx-auto pb-36 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* ─── LEFT: Compose + Points ─── */}
                    <div className="lg:w-[380px] shrink-0 space-y-5">
                        {/* Points — compact, not a big banner */}
                        <div className="bg-black rounded-2xl p-5 text-white relative overflow-hidden grain">
                            <div className="absolute inset-0 crosshatch opacity-40" />
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Award size={20} className="text-[#ff6b35]" />
                                    <div>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 block">Points</span>
                                        <span className="text-2xl font-bold font-[family-name:var(--font-mono)]">{points}</span>
                                    </div>
                                </div>
                                <span className="text-[9px] text-white/20 font-bold uppercase tracking-wider">+50 per review</span>
                            </div>
                        </div>

                        {/* Compose box */}
                        <div className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 flex items-center gap-1.5">
                                    <Sparkles size={13} className="text-[#ff6b35]" /> New Review
                                </span>
                                <span className="text-[10px] text-black/20">{text.length}/280</span>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1.5 mb-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <button
                                        key={i}
                                        onClick={() => setRating(i)}
                                        onMouseEnter={() => setHoveredStar(i)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        className="transition-transform hover:scale-125 active:scale-90"
                                    >
                                        <Star
                                            size={24}
                                            fill={i <= (hoveredStar || rating) ? '#ff6b35' : 'transparent'}
                                            className={`transition-colors ${i <= (hoveredStar || rating) ? 'text-[#ff6b35]' : 'text-black/10'}`}
                                        />
                                    </button>
                                ))}
                                {rating > 0 && (
                                    <span className="text-xs font-bold text-black/30 ml-2 self-center">
                                        {['', 'Terrible', 'Bad', 'Okay', 'Good', 'Amazing'][rating]}
                                    </span>
                                )}
                            </div>

                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value.slice(0, 280))}
                                placeholder="What was your honest experience?"
                                className="w-full bg-white/70 rounded-xl p-4 h-28 resize-none text-sm focus:outline-none focus:ring-2 ring-[#10b981]/20 placeholder:text-black/20 leading-relaxed"
                            />

                            <button
                                disabled={!text || rating === 0}
                                className="w-full mt-3 bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-15 disabled:cursor-not-allowed hover:bg-black/85 active:scale-[0.98] transition-all"
                            >
                                <Send size={14} /> Post
                            </button>
                        </div>

                        {/* Micro tip */}
                        <p className="text-[10px] text-black/20 text-center font-[family-name:var(--font-mono)] uppercase tracking-[0.2em]">
                            honest reviews only · community moderated
                        </p>
                    </div>

                    {/* ─── RIGHT: Feed ─── */}
                    <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageCircle size={16} className="text-[#10b981]" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Feed</span>
                            <div className="flex-1 h-px bg-black/5" />
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#10b981]">
                                <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-blink" />
                                Live
                            </div>
                        </div>

                        {REVIEWS.map((r, i) => (
                            <div
                                key={r.id}
                                className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/20 p-5 hover:border-black/[0.06] transition-all group animate-reveal"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="flex gap-4">
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 ${r.bg} text-white rounded-xl flex items-center justify-center font-bold text-sm shrink-0`}>
                                        {r.initial}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-sm">{r.user}</span>
                                            <span className="text-[10px] text-black/20">·</span>
                                            <span className="text-[10px] text-black/25">{r.time}</span>
                                            <div className="flex-1" />
                                            {/* Rating compact */}
                                            <div className="flex items-center gap-0.5">
                                                <Star size={11} fill="#ff6b35" className="text-[#ff6b35]" />
                                                <span className="text-xs font-bold text-black/40">{r.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-[13px] text-black/55 leading-relaxed mb-3">{r.text}</p>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            {r.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg bg-black/[0.03] text-black/30 border border-black/[0.03]">
                                                    {tag}
                                                </span>
                                            ))}
                                            <div className="flex-1" />
                                            <ArrowUpRight size={14} className="text-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
