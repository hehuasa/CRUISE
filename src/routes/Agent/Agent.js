import React, { PureComponent } from 'react';
import Header from './Header/Header';
import Content from './Content/Content';
import styles from './index.less';
const datas = {
    agents: [
        {
            name: 'bjstdmngbdr01.thoughtworks.com',
            os: 'windows',
            status: 'idle',
            type: 'physical',
            ip: '192.168.1.102',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
            ],
            id: 1,
        },
        {
            name: 'bjstdmngbdr08.thoughtworks.com',
            os: 'windows',
            status: 'building',
            type: 'virtual',
            ip: '192.168.1.80',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
            ],
            id: 2,
        },
        {
            name: 'bjstdmngbdr10.thoughtworks.com',
            os: 'ubuntu',
            status: 'building',
            type: 'physical',
            ip: '192.168.1.117',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
            ],
            id: 3,
        },
        {
            name: 'bjstdmngbdr11.thoughtworks.com',
            os: 'debian',
            status: 'building',
            type: 'virtual',
            ip: '192.168.1.102',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
            ],
            id: 4,
        },
        {
            name: 'bjstdmngbdr15.thoughtworks.com',
            os: 'suse',
            status: 'idle',
            type: 'physical',
            ip: '192.168.1.110',
            location: '/var/lib/cruise-agent',
            resources: [],
            id: 5,
        },
        {
            name: 'bjstdmngbdr02.thoughtworks.com',
            os: 'centos',
            status: 'idle',
            type: 'virtual',
            ip: '192.168.1.103',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
            ],
            id: 6,
        },
        {
            name: 'bjstdmngbdr04.thoughtworks.com',
            os: 'suse',
            status: 'idle',
            type: 'physical',
            ip: '192.168.1.113',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
            ],
            id: 7,
        },
        {
            name: 'bjstdmngbdr22.thoughtworks.com',
            os: 'centos',
            status: 'idle',
            type: 'virtual',
            ip: '192.168.1.111',
            location: '/var/lib/cruise-agent',
            resources: [
                'Ubuntu',
                'Chrome',
            ],
            id: 8,
        },
    ],
};
const getData = () => {
    const data = datas.agents;
    const array = [
        { type: 'all', name: 'all', data: [] },
        { type: 'physical', name: 'Physical', data: [] },
        { type: 'virtual', name: 'Virtual', data: [] },
    ];
    for (const item of array) {
        item.data = data.filter(value => value.type === item.type);
    }
    array.find(value => value.type === 'all').data = data;
    return array;
};
export default class Agent extends PureComponent {
  render() {
    return (
      <div className={styles.warp}>
        <Header data={getData()} />
        <Content data={getData()} />
      </div>
    );
  }
}
