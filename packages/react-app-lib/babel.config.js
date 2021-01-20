module.exports = {
  presets: [
    [
      '@m-fe',
      {
        import: true,
        react: true,
        typescript: true,
        esmodules: false,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 10'],
        },
      },
    ],
  ],
  // 自定义 Plugin
  plugins: ['react-hot-loader/babel'],
};
