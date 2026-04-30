"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";

// Dummy data for now - you'll eventually fetch this from Google Places API
const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: "Nasi Lemak Wanjo",
    rating: 4.5,
    area: "Kg Baru",
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Village Park",
    rating: 4.8,
    area: "Uptown Damansara",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Brader John Burger",
    rating: 4.7,
    area: "TTDI",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
  },
];

export default function SwipeRoom({ params }: { params: { code: string } }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<null | "left" | "right">(null);

  const currentRestaurant = MOCK_RESTAURANTS[currentIndex];

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    setTimeout(() => {
      setDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 200);
  };

  if (currentIndex >= MOCK_RESTAURANTS.length) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Waiting for the gang...
        </h2>
        <p className="text-muted-foreground mt-2">Checking for a match! 🔍</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 font-sans overflow-hidden">
      {/* Top Bar */}
      <div className="w-full max-w-sm flex justify-between items-center mb-8 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Room Code
          </span>
          <span className="text-xl font-mono font-black text-primary">
            {/* {params.code} */}
          </span>
        </div>
        <div className="bg-secondary/20 px-3 py-1.5 rounded-lg border border-border flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary-foreground" />
          <span className="text-xs font-bold text-foreground">3 Online</span>
        </div>
      </div>

      {/* Swipe Stack */}
      <div className="relative w-full max-w-sm aspect-3/4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRestaurant.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: direction === "right" ? 400 : direction === "left" ? -400 : 0,
              rotate:
                direction === "right" ? 20 : direction === "left" ? -20 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-card rounded-3xl border-2 border-border shadow-xl overflow-hidden touch-none"
          >
            {/* Image container */}
            <div className="relative h-2/3 w-full">
              <Image
                width={40}
                height={40}
                src={currentRestaurant.img}
                alt={currentRestaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-primary text-primary-foreground text-[10px] font-black px-2 py-1 rounded shadow-sm">
                  HALAL
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                {currentRestaurant.name}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">
                    {currentRestaurant.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {currentRestaurant.area}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-6 mt-10">
        <button
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-destructive shadow-md hover:bg-destructive hover:text-white transition-all active:translate-y-1"
        >
          <X className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-primary shadow-md hover:bg-primary hover:text-white transition-all active:translate-y-1"
        >
          <Heart className="w-8 h-8 fill-current" />
        </button>
      </div>

      <p className="mt-8 text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase">
        Swipe right if you&apos;re hungry
      </p>
    </div>
  );
}
