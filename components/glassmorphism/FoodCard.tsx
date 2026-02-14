'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';

interface FoodItem {
    id: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    category: string;
    prepTime: string;
}

interface FoodCardProps {
    item: FoodItem;
    onClick: () => void;
    priority?: boolean;
}

export default function FoodCard({ item, onClick, priority = false }: FoodCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative h-full flex flex-col"
        >
            {/* Glass Background Panel */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:bg-white/60 group-hover:-translate-y-2" />

            {/* Content Container */}
            <div className="relative z-10 p-6 pt-20 flex flex-col h-full">
                {/* Floating Image */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3">
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                        <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 160px, 200px" // explicitly sizing the 40/40 w/h
                            priority={priority}
                            className="object-cover"
                        />
                    </div>
                    {/* Badge */}
                    <div className="absolute bottom-0 right-0 bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg translate-y-2 opacity-0 group-hover:opacity-100 transition-all delay-100">
                        {item.prepTime}
                    </div>
                </div>

                {/* Text Content */}
                <div className="mt-4 flex-1 text-center group-hover:transform group-hover:translate-y-1 transition-transform">
                    <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black/40 mb-2 bg-white/50 px-2 py-1 rounded-lg">
                        {item.category}
                    </span>
                    <h3 className="font-bold text-2xl mb-2 leading-tight text-balance group-hover:text-black transition-colors">{item.name}</h3>
                    <p className="text-sm text-black/50 line-clamp-2 leading-relaxed px-2">{item.desc}</p>
                </div>

                {/* Action Footer */}
                <div className="mt-8 flex items-center justify-between gap-4 px-2">
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] uppercase font-bold text-black/30">Price</span>
                        <span className="font-bold text-xl">₹ {item.price.toFixed(0)}</span>
                    </div>

                    <button
                        className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all duration-300 group/btn relative overflow-hidden"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic could go here
                            onClick();
                        }}
                    >
                        <Plus size={24} className="relative z-10" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}
