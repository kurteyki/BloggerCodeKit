/* post index pagination */
function postPaginationMultiple()
{
	let postIndex = $("#postPaginationMultiple"), postIndexHasLoaded = 0;
	if (postIndex.length > 0) {	
		$(window).on("load scroll", function() {
			if(($(window).scrollTop() + $(window).height()) >= ($(document).height() - 100) && !postIndexHasLoaded) {

				/* set postIndexHasLoaded */
				postIndexHasLoaded = 1;

				/* get and check pagination link */
				var postPaginationMultipleLink = $("#postPaginationMultiple a.pagination-link"),
				postPaginationMultipleLinkUrl = postPaginationMultipleLink.attr('href'),
				postPaginationMultipleLinkLoading = postPaginationMultipleLink.data('loading');

				if (postPaginationMultipleLinkUrl !== undefined) {

					/* send animation */
					$("#postPaginationMultiple").html(`<div class="text-center py-3"><div class="spinner-border text-primary" role="status">
					<span class="visually-hidden">${postPaginationMultipleLinkLoading}</span>
					</div></div>`);

					$.ajax({
						url: postPaginationMultipleLinkUrl,
						dataType: 'html',
						success: function(output) {												

							setTimeout(function() {
								/* replace pagination with new link */
								$("#postPaginationMultiple").html($(output).find('#postPaginationMultiple a.pagination-link').clone());

								/* append new posts */
								$('#postIndex').append($('#postIndex', $(output).wrap("<div/>")).html()); 

								/* ads feed */
								let adsFeed = $(output).find('.ads-move-to-feed');          
								$(".ads-target-feed:last").append(adsFeed);

								/* set postIndexHasLoaded */
								postIndexHasLoaded = 0;
							}, 1000);
						}
					})
				}else{
					/* remove pagination link */
					$("#postPaginationMultiple").remove();
				}

			}
		});		
	}
}