export interface Verb {
  id: string;
  character: string;
  pinyin: string;
  english: string;
  examples: string[];
  difficulty: string;
  audio?: string;
  image?: string;
}

export interface Exercise {
  id: string;
  lessonId: string;
  verbId: string;
  type: 'multipleChoice' | 'fillBlank' | 'typing' | 'matching';
  question: string;
  options: string[];
  correctAnswer: string;
  context?: string;
  verb?: Verb;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  level: string;
  order: number;
  verbs: Array<{
    id: string;
    verbId: string;
    order: number;
    verb: Verb;
  }>;
  exercises?: Exercise[];
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  xp: number;
  streak: number;
  exercisesCompleted: number;
  lessonsCompleted: number;
}

export interface ExerciseSubmission {
  id: string;
  exerciseId: string;
  userId: string;
  userAnswer: string;
  isCorrect: boolean;
}
