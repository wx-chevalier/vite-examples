module.exports = {
  presets: [
    [
      '@m-fe',
      {
        import: true,
        react: true,
        typescript: true,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [['import', { libraryName: 'antd-mobile', style: true }]],
};
