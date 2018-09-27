<template>
<div class="dataSheet">
  <mt-header :title="companyName">
    <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
    </router-link>
  </mt-header>
  <!-- 日期控件 -->
  <dateCom></dateCom>
  <div ref="mainBox"></div>
</div>  
</template>

<style>
.dataSheet .mint-header {
  line-height: 1rem;
  height: 1rem;
  background: #0c6;
}
.dataSheet .mint-header-button {
  color: #fff;
}
.dataSheet .mint-button-icon {
  line-height: 0.8rem;
}
</style>

<style scoped>
.dates {
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
}
.dates span {
  font-size: 0.2rem;
  margin: 0 0.5rem;
}
.dataSheet {
  height: 100%;
  background: #fff;
}

.titleHeadr {
  display: flex;
}
.titleHeadr li {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 700;
  line-height: 1rem;
}
.dataTable {
  display: flex;
}
.dataTable li {
  width: 100%;
  text-align: center;
  height: 1rem;
  line-height: 0.8rem;
  font-size: 0.2rem;
}
.dataTable li span {
  display: inline-block;
  font-size: 0.2rem;
  line-height: 0.4rem;
  color: green;
  padding: 0 20%;
}
.untitleHeadr {
  display: flex;
  flex-wrap: nowrap;
}
.untitleHeadr li {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 700;
  line-height: 1rem;
}
.untitleHeadr li span {
  display: inline-block;
  font-size: 0.3rem;
  line-height: 0.4rem;
}
.undataTable {
  display: flex;
}
.undataTable li {
  width: 100%;
  text-align: center;
  height: 1rem;
  line-height: 0.8rem;
  font-size: 0.2rem;
}
.undataTable li span {
  display: inline-block;
  font-size: 0.2rem;
  line-height: 0.4rem;
  color: green;
  padding: 0 20%;
}
</style>


<script>
import dateCom from "./dateCom";
export default {
  components: {
    dateCom
  },
  props: {
    PieType: {
      type: Number,
      default: 2
    },
    data: {},
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "450px"
    },
    headerTitle: {
      type: String,
      default: "采购员详情"
    }
  },
  data: function() {
    return { companyName: this.headerTitle };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let divMain = this.$refs.mainBox;
      // 基于准备好的dom，初始化echarts实例
      divMain.style.width = this.width;
      divMain.style.height = this.height;
      let divMainW = divMain.offsetWidth;
      let divMainH = divMain.offsetHeight;
      // 圆形 取宽高最小值
      let minSize = Math.min(divMainW, divMainH);
      let bar = this.$echarts.init(divMain);
      // 绘制图表
      let option = {
        legend: {
          itemWidth: 25,
          formatter: function(name) {
            if (name === "新员工") {
              return `${name} 220 40%`;
            }
            return `${name} 300 60%`;
          },
          selectedMode: false
        },
        animation: false,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
          show: true,
          borderColor: "#006030"
        },
        xAxis: [
          {
            type: "value",
            show: false
          },
          {}
        ],
        yAxis: [
          {
            type: "category",
            position: "left",
            // axisTick: { show: true },
            name: "间数",
            offset: 0,
            nameLocation: "end",
            // inverse: false,
            // silent: true,
            // axisLine: {
            //   show: true
            // },
            data: [
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
              "110",
              "120",
              "130",
              "140",
              "150",
              "160"
            ]
          },
          {
            type: "category",
            position: "right",
            nameGap: 15,
            inverse: 0,
            // axisTick: { show: true },
            name: "人数",
            // offset: 0,
            // nameLocation: "end",
            nameTextStyle: {
              align: "right"
            },
            data: [
              "101",
              "90",
              "80",
              "70",
              "60",
              "50",
              "40",
              "30",
              "20",
              "10",
              "10",
              "10",
              "10",
              "10",
              "10",
              "10"
            ]
          }
        ],
        series: [
          {
            name: "新员工",
            type: "bar",
            stack: "总量",
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: "left"
              }
            },
            itemStyle: {
              color: function(params) {
                if (params.dataIndex == 16) {
                  return "rgba(255, 255, 255, 0)";
                } else {
                  return "#8E8E8E";
                }
              },           
            },
            data: [
              -10,
              -60,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -15,
              -100
            ]
          },
          {
            name: "老员工",
            type: "bar",
            stack: "总量",
            legendHoverLink: false,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              color: function(params) {
                if (params.dataIndex == 16) {
                   return "rgba(255, 255, 255, 0)";
                } else {
                  return "#006030";
                }
              }
            },
            data: [
              100,
              90,
              80,
              70,
              60,
              50,
              40,
              30,
              20,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              100
            ]
          }
        ]
      };
      bar.setOption(option);
    }
  }
};
</script>
