'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progress';
import { useAuthStore } from '@/store/auth';

interface ExerciseViewerProps {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  exerciseIndex: number;
  totalExercises: number;
}

export function ExerciseViewer({
  exercise,
  onSubmit,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  exerciseIndex,
  totalExercises,
}: ExerciseViewerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { addXP } = useProgressStore();
  const { token } = useAuthStore();

  const handleMultipleChoice = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = async () => {
    let correct = false;

    if (exercise.type === 'multipleChoice') {
      correct = selectedAnswer === exercise.correctAnswer;
    } else if (exercise.type === 'typing') {
      correct = userInput.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim();
    }

    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      addXP(10);
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercises/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exerciseId: exercise.id,
            userAnswer: exercise.type === 'multipleChoice' ? selectedAnswer : userInput,
            isCorrect: correct,
          }),
        });
      } catch (error) {
        console.error('Failed to submit exercise:', error);
      }
    }

    onSubmit(correct);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setUserInput('');
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {exerciseIndex + 1} of {totalExercises}
          </span>
          <span className="text-sm font-medium text-indigo-600">
            {Math.round(((exerciseIndex + 1) / totalExercises) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((exerciseIndex + 1) / totalExercises) * 100}%` }}
          />
        </div>
      </div>

      {/* Verb Info */}
      {exercise.verb && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-indigo-600">{exercise.verb.character}</div>
            <div>
              <p className="text-sm text-gray-600">Pinyin:</p>
              <p className="text-lg font-semibold text-indigo-600">{exercise.verb.pinyin}</p>
              <p className="text-sm text-gray-600 mt-1">Meaning: {exercise.verb.english}</p>
            </div>
          </div>
        </div>
      )}

      {/* Context */}
      {exercise.context && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Context:</p>
          <p className="text-gray-700 italic">"{exercise.context}"</p>
        </div>
      )}

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{exercise.question}</h2>

        {/* Multiple Choice */}
        {exercise.type === 'multipleChoice' && (
          <div className="space-y-3">
            {exercise.options.map((option) => (
              <button
                key={option}
                onClick={() => !submitted && handleMultipleChoice(option)}
                disabled={submitted}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === option
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                } ${
                  submitted && option === exercise.correctAnswer
                    ? 'border-green-600 bg-green-50'
                    : submitted && selectedAnswer === option && !isCorrect
                    ? 'border-red-600 bg-red-50'
                    : ''
                } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        )}

        {/* Typing Exercise */}
        {exercise.type === 'typing' && (
          <div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => !submitted && setUserInput(e.target.value)}
              disabled={submitted}
              placeholder="Type your answer (character, pinyin, or English)"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none text-lg"
            />
            <p className="text-xs text-gray-500 mt-2">💡 Accepts: Chinese characters, pinyin, or English</p>
          </div>
        )}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            isCorrect
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          <p className="font-semibold">
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-sm mt-1">The correct answer is: {exercise.correctAnswer}</p>
          )}
          {isCorrect && <p className="text-sm mt-1">+10 XP earned!</p>}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={isFirst}
          className="flex-1"
        >
          ← Previous
        </Button>

        {!submitted ? (
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!selectedAnswer && !userInput}
          >
            Check Answer
          </Button>
        ) : (
          <>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Try Again
            </Button>
            <Button onClick={onNext} className="flex-1" disabled={isLast}>
              Next →
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
