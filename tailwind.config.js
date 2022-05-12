module.exports = {
  content: [
    'src/**/*.html',
  ],
  theme: {
    fontFamily: {
      serif: ['Arvo', 'serif'],
    },
    extend: {
      backgroundImage: {
        'img-hero': "linear-gradient(rgba(175, 225, 175, 0.9), 40%, rgba(99, 3, 48, 0.9)), url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?fit=crop&w=1024&q=50')",
        'img-timeline-cover': "linear-gradient(rgba(175, 225, 175, 0.9), 20%, rgba(99, 3, 48, 0.9)), url('https://images.unsplash.com/photo-1505406165273-6631d6f7fc68?fit=crop&w=1024&q=50')",
      },
      backgroundSize: {
        'strip': '4px 100%',
        'strip-last': '4px 3rem',
      },
      backgroundPosition: {
        'left-padded-top': 'left 3rem top',
        'left-padded-top-first': 'left 3rem top 3rem',
        'left-padded-top-last': 'left 3rem top',
        'center-first': 'center top 3rem',
        'center-last': 'center top',
      },
      colors: {
        'green-army': '#454B1B',
        'green-celadon': '#AFE1AF',
        'cream': '#D4D2C3',
        'purple-pipin': '#630330',
      },
      fontFamily: {
        'hero': ['MonteCarlo', 'cursive'],
      },
      inset: {
        '18': '78px',
        '26': '104px',
      },
      scale: {
        '200': '2',
        '300': '3',
        '400': '4',
      },
      screens: {
        'touch': {'raw': '(hover: none)'},
        'can-hover': {'raw': '(hover: hover)'},
      },
      zIndex: {
        '-10': '-10'
      }
    },
  }
}
