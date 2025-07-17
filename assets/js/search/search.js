

var params;
var fuseOptions;
var pagefind;




var timer = simpleDelayTimer();
function startTimer() {
    if (document.getElementById('doc-search').value.trim() == "") {
        $(".hide-on-search").show();
        $(".show-on-search").hide();
        return;
    }


    timer.reset();
    timer.start();
}

function simpleDelayTimer() {
    var delay = 500;
    var timer = null;
    return {
        start:
            function () {
                this.timer = setTimeout(function () {
                    if ($("#doc-search").val().trim() != "") {
                        $(".hide-on-search").hide();
                        $(".show-on-search").show();
                        executeSearch($("#doc-search").val());

                    } else {
                        $(".hide-on-search").show();
                        $(".show-on-search").hide();

                    }

                }, delay);
                return timer;
            },
        reset: function () {
            clearTimeout(this.timer);
        }
    }
}

function populateResults(result, searchQuery) {
    var searchQuery = searchQuery;
    $('#doc-search-results .results').html("");

    var data = {};
    $.each(result, function (key, value) {
        if (params.engine == "fuse") {
            var contents = value.item.contents;
            var snippet = "";
            var snippetHighlights = [];
            var tags = [];


            if (fuseOptions.tokenize) {
                snippetHighlights.push(searchQuery);
            } else {
                $.each(value.matches, function (matchKey, mvalue) {
                    if (mvalue.key == "tags" || mvalue.key == "categories") {
                        snippetHighlights.push(mvalue.value);

                    } else if (mvalue.key == "contents") {
                        start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
                        end = mvalue.indices[0][1] + summaryInclude < contents.length ? mvalue.indices[0][1] + summaryInclude : contents.length;
                        snippet += contents.substring(start, end);
                        snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
                    }
                });
            }

            if (snippet.length < 1) {
                snippet += contents.substring(0, summaryInclude * 2);
            }
            data = {
                key: key,
                title: value.item.title,
                contents: value.item.contents,
                link: value.item.permalink,
                tags: value.item.tags,
                categories: value.item.categories,
                snippet: snippet
            }

        } else if (params.engine == "pagefind") {
            data = {
                key: key,
                title: value.meta.title,
                contents: value.meta.contents,
                link: value.url,
                snippet: value.excerpt
            }

        }

        var templateDefinition = $('#doc-search-result-template').html();

        var output = render(templateDefinition, data);

        $('#doc-search-results .results').append(output);


        if (params.engine == "fuse") {

            if (snippetHighlights != undefined) {

                $.each(snippetHighlights, function (snipkey, snipvalue) {
                    if (snipvalue != undefined && snipkey != undefined) {
                        console.log("TEST", snipvalue)
                        $("#summary-" + key).mark(snipvalue);
                    }
                });
            }
        }


    });
}

function render(templateString, data) {
    var conditionalMatches, conditionalPattern, copy;
    conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
    //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
    copy = templateString;
    while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
        if (data[conditionalMatches[1]]) {
            //valid key, remove conditionals, leave contents.
            copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
        } else {
            //not valid, remove entire section
            copy = copy.replace(conditionalMatches[0], '');
        }
    }

    templateString = copy;
    //now any conditionals removed we can do simple substitution
    var key, find, re;
    for (key in data) {
        find = '\\$\\{\\s*' + key + '\\s*\\}';
        re = new RegExp(find, 'g');
        templateString = templateString.replace(re, data[key]);
    }
    return templateString;
}


async function executeSearch(searchQuery) {

    var result;

    if (params.engine == "fuse") {

        if (pages == null) {
            var response = await fetch(params.fuseIndex);
            const data = await response.json();
            pages = data;
        }

        var fuse = new Fuse(pages, fuseOptions);

        result = fuse.search(searchQuery);
    }

    if (params.engine == "pagefind") {



        const search = await pagefind.search(searchQuery);
        const resultAll = await Promise.all(search.results.slice(0, 100).map(r => r.data()));

       
        if (params.pageType != "doc") {
            console.log(params.url)
            result = resultAll.filter(function (element) {
                return element.url.indexOf(params.url) == 0;
            });

        }
        else {
            result = resultAll.filter(function (element) {
                return element.url.indexOf(params.subDir) == 0;
            });
        }
    }

        console.log(result)

    if (result.length > 0) {
        populateResults(result, searchQuery);
    } else {
      
        $('#doc-search-results .results').html($('#doc-search-no-match-template').html());
    }
}


jQuery(async function () {



    params = $("#doc-search-params").data()



    if (params.engine == "pagefind") {
        pagefind = await import(params.url + "_pagefind/pagefind.js");
        await pagefind.options({
            baseUrl: params.url,
            // bundlePath: "/"
        });
        pagefind.init();

    } else if (params.engine == "fuse") {
        fuseOptions = {
            /*
            shouldSort: true,
            includeMatches: true,
            threshold: 0.0,
            tokenize:true,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            */
            keys: [
                {name:"title",weight:0.8},
                {name:"contents",weight:0.5},
                {name:"tags",weight:0.3},
                {name:"categories",weight:0.3}
            ]
        };
    } else {
        console.log("no search engine found!")
    }



    $("#doc-search").on("keyup", (event) => {
        startTimer()
    });

    $("#doc-search-cancle").on("click", (event) => {
        $("#doc-search").val("");
        $(".hide-on-search").show();
        $(".show-on-search").hide();
    });

})
