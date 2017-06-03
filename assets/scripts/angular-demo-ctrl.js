app.controller('demoCtrl',function($scope){
    $scope.people = [
	    {fname:"Steve", lname:"Austin", 
		    bio:"Steve Austin (born Steven James Anderson on December 18, 1964, later Steven James Williams), better known by the ring name \"Stone Cold\" Steve Austin, is an American actor, media personality, producer, and retired professional wrestler who is signed to a Legends contract with WWE. Veteran pro wrestling journalist Wade Keller remarked that Austin is \"in every conversation for the greatest wrestling act of all time\", as well as for \"the most profitable and the most influential\"."
		},
	    {fname:"Mark", lname:"Hamill", 
		    bio:"Mark Richard Hamill (born September 25, 1951) is an American actor, voice actor, producer and writer. He is best known for playing Luke Skywalker in the Star Wars film series. His other works include Corvette Summer (1978) and The Big Red One (1980), among other television shows and movies. Hamill has also appeared on stage in several theater productions, primarily during the 1980s."
		},
	    {fname:"Mark", lname:"Zuckerberg", 
		    bio:"Mark Elliot Zuckerberg (born May 14, 1984) is an American computer programmer and Internet entrepreneur. He is a co-founder of Facebook, and currently operates as its chairman and chief executive officer. His net worth is estimated to be US$63.3 billion as of May 2017, and he is ranked by Forbes as the fifth richest person in the world."
		},
	    {fname:"Jeff", lname:"Kaplan", 
		    bio:"Jeff Kaplan is a video game developer and currently serves as Vice President of Blizzard Entertainment. He is known for his work in designing elements of World of Warcraft and is the lead designer on Overwatch."
		},
	    {fname:"John", lname:"Smith", 
		    bio:"John Smith (1825–1910) was a Scottish dentist, philanthropist and pioneering educator. The founder of the Edinburgh school of dentistry, he served as president of the Royal College of Surgeons of Edinburgh (1883) and president of the British Dental Association."
		},
	    {fname:"Fred", lname:"Durst", 
		    bio:"William Frederick \"Fred\" Durst (born August 20, 1970) is an American musician and film director. Durst is best known as the vocalist of the band Limp Bizkit, formed in 1994, with whom he has released six studio albums."
		},
	    {fname:"Demetri", lname:"Martin", 
		    bio:"Demetri Martin (born May 25, 1973) is an American comedian, actor, artist, musician, writer, and humorist. He is best known for his work as a stand-up comedian, being a contributor on The Daily Show, and his Comedy Central show Important Things with Demetri Martin."
		}
    ];

	$scope.selectPerson = function(x, $index){
		$scope.selected = x;
		$scope.selectedResultIndex = $index;
	};

	$scope.clearSelected = function(){
		$scope.selected = null;
		$scope.selectedResultIndex = -1;
	};

	$scope.selectedResultIndex = -1;
});