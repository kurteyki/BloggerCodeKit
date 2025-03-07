/**
* Forked version of commonly found script in Blogger templates for pagination
* Source  :  http://techably.com/blogger-numbered-pagination/12638/
* Version : 0.1
* Author  : Anonymous, Rahul Arora
*/
var pageCount=6;
var displayPageNum=6;
var upPageWord ="Previous";
var downPageWord ="Next";

function showpageCount(json) {
    var thisUrl = home_page_url;
    var htmlMap = new Array();
    var thisNum = 1;
    var postNum = 1;
    var itemCount = 0;
    var fFlag = 0;
    var eFlag = 0;
    var html = '';
    var upPageHtml = '';
    var downPageHtml = '';
    for (var i = 0, post; post = json.feed.entry[i]; i++) {
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        timestamp = encodeURIComponent(timestamp1);
        var title = post.title.$t;
        if (title != '') {
            if (itemCount == 0 || (itemCount % pageCount == (pageCount - 1))) {
                if (thisUrl.indexOf(timestamp) != -1) {
                    thisNum = postNum
                }
                if (title != '') postNum++;
                htmlMap[htmlMap.length] = '/search?updated-max=' + timestamp + '&max-results=' + pageCount
            }
        }
        itemCount++
    }
    for (var p = 0; p < htmlMap.length; p++) {
        if (p >= (thisNum - displayPageNum - 1) && p < (thisNum + displayPageNum)) {
            if (fFlag == 0 && p == thisNum - 2) {
                if (thisNum == 2) {
                    upPageHtml = '<span class="showpage"><a href="/">' + upPageWord + '</a></span>'
                } else {
                    upPageHtml = '<span class="showpage"><a href="' + htmlMap[p] + '">' + upPageWord + '</a></span>'
                }
                fFlag++
            }
            if (p == (thisNum - 1)) {
                html += '<span class="showpagePoint">' + thisNum + '</span>'
            } else {
                if (p == 0) {
                    html += '<span class="showpageNum"><a href="/">1</a></span>'
                } else {
                    html += '<span class="showpageNum"><a href="' + htmlMap[p] + '">' + (p + 1) + '</a></span>'
                }
            }
            if (eFlag == 0 && p == thisNum) {
                downPageHtml = '<span class="showpage"> <a href="' + htmlMap[p] + '">' + downPageWord + '</a></span>';
                eFlag++
            }
        }
    }
    if (thisNum > 1) {
        html = '' + upPageHtml + ' ' + html + ' '
    }
    html = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages ' + (postNum - 1) + '</span>' + html;
    if (thisNum < (postNum - 1)) {
        html += downPageHtml
    }
    if (postNum == 1) postNum++;
    html += '</div>';
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    if (postNum <= 2) {
        html = ''
    }
    for (var p = 0; p < pageArea.length; p++) {
        pageArea[p].innerHTML = html
    }
    if (pageArea && pageArea.length > 0) {
        html = ''
    }
    if (blogPager) {
        blogPager.innerHTML = html
    }
}

function showpageCount2(json) {
    var thisUrl = home_page_url;
    var htmlMap = new Array();
    var isLablePage = thisUrl.indexOf("/search/label/") != -1;
    var thisLable = isLablePage ? thisUrl.substr(thisUrl.indexOf("/search/label/") + 14, thisUrl.length) : "";
    thisLable = thisLable.indexOf("?") != -1 ? thisLable.substr(0, thisLable.indexOf("?")) : thisLable;
    var thisNum = 1;
    var postNum = 1;
    var itemCount = 0;
    var fFlag = 0;
    var eFlag = 0;
    var html = '';
    var upPageHtml = '';
    var downPageHtml = '';
    var labelHtml = '<span class="showpageNum"><a href="/search/label/' + thisLable + '?&max-results=' + pageCount + '">';
    var thisUrl = home_page_url;
    for (var i = 0, post; post = json.feed.entry[i]; i++) {
        var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
        timestamp = encodeURIComponent(timestamp1);
        var title = post.title.$t;
        if (title != '') {
            if (itemCount == 0 || (itemCount % pageCount == (pageCount - 1))) {
                if (thisUrl.indexOf(timestamp) != -1) {
                    thisNum = postNum
                }
                if (title != '') postNum++;
                htmlMap[htmlMap.length] = '/search/label/' + thisLable + '?updated-max=' + timestamp + '&max-results=' + pageCount
            }
        }
        itemCount++
    }
    for (var p = 0; p < htmlMap.length; p++) {
        if (p >= (thisNum - displayPageNum - 1) && p < (thisNum + displayPageNum)) {
            if (fFlag == 0 && p == thisNum - 2) {
                if (thisNum == 2) {
                    upPageHtml = labelHtml + upPageWord + '</a></span>'
                } else {
                    upPageHtml = '<span class="showpage"><a href="' + htmlMap[p] + '">' + upPageWord + '</a></span>'
                }
                fFlag++
            }
            if (p == (thisNum - 1)) {
                html += '<span class="showpagePoint">' + thisNum + '</span>'
            } else {
                if (p == 0) {
                    html = labelHtml + '1</a></span>'
                } else {
                    html += '<span class="showpageNum"><a href="' + htmlMap[p] + '">' + (p + 1) + '</a></span>'
                }
            }
            if (eFlag == 0 && p == thisNum) {
                downPageHtml = '<span class="showpage"> <a href="' + htmlMap[p] + '">' + downPageWord + '</a></span>';
                eFlag++
            }
        }
    }
    if (thisNum > 1) {
        if (!isLablePage) {
            html = '' + upPageHtml + ' ' + html + ' '
        } else {
            html = '' + upPageHtml + ' ' + html + ' '
        }
    }
    html = '<div class="showpageArea"><span style="COLOR: #000;" class="showpageOf"> Pages (' + (postNum - 1) + ')</span>' + html;
    if (thisNum < (postNum - 1)) {
        html += downPageHtml
    }
    if (postNum == 1) postNum++;
    html += '</div>';
    var pageArea = document.getElementsByName("pageArea");
    var blogPager = document.getElementById("blog-pager");
    if (postNum <= 2) {
        html = ''
    }
    for (var p = 0; p < pageArea.length; p++) {
        pageArea[p].innerHTML = html
    }
    if (pageArea && pageArea.length > 0) {
        html = ''
    }
    if (blogPager) {
        blogPager.innerHTML = html
    }
}
var home_page_url = location.href;
var thisUrl = home_page_url;
if (thisUrl.indexOf("/search/label/") != -1) {
    if (thisUrl.indexOf("?updated-max") != -1) {
        var lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?updated-max"))
    } else {
        var lblname1 = thisUrl.substring(thisUrl.indexOf("/search/label/") + 14, thisUrl.indexOf("?&max"))
    }
}
var home_page = "/";
if (thisUrl.indexOf("?q=") == -1) {
    if (thisUrl.indexOf("/search/label/") == -1) {
        document.write('<script src="' + home_page + 'feeds/posts/summary?alt=json-in-script&callback=showpageCount&max-results=99999" ><\/script>')
    } else {
        document.write('<script src="' + home_page + 'feeds/posts/full/-/' + lblname1 + '?alt=json-in-script&callback=showpageCount2&max-results=99999" ><\/script>')
    }
}