import { IConfig } from 'umi-types';
const path = require('path');

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: '../pages/admin/login/index',
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: [{
        path: '/',
        component: '../layouts/index',
      }]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      chunks: ['umi'],
      title: 'my-umi-frontend',
      dll: true,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  hash: true,
  alias: {
    src: path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    models: path.resolve(__dirname, 'src/models'),
    assets: path.resolve(__dirname, 'src/assets'),
    services: path.resolve(__dirname, 'src/services'),
    styles: path.resolve(__dirname, 'src/styles')
  },
  proxy: {
    '/api': {
      target: 'http://10.106.11.110:31000/',
      changeOrigin: true,
    },
    '/file': {
      target: 'https://my.imuyuan.com/',
      changeOrigin: true,
    },
  },
}

export default config;
