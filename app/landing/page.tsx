'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Activity, ShieldCheck, Zap, Star, Search, Repeat } from 'lucide-react';
import Link from 'next/link';

// --- Assets ---
const FOOD_URL = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2799&auto=format&fit=crop";

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <div ref={containerRef} className="bg-[#050505] text-white selection:bg-[#10b981]/30 overflow-x-hidden">

            {/* ─── ACT 1: The X-Ray Scan ─── */}
            <ActOne progress={smoothProgress} />

            {/* ─── ACT 2: The Pocket Scientist ─── */}
            <ActTwo progress={smoothProgress} />

            {/* ─── ACT 3: The Workflow (Stacking Cards) ─── */}
            <ActThree />

            {/* ─── ACT 4: The Community (Theme Switch) ─── */}
            <ActFour />

            {/* ─── ACT 5: The Call ─── */}
            <ActFive />

            {/* UI Overlay */}
            <motion.div
                style={{ scaleX: smoothProgress }}
                className="fixed top-0 left-0 right-0 h-1 bg-[#10b981] origin-left z-50"
            />
        </div>
    );
}

// -----------------------------------------------------------------------------
// ACT 1: "The Deception" -> X-Ray Scanner Effect
// -----------------------------------------------------------------------------
function ActOne({ progress }: { progress: any }) {
    const y = useTransform(progress, [0, 0.2], ["0%", "20%"]);
    const scanLineY = useTransform(progress, [0, 0.15], ["0%", "100%"]); // Scanner moves down
    const opacity = useTransform(progress, [0.15, 0.25], [1, 0]);

    return (
        <div className="h-[150vh] relative z-10 sticky top-0">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center perspective-[1000px]">

                {/* Container for Image & Scanner */}
                <motion.div style={{ y, opacity }} className="relative w-full h-full max-w-[100vw]">

                    {/* Layer 1: The "Perfect" Food (Visible by default) */}
                    <div className="absolute inset-0 z-0">
                        <img src={FOOD_URL} alt="Food" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Layer 2: The "Data/Rotten" Version (Revealed by Scanner) */}
                    <motion.div
                        style={{ clipPath: useTransform(scanLineY, (v: any) => `inset(0 0 ${100 - parseFloat(v)}% 0)`) }}
                        className="absolute inset-0 z-10"
                    >
                        {/* We simulate "Data Vision" with CSS filters and overlay */}
                        <img src={FOOD_URL} alt="Scanned Food" className="w-full h-full object-cover filter contrast-[1.4] grayscale-[0.8] brightness-[0.6]" />

                        {/* Data Overlay Grid */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20" />
                        <div className="absolute inset-0 bg-green-900/40 mix-blend-overlay" />

                        {/* Floating Warning Labels */}
                        <div className="absolute top-[30%] left-[20%] border border-red-500 bg-red-500/20 text-red-500 px-2 py-1 text-[10px] font-mono rounded">⚠ BACTERIA CLUSTER</div>
                        <div className="absolute top-[50%] right-[30%] border border-[#ff6b35] bg-[#ff6b35]/20 text-[#ff6b35] px-2 py-1 text-[10px] font-mono rounded">⚠ POOR TEXTURE</div>
                    </motion.div>

                    {/* The Laser Scanner Line */}
                    <motion.div
                        style={{ top: scanLineY }}
                        className="absolute left-0 right-0 h-1 bg-[#10b981] shadow-[0_0_40px_rgba(16,185,129,1)] z-20"
                    >
                        <div className="absolute right-4 -top-8 text-[#10b981] font-mono text-xs font-bold bg-black/80 px-2 py-1 rounded">
                            ANALYZING...
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none text-center px-4">
                        <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter text-white drop-shadow-2xl leading-none mb-6 mix-blend-overlay">
                            UNCOVER<br />THE TRUTH
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-mono bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                            Your eyes lie. VeriFood sees.
                        </p>
                    </div>

                    <motion.div style={{ opacity: useTransform(progress, [0, 0.05], [1, 0]) }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-40">
                        <ChevronDown className="text-white/70 w-8 h-8" />
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// ACT 2: "The Pocket Scientist" -> 3D Floating Phone
// -----------------------------------------------------------------------------
function ActTwo({ progress }: { progress: any }) {
    // 3D Transforms
    const rotateX = useTransform(progress, [0.15, 0.4], [25, 0]);
    const rotateY = useTransform(progress, [0.15, 0.4], [-25, 0]);
    const scale = useTransform(progress, [0.15, 0.4], [0.8, 1]);
    const opacity = useTransform(progress, [0.15, 0.25], [0, 1]);

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative z-20 py-24 overflow-hidden perspective-[1500px]">

            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row items-center gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8 z-10 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#10b981] font-mono text-xs font-bold uppercase tracking-[0.3em] block mb-4">
                            Neural Engine v2.1
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Meet Your<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Personal Food Scientist.</span>
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                            It&apos;s not just a camera. It&apos;s a lab. VeriFood analyzes surface topology, thermal gradients, and color variance in real-time.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:mx-0">
                        {[
                            { label: "Scan Time", val: "0.4s" },
                            { label: "Accuracy", val: "94%" },
                            { label: "Database", val: "14K+" },
                            { label: "Refunds", val: "Instant" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center backdrop-blur-md">
                                <div className="text-2xl font-bold font-mono text-[#10b981]">{stat.val}</div>
                                <div className="text-[10px] uppercase text-white/30 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3D Phone Mockup */}
                <motion.div
                    style={{ rotateX, rotateY, scale, opacity }}
                    className="flex-1 w-full max-w-sm"
                >
                    <div className="relative aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-[#222] shadow-2xl shadow-[#10b981]/10 overflow-hidden">
                        {/* Glow behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-[#10b981]/30 blur-[80px] -z-10" />

                        {/* Internal Screen UI */}
                        <div className="absolute inset-0 bg-[#e2e5b3] flex flex-col p-6 pt-12">
                            <div className="flex justify-between items-center mb-6 opacity-30">
                                <div className="w-12 h-1 bg-black rounded-full" />
                                <div className="w-12 h-1 bg-black rounded-full" />
                            </div>

                            {/* Scanning Box */}
                            <div className="flex-1 bg-black/5 border-2 border-[#10b981] rounded-3xl relative overflow-hidden mb-6 flex items-center justify-center">
                                <div className="w-[80%] h-1 bg-[#10b981] shadow-[0_0_15px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
                                <div className="absolute top-4 left-4 bg-black/80 text-[#10b981] text-[10px] font-mono px-2 py-1 rounded">LIVE FEED</div>
                            </div>

                            {/* Detection Results */}
                            <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/40 space-y-3">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-red-500">⚠ SPOILAGE DETECTED</span>
                                    <span className="text-black/40">98% CONFIDENCE</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[98%] bg-red-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// ACT 3: "The Workflow" -> Stacking Cards (Pinned Scroll)
// -----------------------------------------------------------------------------
function ActThree() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className="h-[300vh] relative z-20 bg-[#050505]">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Complete Justice Loop</h2>
                    <p className="text-white/40">From detection to refund in three steps.</p>
                </div>

                <div className="relative w-full max-w-md aspect-[4/5] md:aspect-[3/2]">
                    {/* Card 1: Verified Claim */}
                    <StackedCard
                        progress={scrollYProgress}
                        range={[0, 0.33]}
                        index={0}
                        title="Verified Claim"
                        desc="Our AI generates a tamper-proof spoilage report. Accepted by major delivery platforms."
                        icon={ShieldCheck}
                        color="from-blue-500/20 to-blue-600/5"
                        borderColor="border-blue-500/30"
                        textColor="text-blue-400"
                    />

                    {/* Card 2: Smart Cravings */}
                    <StackedCard
                        progress={scrollYProgress}
                        range={[0.33, 0.66]}
                        index={1}
                        title="Smart Cravings"
                        desc="Hungry? We identify what you *wanted* to eat and find the best verified alternative nearby."
                        icon={Search}
                        color="from-[#ff6b35]/20 to-[#ff6b35]/5"
                        borderColor="border-[#ff6b35]/30"
                        textColor="text-[#ff6b35]"
                    />

                    {/* Card 3: Insta-Substitute */}
                    <StackedCard
                        progress={scrollYProgress}
                        range={[0.66, 1]}
                        index={2}
                        title="Insta-Substitute"
                        desc="One-tap reorder. Use your refund instantly to get fresh food delivered in minutes."
                        icon={Repeat}
                        color="from-[#10b981]/20 to-[#10b981]/5"
                        borderColor="border-[#10b981]/30"
                        textColor="text-[#10b981]"
                    />
                </div>

            </div>
        </div>
    );
}

function StackedCard({ progress, range, index, title, desc, icon: Icon, color, borderColor, textColor }: any) {
    const opacity = useTransform(progress, [range[0], range[0] + 0.1], [0, 1]);
    const y = useTransform(progress, [range[0], range[0] + 0.1], [100, 0]);
    const scale = useTransform(progress, [range[0], range[1]], [1, 0.95]); // Slight scale down as next card comes

    // First card is always visible initially
    const isFirst = index === 0;

    return (
        <motion.div
            style={{
                opacity: isFirst ? 1 : opacity,
                y: isFirst ? 0 : y,
                scale: isFirst ? useTransform(progress, [0, 0.33], [1, 0.9]) : scale,
                zIndex: index
            }}
            className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${color} backdrop-blur-2xl border ${borderColor} p-8 md:p-12 flex flex-col justify-between shadow-2xl`}
        >
            <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center ${textColor}`}>
                    <Icon size={32} />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h3>
                <p className="text-lg text-white/60 leading-relaxed">{desc}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-white/20">
                <span>Step 0{index + 1}</span>
                <ArrowRight className={textColor} />
            </div>
        </motion.div>
    );
}

// -----------------------------------------------------------------------------
// ACT 4: "The Movement" -> Theme Switch to Sage Green
// -----------------------------------------------------------------------------
function ActFour() {
    return (
        <div className="relative z-30 bg-[#e2e5b3] text-black py-32 rounded-t-[4rem] -mt-24 transition-colors duration-1000">

            <div className="max-w-[1300px] mx-auto px-6 md:px-10">
                <div className="text-center mb-20">
                    <span className="text-[#10b981] font-mono text-xs font-bold uppercase tracking-[0.3em] block mb-4">
                        Social Proof
                    </span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
                        You Are Not Alone.
                    </h2>
                    <p className="text-black/50 text-xl max-w-2xl mx-auto">
                        Join 12,400+ foodies who stopped accepting bad deliveries.
                    </p>
                </div>

                {/* Testimonial List (Horizontal Scroll) */}
                <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x">
                    {[
                        { name: "Priya S.", text: "I actually got a refund in 12 seconds. INSANE.", tag: "Refunded" },
                        { name: "Arjun K.", text: "The spoilage detection saved me from food poisoning.", tag: "Health" },
                        { name: "Sara M.", text: "Finally an app that holds restaurants accountable.", tag: "Justice" },
                        { name: "Dev R.", text: "Cleanest UI I've ever seen. The lab vibe is real.", tag: "Design" },
                    ].map((t, i) => (
                        <div key={i} className="min-w-[300px] md:min-w-[400px] bg-white/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-black/5 snap-center transition-transform hover:scale-105">
                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="black" className="text-black" />)}
                            </div>
                            <p className="text-2xl font-bold leading-tight mb-8">&quot;{t.text}&quot;</p>
                            <div className="flex justify-between items-center border-t border-black/5 pt-6">
                                <span className="font-bold text-sm opacity-50">{t.name}</span>
                                <span className="text-[10px] uppercase font-bold bg-black/5 text-black/50 px-3 py-1.5 rounded-full">{t.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// ACT 5: The Call
// -----------------------------------------------------------------------------
function ActFive() {
    return (
        <div className="h-[80vh] bg-black text-white flex flex-col items-center justify-center relative z-20 text-center px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-10 leading-none">
                    Verify Your<br />
                    <span className="text-[#10b981]">Next Meal.</span>
                </h2>

                <Link href="/" className="inline-block group relative z-30">
                    <div className="absolute inset-0 bg-[#10b981] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                    <button className="relative bg-[#10b981] text-black px-16 py-8 rounded-full font-bold text-2xl md:text-3xl flex items-center gap-6 hover:scale-105 transition-transform active:scale-95 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                        Enter Lab Protocol <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                    </button>
                </Link>
            </div>

            <footer className="absolute bottom-10 w-full text-center opacity-30 text-[10px] font-mono uppercase tracking-[0.3em]">
                &copy; 2026 VERIFOOD INC. ALL RIGHTS RESERVED.
            </footer>
        </div>
    );
}
