(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(1),u=n.n(c),a=n(14),r=n.n(a),o=(n(19),n(3)),s=n(0),i=function(e){var t=e.value,n=e.onChange;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Filter Phonebook"}),Object(s.jsxs)("div",{children:["Name to filter: ",Object(s.jsx)("input",{value:t,onChange:n})]})]})},l=function(e){var t=e.formProps,n=t.addContent,c=t.newName,u=t.setNewName,a=t.newNumber,r=t.setNewNumber;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["Name: ",Object(s.jsx)("input",{value:c,onChange:function(e){return u(e.target.value)}})]}),Object(s.jsxs)("div",{children:["Number: ",Object(s.jsx)("input",{value:a,onChange:function(e){return r(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"Add"})})]})},d=function(e){var t=e.personFilter,n=e.deletePersons;return t.map((function(e){return Object(s.jsxs)("p",{children:[e.name," - ",e.number,Object(s.jsx)("button",{onClick:function(){return n(e.id,e.name)},children:"Delete"})]},e.id)}))},j=function(e){var t=e.message;return null===t?null:Object(s.jsx)("div",{className:t.state,children:t.message})},b=n(4),f=n.n(b),h="http://localhost:3001/api/persons",m=function(){return f.a.get(h).then((function(e){return e.data}))},O=function(e){return f.a.post(h,e).then((function(e){return e.data}))},p=function(e,t){return f.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},x=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],u=t[1],a=Object(c.useState)(""),r=Object(o.a)(a,2),b=r[0],f=r[1],h=Object(c.useState)(n),x=Object(o.a)(h,2),w=x[0],g=x[1],N=Object(c.useState)(""),C=Object(o.a)(N,2),k=C[0],S=C[1],P=Object(c.useState)(""),y=Object(o.a)(P,2),F=y[0],T=y[1],A=Object(c.useState)(null),D=Object(o.a)(A,2),E=D[0],J=D[1];Object(c.useEffect)((function(){m().then((function(e){u(e)}))}),[]);var L=function(e,t){window.confirm("Confirm delete ".concat(t))&&v(e).then((function(t){u(n.filter((function(t){return t.id!==e})))})).catch((function(e){J({message:"".concat(t," has already been deleted"),state:"unsuccessful"}),setTimeout((function(){J(null)}),5e3)}))},B={addContent:function(e){e.preventDefault();var t={name:k,number:F},c=n.find((function(e){return e.name===k}));c?window.confirm("".concat(k," is in the phonebook already, would you like to replace the phone number?"))&&p(c.id,t).then((function(e){u(n.map((function(t){return t.id===e.id?e:t}))),J({message:"Replaced ".concat(e.name,"'s number with ").concat(e.number),state:"successful"}),setTimeout((function(){J(null)}),5e3)})).catch((function(e){J({message:"".concat(k," has already been deleted"),state:"unsuccessful"}),setTimeout((function(){J(null)}),5e3)})):O(t).then((function(e){u(n.concat(e)),S(""),T(""),J({message:"Added ".concat(e.name),state:"successful"}),setTimeout((function(){J(null)}),5e3)}))},newName:k,setNewName:S,newNumber:F,setNewNumber:T};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(j,{message:E}),Object(s.jsx)(i,{value:b,onChange:function(e){f(e.target.value);var t=n.filter((function(t){return t.name.toLowerCase().match(e.target.value.toLowerCase())}));g(t)}}),Object(s.jsx)("h3",{children:"Add a new..."}),Object(s.jsx)(l,{formProps:B}),Object(s.jsx)("h2",{children:"Numbers"}),""===b?Object(s.jsx)(d,{personFilter:n,deletePersons:L}):Object(s.jsx)(d,{personFilter:w,deletePersons:L})]})};r.a.render(Object(s.jsx)(u.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.480b1877.chunk.js.map