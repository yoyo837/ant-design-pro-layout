import { IConfig, IPlugin } from 'umi-types';
import slash from 'slash2';

const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
  [
    'umi-plugin-antd-theme',
    {
      theme: [
        {
          key: 'dark',
          fileName: 'dark.css',
          theme: 'dark',
        },
        {
          key: 'dust',
          fileName: 'dust.css',
          modifyVars: {
            '@primary-color': '#F5222D',
          },
        },
        {
          key: 'volcano',
          fileName: 'volcano.css',
          modifyVars: {
            '@primary-color': '#FA541C',
          },
        },
        {
          key: 'sunset',
          fileName: 'sunset.css',
          modifyVars: {
            '@primary-color': '#FAAD14',
          },
        },
        {
          key: 'cyan',
          fileName: 'cyan.css',
          modifyVars: {
            '@primary-color': '#13C2C2',
          },
        },
        {
          key: 'green',
          fileName: 'green.css',
          modifyVars: {
            '@primary-color': '#52C41A',
          },
        },
        {
          key: 'daybreak',
          fileName: 'daybreak.css',
          modifyVars: {
            '@primary-color': '#1890FF',
          },
        },
        {
          key: 'geekblue',
          fileName: 'geekblue.css',
          modifyVars: {
            '@primary-color': '#2F54EB',
          },
        },
        {
          key: 'purple',
          fileName: 'purple.css',
          modifyVars: {
            '@primary-color': '#722ED1',
          },
        },

        {
          key: 'dark-dust',
          theme: 'dark',
          fileName: 'dark-dust.css',
          modifyVars: {
            '@primary-color': '#F5222D',
          },
        },
        {
          key: 'dark-volcano',
          theme: 'dark',
          fileName: 'dark-volcano.css',
          modifyVars: {
            '@primary-color': '#FA541C',
          },
        },
        {
          key: 'dark-sunset',
          theme: 'dark',
          fileName: 'dark-sunset.css',
          modifyVars: {
            '@primary-color': '#FAAD14',
          },
        },
        {
          key: 'dark-cyan',
          theme: 'dark',
          fileName: 'dark-cyan.css',
          modifyVars: {
            '@primary-color': '#13C2C2',
          },
        },
        {
          key: 'dark-green',
          theme: 'dark',
          fileName: 'dark-green.css',
          modifyVars: {
            '@primary-color': '#52C41A',
          },
        },
        {
          key: 'dark-daybreak',
          theme: 'dark',
          fileName: 'dark-daybreak.css',
          modifyVars: {
            '@primary-color': '#1890FF',
          },
        },
        {
          key: 'dark-geekblue',
          theme: 'dark',
          fileName: 'dark-geekblue.css',
          modifyVars: {
            '@primary-color': '#2F54EB',
          },
        },
        {
          key: 'dark-purple',
          theme: 'dark',
          fileName: 'dark-purple.css',
          modifyVars: {
            '@primary-color': '#722ED1',
          },
        },
      ],
    },
  ],
];

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
          routes: [
            {
              path: '/welcome',
              name: 'one',
              component: './Welcome',
              routes: [
                {
                  path: '/welcome/welcome',
                  name: 'two',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: '/welcome/welcome2',
                  name: 'two2',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path:
                    'https://github.com/ant-design/ant-design-pro-layout/issues',
                  name: 'site',
                  icon: 'smile',
                  target: '_blank',
                  component: './Welcome',
                },
              ],
            },
          ],
        },
        {
          path: 'single',
          name: 'Single',
          component: './Welcome',
        },
      ],
    },
  ],

  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less') ||
        !context.resourcePath.includes('example')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
} as IConfig;
