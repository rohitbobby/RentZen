"use strict";

/* SOME CONSTANTS */
var endpoint01 = "http://misdemo.temple.edu/rentzen";
localStorage.usertoken = 0;
localStorage.lastnavlink = '';

/* SUPPORTING FUNCTIONS */

var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

	console.log(idToShow);

	if (idToShow == '#div-login' ){
		/* what happens if the login/logout link is clicked? */
		$("#renterid").val("");
		localStorage.usertoken = 0;
		$(".secured").addClass("locked");
		$(".secured").removeClass("unlocked");
	}

	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

var loginController = function(){
	//go get the data off the login form
	var the_serialized_data = $('#form-login').serialize();
	var url = endpoint01 + '/renter';

	$.ajax({
		url: url,
		type: "GET",
		data: the_serialized_data,
		success: function(result){
			console.log(result)
			$('#login_message').html('');
			$('#login_message').hide();
			localStorage.usertoken = result.renterid; //login succeeded.  Set usertoken.
			$("#renterid").val(result.renterid);
			$('.secured').removeClass('locked');
			$('.secured').addClass('unlocked');
			$('#div-login').hide();
			$('#div-dashboard').show();
		},
		error: function(result){
			console.log(result)
			localStorage.usertoken = 0; // login failed.  Set usertoken to it's initial value.
			$('#login_message').html(result.responseJSON);
			$('#login_message').show();
		}
	});

	//scroll to top of page
	$("html, body").animate({ scrollTop: "0px" });
};

var signupFunc = function(){
	var the_serialized_data = $('#form-signup').serialize();
	var url = endpoint01 + '/renter';
	$.ajax({
		url: url,
		type: "POST",
		data: the_serialized_data,
		success: function(){
			buttonFunc("#div-confirmation")
		},
		error: function(result){
			$("#signup-message").show();
			$("#signup-message").html(result.responseJSON);
			console.log(result)
		}
	});

	
}

var buttonFunc = function(div){
	$(".content-wrapper").hide();
	$(div).show();
	$("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide');
}

//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/

	/* lock all secured content */
	$('.secured').removeClass('unlocked');
	$('.secured').addClass('locked');


    /* this reveals the default page */
	$("#div-home").show();

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link, .list-group-item, #signup-link").click(function(){
		navigationControl(this);
	});

	/* what happens if the login button is clicked? */
	$('#btnLogin').click(function(){
		loginController();
	});

	$("#signup-button").click(function(){
		buttonFunc("#div-signup");
	});

	$("#signup-button2").click(function(){
		signupFunc();
	});

	$(".signin-button").click(function(){
		buttonFunc("#div-login");
	});
		
}); /* end the document ready event*/
