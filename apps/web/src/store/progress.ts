'use client';

import { create } from 'zustand';
import { UserProgress } from '@/types';

interface ProgressState {
  progress: UserProgress | null;
  isLoading: boolean;
  error: string | null;
  fetchProgress: (userId: string, token: string) => Promise<void>;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  isLoading: false,
  error: null,

  fetchProgress: async (userId: string, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/api/progress/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch progress');

      const progress = await response.json();
      set({ progress, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  addXP: (amount: number) => {
    const { progress } = get();
    if (progress) {
      set({
        progress: {
          ...progress,
          xp: progress.xp + amount,
        },
      });
    }
  },

  incrementStreak: () => {
    const { progress } = get();
    if (progress) {
      set({
        progress: {
          ...progress,
          streak: progress.streak + 1,
        },
      });
    }
  },

  resetStreak: () => {
    const { progress } = get();
    if (progress) {
      set({
        progress: {
          ...progress,
          streak: 0,
        },
      });
    }
  },
}));
