//页面全局配置
//做成组件谁用谁调用
const api = {
  indexInformation: "/api/spec/info", //指标信息
  areaList:"/api/SelectSpecifiedLevelOrgs",//	3.1.3	组织架构接口
  employeeList: "/api/SelectOrgUsers", //员工列表
  purchasingVolume: "/api/spec/purchase", //采购量
  coreInterface: "/api/spec/OrgStatistic",//(线索量/勘察量/申报量/签约量接口
  OrgApprovalDetail: "/api/spec/OrgApprovalDetail",//(3.1.8	分公司审批详情/收益部审批详情/综合部审批详情接口
  DeliveryList: "/api/spec/DeliveryList",//(3.1.9	交付量列表接口
  UndeliveryList: "/api/spec/UndeliveryList",//(3.1.10	未交付详情接口
  buyerInformation: "/api/cgy", //采购员信息

};

export default api;
