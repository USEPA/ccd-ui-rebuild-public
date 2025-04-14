import {afterEach, vi} from 'vitest';
import '@testing-library/jest-dom/vitest';
import {cleanup} from '@testing-library/vue';

// Run cleanup after each test
afterEach(() => {
  cleanup();
});

// Resolves matchMedia is not a function type error created by PrimeVue's Menubar
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
