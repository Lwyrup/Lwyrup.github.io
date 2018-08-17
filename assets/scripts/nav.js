window.addEventListener("load",function(){

	const HAMBURGER = $(".headerInfo__hamburger");
	const NAVBAR = $(".dropNav");

	$(window).resize(adjustNavOnResize);
	$(HAMBURGER).click(toggleNav);

	//TODO: In .navBar's css remove the top and transition properties. Add display none

	function toggleNav(){
		event.preventDefault();
		$(NAVBAR).animate({top: 'toggle'}, 300);
	};

	function adjustNavOnResize(){
		$(NAVBAR).css("top", $(".headerBg").innerHeight() + "px");	
	};
});