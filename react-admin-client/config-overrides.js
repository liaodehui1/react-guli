const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // 针对antd实现按需打包：根据import来打包（使用Babel-plugin-import）
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 自动打包相关样式
  }),
  // 使用less-loader对less变量覆盖
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
);