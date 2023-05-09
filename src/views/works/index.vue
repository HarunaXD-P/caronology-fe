<template>
    <div class="Echarts">
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
    <!--
    <input type="file" name="csvfile" ref="csvData" />
    <input type="button" @click="csv()" value="JS转换"/>
    -->
</template>
  
<script>

import {csv2arr} from '@/api/csv.js'

//let Echarts = require('echarts/lib/echarts'); //基础实例 注意不要使用import
//require('echarts/lib/chart/bar'); //按需引入 bar = 柱状图
import * as Echarts from 'echarts'
//import Papa from 'papaparse'
//Papa.parse(example.csv,example)

import westeros from 'echarts/theme/westeros'
import essos from 'echarts/theme/essos'

export default {
    name: 'Echarts',
    methods:{
    
    csv() {
        csv2arr('./example.csv').then((res)=>{
            console.log('我的数据', res)
        });
        var result= csv2arr('./example.csv');
    },

    myEcharts(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = Echarts.init(document.getElementById('main'), 'essos', {renderer: 'svg'});

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
},
mounted() { this.csv(); this.myEcharts(); }
}
</script>