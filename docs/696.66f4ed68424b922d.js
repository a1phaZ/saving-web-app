"use strict";(self.webpackChunkwebapp=self.webpackChunkwebapp||[]).push([[696],{9696:(D,i,t)=>{t.r(i),t.d(i,{TransactionExpenseComponent:()=>m});var E=t(177),c=t(5936),_=t(9383),r=t(9417),u=t(12),p=t(154),n=t(4438);let m=(()=>{class a extends c.R{constructor(){super(...arguments),this.MainButtonText="\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0440\u0430\u0441\u0445\u043e\u0434"}ngOnInit(){super.ngOnInit()}MainButtonFn(){const e={Type:u.wV.EXPENSE,Cashflow:u.hz.EXPENSE,Amount:Number(this.form.value.amount),Source:this.form.value.source,Description:this.form.value.description,Timestamp:+Date.now()};this.store.dispatch(new p._v(e)),this.formReset()}static#t=this.\u0275fac=(()=>{let e;return function(s){return(e||(e=n.xGo(a)))(s||a)}})();static#n=this.\u0275cmp=n.VBU({type:a,selectors:[["webapp-transaction-expense"]],standalone:!0,features:[n.Vt3,n.aNF],decls:2,vars:2,consts:[[3,"title","value"]],template:function(o,s){if(1&o&&(n.j41(0,"ui-page-container"),n.nrm(1,"ui-balance",0),n.k0s()),2&o){let l;n.R7$(),n.Y8G("title",s.title)("value",(null==(l=s.form.get("amount"))?null:l.value)||0)}},dependencies:[E.MD,_.WB,r.YN,_.iK,r.X1]})}return a})()}}]);