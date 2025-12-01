"use client";

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import * as authApi from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

export function useRegister(): UseMutationResult<unknown, Error, { username: string; email: string; password: string }>{
  const router = useRouter();

  return useMutation<unknown, Error, { username: string; email: string; password: string }>({
    mutationFn: (payload: { username: string; email: string; password: string }) => authApi.registerUser(payload),
    onSuccess: () => router.push('/login'),
  });
}

export function useLogin(): UseMutationResult<unknown, Error, { email: string; password: string }>{
  const router = useRouter();
  return useMutation<unknown, Error, { email: string; password: string }>({
    mutationFn: (payload: { email: string; password: string }) => authApi.loginUser(payload),
    onSuccess: () => router.push('/home'),
  });
}
