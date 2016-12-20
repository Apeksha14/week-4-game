 //Play theme on load of the page

 $(window).load(function()
 {
	document.getElementById("myaudio").play();
 });

// Objects to store the details of all the four players

//Object player1

var player1 = {

"id":"player1",
"name":"obi-wan kenobi",
"power":120,
"attack":15,
reset: function() {

	this.power=120;

},

display: function() {

	$("#name1").html(this.name);
	$("#hp1").html(this.power);
	$("#attack1").html(this.attack);


}

};

//Object player2

var player2 = {
"id":"player2",
"name":"Luke Skywalker",
"power":100,
"attack":12,

reset: function() {
	
	this.power=100;

},

display: function() {

	$("#name2").html(this.name);
	$("#hp2").html(this.power);
	$("#attack2").html(this.attack);
}

};

////Object player3

var player3 = {

"id":"player3",
"name":"Darth Sidious",
"power":150,
"attack":20,

reset: function() {
	
	this.power=150;

},

display: function() {

	$("#name3").html(this.name);
	$("#hp3").html(this.power);
	$("#attack3").html(this.attack);
}

};

//Object player4

var player4 = {
"id":"player4",
"name":"Darth Maul",
"power":"180",
"attack":25,
reset: function() {
	
	this.power=180;
},

display: function() {

	$("#name4").html(this.name);
	$("#hp4").html(this.power);
	$("#attack4").html(this.attack);

}

};

var players = [player1,player2,player3,player4]; //Array of objects players
var enemies = []; //Empty array to store enemies id
var count1 = 0 ; // Count of no.of clicks
var fighter; // fighter - the character user selects
var defenfer; // Enemy chosen by the user to fight against
var attackpower; // variable to store original attack power of the fighter

// array btnplayers of button elements
var btnplayers = [$("#player1"),$("#player2"),$("#player3"),$("#player4")];

//Attack button disabled
$("#attack").attr("disabled",false);

// display the details of players on the html like strength and attack 
for(var i = 0 ; i < players.length ; i++)
{
	players[i].display();
}

// onclick event of the button
$("button").on("click",function(){
	
	count1++;

	$("#pick").css("display","none");

	
	for(var i=0;i<players.length;i++)
		{ 

		if(count1 === 1)

			{	

				// player selected will become your character 
				if((this.id === players[i].id))
					{
						$("#characterdiv").css("display","block");	
						$("#character").append($(this));
						$(this).attr("disabled",true); //player cannot be clicked or selected anymore
						fighter = this.id;//store player id in the variable fighter
						if(players[i].id === fighter)
							{
								//store the original attack power of 
								//the fighter in a variable  
								attackpower = players[i].attack; 

							}

					}
						else //all other players are available to fight against as enemies
							{

								$("#enemydiv").css("display","block");
								$("#enemies").append($("#"+players[i].id));
								$("#"+players[i].id).addClass("enemies");
								enemies.push(players[i].id); //push all the enemies player ids into the enemies array

							} 
			}

				else // user can select from the available enemies to fight
					{
						
						if((this.id !== "attack") && (this.id !== "restart"))
						{
							//enemy selected will be the defender
							$("#defenderdiv").css("display","block");
							$("#fightdiv").css("display","block");
							$("#fight").css("display","block");
							$("#defender").html($(this));
							$("#defender").css("display","block");
							$("#fightanother").css("display","none");

							$(this).removeClass("enemies");
							$(this).addClass("defender");
							$(this).attr("disabled",true);
							defender = this.id; //store defender player id in the variable defender
							$("#attack").attr("disabled",false);
							btnplayers[i].attr("disabled",true);
							if(enemies.length === 1)
							{
								$("#none").html("- none"); // when there are no enemies available
							}

						}

					}

		}

	// when the user clicks on Attack, function Fight() is executed with
	// input parameters fighter,defender,enemies,attackpower
	if(this.id === "attack")
		{
			document.getElementById("attackaudio").play();
			$("#fight").css("display","block");
			Fight(fighter,defender,enemies,attackpower); 
		
		}

	// when the game is restarted everything is reset
	if(this.id === "restart")
		{	

			enemies = [];//enemies array is emptied
			count1 = 0; //count1 is set to 0

			// all the players are appended again to start of the div 
			for(var i=0;i<btnplayers.length;i++)
			{
				$("#players").append(btnplayers[i]);
				btnplayers[i].removeClass("enemies");
				btnplayers[i].removeClass("defender");
				btnplayers[i].attr("disabled",false);
				players[i].reset();
				players[i].display();
				
			}

			// All the divs are set to display:none

			$("#lose_gameover").css("display","none");
			$("#win_gameover").css("display","none");
			$("#restartdiv").css("display","none");
			$("#characterdiv").css("display","none");
			$("#enemydiv").css("display","none");
			$("#fightdiv").css("display","none");
			$("#fight").css("display","none");
			$("#defenderdiv").css("display","none");
			$("#pick").css("display","block");
			$("#none").html("");

		}

	});

