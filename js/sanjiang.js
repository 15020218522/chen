window.onload=function(){
	var oHeader = document.getElementById("header");
	var oSite = oHeader.getElementsByClassName("site")[0];
	var oSpan1 = oSite.getElementsByTagName("span")[0];
	var oDiv1 = oHeader.getElementsByClassName("div1")[0];
	oSpan1.onclick=function(){//点击显示澄浪社区
		
		oDiv1.style.display= "block";
		var oP1 = oDiv1.getElementsByTagName("p");
		var oUl1 = oDiv1.getElementsByTagName("ul");
			for(var i=0;i<oP1.length;i++){//选项卡
				oP1[i].index=i;
				oP1[i].onclick=function(){
					for(var j=0;j<oP1.length;j++){
						oP1[j].className="";
						oUl1[j].className="";
					}
				this.className = "active";
				oUl1[this.index].className = "hover";
			}
		}
	}
	var oClose = document.getElementsByClassName("close")[0];
	oClose.onclick=function(){//点击隐藏澄浪社区
		oDiv1.style.display= "none";
	}
//	header部分下拉菜单
	var oTitle = oHeader.getElementsByClassName('title')[0];	
	var oLi=oTitle.getElementsByTagName("li");
	for (var i = 0;i < oLi.length;i++) {
		oLi[i].onmouseover=function(){
			
				var oUl2=this.getElementsByTagName("ul")[0];
				startMove(oUl2, {height:130,opacity:100})
			
			
		}
		oLi[i].onmouseout=function(){
			var oUl2=this.getElementsByTagName("ul")[0];
			startMove(oUl2, {height:0,opacity:0})
		}
	}	
//侧边栏
	var oSidebar = document.getElementById("sideBar");
	var oSide =oSidebar.getElementsByTagName("li");
	var _this = {};
	function sault(){//调用json数据
		var arr1=[];
		var arr2=[];
		var arr3=[];
		ajax({
			method: "get",
			url: "js/sidebar.json",
			success: function(data){
				var arr1 = JSON.parse(data);//转化成数组
				for (var i = 0; i < arr1.length;i++ ) {//遍历json
					var oA =oSide[i].getElementsByTagName("a")[0];
					oA.innerHTML = arr1[i].title;//获取所有title
					arr2.push(arr1[i].childtitle)//获取所有详细信息放到数组
				}
				var oLis =oSidebar.getElementsByTagName("li");
				for (var i = 0;i<arr2.length;i++) {//遍历数组中的详细信息
					var oDiv = oLis[i].getElementsByTagName("div")[0];
					for (var j = 0;j<arr2[i].length;j++) {//获取详细信息中的title
						var oP2 = document.createElement("p");
						var oA1 = document.createElement("a");
						var oH3 = document.createElement("h3");
						var oP4 = document.createElement("p");
						oP4.className="p"
						oP2.id="p";
						oA1.innerHTML=arr2[i][j].title;
						oA1.href="#";
						oH3.appendChild(oA1);
						oP2.appendChild(oH3);
						oDiv.appendChild(oP2);
						for (var k =0;k<arr2[j].length;k++) {//获取详细信息所有内容
							var oA1 = document.createElement("a");
							var oP3 = document.createElement("p");
							if (!(arr2[i][j].link[k]==undefined)) {//判断当前内容是否为空
								oA1.innerHTML = arr2[i][j].link[k];
								oP3.appendChild(oA1);
								oP4.appendChild(oP3)
								oP2.appendChild(oP4);
								oDiv.appendChild(oP2);
							}
						}
					}
				}
			}	
		})
	}
	sault();
	var oLis =oSidebar.getElementsByTagName("li");
	for (var i = 0;i<oLis.length;i++) {//鼠标滑过侧边栏
		oLis[i].index = i;
		oLis[i].onmouseover=function(){//鼠标滑过
			for(var j=0;j<oLis.length;j++){
		 		var oDiv = oLis[this.index].getElementsByTagName("div")[0];
				oSide[j].style.background="";
				oDiv.style.display="none";
			}
				this.style.background = "red";
				oDiv.style.display = "block";
			this.onmouseout=function(){//鼠标滑出
				oDiv.style.display="none";
				this.style.background="";
			}
		}
	}
	
/**************************滚动轮播图*********************************/	
var oSilde = document.getElementById("slide");
var oImg = oSilde.getElementsByTagName("img")
var oNum = document.getElementById("num");
var oLi2 = oNum.getElementsByTagName("li");
var timer=null;
var sun=0;
function start(){//启动轮播图
	clearInterval(timer);
	timer=setInterval(function(){
		for (var i = 0;i<oImg.length;i++) {
			oImg[i].style.display="none";
			oLi2[i].style.background="";
		}
		oImg[sun].style.display="block";
		oLi2[sun].style.background="red";
		if (sun==oImg.length-1) {
			sun=0;
		}
		sun++;
	},3000)
}
start();
for (var i =0;i<oLi2.length;i++) {
	oLi2[i].index=i;
	oLi2[i].onmouseover=function(){//鼠标滑过
		for (var j = 0;j<oLi2.length;j++) {
			oLi2[j].style.background="";
			oImg[j].style.display="none";
		}
		clearInterval(timer);
		this.style.background="red";
		oImg[this.index].style.display="block";
		sun=this.index;
	}
	oLi2[i].onmouseout=function(){//鼠标移出
		start();
	}
}
/* ****************小滚动页面*************************/
var oSart = document.getElementById("star");
var oLi4 = oSart.getElementsByTagName("li");
var oLeft = document.getElementById("left");
var oRight = document.getElementById("right");
oSart.innerHTML +=oSart.innerHTML;
	oSart.style.width=oLi4[0].offsetWidth*oLi4.length +"px";
var timer1=null;
var index=0;
function move(){
	clearInterval(timer1);
	timer1=setInterval(function(){
		if (oSart.offsetLeft<-oSart.offsetWidth/2) {
				oSart.style.left=0;
			}
			startMove(oSart, {left: oSart.offsetLeft - oLi4[0].offsetWidth}, function(){
				
			});
	},3000)
	oSart.onmouseover=function(){//鼠标滑过显示按钮，清除定时器
		oLeft.style.display="block";
		oRight.style.display="block";
		clearInterval(timer1);
	}
	oSart.onmouseout=function(){//鼠标移出开始定时器，隐藏按钮
		clearInterval(this.timer2);
		this.timer2=setTimeout(function(){
			oLeft.style.display="none";
			oRight.style.display="none";
		},300)
		move();
	}
	oLeft.onclick=function(){//点击按钮运动
		startMove(oSart, {left: oSart.offsetLeft - oLi4[0].offsetWidth}, function(){
			});
	}
	oRight.onclick=function(){
		clearInterval(timer1)
		if (parseInt(oSart.style.left)>=0) {//判断当前位置
			oSart.style.left="-2500px";
		}
		startMove(oSart, {left: oSart.offsetLeft + oLi4[0].offsetWidth}, function(){
			});
	}
	
}
move();//调用运动

/**********************热销好货*************************/	
var oMain = document.getElementById("main");
var oLi5 = oMain.getElementsByTagName("li");
function stuff(){//调用json数据
	ajax({
		method: "get",
		url: "js/banner.json",
		success: function(data){
			var arr = JSON.parse(data);
			for (var i = 0;i<arr.length;i++) {
				var oA2 = oLi5[i].getElementsByTagName("a")[0];
				var oA1 = document.createElement("a");
				var oA = document.createElement("a");
				var oH3 = document.createElement("h3");
				var oB = document.createElement("b");
				var oImg = document.createElement("img");
				var oP =document.createElement("span");
				oA.innerHTML = arr[i].title;
				oA.href="#";
				oP.innerHTML = arr[i].trait;
				oB.innerHTML = arr[i].cost;
				oA1.innerHTML = arr[i].buy;
				oA1.className="b";
				oA1.href="#";
				oImg.src = arr[i].pic;
				oA2.appendChild(oImg);
				oH3.appendChild(oA);
				oLi5[i].appendChild(oH3);
				oLi5[i].appendChild(oP);
				oLi5[i].appendChild(oB);
				oLi5[i].appendChild(oA1)
			}
		}
	})
}
stuff();
/********************特价商品**************************/
var oPrice = document.getElementById("price");
var oLi6 = oPrice.getElementsByTagName("li");
for (var i = 0;i < oLi6.length;i++) {
	oLi6[i].index=i;
	oLi6[i].onmouseover=function(){
		var oImg1 = oLi6[this.index].getElementsByTagName("img")[0];
		startMove(oImg1, {left:-10}, function(){
		});
		this.onmouseout=function(){
			startMove(oImg1, {left:0}, function(){
			});
		}
	}
}	
/******************主要内容**************************/	
var oDetails = document.getElementById("details");
var oGoods = document.getElementById("goods");
var _this = {};
function home(){//调用json数据
	var arr1=[];
	var arr2=[];
	var arr3=[];
	var arr4=[];
	ajax({
		method: "get",
		url: "js/mina.json",
		success: function(data){
			var arr =JSON.parse(data);
			for (var i = 0;i<arr.length;i++) {
				arr1.push(arr[i].childtitle[0].link)
				arr2.push(arr[i].childtitle[1].link)
				arr3.push(arr[i].childtitle[2].link)
				
			}
		/*	console.log(arr3[1][1].link[0].src2)*/
			for (var i = 0;i<arr.length;i++) {
				var oLi = document.createElement("li");
				var oDiv1 = document.createElement("div");
				var oH31 = document.createElement("h3");
				//给h3添加节点
				oH31.innerHTML="<span>"+arr[i].title1+"</span><span>"+arr[i].title2+"</span>";
				var oUl1 = document.createElement("ul");
				
				for (var j =0;j<arr[i].title3.length;j++) {
					var oLi1 = document.createElement("li");
					oLi1.innerHTML="<a>"+arr[i].title3[j]+"</a>";
					oUl1.appendChild(oLi1);
				}//添加头部右边的li节点
				oDiv1.id="quality";//头部样式插入父框
				oUl1.className="ul1";
				oDiv1.appendChild(oUl1);
				oDiv1.appendChild(oH31);
				
				var oDivs = document.createElement("div");
				var oDiv2 = document.createElement("div");//创建左边样式
				var oUl2 = document.createElement("ul");
				var oDiv3 = document.createElement("div");
				for (var j =0;j<arr1[i].length;j++) {
					oDiv2.style.background="url("+arr1[i][0].pic+")"
					for (var k=0;k<arr1[i][j].title1.length;k++) {
						var oLi2 = document.createElement("li");
						var oA = document.createElement("a");
						oA.href="#";
						oA.innerHTML=arr1[i][j].title1[k];
						oLi2.appendChild(oA);
						oUl2.appendChild(oLi2);
					}
					for (var k=0;k<arr1[i][j].title2.length;k++) {
						var oA = document.createElement("a");
						oA.href="#";
						oA.innerHTML=arr1[i][j].title2[k];
						oDiv3.appendChild(oA);
					}
				}
			
				var oDiv4 =document.createElement("div");
				var oD = document.createElement("div");
				oD.className="d";
				for (var j = 0;j<arr2[i].length;j++) {
					var oUl3 = document.createElement("ul");
					for (var k =0;k<arr2[i][j].main.length;k++) {
						var oLi3 =document.createElement("li");
						var oA1= document.createElement("a");
						var oA2= document.createElement("a");
						var oA3= document.createElement("a");
						oA1.href="#";
					/*	oA2.href="#";*/
						oA3.href="#";
						oA2.className="a";
						oA2.title=arr2[i][j].main[k].trait;
						var oP =document.createElement("p");
						var oB = document.createElement("b");
						var oImg1 =document.createElement("img");
						var oImg2 =document.createElement("img");
						oImg1.src=arr2[i][j].main[k].pic;
						oImg2.src=arr2[i][j].main[k].src;
						oA3.innerHTML=arr2[i][j].main[k].trait;
						oB.innerHTML=arr2[i][j].main[k].cost;
						
						oA1.appendChild(oImg1)
						oA2.appendChild(oImg2)
						oP.appendChild(oA3)
						oLi3.appendChild(oA1)
						oLi3.appendChild(oP)
						oLi3.appendChild(oB)
						oLi3.appendChild(oA2)
						oUl3.appendChild(oLi3);
					}
					oD.appendChild(oUl3);
					oDiv4.appendChild(oD);
				}
				
				var oDiv5 = document.createElement("div");
				oDiv5.className="div3";
				var oA3= document.createElement("a");
				var oA4= document.createElement("a");
				oA3.href="#";
				oA4.href="#";
				var oImg3 =document.createElement("img");
				var oImg4 =document.createElement("img");
				oImg3.src=arr3[i][0].pic;
				oImg4.src=arr3[i][0].src;
				oA3.appendChild(oImg3)
				oA4.appendChild(oImg4)
				oDiv5.appendChild(oA3)
				oDiv5.appendChild(oA4)
			
				var oDiv6 = document.createElement("div");
				oDiv6.id="most";
				for (var j=1;j<arr3[i].length;j++) {
					for (var k=0;k<arr3[i][j].link.length;k++) {
						var oA = document.createElement("a");
						var oImg = document.createElement("img");
						oA.href="http://localhost/shoping/sanjiang/details.html";
						oImg.src=arr3[i][j].link[k];
						oA.appendChild(oImg);
						oDiv6.appendChild(oA);
					}
				}
				oDivs.id="meet";
				oDiv2.className="div1";
				oDiv2.appendChild(oUl2);
				oDiv2.appendChild(oDiv3);
				
				oDivs.appendChild(oDiv2)
				
				oDiv4.className="div2";
				oDivs.appendChild(oDiv4);
				oDivs.appendChild(oDiv5);
				oLi.className="li";
				oLi.appendChild(oDiv1);
				oLi.appendChild(oDivs);
				oLi.appendChild(oDiv6);
				oGoods.appendChild(oLi);
				}
			//运动
			var oUl =document.getElementById("goods");
			var oLi = oUl.getElementsByClassName("li");
			for(var i = 0;i<oLi.length;i++)
				oLi[i].onmouseover=function(){
					var oMeet = this.getElementsByTagName("div")[1]
					var oDiv2 = oMeet.getElementsByClassName("div2")[0];
					var oDiv3 = oMeet.getElementsByClassName("d")[0];
					var oUl2 = oDiv2.getElementsByTagName("ul")[0];
					var oQuire = this.getElementsByTagName("div")[0];
					var oUl1 =oQuire.getElementsByClassName("ul1")[0];
					var oLis = oUl1.getElementsByTagName("li");
					for (var j= 0;j<oLis.length;j++) {
						oDiv3.style.width=oUl2.offsetWidth*oLis.length + "px";
						oLis[j].index=j;
						oLis[j].onmouseover=function(){
							
							startMove(oDiv3, {left:-oUl2.offsetWidth*this.index})
							
						}
					}
				}
				/***********************存储购物车*****************************/
				var oBuy= document.getElementById("buy");
				var oShop=oBuy.getElementsByClassName("shop")[0];
				var oGood = document.getElementById("goods");
				var oA = oGoods.getElementsByClassName("a");
				for (var i = 0;i<oA.length;i++) {//遍历所有购物车按钮
					oA[i].onclick=function(){//点击加入购物车
					_this = this;
						var arr2=$_cookie("goods");
						if (arr2==null) {//判断是否第一次添加
							var arr4=[{title:this.title,num:1}];
							$_cookie("goods", JSON.stringify(arr4), {expires: 7});
						}else{
							var str =$_cookie("goods");
							var arr3 = JSON.parse(str);
							var isYes = false;
							for (var i =0;i<arr3.length;i++) {//判断如果不是第一次添加是否有相同的title
								if (arr3[i].title==this.title) {
									arr3[i].num++;
									isYes = true;
								}
							}
							if (!isYes) {//如果cookie没有相同的属性，就添加一个
								var obj={title:this.title,num:1};
								arr3.push(obj);
							}
							$_cookie("goods",JSON.stringify(arr3),{expires: 7})//存储cookie
						}
							//创建购物车标签
							var oGood = document.getElementById("goods");
							var oA = oGoods.getElementsByClassName("a");
							var str1 =$_cookie("goods");
							var arr5 = JSON.parse(str1);
							if (!arr5) {
								return;
							}
							for (var j=0;j<arr5.length;j++) {
								if (this.title==arr5[j].title) {
									
									show(_this,arr5[j].num);
								
								}
							}
							var oBuy= document.getElementById("buy");
							var oA = oBuy.getElementsByClassName("bb");
							for (var j=0;j<oA.length;j++) {
								oA[j].index=j;
								oA[j].onclick=function(){
									this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
									var str =$_cookie("goods");
									var arr3 = JSON.parse(str);
									arr3.splice(this.index,1);
									$_cookie("goods", JSON.stringify(arr3),{ expires: 7});
								
							}
					}	
				}
			}
		}
	})
	
}
home();	
		
	
		
		/***********************存储购物车*****************************/
				var oBuy= document.getElementById("buy");
				var oShop=oBuy.getElementsByClassName("shop")[0];
				var oGood = document.getElementById("goods");
				var oA = oGoods.getElementsByClassName("a");
				function show(obj,num, id){//创建购物车标签
					//oShop.innerHTML="";
					var oD = oShop.getElementsByClassName("food");
					var oDivs =document.createElement("p");
					oDivs.className = "food";
					var oP = document.createElement("p");
					oDivs.id = id;
					oP.className="ps";
					oP.innerHTML="<span class='span'>数量  ："+num+"</span><a href='#' class='bb'>删除</a>";
					var arr=obj.parentNode.innerHTML;
					var arr1 = arr.split("<a class")
					oDivs.innerHTML=arr1[0];
					oDivs.appendChild(oP);
					oShop.appendChild(oDivs)
					
				}


	
	var oBuy= document.getElementById("buy");
	var oShop=oBuy.getElementsByClassName("shop")[0];
	var oSpan = oBuy.getElementsByTagName("span")[0];
	oSpan.onmouseover=function(){
		oShop.style.left=-230+"px";
		
		
	}
	
	
	
	
	
}










































