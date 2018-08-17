window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger")[0];
	const NAVBAR = $(".dropNav")[0];
	var navActive = false;

	HAMBURGER.addEventListener("click", prevent);
	HAMBURGER.addEventListener("click",shownav);

	function shownav(){
		distance = document.getElementsByClassName("headerBg")[0].clientHeight;
		if (!navActive){
			NAVBAR.style.top = distance + "px";
			navActive = true;
		}
		else{
			NAVBAR.style.top = "-10px";
			navActive = false;
		};
	};

	function prevent(){
		event.preventDefault();
	};
});