<template>
    <div class="dateBox">
        <div class="dates">
            <i class="iconfont  icon-right" @click="pre"></i>
            <span class="minWith"> {{dataTitle}} </span>
            <i class="iconfont  icon-arrow-right" @click="next"></i>
        </div>
        <ul class="newDate">
            <li v-for="(item,index) in goods" :key="index" class="menu-item" @click="toggle(index+1,item);"
            :class="{'active':index+1 ==checkindex }">
            {{item.companyName}}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.dates {
  text-align: center;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
}
.dates span {
  font-size: 0.2rem;
  margin: 0 0.5rem;
}
.newDate {
  display: flex;
  padding: 0 20%;
  margin-left: 1px;
  margin-bottom: 0.5rem;
}
.newDate li {
  width: 100%;
  border: 1px solid #ddd;
  background: #fff;
  text-align: center;
  margin-left: -1px;
}
.newDate .active {
  background: #ccc;
}
.dates .minWith {
  min-width: 3.2rem;
  display: inline-block;
  font-size: 12px;
}
</style>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      checkindex: 1, // 初始化第一个栏块高亮
      goods: [
        { companyName: "日" },
        { companyName: "周" },
        { companyName: "月" }
      ],
      dateId: 0,
      clen: 7,
      day: new Date(),
      weekTite:"",
      weekDay:new Date(),
      weekThre:4,
      dataTitle: ""
    };
  },
  created() {
    this.checkindex = this.dateStyle;
    if (this.checkindex == 1) {
      this.day= new Date();
      this.dataTitle = this.formatDate(this.AddDays(this.day, -1));
      this.newdate = this.formatDate(this.AddDays(this.day, 0));
      this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
    }
  },
  methods: {
    get_unix_time(dateStr)
    {
        dateStr = dateStr.replace('年','-');
        dateStr = dateStr.replace('月','-');
        dateStr = dateStr.replace('日','-');
        var newstr = dateStr.replace(/-/g,'/'); 
        var date =  new Date(newstr); 
        var time_str = date.getTime().toString();
        return time_str.substr(0, 10);
    },
    get_unix_moth(dateStr)
    {
        dateStr = dateStr.replace('年','-');
        dateStr = dateStr.replace('月','-');
        var newstr = dateStr.replace(/-/g,'/'); 
        var date =  new Date(newstr); 
        var time_str = date.getTime().toString();
        return time_str.substr(0, 10);
    },
    toggle(index, item) {
      //切换公司和名称
      this.checkindex = index;
      this.changeCity = item;
      if (this.checkindex == 1) {
        this.day = new Date();
        this.dataTitle = this.formatDate(this.AddDays(this.day, -1));
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      } else if (this.checkindex == 2) {
        this.day = new Date();
        this.dataTitle = this.setDate(new Date());
        this.weekTite = this.ForSetDate(new Date());
         this.$store.dispatch("editdayweek", {"weekTite":this.weekTite});
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      } else if (this.checkindex == 3) {
        this.day = new Date();
        this.dataTitle = this.formatDate(this.addMonth(this.day, 0));
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      }
    },
    formatDate(date) {
      //返回转换日期
      let year = date.getFullYear() + "年";
      let month = date.getMonth() + 1 + "月";
      let day = date.getDate() + "日";
      if (this.checkindex == 3) {
        return year + this.tom(month) + "月";
      } else {
        return year + this.tom(month) + "月" + this.tom(day) + "日";
      }
    },
    AddDays(date, value) {
      //加天功能
      date.setDate(date.getDate() + value);
      this.day = date;
      return date;
    },
    addDate(date, n) {
      //加周的功能
      date.setDate(date.getDate() + n);
      return date;
    },
    setDate(date) {
      let start = "";
      let end = "";
      var week = date.getDay() - 1;
      date = this.addDate(date, week * -1);
      this.day = new Date(date);
      for (var i = 0; i < this.clen; i++) {
        if (i == 0) {
          start = this.formatDate(date);
        } else {
          end = this.formatDate(this.addDate(date, 1));
        }
      }
      // end = end.slice(5);
      return start + "-" + end;
    },
    ForSetDate(date) {
      let start = "";
      let end = "";
      var week = date.getDay() - 1;
      date = this.addDate(date, week * -1);
      this.weekDay = new Date(date);
      for (var i = 0; i < this.weekThre; i++) {
        if (i == 0) {
          start = this.formatDate(date);
        } else {
          end = this.formatDate(this.addDate(date, 1));
        }
      }
      // end = end.slice(5);
      return start + "-" + end;
    },
    addMonth(date, num) {
      //加月的方法
      num = parseInt(num);
      var sDate = date;
      var sYear = sDate.getFullYear();
      var sMonth = sDate.getMonth() + 1;
      var sDay = sDate.getDate();
      var eYear = sYear;
      var eMonth = sMonth + num;
      var eDay = sDay;
      while (eMonth > 12) {
        eYear++;
        eMonth -= 12;
      }
      var eDate = new Date(eYear, eMonth - 1, eDay);
      this.day = eDate;
      return eDate;
    },
    tom(m) {
      //补零函数
      if (parseInt(m) > 9) {
        m = "" + parseInt(m);
      } else {
        m = "0" + parseInt(m);
      }
      return m;
    },
    pre() {
      if (this.checkindex == 1) {
        this.dataTitle = this.formatDate(this.AddDays(this.day, -1));
       
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      } else if (this.checkindex == 2) {
        this.dataTitle = this.setDate(this.addDate(this.day, -7));
        this.weekTite = this.ForSetDate(this.addDate(this.weekDay, -4));
         this.$store.dispatch("editdayweek", {"weekTite":this.weekTite});
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      } else if (this.checkindex == 3) {
        this.dataTitle = this.formatDate(this.addMonth(this.day, -1));
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      }
    },
    next() {
      if (this.checkindex == 1) { 
        var dateTime=new Date();
        dateTime=dateTime.setDate(dateTime.getDate()-1);
        dateTime=new Date(dateTime)
        if(this.get_unix_time(this.dataTitle)>=this.get_unix_time(this.formatDate(dateTime))){
          Toast("获取最大数据日");
          return false
        }
      
        this.dataTitle = this.formatDate(this.AddDays(this.day, 1));
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle});
      } else if (this.checkindex == 2) {
        var dateTime=new Date();
        dateTime=dateTime.setDate(dateTime.getDate()-1);
        dateTime=new Date(dateTime)
        var year=dateTime.getFullYear(); 
        let newday = this.get_unix_time(this.formatDate(dateTime))
        
        let firstWeek = this.get_unix_time(this.dataTitle.split('-')[0]);
        let lasttWeek = this.get_unix_time(this.dataTitle.split('-')[1]);
        if(newday>=firstWeek&&newday<=lasttWeek){
            Toast("获取最大数据周");
             return false
        }
        this.dataTitle = this.setDate(this.addDate(this.day, 7));
        this.weekTite = this.ForSetDate(this.addDate(this.weekDay, 4));
        this.$store.dispatch("editdayweek", {"weekTite":this.weekTite});
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      } else if (this.checkindex == 3) {
        var date=new Date;
        var year=date.getFullYear(); 
        var month=date.getMonth()+1;
        month =(month<10 ? "0"+month:month); 
        if(this.get_unix_moth(this.dataTitle)>=this.get_unix_moth(year+'年'+month+"月")){
          Toast("获取最大数据月");
          return false
        }
        this.dataTitle = this.formatDate(this.addMonth(this.day, 1));
        this.$emit('upDate', {"status":this.checkindex,"statusDay":this.dataTitle})
      }
    }
  },
  computed: {
    ...mapState(["dateStyle"])
  }
  
};
</script>
