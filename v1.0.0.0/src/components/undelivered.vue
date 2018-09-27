<template>
    <div class="dataSheet">
         <mt-header :title="companyName">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        
        <div>
            <ul class="titleHeadr">
                <li>公司</li>
                <li>已交付</li>
                <li>未交付</li>
                <li>超期</li>
                <li>即将到期</li>
                <li><span>未交付项合计</span></li>
            </ul>
            <ul class="dataTable" v-for="(item,index) in this.dataList" :key='index'>
                <li><span>{{item.orgName}}</span></li>
                <li><span>{{item.deliveryCount}}
                    {{item.deliveryRate}}</span>
                </li>
                <li ><span>{{item.undeliveryCount}}
                    {{item.undeliveryRate}}</span></li>
                <li><span>{{item.pastCount}}
                    </span>
                </li>
                <li ><span>{{item.timelyCount}}</span>
                </li>
                <li ><span>{{item.undeliveryTotalCount}}</span>
                </li>
            </ul>
        </div>
        <div>
            <ul class="titleHeadr">
                <li>未支付项</li>
                <li>套数</li>
                <li>项目数</li>
                <li>比例</li>
            </ul>
            <ul class="dataTable" v-for="(item,index) in this.dataListChild" :key='index'>
                <li><span>{{item.undeliveryItem}}</span></li>
                <li ><span>{{item.cellCount}}</span></li>
                <li><span>{{item.projectCount}}</span></li>
                <li ><span>{{item.rate}}</span></li>    
            </ul>
        </div>
    </div>
</template>
<style>
.dataSheet .mint-header{
    line-height: 1rem;
    height: 1rem;
    background: #0c6;
}
.dataSheet  .mint-header-button{
    color: #fff;
}
.dataSheet .mint-button-icon{
    line-height: 0.8rem;
}
</style>
<style scoped>
.dates{
    text-align:center;
    margin-top: 0.5rem;
    margin-bottom:0.1rem;
}
.dates span{
    font-size:0.2rem;
    margin:0 0.5rem;
}
.dataSheet{
    height: 100%;
    background:#fff;
}
.newDate{
    display: flex;
    padding: 0 20%;
     margin-left:1px;
}
.newDate li{
    width: 100%;
    border:1px solid #ddd;
    background:#fff;
    text-align:center;
    margin-left:-1px;
}
.dataSheet  .active {
  background:#ccc;
}
.titleHeadr{
    display:flex;
     flex-wrap: nowrap;
}
.titleHeadr li{
   width: 100%;
    text-align:center;
    font-size:0.3rem;
    font-weight:700;
    line-height:1rem;  
}
.titleHeadr li span{
     padding:0 5%;
    display: inline-block;
    font-size:0.3rem;
    line-height:0.4rem;  
}
.dataTable{
    display:flex;
}
.dataTable li{
    width: 100%;
     text-align:center;
     height: 1rem;
     line-height:0.8rem;
     font-size:0.2rem;
}
.dataTable li span{
    display: inline-block;
    font-size:0.2rem;
    line-height:0.4rem;
    color:green;
    padding:0 20%;
}
</style>

<script>
import axios from "axios";
import { Indicator } from "mint-ui";
    export default {
  data() {
    return {
    companyName: "未交付项详情", // 初始化第一个栏块高亮
    dataList:[],
    dataListChild:[],
    iSnoShow:false,
    };
  },
  created() {
    //   let newDate = [];
    //   newDate.push(this.$route.params.item)
    //   this.dataList=newDate
    //   let that = this;
    this.getdataInfo()
  },
  methods: {
    getdataInfo(){
        Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        let dataInfo = this.$route.params.dataInfo
        let data={
            "orgId":dataInfo.orgId,
            "dateType":dataInfo.dateType,
            "startDate":dataInfo.startDate,
            "endDate":dataInfo.endDate,
        }   
        axios({
        url: this.$api.UndeliveryList,
        method: "post",
        data: data
        })
        .then(response => {
            console.log(response)
            this.dataList = []
            this.dataList.push(response.data.stats); 
            this.dataListChild.push(...response.data.stats.undelivery); 
           
            Indicator.close();  
        })
        .catch(error => {
            console.log(error);
        });
        }
  },

};
</script>
