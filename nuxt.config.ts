import { sentryVitePlugin } from '@sentry/vite-plugin';
/* eslint-disable nuxt/nuxt-config-keys-order */
// This env variable gets overwritten during deployments. Currently they are 'CCTE-DEV', 'CCTE-STAGING', & 'CCTE-PRODUCTION'.
const isDeployedEnv = process.env.APPLICATION_ENVIRONMENT_LABEL?.toLowerCase().trim().startsWith('ccte-');

export default defineNuxtConfig({
  extends: ['@usepa/ccte-epa-header-footer'],
  app: {
    baseURL: process.env.APPLICATION_ROUTER_BASE,
  },
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,
  components: [
    {
      path: './components',
      prefix: 'components',
    },
  ],
  hooks: {
    'components:dirs': (dirs) => {
      dirs.push({
        path: '~/components/renderers',
        prefix: 'renderers',
      });
    },
  },
  presets: [
    'pinia',
    '@',
  ],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/base.css',
    'primeicons/primeicons.css',
  ],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
      },
    ],
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    'nuxt-icons',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
  ],
  piniaPersistedstate: {
    storage: 'sessionStorage',
  },
  primevue: {
    autoImport: true,
    options: {
      theme: 'none',
    },
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        indent: 2,
        quotes: 'single',
      },
    },
  },
  security: {
    // This may be needed for new nuxt config updates on crossOriginResourcePolicy & crossOriginEmbedderPolicy
    // corsHandler: {
    //   origin:  ['*.localhost', '*.epa.gov']
    // },
    removeLoggers: isDeployedEnv,
    rateLimiter: false,
    headers: {
      crossOriginResourcePolicy: 'same-site',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      xContentTypeOptions: 'nosniff',
      // TODO: remove the unsafe-none in dev when this issue is resolved. https://github.com/nuxt/nuxt/issues/22141
      crossOriginEmbedderPolicy: isDeployedEnv ? 'require-corp' : 'unsafe-none',
      contentSecurityPolicy: {
        'base-uri': ['\'none\''],
        'font-src': ['\'self\'', 'https:', 'data:'],
        'script-src': ['\'self\'', 'localhost:*', 'https:', 'data:', '*.epa.gov', '\'unsafe-eval\'', '\'unsafe-inline\''],
        'form-action': ['\'self\'', '*.epa.gov'],
        'frame-ancestors': ['\'self\''],
        'worker-src': ['self', 'blob:'],
        'img-src': ['\'self\'', '*.localhost', 'https:', 'data:', '*.epa.gov'],
        'object-src': ['\'none\''],
        'script-src-attr': ['\'none\''],
        'style-src': ['\'self\'', '\'unsafe-inline\'', 'https:'],
        'upgrade-insecure-requests': false,
      },
      strictTransportSecurity: {
        maxAge: 15552000,
        includeSubdomains: true,
      },
    },
  },
  routeRules: {
    '/**': {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      },
    },
    '/dashboard/**': {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      },
    },
  },
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      APPLICATION_ENVIRONMENT_LABEL: process.env.APPLICATION_ENVIRONMENT_LABEL,
      APPLICATION_CCD_API: process.env.APPLICATION_CCD_API,
      APPLICATION_PUBLIC_API: process.env.APPLICATION_PUBLIC_API,
      APPLICATION_STG_API: process.env.APPLICATION_STG_API,
      APPLICATION_EXTERNAL_LINK_URL: process.env.APPLICATION_EXTERNAL_LINK_URL,
      APPLICATION_ROUTER_BASE: process.env.APPLICATION_ROUTER_BASE,
      APPLICATION_TITLE: process.env.APPLICATION_TITLE,
      APPLICATION_NAME: process.env.APPLICATION_NAME,
      CCD_ABOUT: process.env.CCD_ABOUT,
      CCD_HELP: process.env.CCD_HELP,
      CCD_RELEASE_NOTES: process.env.CCD_RELEASE_NOTES,
      CCD_NEWS: process.env.CCD_NEWS,
      CCD_ISSUES: process.env.CCD_ISSUES,
      CCD_DOWNLOADS: process.env.CCD_DOWNLOADS,
      CHEMINFORMATICS_MODULE: process.env.CHEMINFORMATICS_MODULE,
      GENRA_URL: process.env.APPLICATION_GENRA_URL,
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN,
      SENTRY_ENABLE_DEBUG: process.env.SENTRY_ENABLE_DEBUG,
      SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE,
      SENTRY_SESSION_SAMPLE_RATE: process.env.SENTRY_SESSION_SAMPLE_RATE,
      SENTRY_ERROR_SAMPLE_RATE: process.env.SENTRY_ERROR_SAMPLE_RATE,
      sentry: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.APPLICATION_ENVIRONMENT_LABEL,
      },
    },
    private: {
      APPLICATION_PUBLIC_API: process.env.APPLICATION_PUBLIC_API,
      API_KEY: process.env.API_KEY,
    },
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        url: process.env.SENTRY_URL,
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'EPA-CCTE',
        project: 'CCD-UI',
        release: process.env.SENTRY_RELEASE,
        telemetry: false,
        errorHandler: (err: object) => {
          console.error(err);
        },
      }),
    ],
    optimizeDeps: {
      include: ['axe-core'],
    },
  },

  compatibilityDate: '2024-12-20',
});
