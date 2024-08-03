// ==UserScript==
// @name         Filelist
// @namespace    https://filelist.io
// @version      2024-01-26
// @description  try to take over the world!
// @author       Micky Socaci
// @match        https://filelist.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=filelist.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const seasonWords = [
        "Season",
        "S0",
        "S1",
        "S2",
        "S3",
        "S4",
    ];

    function findTitleAndSetSearchString (string, obj) {
        var split = false;
        for(var key in seasonWords) {
            if(seasonWords[key]) {
                if( string.includes(seasonWords[key]) ) {
                    split = seasonWords[key]
                }
            }
        }

        if(split !== false) {
            var data = string.split(split);
            var words = data[0];
            words = words.split(".").join(" ");
            words = words.trim();
            words = words.split(" ").join("%20");
            let url = "/browse.php?search="+words+"&cat=21&searchin=1&sort=2";
            obj[0].href = url;
        }
    }

    // are we on the right page ?
    let cat = $('select[name="cat"]').val();
    if(typeof cat !== typeof undefined && cat == "21" ) {

        $('.torrentrow').each(function(e) {
            var row = $(this);
            var data = row.find('[data-html="true"]');
            var attr = data.attr("data-original-title");
            var title = "";

            if(typeof attr !== typeof undefined && attr !== false) {
                title = data.find('b');
            } else {
                title = row.find('span > a > b');
            }

            var replace = row.children().first().find("img");
            var container = replace.parent();

            if (typeof attr !== typeof undefined && attr !== false) {
                container.html( attr );

                var result = container.find("img");
                result.css("height", "47px");
            }

            findTitleAndSetSearchString( title.html(), container );
        })

    }

    var css = '.torrenttable span > img {  opacity: 0.3 !important; filter:alpha(opacity=30) !important; }';
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);

    // navigation
    let nav = '<ul>'+"\n";
    nav+= '<li class="fleft"><a href="/">Home</a></li>'+"\n";
    nav+= '<li class="fleft"><a href="/browse.php">Browse All</a></li>'+"\n";
    nav+= '<li class="fleft"><a href="/browse.php?cat=21">Browse TV Series</a></li>'+"\n";
    nav+= '<li class="fleft"><a href="/browse.php?cat=4">Browse HD Movies</a></li>'+"\n";
    nav+= '<li class="fleft"><a href="/viewrequests.php">Requests</a></li>'+"\n";
    nav+= '</ul>';
    $("#nav").html(nav);

