var imgSource="";
var divId="";
var imgFound=0;
var moves=0;
var imageArray = [
 				"images/f1.png",
 				"images/f2.png",
 				"images/f3.png",
 				"images/f4.png",
 				"images/f5.png",
 				"images/f6.png",
 				"images/f7.png",
 				"images/f8.png",
 				"images/f9.png",
 				"images/f10.png",
 				];
function suffleImages(){
	var len =imageArray.length*2;
	var imgArr=new Array();
	imgArr=$.merge($.merge([],imageArray),imageArray);
	var currentDiv=$("#images div:first-child");
	for(var j=0;j<len;j++){
		var randomNum=Math.round(Math.random()*(imgArr.length-1));
		$("#"+currentDiv.attr("id")+" img").attr("src", imgArr[randomNum]);
		imgArr.splice(randomNum, 1);
		currentDiv=currentDiv.next();
	}
}

function OpenCard(){
	var id=$(this).attr("id");
	console.log(id);
	if($("#" + id + " img").is(":hidden")){
		$("#" + id + " img").show("slow");
		if(imgSource==""){
			divId=id;
			imgSource=$("#" + id + " img").attr("src");
		}
		else{
			currentOpened=$("#" + id+ " img").attr("src");
			if(imgSource!=currentOpened){
				setTimeout(function(){
					$("#" + id + " img").hide("slow");
					$("#" + divId + " img").hide("slow"); 
					divId="";
					imgSource="";
				},600);
			}
			else{
				divId="";
				imgSource="";
				imgFound++;
			}
		}
		moves++;
		$("#moves").html(moves);
		if(imageArray.length==imgFound){
			setTimeout(function(){
				alert("Yes!!! you completed the game with" + moves +"moves");
			},1000);
		}
	}		
}
function ResetGame(){
	suffleImages();
	moves=0;
	imgFound=0;
	$("#moves").html(moves);
	$("#images div img").hide();
	imgSource="";
	divId="";
}
$(document).ready(function(){
	for(var i=1;i<3;i++)
	{
		$.each(imageArray,function(index,value){
			$("#images").append("<div id=card" + i + index +"><img src="+ value + "></div>");
		})
	}
	suffleImages();
	$("#images div").click(OpenCard);
});