module.exports = {
  presets: [
    [
      '@m-fe',
      {
        import: [{ libraryName: 'antd-mobile', style: true }],
        react: true,
        typescript: true,
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'ie >= 11'],
        },
      },
    ],
  ],
  // 自定义 Plugi
};
