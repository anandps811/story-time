"use client";

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import * as authApi from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import {toast} from 'sonner';

export function useRegister(): UseMutationResult<unknown, Error, { username: string; email: string; password: string }>{
  const router = useRouter();

  return useMutation<unknown, Error, { username: string; email: string; password: string }>({
    mutationFn: (payload: { username: string; email: string; password: string }) => authApi.registerUser(payload),
    onSuccess: () => {
      toast.success("Registered successfully! Please login.");
      router.push('/login');
    },
    onError: (err: Error | unknown) => {
      // show a helpful message on failure
      const message = err && typeof err === 'object' && 'message' in err ? (err as Error).message : 'Registration failed.';
      toast.error(message);
    },
  });
}

export function useLogin(): UseMutationResult<unknown, Error, { email: string; password: string }>{
  const router = useRouter();
  return useMutation<unknown, Error, { email: string; password: string }>({
    mutationFn: (payload: { email: string; password: string }) => authApi.loginUser(payload),
    onSuccess: () => {
      toast.success("Login successfully!");
      router.push('/home');
    },
    onError: (err: Error | unknown) => {
      const message = err && typeof err === 'object' && 'message' in err ? (err as Error).message : 'Login failed.';
      toast.error(message);
    },
  });
}
