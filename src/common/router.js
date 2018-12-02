import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { menuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic ..
// 测试修改
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, [], () => import('../routes/HomePage/HomePage.js')),
    },
    '/homePage': {
      component: dynamicWrapper(app, [], () => import('../routes/HomePage/HomePage.js')),
    },
    '/homePage/dashboard': {
      component: dynamicWrapper(app, ['mark'], () => import('../components/Developing/Developing.js')),
    },
    '/homePage/myCruise': {
      component: dynamicWrapper(app, ['mark'], () => import('../components/Developing/Developing.js')),
    },
    '/homePage/agent': {
      component: dynamicWrapper(app, ['agent'], () => import('../routes/Agent/Agent.js')),
    },
    '/homePage/help': {
      component: dynamicWrapper(app, [], () => import('../components/Developing/Developing.js')),
    },
  };
  const menus = getFlatMenuData(menuData);
  // Route configuration data
  const routerData = {};
  Object.keys(routerConfig).forEach((path) => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menus).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menus[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
