<template>
    <div class="marking-page">
        <div class="left-side">
            <div class="left-title">Songlian.txt</div>
            <div class="left-scroll-area">
                <div class="left-relation">

                </div>
                <div class="left-year">
                    <el-collapse v-model="active_year" @change="handleYearChange">
                        <el-collapse-item v-for="year in year_event_list" :title="year.yearText" :name="year.yearId"
                            :key="year.yearId">
                            <div class="event-area">
                                <div class="event-item" v-for="event in year.event_list"
                                    @click="showEventDetail(event.eventId)">
                                    {{ event.eventText }}
                                </div>
                                <div class="add-event-button event-item">
                                    添加事件
                                </div>
                            </div>

                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>

        </div>
        <div class="right-side">
            <Proof :event="editing_event" :key="editing_event"></Proof>
        </div>
    </div>
</template>

<script>
import { utils } from '@/common/utils'
import { getYearEventList } from '@/api/marking'
import { uploadFile } from '@/api/upload.js'
import Proof from './components/proof.vue'
export default {
    components: {
        Proof
    },
    data() {
        return {
            file_id: '',
            file: '',
            year_event_list: undefined,
            active_year: '',
            editing_event: '',
        }
    },
    created() {
        this.file_id = utils.getUrlParam('file_id')
    },
    mounted() {
        this.getYearEvent()
    },
    methods: {
        getYearEvent() {
            getYearEventList({ fileId: this.file_id }).then(res => {
                if (res.data.status == 'ok') {
                    this.year_event_list = res.data.data
                } else {
                    alert('数据错误')
                }
            })
        },
        handleYearChange(e) {
        },
        showEventDetail(event_id) {
            this.editing_event = event_id
        }
    }
}
</script>

<style scoped lang="less">
.marking-page {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #d1e1f2;

    .left-side {
        width: 200px;
        height: 100vh;
        background-color: rgb(251, 227, 195);
        position: fixed;
        top: 0px;
        left: 0px;
        overflow-y: scroll;

        .left-title {
            height: 50px;
            width: 100%;
            background-color: rgb(240, 172, 88);
            line-height: 50px;
        }

        .left-scroll-area {
            height: calc(100vh - 50px);
            width: 200px;
            position: fixed;
            top: 50px;
            left: 0px;
            overflow: scroll;
            padding-right: 12px;

            .event-area {
                display: flex;
                width: 100%;
                //height: 0;
                flex-direction: column;
                background-color: red;
                margin-bottom: -25px;

                .event-item {
                    height: 30px;
                    width: 100%;
                    padding: 0px 4px;
                    text-align: left;
                    line-height: 30px;
                    border-bottom: 1px solid rgb(155, 153, 239);
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: break-all;
                    overflow: hidden;

                }

                &:last-child {
                    border-bottom: none;
                }

            }
        }
    }

    .right-side {
        position: fixed;
        left: 200px;
        height: 100vh;
        width: calc(100% - 200px);
    }
}</style>