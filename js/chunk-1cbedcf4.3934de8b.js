(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1cbedcf4"],{2246:function(t,e,c){"use strict";c.r(e);var i=c("7a23"),a={class:"text-end mt-4"},o=Object(i["h"])(" 建立新的產品 "),l=Object(i["i"])("i",{class:"bi bi-plus-circle"},null,-1),n={class:"table-responsive"},s={class:"table mt-4"},r=Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",null,"編號"),Object(i["i"])("th",{width:"200"},"產品圖片"),Object(i["i"])("th",{width:"120"},"分類"),Object(i["i"])("th",null,"產品名稱"),Object(i["i"])("th",{width:"120"},"原價"),Object(i["i"])("th",{width:"120"},"售價"),Object(i["i"])("th",{width:"100"},"是否啟用"),Object(i["i"])("th",{width:"200"},"編輯")])],-1),d={class:"text-right"},u={class:"text-right"},p={key:0,class:"text-success"},b={key:1},m={class:"btn-group align-item-center"};function j(t,e,c,j,O,h){var f=Object(i["F"])("Loading"),g=Object(i["F"])("Pagination"),P=Object(i["F"])("ProductModal"),v=Object(i["F"])("DelModal");return Object(i["w"])(),Object(i["e"])("div",null,[Object(i["i"])(f,{active:O.isLoading,"z-index":1070},null,8,["active"]),Object(i["i"])("div",a,[Object(i["i"])("button",{class:"btn btn-primary text-white",type:"button",onClick:e[1]||(e[1]=function(t){return h.openModal(!0)})},[o,l])]),Object(i["i"])("div",n,[Object(i["i"])("table",s,[r,Object(i["i"])("tbody",null,[(Object(i["w"])(!0),Object(i["e"])(i["a"],null,Object(i["D"])(O.products,(function(e,c){return Object(i["w"])(),Object(i["e"])("tr",{key:e.id},[Object(i["i"])("td",null,Object(i["I"])(c+1),1),Object(i["i"])("td",null,[Object(i["i"])("img",{src:e.imageUrl,alt:e.imageUrl,width:"200"},null,8,["src","alt"])]),Object(i["i"])("td",null,Object(i["I"])(e.category),1),Object(i["i"])("td",null,Object(i["I"])(e.title),1),Object(i["i"])("td",d,Object(i["I"])(t.$filters.currency(e.origin_price)),1),Object(i["i"])("td",u,Object(i["I"])(t.$filters.currency(e.price)),1),Object(i["i"])("td",null,[e.is_enabled?(Object(i["w"])(),Object(i["e"])("span",p,"啟用")):(Object(i["w"])(),Object(i["e"])("span",b,"未啟用"))]),Object(i["i"])("td",null,[Object(i["i"])("div",m,[Object(i["i"])("button",{class:"btn btn-outline-primary btn-md",type:"button",onClick:function(t){return h.openModal(!1,e)}}," 編輯 ",8,["onClick"]),Object(i["i"])("button",{class:"btn btn-outline-danger btn-md",type:"button",onClick:function(t){return h.openDelProductModal(e)}}," 刪除 ",8,["onClick"])])])])})),128))])])]),Object(i["i"])(g,{pages:O.pagination,onEmitPages:h.getProducts},null,8,["pages","onEmitPages"]),Object(i["i"])(P,{onUpdateProduct:h.updateProduct,product:O.tempProduct,isNew:O.isNew,ref:"productModal"},null,8,["onUpdateProduct","product","isNew"]),Object(i["i"])(v,{product:O.tempProduct,ref:"delModal",onDelItem:h.delProduct},null,8,["product","onDelItem"])])}var O=c("5530"),h=(c("99af"),c("bc92")),f=c("3035"),g=(c("a434"),c("a4d3"),c("e01a"),{class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"productModal-title","aria-hidden":"true",ref:"modal"}),P={class:"modal-dialog modal-xl",role:"document"},v={class:"modal-content border-0"},y={class:"modal-header bg-primary text-white"},w={class:"modal-title",id:"productModal-title"},M={key:0},U={key:1},k=Object(i["i"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),$={class:"modal-body"},x={class:"row"},S={class:"col-sm-4"},I={class:"mb-3"},_=Object(i["i"])("label",{for:"image",class:"form-label"},"輸入圖片網址",-1),C={class:"mb-3"},L={for:"customFile",class:"form-label"},V=Object(i["h"])("或 上傳圖片 "),D={key:0,class:"fas fa-spinner fa-spin"},F={key:0,class:"mt-5"},N={key:0},R={class:"col-sm-8"},A={class:"mb-3"},T=Object(i["i"])("label",{for:"title",class:"form-label"},"標題",-1),E={class:"row gx-2"},J={class:"mb-3 col-md-6"},z=Object(i["i"])("label",{for:"category",class:"form-label"},"分類",-1),B={class:"mb-3 col-md-6"},q=Object(i["i"])("label",{for:"unit",class:"form-label"},"單位",-1),G={class:"row gx-2"},H={class:"mb-3 col-md-6"},K=Object(i["i"])("label",{for:"origin_price",class:"form-label"},"原價",-1),Q={class:"mb-3 col-md-6"},W=Object(i["i"])("label",{for:"price",class:"form-label"},"售價",-1),X=Object(i["i"])("hr",null,null,-1),Y={class:"mb-3"},Z=Object(i["i"])("label",{for:"description",class:"form-label"},"產品描述",-1),tt={class:"mb-3"},et=Object(i["i"])("label",{for:"content",class:"form-label"},"說明內容",-1),ct={class:"mb-3"},it={class:"form-check"},at=Object(i["i"])("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),ot={class:"modal-footer"},lt=Object(i["i"])("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function nt(t,e,c,a,o,l){return Object(i["w"])(),Object(i["e"])("div",g,[Object(i["i"])("div",P,[Object(i["i"])("div",v,[Object(i["i"])("div",y,[Object(i["i"])("h5",w,[c.isNew?(Object(i["w"])(),Object(i["e"])("span",M,"新增產品")):(Object(i["w"])(),Object(i["e"])("span",U,"編輯產品"))]),k]),Object(i["i"])("div",$,[Object(i["i"])("div",x,[Object(i["i"])("div",S,[Object(i["i"])("div",I,[_,Object(i["R"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"image","onUpdate:modelValue":e[1]||(e[1]=function(t){return o.tempProduct.imageUrl=t}),placeholder:"請輸入圖片連結"},null,512),[[i["M"],o.tempProduct.imageUrl]])]),Object(i["i"])("div",C,[Object(i["i"])("label",L,[V,o.status.fileUploading?(Object(i["w"])(),Object(i["e"])("i",D)):Object(i["f"])("",!0)]),Object(i["i"])("input",{type:"file",id:"customFile",class:"form-control",ref:"fileInput",onChange:e[2]||(e[2]=function(){return l.uploadFile&&l.uploadFile.apply(l,arguments)})},null,544)]),Object(i["i"])("img",{class:"img-fluid",src:o.tempProduct.imageUrl,alt:o.tempProduct.imageUrl},null,8,["src","alt"]),o.tempProduct.imagesUrl?(Object(i["w"])(),Object(i["e"])("div",F,[(Object(i["w"])(!0),Object(i["e"])(i["a"],null,Object(i["D"])(o.tempProduct.imagesUrl,(function(t,e){return Object(i["w"])(),Object(i["e"])("div",{class:"mb-3",key:e},[Object(i["R"])(Object(i["i"])("input",{type:"url",class:"form-control form-control","onUpdate:modelValue":function(t){return o.tempProduct.imagesUrl[e]=t},placeholder:"請輸入連結"},null,8,["onUpdate:modelValue"]),[[i["M"],o.tempProduct.imagesUrl[e]]]),Object(i["i"])("div",null,[Object(i["i"])("img",{class:"img-fluid",src:t,alt:t},null,8,["src","alt"])]),Object(i["i"])("button",{type:"button",class:"btn btn-outline-danger",onClick:function(t){return o.tempProduct.imagesUrl.splice(e,1)}}," 移除 ",8,["onClick"])])})),128)),o.tempProduct.imagesUrl[o.tempProduct.imagesUrl.length-1]||!o.tempProduct.imagesUrl.length?(Object(i["w"])(),Object(i["e"])("div",N,[Object(i["i"])("button",{type:"button",class:"btn btn-outline-primary btn-sm d-block w-100",onClick:e[3]||(e[3]=function(t){return o.tempProduct.imagesUrl.push("")})}," 新增圖片 ")])):Object(i["f"])("",!0)])):Object(i["f"])("",!0)]),Object(i["i"])("div",R,[Object(i["i"])("div",A,[T,Object(i["R"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":e[4]||(e[4]=function(t){return o.tempProduct.title=t}),placeholder:"請輸入標題"},null,512),[[i["M"],o.tempProduct.title]])]),Object(i["i"])("div",E,[Object(i["i"])("div",J,[z,Object(i["R"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"category","onUpdate:modelValue":e[5]||(e[5]=function(t){return o.tempProduct.category=t}),placeholder:"請輸入分類"},null,512),[[i["M"],o.tempProduct.category]])]),Object(i["i"])("div",B,[q,Object(i["R"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"unit","onUpdate:modelValue":e[6]||(e[6]=function(t){return o.tempProduct.unit=t}),placeholder:"請輸入單位"},null,512),[[i["M"],o.tempProduct.unit]])])]),Object(i["i"])("div",G,[Object(i["i"])("div",H,[K,Object(i["R"])(Object(i["i"])("input",{type:"number",class:"form-control",id:"origin_price",min:"0","onUpdate:modelValue":e[7]||(e[7]=function(t){return o.tempProduct.origin_price=t}),placeholder:"請輸入原價"},null,512),[[i["M"],o.tempProduct.origin_price,void 0,{number:!0}]])]),Object(i["i"])("div",Q,[W,Object(i["R"])(Object(i["i"])("input",{type:"number",class:"form-control",id:"price",min:"0","onUpdate:modelValue":e[8]||(e[8]=function(t){return o.tempProduct.price=t}),placeholder:"請輸入售價"},null,512),[[i["M"],o.tempProduct.price,void 0,{number:!0}]])])]),X,Object(i["i"])("div",Y,[Z,Object(i["R"])(Object(i["i"])("textarea",{type:"text",class:"form-control",id:"description","onUpdate:modelValue":e[9]||(e[9]=function(t){return o.tempProduct.description=t}),placeholder:"請輸入產品描述"},null,512),[[i["M"],o.tempProduct.description]])]),Object(i["i"])("div",tt,[et,Object(i["R"])(Object(i["i"])("textarea",{type:"text",class:"form-control",id:"content","onUpdate:modelValue":e[10]||(e[10]=function(t){return o.tempProduct.content=t}),placeholder:"請輸入產品說明內容"},null,512),[[i["M"],o.tempProduct.content]])]),Object(i["i"])("div",ct,[Object(i["i"])("div",it,[Object(i["R"])(Object(i["i"])("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":e[11]||(e[11]=function(t){return o.tempProduct.is_enabled=t}),"true-value":1,"false-value":0,id:"is_enabled"},null,512),[[i["L"],o.tempProduct.is_enabled]]),at])])])])]),Object(i["i"])("div",ot,[lt,Object(i["i"])("button",{type:"button",class:"btn btn-primary text-white",onClick:e[12]||(e[12]=function(e){return t.$emit("update-product",o.tempProduct)})}," 確認 ")])])])],512)}var st=c("7c2b"),rt=c.n(st),dt={props:{product:{type:Object,default:function(){return{}}},isNew:{type:Boolean,default:!1}},data:function(){return{status:{},modal:"",tempProduct:{}}},emits:["update-product"],inject:["emitter"],watch:{product:function(){this.tempProduct=this.product,this.tempProduct.imagesUrl||(this.tempProduct.imagesUrl=[]),this.tempProduct.imageUrl||(this.tempProduct.imageUrl="")}},methods:{uploadFile:function(){var t=this,e=this.$refs.fileInput.files[0],c=new FormData;c.append("file-to-upload",e);var i="".concat("https://vue3-course-api.hexschool.io","/api/").concat("tomtom","/admin/upload");this.status.fileUploading=!0,this.$http.post(i,c,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){t.status.fileUploading=!1,e.data.success?(t.tempProduct.imageUrl=e.data.imageUrl,t.$refs.fileInput.value="",t.emitter.emit("push-message",{style:"success",title:"圖片上傳結果"})):(t.$refs.fileInput.value="",t.emitter.emit("push-message",{style:"danger",title:"圖片上傳結果",content:e.data.message}))}))},openModal:function(){this.modal.show()},hideModal:function(){this.modal.hide()}},mounted:function(){this.modal=new rt.a(this.$refs.modal)}};dt.render=nt;var ut=dt,pt={data:function(){return{baseAPI:"".concat("https://vue3-course-api.hexschool.io","/api/").concat("tomtom"),products:[],pagination:{},tempProduct:{imagesUrl:[]},isNew:!1,isLoading:!1,status:{fileUploading:!1},modal:{editModal:"",delModal:""},currentPage:1,tips:{data:{success:!1,message:""}}}},components:{ProductModal:ut,DelModal:h["a"],Pagination:f["a"]},inject:["$httpMessageState"],methods:{chageLoadingStatus:function(t){this.isLoading=t},setTips:function(t,e){this.tips={data:{success:t,message:e}}},getProducts:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.currentPage=e;var c="".concat(this.baseAPI,"/admin/products?page=").concat(e);this.chageLoadingStatus(!0),this.$http.get(c).then((function(e){t.chageLoadingStatus(!1),e.data.success?(t.products=e.data.products,t.pagination=e.data.pagination):t.$httpMessageState(e,"產品列表")})).catch((function(){t.setTips(!1,"糟糕，無法取得產品列表哦!"),t.$httpMessageState(t.tips,"產品列表")}))},openModal:function(t,e){t?(this.tempProduct={},this.isNew=!0):(this.tempProduct=Object(O["a"])({},e),this.isNew=!1);var c=this.$refs.productModal;c.openModal()},updateProduct:function(t){var e=this;this.tempProduct=t;var c="".concat(this.baseAPI,"/admin/product"),i="post",a="新增產品";this.isNew||(c="".concat(this.baseAPI,"/admin/product/").concat(this.tempProduct.id),i="put",a="編輯產品"),this.chageLoadingStatus(!0);var o=this.$refs.productModal;this.$http[i](c,{data:this.tempProduct}).then((function(t){e.chageLoadingStatus(!1),t.data.success?(e.$httpMessageState(t,a),o.hideModal(),e.getProducts(e.currentPage)):e.$httpMessageState(t,a)})).catch((function(){e.setTips(!1,"糟糕，無法".concat(a,"哦!")),e.$httpMessageState(e.tips,a)}))},openDelProductModal:function(t){this.tempProduct=Object(O["a"])({},t);var e=this.$refs.delModal;e.openModal()},delProduct:function(){var t=this,e="".concat(this.baseAPI,"/admin/product/").concat(this.tempProduct.id);this.chageLoadingStatus(!0),this.$http.delete(e).then((function(e){if(t.chageLoadingStatus(!1),e.data.success){t.$httpMessageState(e,"刪除產品");var c=t.$refs.delModal;c.hideModal(),t.getProducts(t.currentPage)}else t.$httpMessageState(e,"刪除產品")})).catch((function(){t.setTips(!1,"糟糕，無法刪除此產品哦!"),t.$httpMessageState(t.tips,"刪除產品")}))}},created:function(){this.getProducts()}};pt.render=j;e["default"]=pt},3035:function(t,e,c){"use strict";var i=c("7a23"),a={"aria-label":"Page navigation example"},o={class:"pagination justify-content-center"},l=Object(i["i"])("span",{"aria-hidden":"true"},"«",-1),n={key:0,class:"page-link"},s=Object(i["i"])("span",{"aria-hidden":"true"},"»",-1);function r(t,e,c,r,d,u){return Object(i["w"])(),Object(i["e"])("nav",a,[Object(i["i"])("ul",o,[Object(i["i"])("li",{class:[{disabled:!c.pages.has_pre},"page-item"]},[Object(i["i"])("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:e[1]||(e[1]=Object(i["S"])((function(t){return u.updatePage(c.pages.current_page-1)}),["prevent"]))},[l])],2),(Object(i["w"])(!0),Object(i["e"])(i["a"],null,Object(i["D"])(c.pages.total_pages,(function(t){return Object(i["w"])(),Object(i["e"])("li",{class:["page-item",{active:c.pages.current_page===t}],key:t},[t===c.pages.current_page?(Object(i["w"])(),Object(i["e"])("span",n,Object(i["I"])(t),1)):(Object(i["w"])(),Object(i["e"])("a",{key:1,class:"page-link",href:"#",onClick:Object(i["S"])((function(e){return u.updatePage(t)}),["prevent"])},Object(i["I"])(t),9,["onClick"]))],2)})),128)),Object(i["i"])("li",{class:["page-item",{disabled:!c.pages.has_next}]},[Object(i["i"])("a",{class:"page-link",href:"#","aria-label":"Next",onClick:e[2]||(e[2]=Object(i["S"])((function(t){return u.updatePage(c.pages.current_page+1)}),["prevent"]))},[s])],2)])])}var d={props:{pages:{type:Object,default:function(){return{}}}},methods:{updatePage:function(t){this.$emit("emitPages",t)}}};d.render=r;e["a"]=d},e01a:function(t,e,c){"use strict";var i=c("23e7"),a=c("83ab"),o=c("da84"),l=c("5135"),n=c("861d"),s=c("9bf2").f,r=c("e893"),d=o.Symbol;if(a&&"function"==typeof d&&(!("description"in d.prototype)||void 0!==d().description)){var u={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof p?new d(t):void 0===t?d():d(t);return""===t&&(u[e]=!0),e};r(p,d);var b=p.prototype=d.prototype;b.constructor=p;var m=b.toString,j="Symbol(test)"==String(d("test")),O=/^Symbol\((.*)\)[^)]+$/;s(b,"description",{configurable:!0,get:function(){var t=n(this)?this.valueOf():this,e=m.call(t);if(l(u,t))return"";var c=j?e.slice(7,-1):e.replace(O,"$1");return""===c?void 0:c}}),i({global:!0,forced:!0},{Symbol:p})}}}]);
//# sourceMappingURL=chunk-1cbedcf4.3934de8b.js.map