window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger");
	const NAVBAR = $(".dropNav");

	$(window).resize(adjustNavOnResize);
	$(HAMBURGER).click(toggleNav);

	function toggleNav(){
		event.preventDefault();
		$(NAVBAR).animate({top: 'toggle'}, 300);
	};

	function adjustNavOnResize(){
		$(NAVBAR).css("top", $(".headerBg").innerHeight() + "px");	
	};
});