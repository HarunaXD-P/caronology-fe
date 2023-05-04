<template>
    <div class="upload-page">
        <div class="upload-image-container">
            <img src="../../assets/image/upload.png" class="upload-image">
        </div>
        <div class="upload-area">
            <input class="upload-select-button" id="fileInput" type="file" ref="file" accept=".pdf,.txt" multiple @change="selectFile" />
            <div class="upload-submit-button">
                <button  @click="handleUploadFile">SUBMIT</button>
            </div>
        </div>
    </div>
</template>

<script>
//import { utils } from '../../common/utils'
import { getTest } from '@/api/test.js'
import { uploadFile } from '@/api/upload.js'
export default {
    data() {
        return {
            file: ''
        }
    },
    mounted() {
        getTest().then(res => {
            console.log(res)
        })
        console.log(process.env)
    },
    methods: {
        handleUploadFile() {
            if(this.file == '') {
                this.$message.warning('请上传文件')
            } else {
                let formData = new FormData()
                formData.append('file', this.file)
                uploadFile({}, formData).then(res=> {
                    if(res.data.status == 'ok'){
                        this.$message({
                            message: "文件上传成功",
                            type:'success'
                        })
                        this.$refs.file.value = ''
                    }
                })
            }
        },
        selectFile() {
            this.file = this.$refs.file.files[0]
        }
    }
}
</script>

<style scoped lang="less">
.upload-page {
    height: 100vh;
    background-color: #f2d1d1;
    padding: 40px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-end;

    .upload-image-container {
        flex: 1;
        display: flex;
        justify-content: center;
        .upload-image {
            max-width: 100%;
            max-height: 100%;
            display: block;
            margin: auto;
        }
    }
    .upload-area {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .upload-submit-button {
            margin-top: 40px;
        }
    }
}
</style>