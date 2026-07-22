'use client';

import { useAuthStore } from '@/store/auth';
import { useProgressStore } from '@/store/progress';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout } = useAuthStore();
  const { progress } = useProgressStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">🎯 Verbly</h1>
          <p className="text-xs text-gray-500">Master Chinese Verbs</p>
        </div>

        <div className="flex items-center gap-8">
          {progress && (
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{progress.xp}</p>
                <p className="text-xs text-gray-600">XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">🔥 {progress.streak}</p>
                <p className="text-xs text-gray-600">Streak</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-700">Welcome, {user.name}!</span>}
            <Button onClick={handleLogout} variant="outline" size="sm">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
