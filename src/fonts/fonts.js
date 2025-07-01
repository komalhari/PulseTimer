import localFont from "next/font/local";


export const exerciseFont = localFont({
  src: "./exercise_font.ttf",
  variable: "--excercise-Font",
});

export const digitalFont = localFont({
  src: "./digital_font.ttf",
   variable: "--digital-Font",
});

export const counterFont = localFont({
  src: "./counter_font.otf",
   variable: "--counter-Font",
 
});

export const energyFont = localFont({
  src: "./energy_station.otf",
   variable: "--energy-Font",
 
});


import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});