'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Star, Cloud, Zap } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle registration logic here
    console.log('Register:', { name, email, password });
    // Redirect to home after successful registration
    router.push('/home');
  };

  return (
    <PageContainer>
      <Navbar showBackButton />
      
      <main className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 text-blue-500 opacity-20 transform -rotate-12">
          <Cloud size={120} fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-10 text-yellow-500 opacity-20 transform rotate-12">
          <Star size={140} fill="currentColor" />
        </div>

        <div className="z-10 max-w-md w-full">
          {/* Badge */}
          <div className="inline-block bg-black text-white px-4 py-2 rounded-none border-2 border-black mb-6 transform rotate-2 shadow-[4px_4px_0px_0px_#EF4444] mx-auto block text-center">
            <span className="font-display text-xl tracking-widest">Join the Fun!</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-7xl md:text-8xl text-black mb-2 text-center leading-[0.9]">
            SIGN UP
          </h1>
          <div className="h-2 w-24 bg-black mx-auto mb-10 rounded-full"></div>

          {/* Form Card */}
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#10B981] rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <Zap size={200} />
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Awesome Name"
                label="NAME"
                icon={User}
                required
              />

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

              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                label="CONFIRM PASSWORD"
                icon={Lock}
                required
              />

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  variant="action" 
                  className="w-full py-6 text-2xl"
                >
                  CREATE ACCOUNT <ArrowRight size={28} strokeWidth={3} />
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-1 bg-black"></div>
                <span className="font-display text-xl text-gray-500">OR</span>
                <div className="flex-1 h-1 bg-black"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="font-body text-lg mb-4 text-gray-700">
                  Already have an account?
                </p>
                <Link href="/login">
                  <Button variant="secondary" className="w-full py-4 text-xl">
                    LOG IN
                  </Button>
                </Link>
              </div>
            </form>
          </div>

          {/* Fun Message */}
          <p className="font-body font-bold text-lg text-black mt-8 text-center bg-white/80 p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
            Let&apos;s make some epic stories together! ✨
          </p>
        </div>
      </main>
    </PageContainer>
  );
}
