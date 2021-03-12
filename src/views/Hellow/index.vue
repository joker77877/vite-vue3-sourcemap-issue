<template>
    <div v-cloak class="lock-maintenance">
        123
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, ref, toRefs } from 'vue';
import { usePagination, useRequest } from 'vue-request';
import { Form, Select, Input, Table, Button, Row, Col, DatePicker, message } from 'ant-design-vue';
import { RangePickerValue } from 'ant-design-vue/es/date-picker/props';
import { TableState } from 'ant-design-vue/es/table/interface';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons-vue';
import { getQueryLockRepairInfo, getListRepairFactorys, exportLockRepairList } from '@/service/api/lockMaintenance';
import moment, { Moment } from 'moment';

interface ParamsTypes {
    lockFactoryCode?: number;
    day?: string;
    endDay?: string;
    lockId?: string;
    newLockId?: string;
    deviceId?: string;
}
interface StateProps {
    form: ParamsTypes;
}

type Pagination = TableState['pagination'];

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
export default defineComponent({
    name: 'App',
    setup() {
        const state = reactive<StateProps>({
            form: {
                lockFactoryCode: undefined,
                day: undefined,
                endDay: undefined,
                lockId: undefined,
                newLockId: undefined,
                deviceId: undefined,
            },
        });
        const dates = ref<RangePickerValue>([]);
        // 查询接口
        const { data, run: query, loading, current, pageSize } = usePagination(getQueryLockRepairInfo, {
            defaultParams: [{ ...state.form, pageNum: 1, pageSize: 10 }],
            initialData: [],
            formatResult: (res) => res.data,
            pagination: {
                currentKey: 'pageNum',
                pageSizeKey: 'pageSize',
            },
        });
        // 获取锁厂筛选接口
        const { data: lockFactoryList } = useRequest(getListRepairFactorys, { formatResult: (res) => res.data, });
        const { data: exportData, run: runExport } = useRequest(exportLockRepairList, { formatResult: (res) => res.data, manual: true });
        // 分页配置
        const pagination = computed(() => ({
            total:
                data.value && data.value.length < pageSize.value
                    ? pageSize.value * (current.value - 1) + data.value.length
                    : pageSize.value * (current.value + 1),
            current: current.value,
            pageSize: pageSize.value,
        }));
        debugger;
        const confirmTime = computed({
            get: () => state.form.day ? [state.form.day, state.form.endDay] : [],
            set: (val) => {
                [state.form.day, state.form.endDay] = val;
            }
        });
        const tableList = () => {
            void query({ ...state.form, pageNum: current.value, pageSize: pageSize.value });
        };
        const disabledDate = (date: Moment) => {
            if (!dates.value || dates.value.length === 0 || !date) {
                return false;
            }
            const diffDate = date.diff(dates.value[0], 'days');
            return Math.abs(diffDate) > 30;
        };
        // 选择日历变化事件
        const onCalendarChange = (val: RangePickerValue) => {
            dates.value = val;
        };
        const onOpenChange = (open: boolean) => {
            if (open) {
                dates.value = [];
            }
        };
        const onPageChange = (pag: Pagination) => {
            void query({
                ...state.form,
                pageSize: pag?.pageSize,
                pageNum: pag?.current,
            });
        };

        // 查询按钮
        const queryTable = () => {
            tableList();
        };
        const formatDate = (date: Date) => moment(date).format('YYYY-MM-DD')
        // 导出按钮
        const exportInfo = () => {
            if (state.form.day) {
                void runExport(state.form)
            } else {
                void message.info('请选择时间');
            }

        }
        return {
            data,
            confirmTime,
            ...toRefs(state),
            lockFactoryList,
            pagination,
            loading,
            onPageChange,
            queryTable,
            moment,
            disabledDate,
            onCalendarChange,
            onOpenChange,
            exportInfo,
            formatDate
        };
    }
});
</script>
<style lang="scss">
.lock-maintenance {
    background-color: #fff;
    overflow: hidden;
    padding: 0 8px;
    .search-main {
        margin-top: 24px;
        .btn-group {
            > .ant-form-item-control-wrapper {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>
