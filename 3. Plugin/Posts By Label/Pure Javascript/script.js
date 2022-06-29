function removetag(string, longlength) {
    var identtag = string.split("<");
    for (var f = 0; f < identtag.length; f++) {
        if (identtag[f].indexOf(">") != -1) {
            identtag[f] = identtag[f].substring(identtag[f].indexOf(">") + 1, identtag[f].length);
        }
    }
    identtag = identtag.join("");
    identtag = identtag.substring(0, longlength - 1);
    return identtag;
}

function postbylabel(kodein){
    var stylepot = 'grid';
    var feedentry = kodein.feed.entry;
    var maxpost = feedentry.length;
    var createarray = new Array();

    var monthformat = new Array();   
    monthformat[01] = "Jan", 
    monthformat[02] = "Feb", 
    monthformat[03] = "Mar", 
    monthformat[04] = "Apr", 
    monthformat[05] = "May", 
    monthformat[06] = "Jun", 
    monthformat[07] = "Jul", 
    monthformat[08] = "Aug", 
    monthformat[09] = "Sep", 
    monthformat[10] = "Oct", 
    monthformat[11] = "Nov", 
    monthformat[12] = "Dec";

    for(i = 0; i < maxpost; i++){

        var title = feedentry[i].title.$t;

        var snippet;
        if ("summary" in feedentry[i]) {
            snippet = feedentry[i].summary.$t;
        }else if ("content" in feedentry[i]) {
            snippet = feedentry[i].content.$t;
        }
        snippet = removetag(snippet,150);


        if ("media$thumbnail" in feedentry[i]) {    
            var images = feedentry[i].media$thumbnail.url;
        }else {
            var images = "https://placehold.it/100x100/777/eee?text=No+Images";
        }

        var published = feedentry[i].published.$t,
        yearpublished = published.substring(0, 4),
        monthpublished = published.substring(5, 7),
        daypublished = published.substring(8, 10),
        timepublished = published.substring(11, 16),
        publishedfull = monthformat[parseInt(monthpublished, 10)] + "-" + daypublished + "-" + yearpublished;

        var updated = feedentry[i].updated.$t,
        yearupdated = updated.substring(0, 4),
        monthupdated = updated.substring(5, 7),
        dayupdated = updated.substring(8, 10),
        timeupdated = updated.substring(11, 16);

        var link;
        for(var h=0; h < feedentry[i].link.length; h++){
            if (feedentry[i].link[h].rel == "alternate") {
             link = feedentry[i].link[h].href;
             break;
         }
     } 

     var countcomm;
     for(var h=0; h < feedentry[i].link.length; h++){
        if (feedentry[i].link[h].rel == "replies" && feedentry[i].link[h].type == "text/html") {
         countcomm = feedentry[i].link[h].title;
         break;
     }
 }   

// IF LIST
if (stylepost == 'list') {
    var imagestoarr = "<a href="+ link +" target='_top'><div class='postlabellistoverlay'><img src='"+ images +"' title='"+title+"' alt='"+title+"'/></div></a>";
    var titletoarr = "<div class='overlaytext'><a class='postlabellisttitle' href="+ link +" target='_top' title='"+title+"'>"+ title +"</a></div>";
    var infopost = "<div class='infopostlabellist'><i class='fa fa-clock-o'></i> "+ publishedfull +"  <i class='fa fa-comment-o'></i> "+ countcomm +"</div>";
    var snippet  = "<span class='news-text'>" + snippet + "</span>";
    var toarray = "<li>"+ imagestoarr + titletoarr + snippet + infopost +"</li>";
}

// IF GRID
if (stylepost == 'grid') {    
    var imagestoarr = "<a href="+ link +" target='_top'><div class='postlabelgridoverlay'><img src='"+ images +"' title='"+title+"' alt='"+title+"'/></div></a>";
    var titletoarr = "<div class='overlaytext'><a class='postlabelgridtitle' href="+ link +" target='_top' title='"+title+"'>"+ title +"</a></div>";
    var snippet  = "<span class='news-text'>" + snippet + "</span>";
    var toarray = "<li>"+ imagestoarr + titletoarr + snippet +"</li>";
}

createarray[i] = toarray;

}

document.write('<ul id="postlabellist">');
for (var x=0;x < createarray.length;x++){
    document.write(createarray[x]);
}
document.write("</ul>")
}