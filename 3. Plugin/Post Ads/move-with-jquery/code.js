/* ads move */
function adsMove()
{
	let countTargetMiddle = $(`.post-content p`).length, middleElement = parseInt(countTargetMiddle / 2);;
	$('.ads-move-to-post-middle').insertAfter(`.post-content p:nth-of-type(${middleElement})`);

	$(".ads-move-to-post-bottom").appendTo(".ads-target-post-bottom");

	$(".ads-move-to-feed").appendTo(".ads-target-feed");
}

/* ads feed */
let adsFeed = $(output).find('.ads-move-to-feed');          
$(".ads-target-feed:last").append(adsFeed);