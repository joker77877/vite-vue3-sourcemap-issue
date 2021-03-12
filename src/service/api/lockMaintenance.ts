/* eslint-disable @typescript-eslint/no-unsafe-return */
/*
 * @Description: 锁厂维修列表api
 * @Author: 尹彬宇
 * @Date: 2021-03-05 11:04:09
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-11 18:40:51
 * @FilePath: /vite-vue3-ts-template/src/service/api/lockMaintenance.ts
 */
import { AxiosPromise } from 'axios';
import { get, post } from '../request';
import { LockFactoryListTypes, QueryLockRepairInfoTypes } from '../types';

// const host = hostMap[API_ENV];

// 获取解析度不足数据
const getListRepairFactorys = (params = {}): AxiosPromise<LockFactoryListTypes[]> =>
    post('/lockMaintenanceList.node?actype=actype_1', params);

const getQueryLockRepairInfo = (params = {}): AxiosPromise<QueryLockRepairInfoTypes[]> =>
    post('/lockMaintenanceList.node?actype=actype_2', params);
const exportLockRepairList = (params = {}): AxiosPromise<boolean> =>
    post('/lockMaintenanceList.node?actype=actype_3', params);

export { getListRepairFactorys, getQueryLockRepairInfo, exportLockRepairList };
