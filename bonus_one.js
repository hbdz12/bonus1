// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

// (function() {
// 	// Magic!
// 	console.log('Keepin\'n it clean with an external script!');
// })();


$(document).ready(function(){
	console.log('Keepin\'n it clean with an external script!');
	$(".flexsearch-input").keyup(function (){
		$keyword = $(".flexsearch-input").val()
		console.log($keyword);
		$(".search_suggest").remove(); //first remove search_suggest
		$.ajax({
			type:"get",
			url:"http://www.mattbowytz.com/simple_api.json",
			async:false,
			data:{
				data:$keyword
			},
			dataType: "json", 
			success: function(data){ 
				//console.log(data.data);				
				if(data.code == "8"){
					var interests = data.data.interests;
					var programming = data.data.programming;
					//console.log(interests);
					//console.log(programming);
					$(".flexsearch-input-wrapper").after("<div class='search_suggest'><ul></ul></div>");
					$.each(interests,function(n,value){
						$(".search_suggest ul").append("<li id='suggest'>"+value+"</li>")
					});
					$.each(programming,function(n,value){
						$(".search_suggest ul").append("<li id='suggest'>"+value+"</li>")
					});
				}else if(data.code == "9"){
					var interests = data.data;
					$(".flexsearch-input-wrapper").after("<div class='search_suggest'><ul></ul></div>");
					$.each(interests,function(n,value){
						$(".search_suggest ul").append("<li id='suggest'>"+value+"</li>")
					});
				}else if(data.code == "10"){
					var programming = data.data;
					$(".flexsearch-input-wrapper").after("<div class='search_suggest'><ul></ul></div>");
					$.each(programming,function(n,value){
						$(".search_suggest ul").append("<li id='suggest'>"+value+"</li>")
					});					
				}else {
					console.log("data error");
				}
					//li bind click 
					$(".search_suggest ul").on('click','li',function(){
						console.log($(this).text());
						$(".flexsearch-input").val($(this).text());
						//do search
						window.location = "https://www.google.com#q="+$(this).text();
					});
			},
			error: function(){
				//can't match all,interests,programming
				console.log("nothing match！");
			}
		});
	});
    // click submit
	$(".flexsearch-submit").click(function(){
		var key = $(".flexsearch-input").val();
		window.location = "https://www.google.com#q="+key;
	});

});