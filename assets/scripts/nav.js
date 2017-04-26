window.addEventListener("load",function(){

	hamburger = document.getElementsByClassName("headerInfo__hamburger")[0];
	navbar = document.getElementsByClassName("dropNav")[0];
	
	status = 0;

	hamburger.addEventListener("click", prevent)
	hamburger.addEventListener("click",shownav);

	function shownav(){
		distance = document.getElementsByClassName("headerBg")[0].clientHeight;
		if (status == 0){
			navbar.style.top = distance + "px";
			status = 1;
		}
		else{
			navbar.style.top = "-10px";
			status = 0;
		};
	};

	function prevent(){
		event.preventDefault();
	};
});