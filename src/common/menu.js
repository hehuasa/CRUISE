import { isUrl } from '../utils/utils';

const menu = [
  {
    name: 'homePage',
    icon: 'dashboard',
    path: 'homePage',
    children: [{
      name: 'DASHBOARD',
      icon: 'dashboard',
      path: 'dashboard',
    }, {
      name: 'AGENT',
      icon: 'dashboard',
      path: 'agent',
    }, {
      name: 'MY CRUISE',
      icon: 'dashboard',
      path: 'myCruise',
    }, {
      name: 'HELP',
      icon: 'dashboard',
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
