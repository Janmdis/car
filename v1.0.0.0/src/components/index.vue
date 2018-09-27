<template>
<div>
    <header>
      <span class="contentHeight" >
         {{companyName}}
        <span v-if="orgLevle!=99" class="DropdownArrow">
          <i class="iconfont  icon-arrow-left"></i>
        </span>
      </span>
      <mt-switch  v-if="orgLevle!=99" v-model="values" @change='isOkFn' >置顶</mt-switch>
    </header>
    <div>
      <!-- 日期组件 -->
      <dateCom @upDate="upDate"></dateCom>
       <!--图表区域-->
        <div class="g-chart-box">
            <!-- 上方导航 -->
            <div class="g-top-box first">
              <!-- 循环数据 -->
                <span v-for="(item,index) in companyDate[0]" :key="index">
                <!-- 线索量 -->
                <div class="g-item-box g-xsl">
                    <p class="title"><i class="icon-warn"></i>{{item.specName}}</p>
                    <p class="g-tj"><span class="g-red">4351</span><span class="g-green">/11844</span></p>
                </div>
                <!-- 占比值 -->
                <div class="g-item-box g-zb" v-if="index!=companyDate[0].length-1">
                    <div class="g-top-percent">72%</div>
                    <i class="g-line-jt"></i>
                    <div class="g-bottom-percent">67%</div>
                </div>
                </span>
            </div>
            <!--第一行图表 -->
            <div class="g-chart-box-inner">
                <!-- <div style="position: relative;width:33%;overflow: hidden;float: left;"   >
                  <div class="g-zhizhen" ref="roatedata" :data-roate=JSON.stringify(item)>
                    <span class="fontSize" ref="roatetitle">2016/18</span>  
                    <span class="circle"></span>
                  </div>   -->
                  <ChartPie v-for="(item,index) in companyDate[0]" :key="index" :PieType='1' :DataType='dateType' :chartData='item'  @click.native="gotDate(item)"></ChartPie>
                 
                <!-- </div> -->
            </div>
            <!-- 中间导航 -->
            <div class="g-top-box middleBox">
               <!-- 循环数据 -->
                <span v-for="(item,index) in companyDate[1]" :key="index">
                    <!-- 签约量 -->
                    <div class="g-item-box-middle">
                        <p class="title"><i class="icon-warn"></i>{{item.specName}}</p>
                        <p class="g-tj"><span class="g-red">450</span><span class="g-green">/2961</span></p>
                    </div>
                    <!-- 占比值 -->
                    <div class="g-item-box-middle g-zb" v-if="index!=companyDate[1].length-1">
                        <div class="g-top-percent">95%</div>
                        <i class="g-line-jt g-d-left"></i>
                        <div class="g-bottom-percent">95%</div>
                    </div>
                </span>
            </div>
            <!--第三行图表 -->
            <div class="g-chart-box-inner">
                <span v-for="(item,index) in companyDate[1]" :key="index">
                  <ChartPie v-if="index==0" :DataType='dateType' :chartData='item'  @click.native="gotDate(item)"></ChartPie>
                  <BarGraph v-if="index!=0" :chartData='item'  @click.native="gotDate(item)"></BarGraph>
                </span>
            </div>
            <div class="g-bottom-box">
                <div class="g-item-box-bottom g-zb">
                    <div class="g-left-percent">99%</div>
                    <i class="g-line-jt-bottom"></i>
                    <div class="g-right-percent">97%</div>
                </div>
            </div>
            <!-- 下方导航 -->
            <div class="g-top-box lastTitle">
                <!-- 交付量 -->
                <div class="g-item-box-three" v-for="(item,index) in companyDate[2]" :key="index">
                    <p class="title"><i class="icon-warn"></i>{{item.specName}}</p>
                    <p class="g-tj" v-if="index!=companyDate[2].length-1"><span class="g-green">435</span><span class="g-green">/450</span></p>
                </div>
            </div>
            <!--最后一行图表 -->
            <div class="g-chart-box-inner lastBox">
                 <div>
                    <ChartPie v-for="(item,index) in companyDate[2]" :PieType='item.PieType' :DataType='dateType' :chartData='item'  :key="index" @click.native="gotDate(item)" ></ChartPie>
                   <p style='width: 30%; text-indent: 1em'><span class='g-red fl'>超期 1</span>  <span class='g-blue fr'>即将到期 1</span></p>
                  </div>
            </div>
        </div>
    </div>

    <!-- <Pie :style="{width: '5rem', height: '300px'}"></Pie> -->
    <footer>
      <ul class="clearfix">
        <li v-for="(item,index) in goods" :key="index" class="menu-item" @click="toggle(index,item.id);"
          :class="{'active':index == checkindex }">
          {{item.name}}
          </li>
      </ul>
    </footer>
