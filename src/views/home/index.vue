<template>
    <div class="home-page">
        this is the home page, the first merge
        <div class="home-page-child" @click="test_api"> test get</div>
        <div class="home-page-child" @click="post_api"> test post</div>
        <div class="home-page-child">{{ test_result }}</div>
    </div>
</template>

<script>
//import { utils } from '../../common/utils'
import { getTest, postTest } from '@/api/test.js'
export default {
    data() {
        return {
            test_result: 'nan'
        }
    },
    mounted() {
        console.log(process.env)
    },
    methods: {
        test_api() {
            getTest().then(res => {
                this.test_result = JSON.stringify(res.data)
            })
        },
        post_api() {
            postTest({},{
                type: 0,
                target_info: {
                    proofId: '230',
                    proofInfo: JSON.stringify({target_site: 'beijing'}),
                    proofText: 'this is proof1 of 5',
                    proofType: '1',
                    eventId: '5',
                }
            }).then(res=> {
                this.test_result = JSON.stringify(res)
            })
        }
    }
}
</script>

<style scoped lang="less">
.home-page {
    height: 100px;
    background-color: rgb(236, 182, 182);

    .home-page-child {
        background-color: rgb(175, 175, 245);
    }
}
</style>