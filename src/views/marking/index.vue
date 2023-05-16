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
                                <div class="add-event-button event-item" @click="addEvent(year)">
                                    添加事件
                                </div>
                            </div>

                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>

        </div>
        <div class="right-side">
            <Proof :event="editing_event" :key="editing_event" @need_refresh="getYearEvent" v-if="!creating_event"></Proof>
            <NewEvent v-else :year="creating_event_year" @need_refresh="getYearEvent"
                @add_event_cancel="handleAddEventCancel" @add_event_finish="handleAddEventFinish"></NewEvent>
        </div>
    </div>
</template>

<script>
import { utils } from '@/common/utils'
import { getYearEventList } from '@/api/marking'
import { uploadFile } from '@/api/upload.js'
import Proof from './components/proof.vue'
import NewEvent from './components/newEvent.vue'
export default {
    components: {
        Proof,
        NewEvent
    },
    data() {
        return {
            file_id: '',
            file: '',
            year_event_list: undefined,
            active_year: '',
            editing_event: '',
            creating_event: false,
            creating_event_year: undefined,
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
        addEvent(year) {
            this.creating_event_year = year
            this.creating_event = true
        },
        showEventDetail(event_id) {
            this.editing_event = event_id
        },
        handleAddEventCancel() {
            this.creating_event = false
            this.creating_event_year = {}
        },
        handleAddEventFinish(id) {
            this.creating_event = false
            this.creating_event_year = {}
            this.getYearEvent()
            this.editing_event = id
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