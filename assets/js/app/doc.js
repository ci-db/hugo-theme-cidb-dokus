

function openUrl(url, success) {

        
        $('<body>').load(url, function (data, ret) {

                if (ret == 'success') {


                        $("#ci-page-content").html($("#ci-page-content", this).html())
                        $("#navi").html($("#navi", this).html())
                        $("#breadcrumb").html($("#breadcrumb", this).html())
                        $("#col-aside").html($("#col-aside", this).html())
                        //var pageInfo = {"id":this.id,"url":This.href};
                        success(true)




                } else {
                        alert("error page loading");
                        success(false)
                }
        });
}

window.addEventListener('popstate', function (e) {
        if (e.state && e.state.ciHref) {
                openUrl(e.state.ciHref, function success(ret) { })
        }
});


jQuery(function () {
        history.replaceState({ ciHref: window.location.href }, '', window.location.href);
        $("#sidebar").on('click', '.ajax-call', function (event) {
                event.preventDefault();
                // var This = this;
                var url = $(this).attr('href');

                openUrl(url, function success(ret) {
                        if (ret === true) {
                                history.pushState({ ciHref: url }, '', url);
                        }
                })


        });
});