<template>
  <div class="proof-page">
    <div class="placeholder" v-if="event_id == ''">请在左侧选择事件进行标注</div>
    <div v-else>
      <div class="proof-menu">
        <div class="delete-button button" @click="deleteEvent">删除</div>
        <div class="save-button button" @click="editing_event = true" v-if="!editing_event">修改事件</div>
        <div class="save-button button" @click="uploadEditEvent" v-else>上传</div>
        <div class="proof-menu-placeholder"></div>
      </div>
      <div class="event-detail">
        <div class="event-detail-item name">id: {{ event_id || '取得数据中' }}</div>
        <div class="event-detail-item text" v-if="!editing_event">原文: {{ event_info.eventText }}</div>
        <div class="event-detail-item text" v-else>
          <textarea class="event-input" type="text" v-model="editing_event_text" placeholder="请输入文本" />
        </div>
      </div>
      <div class="proof-list">
        <div class="proof-area-title">论据：</div>
        <div class="proof-item" v-for="proof, index in event_info.proof_list" :key="proof.proofId">
          <div class="edit-button-area">
            <div class="button edit-button" v-if="editing_proof_id != proof.proofId" @click="editProof(proof)">编辑</div>
            <div class="button save-button" v-else @click="saveEditingProof(proof, index)">保存</div>
            <div class="button delete-button" @click="deleteProof(proof, index)">删除</div>
          </div>
          <div class="proof-show-area" v-if="proof.proofId != editing_proof_id">
            <div class="proof-id">ID:{{ proof.proofId }}</div>
            <div class="proof-text"> {{ proof.proofText }}</div>
          </div>
          <div class="proof-editing-area" v-else>
            <div class="proof-id">ID:{{ proof.proofId }}</div>
            <textarea class="proof-input" type="text" v-model="editing_proof_text" placeholder="请输入文本" />
          </div>
        </div>
        <div class="proof-item">
          <div class="edit-button-area">
            <div class="button save-button" @click="saveNewProof()">保存</div>
          </div>
          <div class="proof-editing-area">
            <div class="proof-id">ID:待上传</div>
            <textarea class="proof-input" type="text" v-model="new_proof_text" placeholder="请输入文本" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getYearEventList, getEventDetail, uploadEditProof, deleteRecord, uploadNewProof, uploadEditEvent } from '@/api/marking'
export default {
  props: {
    event: String
  },
  data() {
    return {
      show_placeholder: true,
      event_id: undefined,
      event_info: { eventText: '' },
      editing_proof_id: undefined,
      editing_proof_text: '',
      editing_event: false,
      editing_event_text: '',
      new_proof_text: ''
    }
  },
  created() {
    this.event_id = this.event
    this.show_placeholder = this.event_id == ''
    if (this.event_id !== '') {
      this.getEventProof()
    }

  },
  mounted() {

  },
  methods: {
    getEventProof() {
      getEventDetail({ eventId: this.event_id }).then(res => {
        if (res.data.status == 'ok') {
          this.event_info = res.data.data
          this.editing_event_text = this.event_info.eventText
        }
      })
    },
    editProof(proof) {
      this.editing_proof_id = proof.proofId
      this.editing_proof_text = proof.proofText
    },
    saveEditingProof(proof, index) {
      this.editing_proof_id = undefined
      uploadEditProof({ proofId: proof.proofId }, {
        proofText: this.editing_proof_text
      }).then(res => {
        if (res.data.status == 'ok') {
          this.event_info.proof_list[index].proofText = this.editing_proof_text
          this.editing_proof_text = ''
        }
      })
    },
    deleteProof(proof, index) {
      deleteRecord({}, { type: 3, target_id: proof.proofId }).then(res => {
        this.getEventProof()
      })
    },
    saveNewProof() {
      uploadNewProof({}, {
        type: 0,
        target_info: {
          proofInfo: JSON.stringify({}),
          proofText: this.new_proof_text,
          proofType: 0,
          eventId: this.event_id,
        }
      }).then(res => {
        this.getEventProof()
      })
    },
    uploadEditEvent() {
      uploadEditEvent({}, {
        type: 1,
        target_id: this.event_id,
        target_info: {
          eventText: this.editing_event_text
        }
      }).then(res => {
        this.editing_event = false
        this.getEventProof()
      })
    },
    deleteEvent() {
      deleteRecord({}, {
        type: 2,
        target_id: this.event_id
      }).then(res=>{
        this.$emit('need_refresh')
        this.event_id = ''
      })
    }
  }
}
</script>

<style scoped lang="less">
.proof-page {
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

  .proof-list {
    display: flex;
    flex-direction: column;

    .proof-area-title {
      width: 100%;
      text-align: left;
      background-color: grey;
      padding: 0px 12px;
    }

    .proof-item {
      margin-bottom: 10px;
      background-color: rgb(254, 254, 166);

      .edit-button-area {
        display: flex;
        height: 30px;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 0 12px;

        .button {
          height: 24px;
          padding: 0 8px;
          text-align: center;
          border-radius: 4px;
          font-size: 12px;
          line-height: 24px;

          &.save-button {
            background-color: rgb(71, 71, 253);
          }

          &.delete-button {
            margin-left: 10px;
            background-color: rgb(255, 79, 79);
          }

          &.edit-button {
            background-color: rgb(64, 183, 64);
          }
        }
      }

      .proof-show-area {
        display: flex;
        padding: 12px 12px;
        flex-direction: column;
        align-items: flex-start;

        .proof-id {
          text-align: left;
        }

        .proof-text {
          text-align: left;
        }
      }

      .proof-editing-area {
        display: flex;
        padding: 12px 12px;
        flex-direction: column;
        align-items: flex-start;

        .proof-id {
          text-align: left;
        }

        .proof-input {
          width: 70%;
          height: 100px;
          word-break: break-all;
        }
      }
    }

  }
}
</style>