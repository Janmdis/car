<template>
  <div id="pie" ></div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let pie = this.$echarts.init(document.getElementById("pie"));
      // 绘制图表
      pie.setOption({tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'right',
                itemWidth: 14,
                itemHeight: 14,
                align: 'left'
            },
            series: [{
                name: '完成效率',
                type: 'pie',
                radius: ['45%', '65%'],
                color: ['#008501', '#ff001b', '#cdcbcc'],
                label: {
                    normal: {
                        show: false,
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{ value: 33, name: '已完成进度' },
                    { value: 64, name: '偏差进度' },
                    { value: 3, name: '剩余进度' }
                ]
            }]});
    }
  }
};
</script>