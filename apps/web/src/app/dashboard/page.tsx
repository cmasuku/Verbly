'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useLessonsStore } from '@/store/lessons';
import { useProgressStore } from '@/store/progress';
import { Header } from '@/components/dashboard/Header';
import { LessonCard } from '@/components/lessons/LessonCard';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const { lessons, isLoading, fetchLessons, setCurrentLesson } = useLessonsStore();
  const { progress, fetchProgress } = useProgressStore();
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchLessons(token, selectedLevel);
    if (user?.id) {
      fetchProgress(user.id, token);
    }
  }, [token, selectedLevel, user?.id, fetchLessons, fetchProgress, router]);

  const handleLessonSelect = (lesson: any) => {
    setCurrentLesson(lesson);
    router.push(`/lesson/${lesson.id}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome back, {user.name}! 👋</h2>
          <p className="text-xl text-gray-600">
            Continue mastering Chinese verbs. You've earned {progress?.xp || 0} XP so far!
          </p>
        </div>

        {/* Level Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose your level</h3>
          <div className="flex gap-3">
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === level
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading lessons...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No lessons available for this level yet.</p>
            <Button onClick={() => setSelectedLevel('beginner')}>
              Go to Beginner Lessons
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onSelect={() => handleLessonSelect(lesson)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
