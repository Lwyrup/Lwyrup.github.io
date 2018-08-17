window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger")[0];
	const NAVBAR = $(".dropNav")[0];

	$(window).resize(adjustNavOnResize);
	$(HAMBURGER).click(toggleNav);

	function toggleNav(){
		event.preventDefault();
		$(NAVBAR).animate({top: 'toggle'}, 300);
	};

	function adjustNavOnResize(){	
		NAVBAR.style.top = $(".headerBg")[0].clientHeight + "px";	
	};
});