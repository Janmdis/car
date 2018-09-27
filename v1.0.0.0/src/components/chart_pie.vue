<template>
  <div ref="mainBox" id='mainBox' class='fl'></div>
</template>
<style>
  #mainBox {
    /*margin-left: 2%;*/
  }
</style>
<script>
import { mapState } from "vuex";
  export default {
    props: {
      PieType: {
        type: Number,
        default: 1 // 1 线索量  2 交付量 3 员工数
      },
      DataType: {
        type: Number,
        default: 1 // 1 日  2 周 3 月
      },
      chartData: {},
      width: {
        type: String,
        default: "33%"
      },
      height: {
        type: String,
        default: "140px"
      }
    },
    data() {
      return {
        
      };
    },
    created(){
    
    },
    watch: {
      DataType(newValue, oldValue) {
        if(newValue !== oldValue){
          this.drawLine();
        }
      },
      gets(newValue, oldValue) {
        if(newValue !== oldValue){
          this.drawLine();
        }
      },
    },
    created() {
    },
    mounted() {
      this.drawLine();

    },
    methods: {
      drawLine() {
        let divMain = this.$refs.mainBox;
        divMain.style.width = this.width;
        divMain.style.height = this.height;
        let divMainW = divMain.offsetWidth;
        let divMainH = divMain.offsetHeight;
        // let divMain = this.$refs.mainBox;
        // 圆形 取宽高最小值
        let minSize = Math.min(divMainW + 20, divMainH + 20);
        let pie = this.$echarts.init(divMain);
        // 数值转换
        let completed,  // 绿色
          deviation,    //灰色
          unfinished,   // 红色
          PieType1Ins,  // 内圆字体
          Ruler,        // 标尺
          RulerAngle;   // 标尺其实角度
        if (this.PieType == 2) {
          // 交付量
          console.log(this.chartData.deliveryRate)
          completed = this.chartData.deliveryRate.substring(0, this.chartData.deliveryRate.length - 1) - 0;
          deviation = 0;
          unfinished = this.chartData.undeliveryRate.substring(0, this.chartData.undeliveryRate.length - 1) - 0;
          PieType1Ins = {
            value: 100,
            name: "超期" + " \n " + this.chartData.pastCount
          };
        } else if (this.PieType == 3) {
          // 采购人数
          completed = this.chartData.OldUserPercent.substring(0, this.chartData.OldUserPercent.length - 1) - 0;
          deviation = 0;
          unfinished = this.chartData.NewUserPercent.substring(0, this.chartData.NewUserPercent.length - 1) - 0;
          PieType1Ins = {
            value: 100,
            name: "总数" + " \n " + this.chartData.UserTotalNum
          };
        } else {
          completed = this.chartData.alreadyRate.substring(0, this.chartData.alreadyRate.length - 1) - 0;
          deviation = this.chartData.diffRate.substring(0, this.chartData.diffRate.length - 1) - 0;
          unfinished = this.chartData.remainRate.substring(0, this.chartData.remainRate.length - 1) - 0;
          // 线索量 - 采购量 内圆value
          PieType1Ins = {
            value: 100,
            name: this.chartData.diffRate + " \n " + this.chartData.diff
          };
        }
        // 标尺

        if(this.DataType == 1){
          Ruler =[
            {value: 100, name: "6时"},
            {value: 100, name: "12时"},
            {value: 100, name: "18时"},
            {value: 100, name: "0时"}
          ]
          RulerAngle= 45

        }else if(this.DataType == 2) {
          Ruler =[
            {value: 50, name: this.gets.split("-")[1].replace("月",'-').split("-")[1]},
            {value: 50, name: this.gets.split("-")[0].replace("月",'-').split("-")[1]},
          ]
          RulerAngle = 0
        }else {
          Ruler =[
            {value: 100, name: "7日"},
            {value: 100, name: "14日"},
            {value: 100, name: "21日"},
            {value: 100, name: "1日"},
          ]
          RulerAngle = 45
        }

        let pieData = {
          completed: completed, // 已完成
          deviation: deviation, // 偏差
          unfinished: unfinished, // 未完成
          dataTime: this.chartData.time
        };

        //改变内圆的颜色
        let intPieColor = pieData.completed >= 100 ? "#008000" : "#ff0000";
        //计算已完成的比例
        let completePieStart = 90;
        let completePieTage;
        if (pieData.completed > 50) {
          completePieTage = (pieData.completed - 50) * 2;
          completePieStart = -90;
        } else {
          completePieTage = pieData.completed * 2;
          completePieStart = 90;
        }
        // 计算已完成的占用角度
        //计算未完成的开始位置 == 已完成的结束位置
        let unfinishedPieStart = 90;
        if (completePieStart > 0) {
          unfinishedPieStart = completePieStart - completePieTage / 360;
        } else {
          unfinishedPieStart = completePieTage / 360 - completePieStart;
        }
        // 计算未完成的比例是否小大于50
        let hidelabel= {show: false};
        let showlable ={
          normal: {
            formatter: "{a|{a}}  \n  {b|{b}} {c|{c}}",
            rich: {
              a: {
                color: intPieColor,
                align: "center",
                fontSize: "6",
                width: 16
              },
              b: {
                color: intPieColor,
                align: "center",
                fontSize: "6",
                width: 16
              },
              c: {
                width: 4,
                height: 4,
                color: "transparent",
                borderWidth: 1,
                borderColor: "#ccc",
                borderType: "solid",
                borderRadius: 4
              }
            }
          }
        }
        let unfinishedPieTage,lable1,lable2;
        if (pieData.unfinished > 50) {
          unfinishedPieTage = (pieData.unfinished - 50) * 2;
          showlable.normal.formatter = "{a|{a}}  \n  {c|{c}}  {b|{b}}"
          lable1 = showlable
          lable2 = hidelabel
          console.log(unfinishedPieTage)
        } else {
          unfinishedPieTage = pieData.unfinished * 2;
          console.log(100-unfinishedPieTage)
          lable1 = hidelabel
          lable2 = showlable
        }
        var option = {
          // padding: [10],
          animation: false,
          series: [
            // 内圆
            {
              type: "pie",
              radius: ["0", "27%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              zlevel: 1,
              label: {
                normal: {
                  show: true,
                  position: "center",
                  color: "#fff",
                  fontSize: "6"
                }
              },
              itemStyle: {
                normal: {
                  color: intPieColor
                }
              },
              data: [PieType1Ins]
            },
            // 已完成指针
            {
              type: "pie",
              radius: ["26%", "28%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              startAngle: completePieStart,
              zlevel: 4,
              itemStyle: {
                normal: {
                  color: "#0099ff"
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  align: "center",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: minSize * 0.125,
                  length2: 0,
                  fontSize: "6",
                  lineStyle: {
                    color: "#0099ff",
                    width: 3
                  }
                }
              },
              data: [
                {
                  value: completePieTage,
                  name: pieData.completed + "% "
                },
                // 对应隐藏
                {
                  value: 100 - completePieTage,
                  label: {show: false},
                  labelLine: {show: false, emphasis: {show: false}}
                }
              ]
            },
            // 未完成指针
            {
              name: pieData.dataTime,
              type: "pie",
              radius: ["25%", "28%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              startAngle: Math.ceil(unfinishedPieStart),
              zlevel: 4,
              itemStyle: {
                normal: {
                  color:'#0099ff'
                }
              },
              label: {
                normal: {
                  show: this.DataType == 1 ? false : true,
                  position: "outside",
                  align: "center",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: minSize * 0.1,
                  length2: 0,
                  lineStyle: {
                    color: "#000",
                    width: 3
                  }
                }
              },
              data: [
                {
                  value: 100 - unfinishedPieTage,
                  name: Math.floor(pieData.unfinished ) + "% ",
                  label: lable1,
                  labelLine: {show: false, emphasis: {show: false}}
                },
                // 单独配置二的样式
                {
                  value: unfinishedPieTage,
                  name: Math.floor(pieData.unfinished ) + "% ",
                  label: lable2,
                  labelLine: {show: false, emphasis: {show: false}}
                }
              ]
            },
            // 标尺
            {
              type: "pie",
              radius: ["31%", "36%"],
              avoidLabelOverlap: false,
              startAngle: RulerAngle,
              zlevel: 3,
              itemStyle: {
                normal: {
                  color: "#fff"
                }
              },
              label: {
                normal: {
                  show: true,
                  fontSize: "6",
                  position: "outside",
                  color: "#008000",
                  align: "center",
                  verticalAlign: "middle"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: minSize * 0.1,
                  length2: 0,
                  smooth: 0,
                  lineStyle: {
                    color: "#fff",
                    width: 2,
                    type: "dashed"
                  }
                }
              },
              data: Ruler
            },
            // 外圈
            {
              type: "pie",
              radius: ["33%", "55%"],
              avoidLabelOverlap: false,
              zlevel: 2,
              label: {
                normal: {
                  fontSize: "12",
                  show: false,
                  position: "center"
                }
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ["#008000", "#ff0000", "#cccccc"];
                    return colorList[params.dataIndex];
                  }
                }
              },
              data: [
                {value: pieData.completed},
                {value: pieData.deviation},
                {value: pieData.unfinished}
              ]
            }
          ]
        };

        var option1 = {
          animation: false,
          series: [
            // 内圆
            {
              type: "pie",
              radius: ["0", "25%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              zlevel: 1,
              label: {
                normal: {
                  show: true,
                  position: "center",
                  color: "#fff",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: minSize * 0.1,
                  length2: 0,
                  smooth: 0,
                  lineStyle: {
                    color: "#fff",
                    width: 2,
                    type: "dashed"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: intPieColor
                }
              },
              data: [PieType1Ins]
            },
            // 已完成指针
            {
              type: "pie",
              radius: ["24%", "27%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              startAngle: completePieStart,
              zlevel: 4,
              itemStyle: {
                normal: {
                  color: intPieColor
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  align: "center",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: minSize * 0.1,
                  length2: 0,
                  lineStyle: {
                    color: intPieColor,
                    width: 3
                  }
                }
              },
              data: [
                {value: completePieTage},
                // 对应隐藏
                {
                  value: 100 - completePieTage,
                  label: {show: false},
                  labelLine: {show: false, emphasis: {show: false}}
                }
              ]
            },
            // 外圈
            {
              type: "pie",
              radius: ["26%", "50%"],
              avoidLabelOverlap: false,
              zlevel: 2,
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  align: "center",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 5,
                  length2: 0,
                  smooth: 0
                }
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ["#008000", "#cccccc"];
                    return colorList[params.dataIndex];
                  }
                }
              },
              data: [
                {
                  value: pieData.completed,
                  name:
                  "已交付" +
                  "\n" +
                  this.chartData.deliveryCount +
                  "\n" +
                  "(" +
                  this.chartData.deliveryRate +
                  ")"
                },
                {
                  value: pieData.unfinished,
                  name:
                  "未交付" +
                  "\n" +
                  this.chartData.undeliveryCount +
                  "\n" +
                  "(" +
                  this.chartData.undeliveryRate +
                  ")"
                }
              ]
            }
          ]
        };

        var option2 = {
          animation: false,
          series: [
            // 内圆
            {
              type: "pie",
              radius: ["0", "25%"],
              avoidLabelOverlap: false,
              legendHoverLink: false,
              zlevel: 1,
              label: {
                normal: {
                  show: true,
                  position: "center",
                  color: "#000",
                  fontSize: "6"
                }
              },
              itemStyle: {
                normal: {
                  color: "#fff"
                }
              },
              data: [PieType1Ins]
            },
            // 外圈
            {
              type: "pie",
              radius: ["26%", "50%"],
              avoidLabelOverlap: false,
              zlevel: 2,
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  align: "center",
                  fontSize: "6"
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 5,
                  length2: 0,
                  smooth: 0
                }
              },
              itemStyle: {
                normal: {
                  color: function (params) {
                    var colorList = ["#008000", "#cccccc"];
                    return colorList[params.dataIndex];
                  }
                }
              },
              data: [
                {
                  value: pieData.completed,
                  name:
                  "老员工" +
                  "\n" +
                  this.chartData.OldUsers +
                  "\n" +
                  "(" +
                  this.chartData.OldUserPercent +
                  ")"
                },
                {
                  value: pieData.unfinished,
                  name:
                  "新员工" +
                  "\n" +
                  this.chartData.NewUsers +
                  "\n" +
                  "(" +
                  this.chartData.NewUserPercent +
                  ")"
                }
              ]
            }
          ]
        };

        let pieOption;
        switch (this.PieType) {
          case 1:
            pieOption = option;
            break;
          case 2:
            pieOption = option1;
            break;
          case 3:
            pieOption = option2;
            break;
        }

        pie.setOption(pieOption);
      }
    },
    computed: {
    // ...mapState(["dayweek"])
     gets() {

      return this.$store.state.dayweek;
    },
  },
  };
</script>
