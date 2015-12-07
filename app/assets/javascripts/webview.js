(function($){
  $(document).ready(function(){

    "use strict";

    window.webviewer = new function() {

      // method to send message to Swift webkit
      this.send_webkit_message = function(message) {
        try {
          webkit.messageHandlers.javascriptHandler.postMessage(message);
        } catch(err) {
          console.log('error', err);
        }
      }

      // button click event
      this.init_btn_click = function(){
        var _this = this;
        $('[data-btn-click]').click(function(){
          var btn_val = $(this).data('btn-click');
          console.log('button click', btn_val);
          _this.send_webkit_message("Button click: " + btn_val);
        });
      }

      // send message when javascript is done loading
      this.done_loading = function(){
        console.log('done loading');
        this.send_webkit_message("Javascript finished loading");
      }

      // method to return pong response, to test message sent from native Swift code
      this.ping = function(){
        console.log('ping');

        this.send_webkit_message("pong");
        return true;
      }

      this.init = function(){
        console.log('webviewer init');

        this.init_btn_click();
        this.done_loading();
      }

    };

    // note: the document ready calls will be sent from Swift native code
    // var ready = function(){
    //   window.webviewer.init();
    // }
    //$(document).ready(ready);
    //$(document).on('page:load', ready);

  });
})(jQuery);