// Function to calculate stats of the fight and decide if user wins or loses the game 
function Fight(fighter,defender,enemies,attackpower)
	{	

		var a=0; // variable to store the player number
		var b=0; // variable to store the player number
		
		//get the player object details of the fighter based on player id in fighter variable
		for(var i=0;i<players.length;i++)
		{
			if(players[i].id === fighter)
			{
				fighter = players[i];

				a=i+1;

			}
			// get the player object of the defender based in player id stored in the varaible defender
			else if(players[i].id === defender)
			{
				defender = players[i];
				b=i+1;
			}
		}

		// display respective fighter name and defender name in the span
		// and attacks by them
		$("#enemy_fight").html(defender.name);
		$("#attackf").html(fighter.attack);
		$("#defend_fight").html(defender.name);
		$("#attackd").html(defender.attack);

		$("#stat").css("display","block");

		// power/strength of defender reduces by the attack of the fighter 
		defender.power = defender.power - fighter.attack;

		// power/strength of fighter reduces by the attack of the defender/enemy
		if(defender.power > 0)
		fighter.power = fighter.power - defender.attack; 
		
			$("#hp"+b).html(defender.power);

			fighter.attack += attackpower; //Everytime the attack of fighter will keep increasing

			$("#hp"+a).html(fighter.power);

			$("#attack"+a).html(fighter.attack);

			// if power/strength of fighter reaches 0,user loses and the game restarts
			if(fighter.power <= 0)
				{
					
					$("#stat").css("display","none");
					$("#lose_gameover").css("display","block");
					$("#restartdiv").css("display","block");
					$("#fightanother").css("display","none");
					$("#attack").attr("disabled",true);
					fighter.attack = attackpower;
					
				}

			// if power/strength of defender reaches 0,you can choose to
			// fight another enemy from the remaining enemies available 
			
			if(defender.power <= 0)
				{
					$("#defender").css("display","none");
					$("#stat").css("display","none");
					$("#fightanother").css("display","block");
					$("#enemydf").html(defender.name);
					$("#attack").attr("disabled",true);
					var index = enemies.indexOf(defender.id);
					enemies.splice(index,1); //every time user defeats an enemy the
											 // enemy id is removed from enemies array

					// user cannot click/choose other enemies until the current enemy is defeated							 
					if(enemies.length<3)
							{	
								for(var i=0;i<btnplayers.length;i++)
								{
									if((($(btnplayers[i]).attr("id") !== fighter.id)) && ($(btnplayers[i]).attr("id") !== defender.id))
									{
										$(btnplayers[i]).attr("disabled",false);
									}

								}
								
							}
				
					// when all the enemies are defeated you win and game is over	
					if(enemies.length === 0)
						{
							$("#fightdiv").css("display","none");
							$("#fight").css("display","none");
							$("#defenderdiv").css("display","none")
							$("#win_gameover").css("display","block");
							$("#fightanother").css("display","none");
							$("#restartdiv").css("display","block");
							$("#attack").attr("disabled",true);
							fighter.attack = attackpower;
							
						}
				
				}

	}


	

	