</div>

</template>
<style>
header .mint-switch-input:checked + .mint-switch-core {
  background: #fff;
  border: #fff;
}
header .mint-switch-label {
  position: absolute;
  color: #fff;
  left: 1rem;
}
header .mint-switch-core::after {
  background: #0c6;
}
header .mint-switch-label {
  position: absolute;
  left: -50px;
}
header .mint-switch-core {
  height: 0.6rem;
}
header .mint-switch-core::before {
  background: #ddd;
}
</style>

<style scoped>
.g-zhizhen .circle{
  font-size:0.1rem;
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    background-color: #efefef; /* Can be set to transparent */
    border: 1px #a72525 solid;
    -webkit-border-radius: 100px;
    position: absolute;
    left:0.85rem;
    top:-0.15rem;
}
.g-zhizhen .fontSize{
  bottom:-0.1rem;
  position: absolute;
  left:0.8rem;
  font-size:0.10rem; 
  transform:rotate(0deg);
  -ms-transform:rotate(0deg); 	/* IE 9 */
  -moz-transform:rotate(0deg); 	/* Firefox */
  -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
  -o-transform:rotate(0deg);
}
.g-zhizhen{
  z-index: 999;
	display: inline-block;
    height: 2px;
    width: 0.8rem;
    background:green;
    position: absolute;
    left: 1.225rem;
    top: 1.35rem;
    transform: rotate(0deg);
    -webkit-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -ms-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform-origin: 0% 00%; /**元素的左上角为中心点进行旋转**/
    -webkit-transform-origin:0% 00%;
    -moz-transform-origin:0% 00%;
    -ms-transform-origin:0% 00%;
    -o-transform-origin:0% 00%;   
}
header {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  width: 100%;
  background: #0c6;
}
header span {
  color: #fff;
  font-size: 0.3rem;
  font-weight: 700;
  letter-spacing: 2px;
  position: relative;
}
header .mint-switch {
  float: right;
  position: absolute;
  height: 1rem;
  margin-right: 0.5rem;
  top: 0;
  right: -0.2rem;
}
footer {
  position: fixed;
  bottom: 0.4rem;
  width: 100%;
  height: 0.38rem;
  line-height: 0.38rem;
}
footer ul {
  padding: 0 0.2rem;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
header span .DropdownArrow {
  position: absolute;
  left: 48%;
  top: 0.32rem;
}
footer li {
  float: left;
  text-align: center;
  width: 1rem;
  font-size: 0.2rem;
  padding: 0.04rem 0.08rem;
  border: 1px solid;
  margin-left: -1px;
  background: #fff;
}
.active {
  background: #ccc;
}
.contentHeight {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-jt-left,
.icon-jt-right {
  position: absolute;
}
.icon-jt-left {
  left: 0px;
}
.lastTitle {
  padding-top: 0.2rem !important;
}
.icon-jt-right {
  right: 0px;
}
.g-range-box {
  height: 30px;
  line-height: 30px;
  font-size: 0px;
  width: 60%;
  margin: 0 auto;
  border: 1px solid #808080;
  margin-top: 10px;
}
.g-range-box li {
  display: inline-block;
  width: 32%;
  font-size: 14px;
  text-align: center;
  border-left: 1px solid #808080;
  cursor: pointer;
}
.g-range-box li:first-child {
  border-left: 0px;
}
.g-range-box li:last-child {
  width: 35%;
}
.g-range-box li.active {
  background: #cccccc;
}
.g-top-box {
  /* margin-left: 2%; */
  padding: 0 0%;
  height: 0.8rem;
  width: 100%;
  font-size: 0px;
  /* margin-top: 15px; */
}
.g-item-box {
  width: 18%;
  height: 100%;
  display: inline-block;
  font-size: 0.14rem;
  text-align: center;
  vertical-align: top;
}
.first span:nth-child(1) {
  margin-left: 6%;
}
.g-item-box .title {
  font-size: 14px;
}
.g-item-box .title .icon-warn {
  display: inline-block;
  height: 0.22rem;
  width: 0.22rem;
  background: url("images/icon/icon-warn.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 5px;
}
/** 中间7块样式 **/
.g-item-box-middle {
  /* padding-left: 0.5%;   */
  width: 14%;
  height: 100%;
  display: inline-block;
  font-size: 0.14rem;
  text-align: center;
  vertical-align: top;
}
.middleBox span:nth-child(1) {
  /* width: 13%; */
  margin-left: 6%;
}
.g-item-box-middle:nth-child(2n) {
  width: 12%;
}
.g-item-box-three {
  width: 33%;
  height: 100%;
  display: inline-block;
  font-size: 0.14rem;
  text-align: center;
  vertical-align: top;
}

.g-item-box-three .title {
  font-size: 14px;
}
.g-item-box-three .title .icon-warn {
  display: inline-block;
  height: 0.22rem;
  width: 0.22rem;
  background: url("images/icon/icon-warn.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 5px;
}

/** 下方 向下箭头 样式 **/
.g-item-box-bottom {
  width: 20%;
  height: 100%;
  display: inline-block;
  font-size: 0.14rem;
  text-align: center;
  vertical-align: middle;
  margin-left: 0.28rem;
}

.g-left-percent {
  width: 40%;
  font-size: 0.14rem;
  color: #037d04;
  border: 1px solid #037d04;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
}
.g-right-percent {
  width: 40%;
  font-size: 0.14rem;
  color: #0296f8;
  margin: 0 auto;
  border: 1px solid #0296f8;
  display: inline-block;
  vertical-align: middle;
}
.g-line-jt-bottom {
  display: inline-block;
  width: 1px;
  height: 0.5rem;
  border-left: 1px dashed #0296f8;
  vertical-align: middle;
}
.g-line-jt-bottom:after {
  content: "";
  display: inline-block;
  height: 0.14rem;
  width: 0.14rem;
  background: url("images/icon/icon-jt-right.png") no-repeat;
  background-size: 100% 100%;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  margin-top: 0.5rem;
  margin-left: -4px;
}

.g-item-box-middle .title {
  font-size: 12px;
}
.g-item-box-middle .title .icon-warn {
  display: inline-block;
  height: 0.22rem;
  width: 0.22rem;
  background: url("images/icon/icon-warn.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 5px;
}

.g-red {
  color: #ff0109;
  font-size: 0.16rem;
}
.g-blue{
	color: #0296f8;
	font-size: .16rem;
}
.g-green{
	color: #037d04;
	font-size: .16rem;
}

.g-tj {
  margin-top: 0rem;
  font-size: 12px;
}

.g-top-percent {
  width: 50%;
  font-size: 0.14rem;
  color: #037d04;
  border: 1px solid #037d04;
  margin: 0 auto;
}
.g-bottom-percent {
  width: 50%;
  font-size: 0.14rem;
  color: #0296f8;
  margin: 0 auto;
  border: 1px solid #0296f8;
}
.g-line-jt {
  display: inline-block;
  width: 70%;
  margin: 3px auto;
  height: 1px;
  border-bottom: 1px dashed #0296f8;
}
.g-line-jt:after {
  content: "";
  display: inline-block;
  height: 0.14rem;
  width: 0.14rem;
  background: url("images/icon/icon-jt-right.png") no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-top: -2px;
}

.g-item-box-middle .g-line-jt:after {
  content: "";
  display: inline-block;
  height: 0.14rem;
  width: 0.14rem;
  background: url("images/icon/icon-jt-right.png") no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-top: -2px;
  transform: rotate(180deg);
}

.g-item-box-bottom .g-line-jt:after {
  content: "";
  display: inline-block;
  height: 0.14rem;
  width: 0.14rem;
  background: url("images/icon/icon-jt-right.png") no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-top: -2px;
  transform: rotate(90deg);
}

.cricle-mb {
  position: absolute;
  display: inline-block;
  height: 0.1rem;
  width: 0.1rem;
  border: 1px solid #aeadb2;
  border-radius: 50%;
  top: 0.3rem;
  left: 0.9rem;
}
.g-chart-box-inner {
  overflow: hidden;
}
.cur-date {
  display: inline-block;
  position: absolute;
  color: #ff001b;
  top: 0.01rem;
  left: 0px;
  font-size: 0.12rem;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -ms-transform: scale(0.8);
  -o-transform: scale(0.8);
}
.lastBox {
  padding-bottom: 1rem;
}
</style>
<script>
import store from "@/vuex/store";
import BarGraph from "./BarGraph";
import ChartPie from "./chart_pie";
import dateCom from "./dateCom";
import { Indicator } from "mint-ui";
import axios from "axios";
import { mapState } from "vuex";
import api from "@/service/api"
export default {
  data() {
    return {
      // checkindex: 0, // 初始化第一个栏块高亮
      orgLevle: 99, // 部门id
      values: false,
      companyName:"采购部",
      orgId:0,
      dateType:1,
      startDate:"",
      endDate:"",
      // companyId:99,
      goods: [
        { name: "采购部", id: 99 },
        { name: "省公司", id: 1 },
        { name: "城市公司", id: 2 },
        { name: "分公司", id: 3 },
        { name: "采购中心", id: 4 },
        { name: "采购员", id: 10 }
      ],
      companyDate: [
        // [

        //   {
        //      specType : 101,
        //     specName : '勘察量' ,
        //     shouldBeDay: 8000,
        //     shouldBeAll: 10000,
        //     already: 6000,
        //     alreadyRate : '20%',
        //     diffRate: '20%',
        //     diff: 5600,
        //     remainRate: '60%',
        //     remain:0,
        //     time:'16日'
        //   },
        //   {
        //     specType : 102,
        //     specName : '勘察量' ,
        //     shouldBeDay: 8000,
        //     shouldBeAll: 10000,
        //     already: 6000,
        //     alreadyRate : '25%',
        //     "diffRate": '25%',
        //     "diff": 5600,
        //     "remainRate": '50%',
        //     "remain":8600,
        //     "time":'16日'
        //   },
        //   {
        //     specType : 102,
        //     specName : '勘察量' ,
        //     shouldBeDay: 8000,
        //     shouldBeAll: 10000,
        //     already: 6000,
        //     alreadyRate : '30%',
        //     diffRate: '40%',
        //     diff: 5600,
        //     remainRate: '30%',
        //     remain:8600,
        //     time:'16日'
        //   },
        // ],
        // [
        //   {
        //   specType : 102,
        //   specName : '勘察量' ,
        //   shouldBeDay: 8000,
        //   shouldBeAll: 10000,
        //   already: 6000,
        //   alreadyRate : '20%',
        //   diffRate: '10%',
        //   diff: 5600,
        //   remainRate: '70%',
        //   remain:8600,
        //   time:'16日'},
        //   {
        //     specType : 102,
        //      "num1":10000,
        //      "num2":80,
        //      "num3":70,
        //     },
        //   {
        //     specType : 102,
        //      "num1":400,
        //      "num2":10527,
        //      "num3":100,},
        //   {
        //   specType : 102,
        //      "num1":100,
        //      "num2":600,
        //      "num3":700,},
        // ],
        // [
        //   {
        //     PieType:2,
        //     specType : 102,
        //     specName : '交付量' ,
        //     deliveryCount: 8000,
        //     deliveryRate : '60%',
        //     undeliveryCount: 5600,
        //     undeliveryRate: '40%',
        //     pastCount:1,
        //     timelyCount:1,
        //     pastCount:1,

        //   },
        //   {
        //     PieType:1,
        //     specType : 102,
        //     specName : '采购量' ,
        //     shouldBeDay: 8000,
        //     shouldBeAll: 10000,
        //     already: 6000,
        //     alreadyRate : '60%',
        //     diffRate: '20%',
        //     diff: 5600,
        //     remainRate: '20%',
        //     remain:8600,
        //     time:'16日'
        //   },
        //   {
        //     PieType:3,
        //     specType : 102,
        //     specName : '勘察量' ,
        //     UserTotalNum: 8000,
        //     OldUsers: 10000,
        //     OldUserPercent : '60%',
        //     NewUsers: 5600,
        //     NewUserPercent: '40%',
        //     remain:8600,
        //     time:'16日'},
        // ],
      ]
    };
  },
  created() {
  },
  mounted() {
     if(this.startDate){
       this.toggle(this.checkindex, this.companyId)
    }
      // this.roateFn()
  },
  methods: {
    roateFn(){
      let dataroate = this.$refs.roatedata;
      let roatetitle = this.$refs.roatetitle;
      if(dataroate.length<=0){
        return false
      }
      dataroate.forEach((item,index)=>{
        let roate = 0;
        roate=(JSON.parse(item.dataset.roate).alreadyRate.replace("%","")-0)+(JSON.parse(item.dataset.roate).diffRate.replace("%","")-0)
        item.style.transform = 'rotate('+(roate*3.6-90)+'deg)'
        roatetitle[index].style.transform  = 'rotate('+-(roate*3.6-90)+'deg)'
      })
    },
    upDate(item){

      //日期的处理
      this.editDay(item.statusDay)
      this.dateType=item.status
      let data={
        "orgId":this.orgId,
        "dateType":this.dateType,
        "startDate":this.startDate,
        "endDate":this.endDate,
        "orgLevle":this.orgLevle
      }
      this.getdateInfo(data);
    },
    editDay(item){
      if(item.length==11){
        this.startDate = item.replace("年",'-').replace("月",'-').replace("日",'')+" 00:00:00"
        this.endDate = item.replace("年",'-').replace("月",'-').replace("日",'')+" 23:59:59"
      }else if(item.length==23){
        this.startDate = item.split("-")[0].replace("年",'-').replace("月",'-').replace("日",'')+" 00:00:00"
        this.endDate = item.split("-")[1].replace("年",'-').replace("月",'-').replace("日",'')+" 23:59:59"
      }else if(item.length==8){
        let datas = item.replace("年",'-').replace("月",'');
        let year = datas.split("-")[0];
        let month = datas.split("-")[1];
        var  day = new Date(year,month,0);
        var lastdate =  day.getDate();
        this.startDate = item.replace("年",'-').replace("月",'')+'-1'+" 00:00:00"
        this.endDate = item.replace("年",'-').replace("月",'')+'-'+lastdate+" 23:59:59"
      }
    },
    isOkFn(){//调用是否制定接口
      console.log(1111)
    },
    getdateInfo(data) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let arr1 = []
      let arr2 = []
      let arr3 = [];
      const that = this;
      //指标接口
     function steep1(reslove,reject){
        axios({
        url:that.$api.indexInformation,
        method: "get",
        data: data
      }).then(response => {
          //加载结束
          reslove(response.list)
          Indicator.close();
        }).catch(error => {
          // console.log(error)
        });
     }
      // 交付量接口
      function steep2(reslove,reject){
        axios({
        url:that.$api.DeliveryList,
        method: "post",
        data: data
      }).then(response => {
          //加载结束
          response.data.stats.specName="交付量"
          response.data.stats.PieType=2
           reslove(response.data.stats)
          Indicator.close();
        }).catch(error => {
          // console.log(error)
        });
     }
     function steep3(reslove,reject){
      // 采购员信息
        axios({
          url:that.$api.buyerInformation,
          method: "post",
          data: data
        }).then(response => {
            //加载结束
          if(response.data){
            response.data.purchaseStats.PieType=3
            reslove(response.data.purchaseStats)
              Indicator.close();
          }
        }).catch(error => {
          // console.log(error)
        });
     }
     new Promise(steep1).then((data)=>{
      data.forEach((item,index)=>{
            if(index<=2){
              arr1.push(item)
            }else if(index>=2&&index<=6){
              arr2.push(item)
            }else{
              arr3.push(item)
            }
        })
        // return new Promise(steep2)
     }).then((data)=>{
      //  arr3.unshift(data)
           return new Promise(steep3)
     }).then((data)=>{
        arr3.push(data)
     })
        // 交付采购量接口
      //   axios({
      //   url:this.$api.purchasingVolume,
      //   method: "post",
      //   data: data
      // })
      //   .then(response => {
      //     //加载结束
      //     if(response.data){
      //        arr3.push(response.data.purchaseStats)
      //     } 
         
      //     Indicator.close();
      //   })
      //   .catch(error => {
      //     // console.log(error)
      //   });
        
      this.companyDate.push(arr1)
      this.companyDate.push(arr2)
      this.companyDate.push(arr3)
    },
    toggle(index, id) {
      //切换公司和名称
      this.orgLevle = id;
      this.$store.commit("editId", {"checkindex":index,"DepartmentId":this.orgLevle});
      let data={
        "orgId":this.orgId,
        "dateType":this.dateType,
        "startDate":this.startDate,
        "endDate":this.endDate,
        "orgLevle":this.orgLevle
      }
      this.getdateInfo(data);

    },
    // goCity(id) {
    //   if (id != 0) {
    //     this.$router.push({ name: "changeCity" });
    //   }
    // },
    gotDate(data) {
      //跳转到数据页面
      console.log(data)
      if (data.companyId != 10 && data.companyId != 9) {
        this.$router.push({ name: "examination", params: { dataInfo: data } });
      }
    },
  },
  computed: {
    ...mapState(["companyId","checkindex"])
  },
  components: {
    BarGraph,
    ChartPie,
    dateCom
  },
  // beforeDestroy() {
  //   this.$root.$off("upDate");
  // }
};
</script>
