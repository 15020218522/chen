"use strict"
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
	//侧边栏json请求
	function stual(){
		ajax({
			method: "get",
			url: "js/deputy.json",
			success: function(data){
			var arr = JSON.parse(data);
			for (var i=0;i<arr.length;i++) {
				var $oLi = $("<li></li>");
				var $oP=$("<p></p>");
				var $oH3=$("<h3></h3>");
				var $oA = $("<a href='#' class='a'>"+arr[i].title+"</a>");
				$oH3.append($oA);
				$oLi.append($oH3);
				for(var j=0;j<arr[i].link.length;j++){
					var $oA1 = $("<a href='#' class='a'>"+arr[i].link[j]+"</a>");
					$oP.append($oA1);
					$oLi.append($oP)
				}
				$("#sideBar").append($oLi)
			}
		}
			
	})}
	
	stual();
	
	var arr1=$("#dequty").find("a").size();
	var sun=1;
	for (var i = 0;i<arr1;i++) {
			
		$("#dequty").find("a").eq(i).find("img").css("position","absolute")
		$("#dequty").find("a").eq(i).mouseover(function(){
			$("#dequty").find("img").css("z-index","0")
			$(this).find("img").animate({height:"285px",margin:"-10px",width:"308px",}).css("z-index","11")
		}),
		$("#dequty").find("a").eq(i).mouseout(function(){
			$(this).find("img").animate({height:"245",margin:0,width:"268px",})
		})
		
	}
	
	
	function details(){
		ajax({
			method: "get",
			url: "js/deputy1.json",
			success: function(data){
			var arr = JSON.parse(data);
			for (var i=0;i<arr.length;i++) {
				var $Lis=$("<li></li>");
				var $quality = $("<div></div>");
				$quality.attr("id","quality");
				var $meet = $("<div></div>");
				$meet.attr("id","meet");
				var $h3 = $("<h3></h3>");
				for (var j=0;j<arr[i].title1.length;j++) {
					var $span = $("<span>"+arr[i].title1[j]+"</span>");
					$h3.append($span);
				}
				/*for (var j=0;j<arr[i].childtitle[0].length;j++) {
					
				}*/
				var $div1 = $("<div></div>")
				$div1.attr("class","div1");
				
				var $a = $("<a href='#'></a>");
				var $img = $("<img></img>")
				$img.attr("src",arr[i].childtitle[0].src)
				$a.append($img);
				$div1.append($a);
				$meet.append($div1);
				var $ul=$("<ul></ul>")
				for (var j = 0;j<arr[i].childtitle[0].main.length;j++) {
					
					var $li1=$("<li></li>");
					var $img1 = $("<img></img>")
					$img1.attr("src",arr[i].childtitle[0].main[j].pic);
					var $a1 =$("<a href='#'></a>")
					var $p=$("<p></p>")
					var $a2 =$("<a href='#'>"+arr[i].childtitle[0].main[j].trait+"</a>")
					var $b=$("<b>"+arr[i].childtitle[0].main[j].cost+"</b>")
					var $a3 =$("<a href='#'></a>")
					$a3.attr("class","a")
					var $img2 = $("<img></img>")
					$img2.attr("src",arr[i].childtitle[0].main[j].src);
					$p.append($a2)
					$a1.append($img1);
					$a3.append($img2);
					$li1.append($a1);
					$li1.append($p);
					$li1.append($b);	
					$li1.append($a3);
					$ul.append($li1)
					$meet.append($ul)
				}
				
				$quality.append($h3);
				
				$Lis.append($quality)
				$Lis.append($meet)
				$("#goods").append($Lis);
			}
		}
	})
}
	details();
	
	//滚动事件
	$(window).scroll(function(){
		if ($(window).scrollTop()>=140) {
				$("#whole").css("position","fixed").css("top","0").css("z-index","0")
				$("#sideBar").css("display","none");
				$("#whole").find("li").eq(0).hover(function(){
					$("#sideBar").slideDown(500).css("display","block");
					$("#whole").css("z-index","100")
				},function(){
						$("#sideBar").slideDown(0).css("display","none");
						$("#whole").css("z-index","0")
				})
			
				
		}else if ($(window).scrollTop()<141) {
			$("#whole").css("top",-($(window).scrollTop()-141)+"px").css("z-index","1")
			$("#sideBar").css("display","block")
			
		}
	
		
		
	})
	
	
	
	
})
	


