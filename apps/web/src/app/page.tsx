'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">🎯 Verbly</h1>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6 mb-12">
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Master Chinese Verbs
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn Mandarin Chinese through verb-focused interactive lessons. Master pronunciation, characters, and real-world usage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8">
              Start Free Today →
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Already a member?
            </Button>
          </Link>
        </div>

        {/* Hero Image/Mockup */}
        <div className="relative h-96 bg-gradient-to-b from-indigo-100 to-purple-100 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">📱</div>
              <p className="text-gray-600 font-semibold">Interactive Learning Platform</p>
              <p className="text-sm text-gray-500">Learn at your own pace, anytime, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why Verbly?
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🗣️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Pinyin & Characters</h4>
              <p className="text-gray-700">
                Learn pronunciation with pinyin and master written characters with interactive lessons.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">✍️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Flexible Input</h4>
              <p className="text-gray-700">
                Type naturally—characters, pinyin, or English. Our smart system accepts all formats.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎮</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Verb-Focused</h4>
              <p className="text-gray-700">
                Unlike other apps, we focus on verbs—the building blocks of communication.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Gamified Learning</h4>
              <p className="text-gray-700">
                Earn XP, build streaks, and track progress with our engaging point system.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">📚</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Progressive Levels</h4>
              <p className="text-gray-700">
                Start as a beginner and advance to intermediate and advanced levels.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🔄</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Spaced Repetition</h4>
              <p className="text-gray-700">
                Scientifically-proven learning method to maximize retention and fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                1
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Sign Up</h4>
              <p className="text-gray-600">Create your free account in seconds</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                2
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Choose Level</h4>
              <p className="text-gray-600">Pick your skill level: Beginner, Intermediate, or Advanced</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                3
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Start Lessons</h4>
              <p className="text-gray-600">Follow curated lessons with interactive exercises</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                4
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Master Verbs</h4>
              <p className="text-gray-600">Earn rewards and become fluent in Chinese verbs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Learners Say
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-gray-700 mb-4">
                "Finally, a Chinese app that focuses on verbs! I can actually have conversations now."
              </p>
              <p className="font-semibold text-gray-900">Sarah Chen</p>
              <p className="text-sm text-gray-600">San Francisco, CA</p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-gray-700 mb-4">
                "The gamified learning keeps me motivated. I haven't missed a day in 50 days!"
              </p>
              <p className="font-semibold text-gray-900">James Liu</p>
              <p className="text-sm text-gray-600">Toronto, Canada</p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-gray-700 mb-4">
                "The flexible input system is genius. I can type in any format and it understands!"
              </p>
              <p className="font-semibold text-gray-900">Maria Rodriguez</p>
              <p className="text-sm text-gray-600">Madrid, Spain</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to Master Chinese Verbs?</h3>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of learners already mastering Mandarin Chinese on Verbly.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8">
              Start Free Today →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Verbly</h4>
              <p className="text-sm text-gray-400">Master Chinese verbs through interactive learning.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Learning</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Courses</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 Verbly. All rights reserved. 🎯</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
