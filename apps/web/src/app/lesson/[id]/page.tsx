'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useLessonsStore } from '@/store/lessons';
import { Header } from '@/components/dashboard/Header';
import { ExerciseViewer } from '@/components/exercises/ExerciseViewer';
import { Button } from '@/components/ui/button';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { token } = useAuthStore();
  const {
    currentLesson,
    currentExercise,
    exerciseIndex,
    fetchLessons,
    setCurrentLesson,
    nextExercise,
    previousExercise,
  } = useLessonsStore();

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    if (!currentLesson && token) {
      fetchLessons(token).then(() => {
        // Find and set the lesson
        // This will be handled by the API fetch
      });
    }
  }, [token, currentLesson, fetchLessons, router]);

  if (!currentLesson || !currentExercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  const isFirst = exerciseIndex === 0;
  const isLast = exerciseIndex === (currentLesson.exercises?.length || 0) - 1;
  const totalExercises = currentLesson.exercises?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {/* Lesson Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{currentLesson.title}</h1>
          {currentLesson.description && (
            <p className="text-gray-600 mt-2">{currentLesson.description}</p>
          )}
        </div>

        {/* Exercise Viewer */}
        <ExerciseViewer
          exercise={currentExercise}
          onSubmit={() => {}}
          onNext={nextExercise}
          onPrevious={previousExercise}
          isFirst={isFirst}
          isLast={isLast}
          exerciseIndex={exerciseIndex}
          totalExercises={totalExercises}
        />
      </main>
    </div>
  );
}
