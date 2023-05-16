<template>
    <div class="upload-page">
        <div class="left-side">
            <img src="../../assets/image/upload.png" class="upload-image">
        </div>
        <div class="right-side">
            <div class="upload-area">
            <input class="upload-select-button" id="fileInput" type="file" ref="file" accept=".pdf,.txt" multiple @change="selectFile" />
            <div class="upload-submit-button">
                <button  @click="handleUploadFile">SUBMIT</button>
            </div>
            </div>
            <div class="upload-list-area">
                <div class="upload-file-title">已上传文件列表</div>
                <div class="scroll-area">
                    <div class="uploaded-file-item" @click="handleFileClick">这是一个文件</div>
                </div>
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
        },
        handleFileClick() {
            this.$router.push({
                path: '/marking',
                query: {
                    file_id: '0131e6b65fb16a18030c67bcbb7f3378'
                }
            })
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

    .left-side {
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
    .right-side {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        .upload-area {
            flex-shrink: 0;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            .upload-submit-button {
                margin-top: 40px;
            }
        }
        .upload-list-area {
            background-color: #e3e4e5;
            flex: 1;
            width: 100%;
            height: 0;
            display: flex;
            flex-flow: column;
            flex-direction: column;
            .upload-file-title {
                height: 50px;
                flex-shrink: 0;
            }
            .scroll-area {
                height: 0;
                width: 100%;
                flex: 1;
                overflow-y: scroll;
                .uploaded-file-item {
                    margin-top: 5px;
                    height: 50px;
                    background-color: rgb(250, 248, 248);
                }
            }
        }
    }
    
}
</style>