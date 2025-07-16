 /*
              $( document ).ready(function() {
                  $(window).on('popstate', function() {
                          loadContent(location.pathname);
                  });
  
                  function loadContent(url) {
                          $('#main').load(url + ' #main');
                  }
  
                  $( ".ajax-call" ).click(function(event) {
                          var This = this;
                          var url = $(this).attr('href');
                          event.preventDefault();
                          $( "#content" ).load( url + ' #content', function(data, ret) {
                             if (ret == 'success') {                 
                                  $(".side-menu .ajax-call").removeClass( "active" );
                                  $(This).addClass( "active" );
  
                                  history.pushState({}, "", url);
  
                             }
                          });
  
  
                    
                        //  console.log($(this).attr('href'));
                        //  $("#content").load($(this).attr('href') + ' #content');
                          
                         // console.log("etst");
                    });
              });
  */