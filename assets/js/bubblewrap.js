$(function(){
	var pop1 = new Audio("assets/img/BubblePop.mp3")
	var pop2 = new Audio("assets/img/Bubble.mp3")
	var pop3 = new Audio("assets/img/NewBubblePage.mp3")
	var waitForFinalEvent = (function () {
  		var timers = {};
	    return function (callback, ms, uniqueId) {
    		if (!uniqueId) {
	    		uniqueId = "Don't call this twice without a uniqueId";
    		}
    		if (timers[uniqueId]) {
    			clearTimeout (timers[uniqueId]);
    		}
    		timers[uniqueId] = setTimeout(callback, ms);
  		};
	})();

	var el = document.getElementById("bubblewrap");
	el.addEventListener("touchmove",handleMove,false);
	function handleMove(event) {
    	// Prevent scrolling on this element
    	if (event.targetTouches.length == 1){
   			event.preventDefault();
   			var touch = event.targetTouches[0]
   			$(".pop").each(function(index,item){
   				if(contains(item, [touch.pageX, touch.pageY])){
   					var snd = Math.random()*3
   					if (snd < 2){
						//new Audio("assets/img/BubblePop.mp3").play();
						pop1.play();
					} else if (snd < 2.75){
						//new Audio("assets/img/Bubble.mp3").play();
						pop2.play();
					} else {
						//new Audio("assets/img/NewBubblePage.mp3").play();
						pop3.play();
					}
					//$item.remove()
					$(item).attr("src","assets/img/popped1.png")
					$(item).css("opacity", 0.15)
   				}
   			})
   		}
	}
	function handleTouch(event) {

	}
	function contains(element, point) {
    	// Returns true if the specified element contains a point
    	var $e = $(element);
    	var offset = $e.offset();
    	var x = offset.left;
  		var y = offset.top;
  		var px = point[0], py = point[1];
  		var width = $e.width();
  		var height = $e.height();
  		//log('bounding box: ' + [x, y, width, height]);
  		//log('point: ' + point);
  		return (x < px && px < (x + width)) && (y < py && py < (y + height));
	}

	var count = 0
	var port = "#wrapper"
	function createBubbles(port){
		var contw = $(port).width()
		var conth = $(port).height()
		var contt = $(port).position().top
		var contl = $(port).position().left
		var across = Math.ceil(contw/26)
		var down = Math.ceil(conth/24)
		var str = ""
		var left = contl
		var top = contt - 30
		var odd = -1
		for (j=0;j<down;j++){
			if (odd == -1){
				left = contl-50
			} else {
				left = contl-36
			}
			top = top+24
			for (i=0;i<across;i++){
				left += 28
				str += "<img src='assets/img/bubble1.png' class='pop' style='z-index:-1;opacity:.45;position:fixed;height:26px;left:"+left+"px;top:"+top+"px'>"
			}
			str+= "<br>"
			odd = odd*-1
		}
		$(port).html(str)
		$(".pop").mouseover(function(){
			var pop = $(this).attr("src")
			var snd = Math.random()*3
			if (pop == "assets/img/bubble1.png"){
				if (snd < 2){
					new Audio("assets/img/BubblePop.mp3").play();
					//pop1.play();
				} else if (snd < 2.75){
					new Audio("assets/img/Bubble.mp3").play();
					//pop2.play();
				} else {
					new Audio("assets/img/NewBubblePage.mp3").play();
					//pop3.play();
				}
			}
			$(this).attr("src","assets/img/popped1.png")
			$(this).fadeTo('fast', 0.15, function() {
      			// Animation complete.
    		});
    		count += 1
		})
		function showText(){
			$(".quote").find("h1").text(quotes[num])
			$(".quote").find("h2").text("- " + authors[num])
			num += 1
		}
		//setTimeout(showText(),500);
    	waitForFinalEvent(function(){
      		showText();
      		//...
    	}, 500, "some unique string");
	}
	var shown = 0
	var quotes = ["\"What we see depends mainly on what we look for.\"",
	"\"Life takes us by surprise and orders us to move towards the unknown.\""]
	var authors = ["John Lubbock","Paulo Coelho"]
	var num = 0
	$(".navpop").click(function(){
		//var pop = $(this).find("img").attr("src")
		//if (pop == "assets/img/bubble2.png"){
			new Audio("assets/img/StartGame.mp3").play();
			//$(this).find("img").attr("src","assets/img/popped2.png")
			$("#bubblewrap").show()
			$("#hello").hide()
			shown = 1
			createBubbles(port)
			$("#scrollbar").css("padding-top",0)
			//$(this).css("background-image","")
			//$(this).find("img").fadeTo('slow',0,function(){	
			//})
			
			if (num >= quotes.length){
				num = 0
			}
			var w = $('.front').css("width")
			$(".back").css("width",w)
		//}
	})
	$(".navpop").hover(function(){
		//var pop = $(this).find("img").attr("src")
		if (shown == 0){
			$(this).find("h2").text("")
			$(this).find("img").fadeTo('fast',0,function(){
			})
			$(this).find("img").hide()
		}
	},function(){
		//var pop = $(this).find("img").attr("src")
		if (shown == 0){
			$(this).find("p").text("\"Pop!\"")	
			$(this).find("img").show()
			$(this).find("img").fadeTo('fast',1,function(){	
			})
		}
		
	})
	

	/*$(window).resize(function(){
		createBubbles()
	})*/
})