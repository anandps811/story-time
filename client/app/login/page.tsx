"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/lib/hooks/useAuth';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Star, Cloud, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <PageContainer>
      <Navbar showBackButton />
      
      <main className="flex flex-col items-center justify-center min-h-[85vh] px-4 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 text-blue-500 opacity-20 transform -rotate-12">
          <Cloud size={120} fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-10 text-yellow-500 opacity-20 transform rotate-12">
          <Star size={140} fill="currentColor" />
        </div>

        <div className="z-10 max-w-md w-full">
          {/* Badge */}
          <div className="bg-black text-white px-4 py-2 rounded-none border-2 border-black mb-6 transform -rotate-2 shadow-[4px_4px_0px_0px_#10B981] mx-auto text-center">
            <span className="font-display text-xl tracking-widest">Welcome Back!</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-7xl md:text-8xl text-black mb-2 text-center leading-[0.9]">
            LOGIN
          </h1>
          <div className="h-2 w-24 bg-black mx-auto mb-10 rounded-full"></div>

          {/* Form Card */}
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#3B82F6] rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <Zap size={200} />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                label="EMAIL"
                icon={Mail}
                required
              />

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                label="PASSWORD"
                icon={Lock}
                required
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  variant="action" 
                  className="w-full py-6 text-2xl"
                  disabled={loginMutation.isLoading}
                >
                  {loginMutation.isLoading ? 'LOGGING IN...' : 'LOG IN'}
                  <ArrowRight size={28} strokeWidth={3} className="ml-2" />
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-1 bg-black"></div>
                <span className="font-display text-xl text-gray-500">OR</span>
                <div className="flex-1 h-1 bg-black"></div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                {loginMutation.isError && (
                  <div className="mb-4 text-red-600 text-center font-semibold">
                    {(loginMutation.error as any)?.message ?? 'Login failed'}
                  </div>
                )}
                <p className="font-body text-lg mb-4 text-gray-700">
                  Don&apos;t have an account?
                </p>
                <Link href="/register">
                  <Button variant="secondary" className="w-full py-4 text-xl">
                    CREATE ACCOUNT
                  </Button>
                </Link>
              </div>
            </form>
          </div>

          {/* Fun Message */}
          <p className="font-body font-bold text-lg text-black mt-8 text-center bg-white/80 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            Ready to create some awesome stories? 🚀
          </p>
        </div>
      </main>
    </PageContainer>
  );
}
