window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger")[0];
	const NAVBAR = $(".dropNav")[0];
	var navActive = false;

	$(window).resize(adjustNavOnResize);
	$(HAMBURGER).click(toggleNav);

	function toggleNav(){
		event.preventDefault();
		if (!navActive){
			showNav();
		}
		else{
			hideNav();
		};
	};

	function showNav(){
		NAVBAR.style.top = $(".headerBg")[0].clientHeight + "px";
		navActive = true;
	};

	function hideNav(){
		NAVBAR.style.top = "-10px";
		navActive = false;
	};

	function adjustNavOnResize(){
		if (navActive){
			NAVBAR.style.top = $(".headerBg")[0].clientHeight + "px";	
		};
	};
});