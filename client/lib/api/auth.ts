type RegisterPayload = { username: string; email: string; password: string };
type LoginPayload = { email: string; password: string };

const base = process.env.NEXT_PUBLIC_API_URL ?? '';

async function request(path: string, opts?: RequestInit) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...opts,
  });

  const text = await res.text();
  let data = {};
  
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    // Response is not valid JSON (likely HTML error page)
    console.error('Failed to parse response as JSON:', e);
    data = { message: 'Invalid server response' };
  }

  if (!res.ok) {
    const err = new Error(data?.message ?? 'Request failed') as Error & { status?: number; data?: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function registerUser(payload: RegisterPayload) {
  return request('/user/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function loginUser(payload: LoginPayload) {
  return request('/user/login', { method: 'POST', body: JSON.stringify(payload) });
}

const auth = { registerUser, loginUser };
export default auth;
