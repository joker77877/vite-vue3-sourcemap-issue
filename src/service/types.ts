/*
 * @Description:
 * @Author: 尹彬宇
 * @Date: 2021-03-09 17:50:39
 * @LastEditors: 尹彬宇
 * @LastEditTime: 2021-03-11 18:40:44
 * @FilePath: /vite-vue3-ts-template/src/service/types.ts
 */
export interface LockFactoryListTypes {
    code: string;
    name: string;
}
export interface QueryLockRepairInfoTypes {
    lockFactoryCode: number;
    deviceId: string;
}

export interface ResponseData<T> {
    code: number;
    data: T;
    msg?: string;
}
