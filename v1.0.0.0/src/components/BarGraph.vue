<template>
  <div ref="mainBox" class='fl' ></div>
</template>
<style>
</style>
<script>
export default {
  props: {
    PieType: {
      type: Number,
      default: 2
    },
    chartData: {},
    width: {
      type: String,
      default: "22%"
    },
    height: {
      type: String,
      default: "150px"
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
    console.log(this.chartData)
  },
  methods: {
    drawLine() {
      let divMain = this.$refs.mainBox;
      // console.log(divMain);
      // 基于准备好的dom，初始化echarts实例
      divMain.style.width = this.width;
      divMain.style.height = this.height;
      let divMainW = divMain.offsetWidth;
      let divMainH = divMain.offsetHeight;
      // 圆形 取宽高最小值
      let minSize = Math.min(divMainW, divMainH);
      let bar = this.$echarts.init(divMain);
      let togle  = this.chartData.shouldBeDay+this.chartData.already+this.chartData.diff


      // 绘制图表
      let barInfo = {
        animation: false,
        grid: {
          x: 50,
          y: 80,
          x2: 55,
          y2: 20,
          borderWidth: 1
        },
        xAxis: {
          data: [],
          show: false
        },
        yAxis: {  show: false },
        series: [
          {
            name: "销量",
            stack: "总量",
            type: "bar",
            barMinHeight:30,
            label: {
              normal: {
                 zlevel:99,
                fontSize: "8",
                show: true,
                color: "#f00",
                formatter: function(v) {
                  var val = v.data;
                  return val +"             "+ (val/togle*100).toFixed(0) + "%"
                },
               
              }
            },
            itemStyle: {
              normal: {
                color: "#f00"
              }
            },
            data: [ this.chartData.shouldBeDay]
          },
          {
            name: "销量1",
            stack: "总量",
            type: "bar",
            barMinHeight:30,
            label: {
              normal: {
                 zlevel:99,
                fontSize: "8",
                show: true,
                 color: "#008000",
                formatter: function(v) {
                  var val = v.data;
                   return val +"             "+ (val/togle*100).toFixed(0) + "%"
                },
               
              }
            },
            itemStyle: {
              normal: {
                color: "#008000"
              }
            },
            data: [ this.chartData.already]
          },
          {
            name: "销量2",
            stack: "总量",
            type: "bar",
            barMinHeight:30,
            label: {
              normal: {
                 zlevel:99,
                fontSize: "8",
                show: true,
                color: "#ccc",
                formatter: function(v) {
                  var val = v.data;
                   return val +"             "+ (val/togle*100).toFixed(0) + "%"
                },
                // position: "right"
              }
            },
            itemStyle: {
              normal: {
                color: "#ccc"
              }
            },
            data: [ this.chartData.diff]
          }
        ],
        
      };
      bar.setOption(barInfo);
    },
   
  }
};
</script>