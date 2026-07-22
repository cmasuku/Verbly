'use client';

import { create } from 'zustand';
import { Lesson, Exercise } from '@/types';

interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  currentExercise: Exercise | null;
  exerciseIndex: number;
  isLoading: boolean;
  error: string | null;
  fetchLessons: (token: string, level?: string) => Promise<void>;
  setCurrentLesson: (lesson: Lesson) => void;
  setCurrentExercise: (exercise: Exercise, index: number) => void;
  nextExercise: () => void;
  previousExercise: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useLessonsStore = create<LessonsState>((set, get) => ({
  lessons: [],
  currentLesson: null,
  currentExercise: null,
  exerciseIndex: 0,
  isLoading: false,
  error: null,

  fetchLessons: async (token: string, level?: string) => {
    set({ isLoading: true, error: null });
    try {
      const query = level ? `?level=${level}` : '';
      const response = await fetch(`${API_URL}/api/lessons${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch lessons');

      const lessons = await response.json();
      set({ lessons, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  setCurrentLesson: (lesson: Lesson) => {
    set({ currentLesson: lesson, exerciseIndex: 0 });
    if (lesson.exercises && lesson.exercises.length > 0) {
      set({ currentExercise: lesson.exercises[0] });
    }
  },

  setCurrentExercise: (exercise: Exercise, index: number) => {
    set({ currentExercise: exercise, exerciseIndex: index });
  },

  nextExercise: () => {
    const { currentLesson, exerciseIndex } = get();
    if (currentLesson?.exercises) {
      const nextIndex = exerciseIndex + 1;
      if (nextIndex < currentLesson.exercises.length) {
        set({
          currentExercise: currentLesson.exercises[nextIndex],
          exerciseIndex: nextIndex,
        });
      }
    }
  },

  previousExercise: () => {
    const { exerciseIndex, currentLesson } = get();
    if (exerciseIndex > 0 && currentLesson?.exercises) {
      const prevIndex = exerciseIndex - 1;
      set({
        currentExercise: currentLesson.exercises[prevIndex],
        exerciseIndex: prevIndex,
      });
    }
  },
}));
