<template>
    <div class="dataSheet">
         <mt-header :title="companyName">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="dateBox">
            <div class="dates">
                左边
               <span> 2018年9月 </span>
                右边
            </div>
            <ul class="newDate">
                <li>日</li>
                <li>周</li>
                <li>月</li>
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
</style>

<script>
    export default {
  data() {
    return {
    companyName: "sssss", // 初始化第一个栏块高亮

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
              
          }).catch(error => {
              console.log(error)
          })
          
  },
  methods: {

    
  },

};
</script>
