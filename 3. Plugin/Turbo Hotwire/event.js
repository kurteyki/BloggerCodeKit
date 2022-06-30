['turbo:click', 'turbo:submit-start'].forEach(function(e) {
	window.addEventListener(e, function(){
		Turbo.navigator.delegate.adapter.showProgressBar();			
	});
});

document.addEventListener("turbo:load", function() {
	/* load script after turbolink loaded page */

	/**
	 * when open with mobile always redirect 304 because not have parameter ?m=	
	 * then the event always have duplicate
	 * and i fix with change ?m=1 to ?m=0 (first redirect only) 
	*/
	if (window.location.href.indexOf("?m=1") > -1) {
		window.location.href = window.location.href.replace("?m=1", "?m=0");
	}	
});	