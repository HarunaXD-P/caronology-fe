<template>
  <div class="event-page">

    <div class="proof-menu">
      <div class="delete-button button">删除</div>
      <div class="save-button button" @click="uploadNewEvent">上传</div>
      <div class="proof-menu-placeholder"></div>
    </div>
    <div class="year-detail">
      <div class="year-detail-item title">年份信息</div>
      <div class="year-detail-item id">id: {{ year_info.yearId }}</div>
      <div class="year-detail-item text">{{ year_info.yearText }}</div>
    </div>
    <div class="event-detail">
      <div class="event-detail-item name">id: 完成上传后生成事件ID</div>
      <div class="event-detail-item text">
        <textarea class="event-input" type="text" v-model="new_event_text" placeholder="请输入文本" />
      </div>
      <div class="event-detail-item type">


      </div>
    </div>
  </div>
</template>

<script>
import { uploadEditEvent } from '@/api/marking'
export default {
  props: {
    year: Object
  },
  data() {
    return {
      year_info: {},
      event_info: { eventText: '' },
      editing_event: true,
      new_event_text: ''
    }
  },
  created() {
    this.year_info = this.year
  },
  mounted() {
  },
  methods: {
    cancelNewEvent() {
      this.$emit('add_event_cancel')
    },
    uploadNewEvent() {
      uploadEditEvent({}, {
        type: 0,
        target_info: {
          eventText: this.new_event_text,
          eventInfo: JSON.stringify({}),
          eventType: 0,
          yearId: this.year_info.yearId,
        }
      }).then(res => {
        if (res.data.status == 'ok') {
          this.$emit('add_event_finish', res.data.data.eventId)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.event-page {
  width: calc(100vw - 200px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;

  .proof-menu {
    height: 36px;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: azure;
    padding: 0 8px;

    .button {
      height: 28px;
      margin: 4px;
      line-height: 24px;
      border-radius: 4px;
      padding: 2px 4px;
      cursor: pointer;

      &.delete-button {
        background-color: rgb(232, 104, 104);
      }

      &.save-button {
        background-color: rgb(96, 229, 96);
      }
    }
  }

  .year-detail {
    width: 100%;
    padding: 8px 12px;
    background-color: blanchedalmond;

    .year-detail-item {
      text-align: left;

      .year-input {
        width: 70%;
        height: 100px;
        word-break: break-all;
      }
    }
  }

  .event-detail {
    width: 100%;
    padding: 8px 12px;
    background-color: blanchedalmond;

    .event-detail-item {
      text-align: left;

      .event-input {
        width: 70%;
        height: 100px;
        word-break: break-all;
      }
    }
  }
}
</style>