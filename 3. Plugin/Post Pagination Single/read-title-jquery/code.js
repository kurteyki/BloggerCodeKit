(function(){   
	var newerLink = $('a.blog-pager-newer-link');
	var olderLink = $('a.blog-pager-older-link');
	$.get(newerLink.attr('href'), function (data) {
		/* find post title */ 
		newerLink.html($(data).find('.post h1.post-title').text());
},"html");
	$.get(olderLink.attr('href'), function (data2) {
		/* find post title */ 
		olderLink.html($(data2).find('.post h1.post-title').text());
},"html");
})(); 