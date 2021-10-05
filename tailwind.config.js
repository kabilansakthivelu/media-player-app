module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
         'image': "url('https://img.freepik.com/free-vector/music-world-neon-signs-style-text_118419-1108.jpg?size=338&ext=jpg')",
        },
        width: {
         '2/7': '27%',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
