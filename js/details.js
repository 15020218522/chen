$(function(){
	$(".site").find("span").click(function(){
		$(".div1").css("display","block");
		var arr=$(".div1").find("p").size();
		for (let i = 0;i<arr;i++) {
			$(".div1").find("p").eq(i).click(function(){
				for (var j=0;j<arr;j++) {
					$(".div1").find("p").eq(j).attr("class"," ");
					$(".div1").find("ul").eq(j).attr("class"," ");
				}
				this.className="active";
				$(".div1").find("ul").eq(i).attr("class","hover");
			})
		}
	})
	$(".close").click(function(){
		$(".div1").css("display","none")
	})
//	header部分下拉菜单
	
	var arr=$(".title").find("li").size();
	for (let i = 0;i<arr;i++) {
		$(".title").find("li").eq(i).hover(function(){
			$(".title").find("li").eq(i).find("ul").slideDown(500)
		},function(){
			$(".title").find("li").eq(i).find("ul").slideUp(100)
		})
	}
	//侧边栏
	var oSidebar = document.getElementById("sideBar");
	var oSide =oSidebar.getElementsByTagName("li");
	
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
	
	//鼠标滑过显示
		$("#whole").find("li").eq(0).hover(function(){
			$("#sideBar").slideDown(500)
		},function(){
			$("#sideBar").slideUp(100)
		})

	
	
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
	
	function details(){//调用json数据
		var arr1=[];
		var arr2=[];
		var arr3=[];
		ajax({
			method: "get",
			url: "js/details.json",
			success: function(data){
				var arr1 = JSON.parse(data);//转化成数组
				for (let i=0;i<1;i++) {
					
					for (var j=0;j<arr1[0].title.length;j++) {
						var $a=$("<a href='#'>"+arr1[i].title[j]+"</a>")
						var $span=$("<s>"+arr1[i].title2[j]+"</span>")
						
						$(".h3").append($a)
						$(".h3").append($span)
					}

					var $img1=$("<img src="+arr1[i].link1[0].pic1+">")
					var $img2=$("<img src="+arr1[i].link1[0].pic2+">")
					var $img3=$("<img src="+arr1[i].link1[0].pic3+">")
					var $img4=$("<img src="+arr1[i].link1[0].pic1+">")
					var $img5=$("<img src="+arr1[i].link1[0].pic2+">")
					var $img6=$("<img src="+arr1[i].link1[0].pic3+">")
					$(".p1").append($img1)
					$(".p1").append($img2)
					$(".p1").append($img3)
					$(".p2").append($img4)
					$(".p2").append($img5)
					$(".p2").append($img6)
					
					$(".h4").html=arr1[i].link1[0].title1;
					for (var j=0;j<3;j++) {
						var $p=$("<p>"+arr1[0].link1[0].title2[j]+"<span>"+arr1[0].link1[0].b[j]+"</span>"+"</p>")
						$(".a").append($p)
					}
					for (var j=3;j<arr1[0].link1[0].title2.length;j++) {
						var $p=$("<p>"+arr1[0].link1[0].title2[j]+"<span>"+arr1[0].link1[0].b[j]+"</span>"+"</p>")
						$(".b").prepend($p)
					}
					
					var $h4=$("<h4>"+arr1[0].link2[0].title+"<a href='#'>"+arr1[0].link2[0].b+"</a>"+"</h4>")
					$(".trade").prepend($h4);
				
					for (var j=0;j<arr1[0].link2[0].link.length;j++) {
						var $li=$("<li>"+"<a href='#'>"+"<img src="+arr1[0].link2[0].link[j].pic+"/>"+"<p>"+arr1[0].link2[0].link[j].title+"</p>"+"<span>"+arr1[0].link2[0].link[j].title2+"<span>"+"</a>"+"</li>")
						$(".ul").append($li)
					}
					var $li1 = $("<li>"+arr1[0].link3[0].title+"</li>");
					$(".ul1").append($li1);
					for (var j=0;j<arr1[0].link3[0].link.length;j++) {
						var $li=$("<li>"+"<img src="+arr1[0].link3[0].link[j].pic+"/>"+arr1[0].link3[0].link[j].title+"<br />"+"<span>"+arr1[0].link3[0].link[j].title2+"</span>"+"</li>")
						$(".ul1").append($li);
					}
					var $li1 = $("<li>"+arr1[0].link4[0].title+"</li>");
					$(".ul2").append($li1);
					for (var j=0;j<arr1[0].link4[0].link.length;j++) {
						var $li=$("<li>"+"<a href='#'>"+"<img src="+arr1[0].link4[0].link[j].pic+"/>"+"<p>"+arr1[0].link4[0].link[j].title+"</p>"+"<span>"+arr1[0].link4[0].link[j].title2+"<span>"+"</a>"+"</li>")
						$(".ul2").append($li)
					}
					for (var j=0;j<arr1[0].link5[0].title1.length;j++) {
						var $span=$("<span>"+arr1[0].link5[0].title1[j]+"</span>")
						$(".b_p").append($span);
					}
					var $img=$("<img src="+arr1[0].link5[0].pic+"/>")
					$("#matter").prepend($img)
					
					for (var j=0;j<arr1[0].link5[0].title2.length;j++) {
						var $div=$("<div>"+"<span>"+arr1[0].link5[0].title2[j]+"</span>"+"<p>"+arr1[0].link5[0].title3[j]+"</p>"+"</div>")
						$("#matter").append($div)
					}
					var $div=$("<div></div>")
					$("#matter").append($div)
					/*$(".margin").append($h3);	*/
					
				}
			}	
		})
		
	}
	details();
	//点击切换图片
	
/*	for (let i=0;i<3;i++) {
		alert($(".p2").find("img").size())
			$(".p2").find("img").eq(i).click(function(){
				
				for (var j=0;j<3;j++) {
					$(".p1").find("img").eq(j).css("display","none");
				}
					$(".p1").find("img").eq(i).css("display","block");
			})
		
		}*/
		
		$("#div2").mouseover(function(){
			$("#div5").css("display","block");
			$("#div3").css("display","block");
			$(".p2").css("margin-top","-403px")
		})
		$("#div2").mouseout(function(){
			$("#div5").css("display","none");
			$("#div3").css("display","none");
			$(".p2").css("margin-top","25px")
		})
		var oDiv5 = document.getElementById("div5");
		var oDiv4 = document.getElementById("div4");
		var oDiv3 = document.getElementById("div3");
		var oDiv2 = document.getElementById("div2");
		
		$("#div2").mousemove(function(evn){
			$("#div5").css("display","block");
			$("#div3").css("display","block");
			var e=evn || window.event;
			var left=e.offsetX - oDiv5.offsetWidth/2 ;
			var top=e.offsetY-oDiv5.offsetHeight/2;
			
			oDiv5.style.left=left+"px";
			oDiv5.style.top=top+"px";
			
			var sun=left/(oDiv2.offsetWidth-oDiv5.offsetWidth)
			var sum=top/(oDiv2.offsetHeight-oDiv5.offsetHeight)

			console.log(sun*(oDiv3.offsetWidth-oDiv4.offsetWidth))
			oDiv4.style.left=sun*(oDiv3.offsetWidth-oDiv4.offsetWidth)+"px";
			oDiv4.style.top=sum*(oDiv3.offsetHeight-oDiv4.offsetHeight)+"px";
		
			
		})
		
	
	
	
	
})
	


