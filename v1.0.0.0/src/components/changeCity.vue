<template>
    <div class="changeCity">
        <mt-header :title="companyName">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="titleName">
            请选择{{companyName}}公司
        </div>
        <div class="cityChange">
            <ul class="clearfix ulStyle">
                <li v-for="(item,index) in goods" :key="index" class="menu-item" @click="toggle(index,item);"
                :class="{'active':index ==checkindex }">
                {{item.companyName}}
                </li>
            </ul>
        </div>
       <button class="buttonsytle" @click="confirm">确定</button>
    </div>
</template>
<style>
.changeCity .mint-header{
    line-height: 1rem;
    height: 1rem;
    background: #0c6;
}
.changeCity  .mint-header-button{
    color: #fff;
}
.changeCity .mint-button-icon{
    line-height: 0.8rem;
}
</style>
<style scoped>
.changeCity{
    background:#fff;
    height: 100%;
    text-align:center;
}
.cityChange li{
    border-radius:5px;
    width: 23.3%;
    padding:2% 2.5%;
    margin:2%;
    float: left;
    text-align: center;
    border:1px solid #ccc;
}
.ulStyle{
    padding:5%;
}
.cityChange  .active {
  border:1px solid  #008000;;
}
.titleName{
    padding:0.8rem 0 0 0.5rem;
    text-align:left;
}
.buttonsytle{
    margin:auto;
    width: 60%;
    border:none;
    height: 0.8rem;
    border-radius:5px;
    background:#008000;
    color:#fff;
}
</style>

<script>
import store from '@/vuex/store'
import {mapState} from 'vuex';
export default {
  data() {
    return {
    checkindex: 0, // 初始化第一个栏块高亮
    goods: [],
    changeCity:{},
    };
  },
  created() {
      let that = this;
      this.$http({
              url: "https://www.easy-mock.com/mock/5b96458e458965131f4aecd3/cityCommpoeny/city",
              method: 'get',
              data: {}
          }).then(response => {
              if(response.data.city.length>0){
                  this.goods =[...response.data.city]
              }
              that.toggle(that.checkindex,response.data.city[that.checkindex])
          }).catch(error => {
              console.log(error)
          })
          
  },
  methods: {
     toggle(index,item) {//切换公司和名称
       this.checkindex = index;
       this.changeCity = item
    },
    confirm(){
        if(this.changeCity){
            console.log(this.changeCity)
            this.$router.push("/");
            this.$http({
              url: "https://www.easy-mock.com/mock/5b96458e458965131f4aecd3/cityCommpoeny/city",
              method: 'get',
              data: {}
          }).then(response => {
              
          }).catch(error => {
              console.log(error)
          })
        }
        
    }
  },
  computed:{
    ...mapState(["companyId","companyName"]),
  },
};
</script>

