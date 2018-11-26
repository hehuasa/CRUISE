import { isUrl } from '../utils/utils';

const menu = [
  {
    name: 'homePage',
    icon: 'dashboard',
    path: 'homePage',
    children: [{
      name: 'DASHBOARD',
      icon: 'icon-dashboard',
      path: 'dashboard',
    }, {
      name: 'AGENT',
      icon: 'icon-sitemap',
      path: 'agent',
      exact: true,
      defaultIndex: true,
    }, {
      name: 'MY CRUISE',
      icon: 'icon-boat',
      path: 'myCruise',
    }, {
      name: 'HELP',
      icon: 'icon-life-bouy',
      path: 'help',
    }],
  },
];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const menuData = (() => formatter(menu))();
