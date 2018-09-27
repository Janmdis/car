<template>
    <div class="dataSheet">
         <mt-header :title="companyName">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 日期控件 -->
        <dateCom @upDate="upDate"></dateCom>
        <div v-show="specType==104||specType==105||specType==106">
            <ul class="titleHeadr">
                <li>公司</li>
                <li>合格</li>
                <li>拒绝</li>
                <li>未处理</li>
                <li>总量</li>
            </ul>
            <ul class="dataTable" v-for="(item,index) in this.dataList" :key='index'>
                <li @click="goBack(1)"><span>{{item.orgName}}</span></li>
                <li @click="goDown(1)"><span>{{item.passCount}}
                    {{item.passCount}}</span>
                </li>
                <li @click="goDown(1)"><span>{{item.rejectCount}}
                    {{item.rejectRate}}</span>
                </li>
                <li @click="goDown(1)"><span>{{item.unsetCount}}
                    {{item.unsetRate}}</span>
                </li>
                
                <li @click="goDown(1)"><span>{{item.totalCount}}</span></li>
            </ul>
        </div>
        <div v-show="specType==101||specType==102||specType==103||specType==107">
            <ul class="titleHeadr">
                <li>公司</li>
                <li>完成</li>
                <li v-show='iSnoShow'>目标</li>
                <li>偏差</li>
                <li v-show='iSnoShow'>剩余</li>
                <li>总量</li>
            </ul>
            <ul class="dataTable" v-for="(item,index) in this.dataList" :key='index'>
                <li @click="goBack(1)"><span>{{item.orgName}}</span></li>
                <li @click="goDown(1)"><span>{{item.actualCount}}
                    {{item.actualRate}}</span>
                </li>
                <li @click="goDown(1)" v-show='iSnoShow'><span>{{item.targetCount}}</span></li>
                <li @click="goDown(1)"><span>{{item.biasCount}}
                    {{item.biasRate}}</span>
                </li>
                <li @click="goDown(1)" v-show='iSnoShow'><span>{{item.remainingCount}}
                    {{item.remainingRate}}</span>
                </li>
                
                <li @click="goDown(1)"><span>{{item.totalCount}}</span></li>
            </ul>
        </div>
        <div v-show="specType==108">
            <ul class="untitleHeadr">
                <li>公司</li>
                <li>已交付</li>
                <li>未交付</li>
                <li>超期</li>
                <li>即将到期</li>
                <li><span>未交付项合计</span></li>
            </ul>
            <ul class="undataTable" v-for="(item,index) in this.dataList" :key='index'>
                <li @click="goBack(1)"><span>{{item.orgName}}</span></li>
                <li @click="goDown(1)"><span>{{item.deliveryCount}}
                    {{item.deliveryRate}}</span>
                </li>
                <li @click="goDown(1)"><span>{{item.undeliveryCount}}
                  {{item.undeliveryRate}}</span></li>
                <li @click="goDown(1)"><span>{{item.pastCount}}</span>
                </li>
                <li @click="goDown(1)"><span>{{item.timelyCount}}</span>
                </li>
                
                <li @click="childrenList(index,item)"><span>{{item.undeliveryTotalCount}}</span></li>
            </ul>
        </div>
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
import axios from "axios";
import dateCom from "./dateCom";
import { Indicator } from "mint-ui";
export default {
  components: {
    dateCom
  },
  data() {
    return {
      companyName: "", // 初始化第一个栏块高亮
      checkindex: 0, // 初始化第一个栏块高亮
      orgId:0,
      dateType:1,
      startDate:"",
      endDate:"",
      specType:0,
      dataList: [],
      iSnoShow: true,
      status: 7,
      dataInfo:""
    };
  },
  created() {
 
    let that = this;
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    //用easy-mock来获取在线的测试数据
      this.specType = (this.$route.params.dataInfo.specType)
      this.companyName = this.$route.params.dataInfo.specName+"详情"
      this.status = this.$route.params.dataInfo.companyId
  },
  methods: {
     upDate(item){
     this.editDay(item.statusDay)
     this.dateType=item.status
     if(item.status==3){
       this.iSnoShow = false;
     }else{
       this.iSnoShow = true;
     }
      let data={
        "orgId":this.orgId,
        "dateType":this.dateType,
        "startDate":this.startDate,
        "endDate":this.endDate,
        "specType":this.specType
      }
      this.dataInfo = data
      // this.getdateInfo();
      this.getDate(data)
    },
    getDate(data){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let specType = data.specType;
      let url = ""
      if(specType==101||specType==102||specType==103||specType==107){
          //线索量/勘察量/申报量/签约量接口
          url = this.$api.coreInterface
      }else if(specType==104||specType==105||specType==106){
          //分公司审批详情/收益部审批详情/综合部审批详情接口
          url = this.$api.OrgApprovalDetail
      }else if(specType==108){
          //交付量列表接口
          url = this.$api.DeliveryList
      }

      axios({
      url:url,
      method: "post",
      data: data
    })
      .then(response => {
        console.log(response)
        this.dataList = []
        this.dataList.push(...response.data.stats );
        console.log(this.dataList)
         Indicator.close(); 
      })
      .catch(error => {
        console.log(error);
      });
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
    childrenList(index, item) {
      console.log(item)
      this.$router.push({
        name: "undelivered",
        params: { item ,dataInfo:this.dataInfo }
      });
    },
    goBack(){
     this.$router.push("/")
    },
    goDown(){
      alert("..")
    }
  },
  beforeDestroy() {
    this.$root.$off("upDate");
  }
  
};
</script>
