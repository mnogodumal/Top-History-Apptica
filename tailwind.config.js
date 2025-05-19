// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))
const object0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))

const fallbackSansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif'
]


module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      const typographyWithOnlySizes = {}
      for (let i = 8; i <= 100; i += 2) {
        typographyWithOnlySizes[`.text-${i}`] = { fontSize: `${i}px` }
      }

      addUtilities(typographyWithOnlySizes)
    })

    // plugin(({ addComponents }) => {
    //   addComponents({
    //     '.container': {
    //       maxWidth: '100%',
    //       '@screen sm': {
    //         maxWidth: '540px',
    //       },
    //       '@screen md': {
    //         maxWidth: '720px',
    //       },
    //       '@screen lg': {
    //         maxWidth: '960px',
    //       },
    //       '@screen xl': {
    //         maxWidth: '1140px',
    //       },
    //       '@screen 2xl': {
    //         maxWidth: '1440px',
    //       },
    //     }
    //   })
    // })
  ],

  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],

  corePlugins: {
    container: false
  },

  // darkMode: 'selector',

  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'transparent'
      },

      boxShadow: {
        modals: 'var(--box-shadow-modals)'
      },

      scale: {
        101: '1.01'
      },

      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        black: {
          DEFAULT: '#000000',
          100: '#161B21',
          200: '#0F1216',
          300: '#07090B'
        },

        white: '#ffffff',

        background: {
          DEFAULT: 'var(--color-background)',

          modals: 'var(--color-background-modals)',
          'modals-hover': 'var(--color-background-modals-hover)',
          'modals-active': 'var(--color-background-modals-active)',
        },

        foreground: 'var(--color-foreground)',

        border: {
          DEFAULT: 'var(--color-border)',
        },
      }
    },

    screens: {
      xl: { max: '1529.99px' },
      lg: { max: '1199.99px' },
      md: { max: '991.99px' },
      sm: { max: '767.99px' },
      xs: { max: '575.99px' },
    },

    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: {
    //     DEFAULT: '#000000',
    //     100: '#161B21',
    //     200: '#0F1216',
    //     300: '#07090B'
    //   },

    //   background: {
    //     DEFAULT: 'var(--color-background)',

    //     modals: 'var(--color-background-modals)',
    //     'modals-hover': 'var(--color-background-modals-hover)',
    //     'modals-active': 'var(--color-background-modals-active)',
    //   },

    //   foreground: 'var(--color-foreground)',

    //   border: {
    //     DEFAULT: 'var(--color-border)',
    //   },

    //   white: '#FFFFFF',

    //   grey: {
    //     200: '#DDE1E8',
    //     300: '#CBD3DD',
    //     400: '#BAC4D1',
    //     500: '#A9B5C6',
    //     600: '#7D8FA9',
    //     700: '#586A84',
    //     800: '#3B4758',
    //     900: '#1D232C'
    //   },

    //   blue: {
    //     100: '#E5F3FF',
    //     200: '#CBE6FF',
    //     300: '#B1DAFF',
    //     400: '#97CDFF',
    //     500: '#7DC1FF',
    //     600: '#319DFF',
    //     700: '#0077E4',
    //     800: '#005098',
    //     900: '#00284C'
    //   },

    //   purple: {
    //     100: '#ECD0FD',
    //     200: '#D8A1FA',
    //     300: '#C571F8',
    //     400: '#B142F5',
    //     500: '#9E13F3',
    //     600: '#800AC7',
    //     700: '#600896',
    //     800: '#400564',
    //     900: '#200332'
    //   },

    //   red: {
    //     100: '#FFE5EC',
    //     200: '#FFCBD9',
    //     300: '#FFB1C7',
    //     400: '#FF97B4',
    //     500: '#FF7DA1',
    //     600: '#FF316A',
    //     700: '#E4003F',
    //     800: '#98002A',
    //     900: '#4C0015'
    //   },

    //   bronze: {
    //     100: '#FFF2DA',
    //     200: '#FFE6B5',
    //     300: '#FFD98F',
    //     400: '#FFCD6A',
    //     500: '#FFC045',
    //     600: '#FFAA04',
    //     700: '#C28100',
    //     800: '#825600',
    //     900: '#412B00'
    //   },

    //   green: {
    //     100: '#CAFBEC',
    //     200: '#95F7D9',
    //     300: '#60F3C6',
    //     400: '#2BEFB3',
    //     500: '#10D096',
    //     600: '#0DA678',
    //     700: '#0A7D5A',
    //     800: '#06533C',
    //     900: '#032A1E'
    //   },

    //   cyan: {
    //     100: '#CAF6F9',
    //     200: '#95EDF2',
    //     300: '#60E4EC',
    //     400: '#2CDAE6',
    //     500: '#17B5BF',
    //     600: '#129199',
    //     700: '#0E6D73',
    //     800: '#09484C',
    //     900: '#052426'
    //   }
    // },

    spacing: object0to100px,

    borderWidth: {
      DEFAULT: '1px',
      ...object0to100px
    },

    borderRadius: {
      ...object0to100px,
      full: '9999px'
    },

    fontFamily: {
      sans: ['Gilroy', ...fallbackSansSerifFonts],
      hauora: ['Hauora', ...fallbackSansSerifFonts],
      inter: ['Inter', ...fallbackSansSerifFonts]
    }
  }
}
