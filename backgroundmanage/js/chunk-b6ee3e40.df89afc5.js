(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b6ee3e40"],{1654:function(e,t,i){"use strict";var l=i("8ad8"),s=i.n(l);s.a},"8ad8":function(e,t,i){},"9db9":function(e,t,i){"use strict";i.r(t);var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",[e._v("人员信息")]),i("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"20px"}},[i("div",{staticStyle:{display:"flex"}},[i("div",{on:{click:e.allemployees}},[i("el-button",{attrs:{size:"mini",round:"",type:1===e.index?"primary":""}},[e._v("全部员工")])],1),i("div",{staticStyle:{"margin-left":"10px"},on:{click:e.employing}},[i("el-button",{attrs:{size:"mini",round:"",type:2===e.index?"primary":""}},[e._v("考核中员工")])],1),i("div",{staticStyle:{"margin-left":"10px"},on:{click:e.employeed}},[i("el-button",{attrs:{size:"mini",round:"",type:3===e.index?"primary":""}},[e._v("已转正员工")])],1)]),i("div",{staticStyle:{display:"flex"}},[2!==e.index?i("div",[i("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("确认")])],1):e._e(),2!==e.index?i("div",{staticStyle:{"margin-left":"10px"}},[i("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("取消")])],1):e._e(),2===e.index?i("div",{staticStyle:{"margin-left":"10px"}},[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.Apply}},[e._v("批量转正申请")])],1):e._e(),i("div",{staticStyle:{"margin-left":"10px"}},[i("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("导出")])],1)])]),i("div",{staticStyle:{"margin-top":"20px"}},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"text item"},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.showEmployees,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),i("el-table-column",{attrs:{prop:"Names",label:"姓名",width:"120"}}),i("el-table-column",{attrs:{prop:"JobNumber",label:"工号",sortable:"",width:"120"}}),i("el-table-column",{attrs:{prop:"mechanism",label:"机构",width:"120"}}),i("el-table-column",{attrs:{prop:"Componys",label:"部门",width:"120"}}),i("el-table-column",{attrs:{prop:"timeBegin",label:"试用开始时间",sortable:"",width:"140"}}),i("el-table-column",{attrs:{prop:"timeEnd",label:"试用结束时间",sortable:"",width:"140"}}),i("el-table-column",{attrs:{label:"转正审批状态",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("div",{staticStyle:{color:"deepskyblue"}},[e._v(e._s(t.row.ApprovalStatus))])]}}])}),i("el-table-column",{attrs:{label:"操作",width:"120"}},[[i("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("编辑试用期")])]],2)],1)],1)])],1),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30],"page-size":e.currentNum,layout:"total, sizes, prev, pager, next, jumper",total:e.allEmployees.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),i("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("span",[e._v(e._s(e.msg))]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.cancelapply}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.addapply}},[e._v("确 定")])],1)])],1)},s=[],a={name:"OrganizeEmployees",data:function(){return{Employees:[],showEmployees:[],allEmployees:[],multipleSelection:[],currentPage:1,currentNum:10,index:1,dialogVisible:!1,msg:""}},methods:{getEmployees:function(){var e=this;this.$axios.req("api/getEployees").then((function(t){e.Employees=t.data.data,e.allEmployees=t.data.data,e.showEmployees=e.Employees.slice(0,10)})).catch((function(e){console.log(e)}))},handleSelectionChange:function(e){this.multipleSelection=e},handleSizeChange:function(e){this.currentNum=e,this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum)},handleCurrentChange:function(e){this.currentPage=e,this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum)},allemployees:function(){this.index=1,this.currentPage=1,this.allEmployees=this.Employees,this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum)},employing:function(){this.index=2,this.currentPage=1,this.allEmployees=this.Employees.filter((function(e){return"审批中"===e.ApprovalStatus})),this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum)},employeed:function(){this.index=3,this.currentPage=1,this.allEmployees=this.Employees.filter((function(e){return"审批通过"===e.ApprovalStatus})),this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum)},Apply:function(){this.dialogVisible=!0,this.multipleSelection.length>0?this.msg="是否确认转正？":this.msg="未选择选项"},cancelapply:function(){this.dialogVisible=!1,this.msg=""},addapply:function(){this.dialogVisible=!1,this.multipleSelection.length>0&&(this.multipleSelection.map((function(e){e.ApprovalStatus="审批通过"})),this.allEmployees=this.Employees.filter((function(e){return"审批中"===e.ApprovalStatus})),this.showEmployees=this.allEmployees.slice((this.currentPage-1)*this.currentNum,this.currentPage*this.currentNum))}},mounted:function(){this.getEmployees()}},n=a,r=(i("1654"),i("9ca4")),o=Object(r["a"])(n,l,s,!1,null,"7359a310",null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-b6ee3e40.df89afc5.js.map