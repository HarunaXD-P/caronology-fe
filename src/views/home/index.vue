<template>
    <div class="home-page">
        this is the home page, the first merge
        <div class="home-page-child"> test</div>
    </div>
</template>

<script>
//import { utils } from '../../common/utils'
import { getTest } from '@/api/test.js'
export default {
    data() {
        return {

        }
    },
    mounted() {
        getTest().then(res=>{
            console.log(res)
        })
        console.log(process.env)
    }
}
</script>

<style scoped lang="less">
.home-page {
    height: 100px;
    background-color: red;
    .home-page-child {
        background-color: blue;
    }
}
</style>