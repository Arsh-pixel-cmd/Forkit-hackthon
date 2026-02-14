'use client';

import { Microscope, Activity, MessageCircle, Tag, User, Fingerprint, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    { id: 'story', icon: Sparkles, label: 'Story', href: '/landing' },
    { id: 'scan', icon: Microscope, label: 'Scan', href: '/' },
    { id: 'health', icon: Activity, label: 'Health', href: '/health' },
    { id: 'reviews', icon: MessageCircle, label: 'Feed', href: '/reviews' },
    { id: 'deals', icon: Tag, label: 'Deals', href: '/deals' },
    { id: 'profile', icon: User, label: 'You', href: '/profile' }
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <>
            {/* ─── MOBILE: Docked pill ─── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3">
                <div className="bg-black rounded-[1.8rem] px-1 py-1 flex items-stretch shadow-2xl shadow-black/30 border border-white/[0.04]">
                    {tabs.map(({ id, icon: Icon, label, href }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={id}
                                href={href}
                                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 rounded-[1.4rem] transition-all duration-300 relative
                  ${isActive ? 'bg-white/[0.08]' : ''}`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={isActive ? 2.5 : 1.5}
                                    className={isActive ? 'text-[#10b981]' : 'text-white/25'}
                                />
                                <span className={`text-[8px] font-bold uppercase tracking-[0.15em] ${isActive ? 'text-white/70' : 'text-white/20'}`}>
                                    {label}
                                </span>
                                {isActive && (
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#10b981] rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ─── DESKTOP: Rail with character ─── */}
            <div className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[72px] bg-[#0a0a0a] z-50 border-r border-white/[0.04]">
                {/* Top: Logo mark */}
                <div className="flex items-center justify-center h-20 border-b border-white/[0.04]">
                    <div className="relative">
                        <Fingerprint size={26} className="text-[#10b981]" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#10b981] rounded-full animate-blink" />
                    </div>
                </div>

                {/* Middle: Links */}
                <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4">
                    {tabs.map(({ id, icon: Icon, label, href }, i) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={id}
                                href={href}
                                className={`group relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300
                  ${isActive
                                        ? 'bg-white/[0.08] text-[#10b981]'
                                        : 'text-white/20 hover:text-white/50 hover:bg-white/[0.03]'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 -translate-x-[24px] w-[3px] h-5 bg-[#10b981] rounded-r-full" />
                                )}
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />

                                {/* Tooltip */}
                                <div className="absolute left-[68px] px-3 py-1.5 bg-[#1a1a1a] text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/[0.06]">
                                    {label}
                                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#1a1a1a] rotate-45 border-l border-b border-white/[0.06]" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom: Version tag */}
                <div className="flex items-center justify-center h-16 border-t border-white/[0.04]">
                    <span className="text-[8px] text-white/10 font-bold uppercase tracking-[0.3em] rotate-0">v2.1</span>
                </div>
            </div>
        </>
    );
}
