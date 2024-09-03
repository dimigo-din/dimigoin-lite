/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solid-red': 'var(--solid-red)',
        'solid-orange': 'var(--solid-orange)',
        'solid-yellow': 'var(--solid-yellow)',
        'solid-green': 'var(--solid-green)',
        'solid-blue': 'var(--solid-blue)',
        'solid-indigo': 'var(--solid-indigo)',
        'solid-purple': 'var(--solid-purple)',
        'solid-pink': 'var(--solid-pink)',
        'solid-brown': 'var(--solid-brown)',
        'solid-black': 'var(--solid-black)',
        'solid-white': 'var(--solid-white)',

        'solid-translucent-red': 'var(--solid-translucent-red)',
        'solid-translucent-orange': 'var(--solid-translucent-orange)',
        'solid-translucent-yellow': 'var(--solid-translucent-yellow)',
        'solid-translucent-green': 'var(--solid-translucent-green)',
        'solid-translucent-blue': 'var(--solid-translucent-blue)',
        'solid-translucent-indigo': 'var(--solid-translucent-indigo)',
        'solid-translucent-purple': 'var(--solid-translucent-purple)',
        'solid-translucent-pink': 'var(--solid-translucent-pink)',
        'solid-translucent-brown': 'var(--solid-translucent-brown)',
        'solid-translucent-black': 'var(--solid-translucent-black)',
        'solid-translucent-white': 'var(--solid-translucent-white)',

        'background-standard-primary': 'var(--backgroud-standard-primary)',
        'background-standard-secondary': 'var(--backgroud-standard-secondary)',
        'background-standard-tertiary': 'var(--backgroud-standard-tertiary)',

        'background-inverted-primary': 'var(--backgroud-inverted-primary)',
        'background-inverted-secondary': 'var(--backgroud-inverted-secondary)',
        'background-inverted-tertiary': 'var(--backgroud-inverted-tertiary)',

        'content-standard-primary': 'var(--content-standard-primary)',
        'content-standard-secondary': 'var(--content-standard-secondary)',
        'content-standard-tertiary': 'var(--content-standard-tertiary)',
        'content-standard-quaternary': 'var(--content-standard-quaternary)',

        'content-inverted-primary': 'var(--content-inverted-primary)',
        'content-inverted-secondary': 'var(--content-inverted-secondary)',
        'content-inverted-tertiary': 'var(--content-inverted-tertiary)',
        'content-inverted-quaternary': 'var(--content-inverted-quaternary)',

        'line-divider': 'var(--line-divider)',
        'line-outline': 'var(--line-outline)',

        'components-fill-standard-primary': 'var(--components-fill-standard-primary)',
        'components-fill-standard-secondary': 'var(--components-fill-standard-secondary)',
        'components-fill-standard-tertiary': 'var(--components-fill-standard-tertiary)',
        'components-fill-standard-interactive': 'var(--components-fill-standard-interactive)',

        'components-fill-inverted-primary': 'var(--components-fill-inverted-primary)',
        'components-fill-inverted-secondary': 'var(--components-fill-inverted-secondary)',
        'components-fill-inverted-tertiary': 'var(--components-fill-inverted-tertiary)',

        'components-interactive-hover': 'var(--components-interactive-hover)',
        'components-interactive-focused': 'var(--components-interactive-focused)',
        'components-interactive-pressed': 'var(--components-interactive-pressed)',

        'components-translucent-primary': 'var(--components-translucent-primary)',
        'components-translucent-secondary': 'var(--components-translucent-secondary)',
        'components-translucent-tertiary': 'var(--components-translucent-tertiary)',

        'core-accent': 'var(--core-accent)',
        'core-accent-translucent': 'var(--core-accent_translucent)',

        'core-status-negative': 'var(--core-status-negative)',
        'core-status-warning': 'var(--core-status-warning)',
        'core-status-positive': 'var(--core-status-positive)',

        'calendar-exam': 'var(--calender-exam)',
        'calendar-home': 'var(--calender-home)',
        'calendar-event': 'var(--calender-event)',
        'calendar-stay': 'var(--calender-stay)',
        'calendar-vacation': 'var(--calender-vacation)',
      },
      fontSize: {
        display: ['48px', { lineHeight: '64px', letterSpacing: '-1.44px' }],
        title: ['24px', { lineHeight: '32px', letterSpacing: '-0.48px' }],
        heading: ['20px', { lineHeight: '28px', letterSpacing: '-0.4px' }],
        body: ['16px', { lineHeight: '24px', letterSpacing: '-0.32px' }],
        label: ['14px', { lineHeight: '22px', letterSpacing: '-0.28px' }],
        footnote: ['12px', { lineHeight: '20px', letterSpacing: '-0.24px' }],
        caption: ['10px', { lineHeight: '16px', letterSpacing: '-0.2px' }],
      },
    },
  },
  plugins: [],
};
