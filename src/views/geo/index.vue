<template>
	<div class="geo-page">
		<div class="container" id="container" style="z-index: 1"></div>
		<button @click="addZoom(1.4)">1111</button>
		<button @click="addZoom(0.8)">2222</button>
	</div>
</template>
<script>
import * as echarts from 'echarts';
import chinaMapJSON from './map/china.json'
import zhejiangMapJSON from './map/zhejiang.json'
export default {
	data() {
		return {
			chinaMap: undefined
		}
	},
	created() {
		echarts.registerMap("china", { geoJSON: chinaMapJSON });
		echarts.registerMap("zhejiang", { geoJSON: zhejiangMapJSON })
	},
	mounted() {
		this.$nextTick(_ => {
			// this.initMapInfo()
			// this.chinaMap.on('click', (e) => {
			// 	console.log(e.name)
			// })
		})
	},
	methods: {
		initMapInfo() {
			// 地图数据
			var chinaGeoCoordMap = {
				黑龙江: [144.9688, 45.368],
				内蒙古: [110.3467, 41.4899],
				吉林: [125.8154, 44.2584],
				北京市: [116.4551, 40.2539],
				辽宁: [123.1238, 42.1216],
				河北: [114.4995, 38.1006],
				天津: [117.4219, 39.4189],
				山西: [112.3352, 37.9413],
				陕西: [109.1162, 34.2004],
				甘肃: [103.5901, 36.3043],
				宁夏: [106.3586, 38.1775],
				青海: [101.4038, 36.8207],
				新疆: [87.9236, 43.5883],
				西藏: [91.11, 29.97],
				四川: [103.9526, 30.7617],
				重庆: [108.384366, 30.439702],
				山东: [117.1582, 36.8701],
				河南: [113.4668, 34.6234],
				江苏: [118.8062, 31.9208],
				安徽: [117.29, 32.0581],
				湖北: [114.3896, 30.6628],
				浙江: [119.5313, 29.8773],
				福建: [119.4543, 25.9222],
				江西: [116.0046, 28.6633],
				湖南: [113.0823, 28.2568],
				贵州: [106.6992, 26.7682],
				云南: [102.9199, 25.4663],
				广东: [113.12244, 23.009505],
				广西: [108.479, 23.1152],
				海南: [110.3893, 19.8516],
				上海: [121.4648, 31.2891],
			}
			// 飞线点数据
			var chinaDatas = [
				[
					{
						name: '黑龙江',
						value: 0,
					},
				],
				[
					{
						name: '内蒙古',
						value: 0,
					},
				],
				[
					{
						name: '吉林',
						value: 0,
					},
				],
				[
					{
						name: '辽宁',
						value: 0,
					},
				],
				[
					{
						name: '河北',
						value: 0,
					},
				],
				[
					{
						name: '天津',
						value: 0,
					},
				],
				[
					{
						name: '山西',
						value: 0,
					},
				],
				[
					{
						name: '陕西',
						value: 0,
					},
				],
				[
					{
						name: '甘肃',
						value: 0,
					},
				],
				[
					{
						name: '宁夏',
						value: 0,
					},
				],
				[
					{
						name: '青海',
						value: 0,
					},
				],
				[
					{
						name: '新疆',
						value: 0,
					},
				],
				[
					{
						name: '西藏',
						value: 0,
					},
				],
				[
					{
						name: '四川',
						value: 0,
					},
				],
				[
					{
						name: '山东',
						value: 0,
					},
				],
				[
					{
						name: '河南',
						value: 0,
					},
				],
				[
					{
						name: '江苏',
						value: 0,
					},
				],
				[
					{
						name: '安徽',
						value: 0,
					},
				],
				[
					{
						name: '湖北',
						value: 0,
					},
				],
				[
					{
						name: '浙江',
						value: 0,
					},
				],
				[
					{
						name: '福建',
						value: 0,
					},
				],
				[
					{
						name: '江西',
						value: 0,
					},
				],
				[
					{
						name: '湖南',
						value: 0,
					},
				],
				[
					{
						name: '贵州',
						value: 0,
					},
				],
				[
					{
						name: '广西',
						value: 0,
					},
				],
				[
					{
						name: '海南',
						value: 0,
					},
				],
				[
					{
						name: '上海',
						value: 1,
					},
				],
			]

			let formdata = '重庆' // 中心点

			var convertData = function (data) {
				var res = []
				for (var i = 0; i < data.length; i++) {
					var dataItem = data[i]
					var fromCoord = chinaGeoCoordMap[dataItem[0].name]
					var toCoord = [108.384366, 30.439702] //中心点地理坐标
					if (fromCoord && toCoord) {
						res.push([
							{
								// 飞线从哪里出发
								coord: toCoord,
							},
							{
								// 飞线去往哪里
								coord: fromCoord,
								value: dataItem[0].value,
							},
						])
					}
				}
				return res
			}
			var series = [];
			[[formdata, chinaDatas]].forEach(function (item, i) {
					series.push(
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 2,
							rippleEffect: {
								//涟漪特效
								period: 4, //动画时间，值越小速度越快
								brushType: 'stroke', //波纹绘制方式 stroke, fill
								scale: 3, //波纹圆环最大限制，值越大波纹越大
								color: '#fcdd6e',
							},
							label: {
								normal: {
									show: false,
									position: 'left', //显示位置
									offset: [-5, 0], //偏移设置
									formatter: function (params) {
										//圆环显示文字
										return params.data.name + '1'
									},
									fontSize: 13,
								},
								emphasis: {
									show: false,
								},
							},
							symbol: 'circle',
							symbolSize: function (val) {
								return 5 //圆环大小
							},
							itemStyle: {
								normal: {
									show: false,
									color: '#fce182',
								},
							},
							data: item[1].map(function (dataItem) {
								return {
									//在这里定义你所要展示的数据
									// name: dataItem[0].name,
									// value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
									name: dataItem[0].name,
									value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
								}
							}),
						},
						//中心点
						{
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 15,
							rippleEffect: {
								period: 4,
								brushType: 'stroke',
								scale: 4,
								color: 'red',
							},
							label: {
								normal: {
									show: false,
									position: 'left',
									//offset:[5, 0],
									color: 'red',
									formatter: '{b}',
									textStyle: {
										color: 'red',
									},
								},
								emphasis: {
									show: false,
									color: '#38ff85',
								},
							},
							symbol: 'circle',
							symbolSize: 5,
							itemStyle: {
								color: '#38ff85',
							},
							data: [
								{
									name: item[0],
									value: chinaGeoCoordMap[item[0]].concat([10]),
								},
							],
						}
					)
				})
			this.initMap(series)
		},

		initMap(series) {
			this.chinaMap = echarts.init(document.getElementById('container'))
			let option = {
				// bgColor: '#1a1e45',
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'horizontal', //图例的排列方向
					// textStyle: { color: '#1a1e45' },
					x: 'left', //图例的位置
					y: '-20000000000000',
				},
				visualMap: {
					//颜色的设置  dataRange
					// textStyle: { color: '#1a1e45' },
					x: 'left',
					y: 'bottom',
					// splitList: [{ start: 0, end: 150000 }],
					show: false,
					// text:['高','低'],// 文本，默认为数值文本
					// color: ['#1a1e45'],
				},
				geo: {
					map: 'china',
					zoom: 1.2,
					scaleLimit: {
						min: 0.7,
						max: 2.5
					},
					label: {
						normal: {
							show: false,
							textStyle: {
								color: '#FFFFFF',
							},
						},
						emphasis: {
							show: false,
						},
					},
					roam: true, //是否允许缩放
					itemStyle: {
						normal: {
							color: '#1a1e45', //地图背景色
							borderColor: '#22ccfb', //省市边界线00fcff 516a89
							borderWidth: 1,
							textStyle: '#fff',
						},
						emphasis: {
							color: '#22ccfb', //悬浮背景
						},
					},
					data: [],
				},
				series: series,
			}

			this.chinaMap.setOption(option)
		},
		addZoom(a) {
			let op = {
				geo: {
					map: 'zhejiang',
					zoom: a
				}
			}
			this.chinaMap.setOption(op)
		}
	}
}
</script>
<style lang="less" scoped>
.geo-page {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.container {
	width: 1000px;
	height: 1000px;
}
</style>