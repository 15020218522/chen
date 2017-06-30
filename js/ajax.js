/*
	json.method  请求方式
	json.url   请求地址
	json.data
	success    成功回调的函数
	error      失败回调的函数
*/

function ajax(json){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(error){
	
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(json.method == "get" && json.data){
		json.url += "?" + json.data + "&" + new Date().getTime();
	}

	xhr.open(json.method, json.url, true);

	if(json.method == "get"){
		xhr.send();
	}else{
		//设置所传数据的格式
		xhr.setRequestHeader('content-type', 'application/x-www-form-json.urlencoded');  //声明发送的数据类型
		xhr.send(json.data);
	}


	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){ //判断当前的网络状态的   404 找不到
				//当我们下载完数据以后，数据应该如何处理是不同的
				// alert(xhr.responseText);
				/*
					第一个参数，是下载到的数据，
					第二个参数，当前网络的的状态
					第三个参数，xhr对象
			
				*/
				json.success(xhr.responseText, "success", xhr);
			}else{
				if(json.error){
					json.error("error", xhr);
				}
			}
		}
	}
}







