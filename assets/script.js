window.addEventListener("load",function(){

	hamburger = document.getElementsByClassName("fa fa-bars")[0];
	navbar = document.getElementsByClassName("header_links")[0];
	
	status = 0;

	hamburger.addEventListener("click",shownav);

	function shownav(){
		distance = document.getElementsByClassName("header")[0].clientHeight;
		if (status == 0){
			navbar.style.top = distance + "px";
			status = 1;
		}
		else{
			navbar.style.top = "0px";
			status = 0;
		};
	};
});