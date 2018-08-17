window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger")[0];
	const NAVBAR = $(".dropNav")[0];
	var navActive = false;

	$(HAMBURGER).click(shownav);

	function shownav(){
		event.preventDefault();
		if (!navActive){
			NAVBAR.style.top = $(".headerBg")[0].clientHeight + "px";
			navActive = true;
		}
		else{
			NAVBAR.style.top = "-10px";
			navActive = false;
		};
	};
});