(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5334c60d"],{"163d":function(t,e,a){"use strict";var n=a("e7ad"),r=a("e042"),o=a("75c4"),i=a("1e5b"),s=a("94b3"),l=a("238a"),c=a("2ea2").f,u=a("dcb7").f,d=a("064e").f,p=a("777a").trim,v="Number",f=n[v],x=f,m=f.prototype,y=o(a("e005")(m))==v,b="trim"in String.prototype,h=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():p(e,3);var a,n,r,o=e.charCodeAt(0);if(43===o||45===o){if(a=e.charCodeAt(2),88===a||120===a)return NaN}else if(48===o){switch(e.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+e}for(var i,l=e.slice(2),c=0,u=l.length;c<u;c++)if(i=l.charCodeAt(c),i<48||i>r)return NaN;return parseInt(l,n)}}return+e};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof f&&(y?l((function(){m.valueOf.call(a)})):o(a)!=v)?i(new x(h(e)),a,f):h(e)};for(var w,g=a("149f")?c(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;g.length>_;_++)r(x,w=g[_])&&!r(f,w)&&d(f,w,u(x,w));f.prototype=m,m.constructor=f,a("bf16")(n,v,f)}},"19a4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[t._v("薪酬管理")]),a("div",{staticStyle:{"margin-top":"20px",display:"flex","justify-content":"space-between","align-items":"center",padding:"20px","background-color":"white"}},[a("div",{staticStyle:{"font-size":"20px","font-weight":"bold"}},[a("span",[t._v(t._s(t.value2))]),a("span",{staticStyle:{"margin-left":"20px"}},[t._v("薪酬预算")])]),a("div",[a("el-date-picker",{attrs:{type:"month",format:"yyyy年MM月","value-format":"yyyy年MM月",placeholder:"选择月"},model:{value:t.value2,callback:function(e){t.value2=e},expression:"value2"}})],1)]),t._m(0),a("div",{staticStyle:{"background-color":"white",padding:"20px","margin-top":"20px"}},[a("div",{staticStyle:{margin:"0 20px 20px","font-weight":"bold","font-size":"20px"}},[t._v("薪资结构")]),a("div",[t._m(1),t._l(t.Salary,(function(e){return a("div",{key:e.id,staticClass:"rowbox"},[a("div",{staticClass:"rowboxson"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.SalaryStructure,expression:"item.SalaryStructure"}],class:e.SalaryStructure?"backcolor":"",attrs:{type:"text"},domProps:{value:e.SalaryStructure},on:{input:function(a){a.target.composing||t.$set(e,"SalaryStructure",a.target.value)}}})])]),a("div",{staticClass:"rowboxson"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.PlannedExpenditure,expression:"item.PlannedExpenditure"}],class:e.PlannedExpenditure?"backcolor":"",attrs:{type:"number"},domProps:{value:e.PlannedExpenditure},on:{blur:t.centain,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.keyup(e)},input:function(a){a.target.composing||t.$set(e,"PlannedExpenditure",a.target.value)}}})])]),a("div",{staticClass:"rowboxson"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.ActualExpenditure,expression:"item.ActualExpenditure"}],ref:"secondinput",refInFor:!0,class:e.ActualExpenditure?"backcolor":"",attrs:{type:"number"},domProps:{value:e.ActualExpenditure},on:{blur:t.centain,keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:e.target.blur()},input:function(a){a.target.composing||t.$set(e,"ActualExpenditure",a.target.value)}}})])]),a("div",{staticClass:"rowboxson"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.lastPlannedExpenditure,expression:"item.lastPlannedExpenditure"}],staticClass:"backcolor",attrs:{type:"number",disabled:""},domProps:{value:e.lastPlannedExpenditure},on:{input:function(a){a.target.composing||t.$set(e,"lastPlannedExpenditure",a.target.value)}}})])]),a("div",{staticClass:"rowboxson"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.lastActualExpenditure,expression:"item.lastActualExpenditure"}],staticClass:"backcolor",attrs:{type:"number",disabled:""},domProps:{value:e.lastActualExpenditure},on:{input:function(a){a.target.composing||t.$set(e,"lastActualExpenditure",a.target.value)}}})])])])})),a("div",{staticClass:"rowbox colors"},[a("div",{ref:"aaa",staticClass:"rowboxson"},[t._v("总计")]),a("div",{staticClass:"rowboxson"},[t._v(t._s(t.planedtotal))]),a("div",{staticClass:"rowboxson"},[t._v(t._s(t.Actualtotal))]),a("div",{staticClass:"rowboxson"},[t._v(t._s(t.lastplanedtotal))]),a("div",{staticClass:"rowboxson"},[t._v(t._s(t.lastActualtotal))])])],2),a("div",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticStyle:{margin:"20px"},attrs:{type:"primary"},on:{click:t.additem}},[t._v("添加更多")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticStyle:{margin:"20px"},attrs:{type:"primary"},on:{click:function(e){return t.centain(1)}}},[t._v("确定")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!t.show,expression:"!show"}],staticStyle:{margin:"20px"},attrs:{type:"info"},on:{click:t.canceladd}},[t._v("取消")])],1)])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{margin:"20px 20px 0"}},[a("div",[t._v("如果有更多的渠道请自行添加，所有添加的渠道会显示在CRM系统中")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rowbox"},[a("div",{staticClass:"rowboxson"},[t._v("薪资构成")]),a("div",{staticClass:"rowboxson"},[t._v("计划支出（元）")]),a("div",{staticClass:"rowboxson"},[t._v("实际支出（元）")]),a("div",{staticClass:"rowboxson"},[t._v("上月计划（元）")]),a("div",{staticClass:"rowboxson"},[t._v("上月实际（元）")])])}],o=(a("163d"),a("6c94")),i=a.n(o),s={name:"Salary",data:function(){return{value2:i()(Date.now()).format("YYYY年MM月"),Salary:[],planedtotal:0,lastplanedtotal:0,Actualtotal:0,lastActualtotal:0,show:!0}},methods:{getSalary:function(){var t=this;this.$axios.req("api/getSalary").then((function(e){t.Salary=e.data.data,t.Salary.map((function(e){t.planedtotal+=e.PlannedExpenditure,t.lastplanedtotal+=e.lastPlannedExpenditure,t.Actualtotal+=e.ActualExpenditure,t.lastActualtotal+=e.lastActualExpenditure}))})).catch((function(t){console.log(t)}))},additem:function(){this.show=!1,this.Salary.push({id:this.Salary.length+"Slr",SalaryStructure:"",PlannedExpenditure:"",ActualExpenditure:"",lastPlannedExpenditure:0,lastActualExpenditure:0})},centain:function(t){var e=this;1===t&&(this.show=!0),this.planedtotal=0,this.lastplanedtotal=0,this.Actualtotal=0,this.lastActualtotal=0,this.Salary.map((function(t){e.planedtotal+=Number(t.PlannedExpenditure),e.lastplanedtotal+=Number(t.lastPlannedExpenditure),e.Actualtotal+=Number(t.ActualExpenditure),e.lastActualtotal+=Number(t.lastActualExpenditure)}))},canceladd:function(){this.Salary.pop(),this.show=!0},keyup:function(t){t.target.blur();var e=this.$refs.secondinput.length-1;this.$refs.secondinput[e].focus()}},mounted:function(){this.getSalary()}},l=s,c=(a("f02d"),a("9ca4")),u=Object(c["a"])(l,n,r,!1,null,"0a5735ad",null);e["default"]=u.exports},"1e5b":function(t,e,a){var n=a("fb68"),r=a("859b").set;t.exports=function(t,e,a){var o,i=e.constructor;return i!==a&&"function"==typeof i&&(o=i.prototype)!==a.prototype&&n(o)&&r&&r(t,o),t}},"2ea2":function(t,e,a){var n=a("c2f7"),r=a("ceac").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,r)}},"777a":function(t,e,a){var n=a("e46b"),r=a("f6b4"),o=a("238a"),i=a("9769"),s="["+i+"]",l="​",c=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(t,e,a){var r={},s=o((function(){return!!i[t]()||l[t]()!=l})),c=r[t]=s?e(p):i[t];a&&(r[a]=c),n(n.P+n.F*s,"String",r)},p=d.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(u,"")),t};t.exports=d},"859b":function(t,e,a){var n=a("fb68"),r=a("69b3"),o=function(t,e){if(r(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=a("4ce5")(Function.call,a("dcb7").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(r){e=!0}return function(t,a){return o(t,a),e?t.__proto__=a:n(t,a),t}}({},!1):void 0),check:o}},9769:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},dcb7:function(t,e,a){var n=a("4f18"),r=a("cc33"),o=a("09b9"),i=a("94b3"),s=a("e042"),l=a("db6b"),c=Object.getOwnPropertyDescriptor;e.f=a("149f")?c:function(t,e){if(t=o(t),e=i(e,!0),l)try{return c(t,e)}catch(a){}if(s(t,e))return r(!n.f.call(t,e),t[e])}},e27f:function(t,e,a){},f02d:function(t,e,a){"use strict";var n=a("e27f"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-5334c60d.d47f2fda.js.map