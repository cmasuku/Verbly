'use client';

import { Lesson } from '@/types';
import { Button } from '@/components/ui/button';

interface LessonCardProps {
  lesson: Lesson;
  onSelect: () => void;
}

export function LessonCard({ lesson, onSelect }: LessonCardProps) {
  const verbCount = lesson.verbs?.length || 0;
  const exerciseCount = lesson.exercises?.length || 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{lesson.title}</h3>
          <p className="text-sm text-gray-500 capitalize mt-1">{lesson.level} Level</p>
        </div>
        <div className="text-3xl">📚</div>
      </div>

      {lesson.description && <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>}

      <div className="flex gap-4 mb-4 text-sm text-gray-600">
        <span>🗣️ {verbCount} verbs</span>
        <span>✍️ {exerciseCount} exercises</span>
      </div>

      <Button onClick={onSelect} className="w-full">
        Start Lesson →
      </Button>
    </div>
  );
}
