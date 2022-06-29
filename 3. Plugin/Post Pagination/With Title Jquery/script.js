(function(){   
 var newerLink = $('a.blog-pager-newer-link');
 var olderLink = $('a.blog-pager-older-link');
 $.get(newerLink.attr('href'), function (data) {
  newerLink.html($(data).find('.post h1.post-title').text()); //disesuaikan untuk judul
 },"html");
 $.get(olderLink.attr('href'), function (data2) {
  olderLink.html($(data2).find('.post h1.post-title').text()); //disesuaikan untuk judul
 },"html");
})(); 