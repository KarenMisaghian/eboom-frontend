'use client';

import type { TProcessEnv } from "@/src/types/environment";

function isBrowser() {
  return Boolean(typeof window !== 'undefined' && window.__env);
}

export function env(key: keyof TProcessEnv | string) {
  if (!key.length) {
    throw new Error('No env key provided');
  }

  if (isBrowser() && window.__env) {
    return window.__env[key] === '' ? '' : window.__env[key];
  }

  return process.env[key] === '' ? '' : process.env[key];
}
