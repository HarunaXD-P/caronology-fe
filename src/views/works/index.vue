<template>
    <div>
        这是著作的路由页面
    </div>
</template>

<template>
    <div class="Echarts">
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>
  
<script>
let Echarts = require('echarts/lib/echarts'); //基础实例 注意不要使用import
require('echarts/lib/chart/bar'); //按需引入 bar = 柱状图
export default {
    name: 'Echarts',
    methods:{
    myEcharts(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = Echarts.init(document.getElementById('main'));

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
mounted() { this.myEcharts(); }
}
</script>