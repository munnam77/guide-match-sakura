import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Avatar utility functions for premium gradient avatars
export function getAvatarGradient(name: string): string {
  const gradients = [
    'from-rose-400 to-pink-600',
    'from-violet-400 to-purple-600',
    'from-blue-400 to-indigo-600',
    'from-emerald-400 to-teal-600',
    'from-amber-400 to-orange-600',
    'from-cyan-400 to-sky-600',
    'from-fuchsia-400 to-pink-600',
    'from-lime-400 to-green-600',
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
