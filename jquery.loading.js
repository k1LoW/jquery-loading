/**
 * 'Now loading' UI Plugin 0.0.2 for jQuery 1.3.x
 *
 * Copyright(C) 2009 101000code/101000LAB
 *
 * Licensed under The MIT License
 *
 *
 */
(function($) {
     var over;
     var transparent;

     /**
      * $.fn.loading()
      *
      * @param {String} attr.type 'image' or 'simple'
      * @param {String} attr.src image file src
      * @param {String} attr.message Loading message when 'simple'
      * @param {Boolean} attr.cancel When cancel is true, user can cancel loading design.
      */
     $.fn.loading = function(attr) {
         $(this)._initialize(attr);

         switch (attr.type) {
         case 'image':
             $(this)._image(attr);
             break;
         case 'simple':
             $(this)._simple(attr);
             break;
         default:
             $(this)._simple(attr);
             break;
         }

         if (attr.cancel) {
             $('.loading').dblclick(function(){
                                        $.loading.complete();
                                    });
         }
         return this;
     };

     /**
      * $.loading.start()
      * alias of $('body').loading()
      *
      * @see $.loading()
      */
     $.loading = function(attr) {
         $(document.body).loading(attr);
     };

     /**
      * $.loading.start()
      * alias of $.loading()
      *
      * @see $.loading()
      */
     $.loading.start = function(attr) {
         $.loading(attr);
     };

     /**
      * $.fn._initialize()
      *
      */
     $.fn._initialize = function(attr) {
         var target = ($(this).get(0) == $(document.body).get(0)) ? window : this;
         over = $('<div>').attr({'class':'loading', id:'loading_over'}).css({
                                                                                position:'absolute',
                                                                                //top:'0',
                                                                                //left:'0',
                                                                                backgroundColor:'#FFFFFF',
                                                                                opacity: '0.5',
                                                                                width: $(target).width(),
                                                                                height: $(target).height(),
                                                                                zIndex:99
                                                                            });
         transparent = $('<div>').attr({'class':'loading', id:'loading_transparent'}).css({
                                                                                              position:'absolute',
                                                                                              //top:'0',
                                                                                              //left:'0',
                                                                                              width: $(target).width(),
                                                                                              height: $(target).height(),
                                                                                              textAlign:'center'
                                                                                          });
     };

     /**
      * $.fn._simple()
      *
      */
     $.fn._simple = function(attr) {
         var message = (attr.message) ? attr.message : 'Now loading...';

         function getByte(str) {
             l = 0;
             for (i=0; i<str.length; i++) {
                 n = escape(str.charAt(i));
                 if (n.length < 4) {
                     l++;
                 } else {
                     l+=2;
                 }
             }
             return l;
         }

         var simple = $('<div>').attr({'class':'loading'}).css({
                                                                   position:'absolute',
                                                                   top:0,
                                                                   right:0,
                                                                   width:getByte(message)+ 'em',
                                                                   height:'20px',
                                                                   textAlign:'center',
                                                                   verticalAlign:'middle',
                                                                   color:'#FFFFFF',
                                                                   fontSize:'14px',
                                                                   fontWeight:'bold',
                                                                   backgroundColor:'#CC4444',
                                                                   zIndex:100
                                                               }).text(message);

         $(this).css({margin:'0',padding:'0'}).prepend(over);
         $(this).css({margin:'0',padding:'0'}).prepend(transparent.append(simple));
     };

     /**
      * $.fn._image()
      *
      */
     $.fn._image = function(attr) {
         var imgObj = Image();
         imgObj.src = attr.src;
         var image = $('<img>').attr({src:attr.src}).css({
                                                             marginTop: $(document).height()/2 - imgObj.height/2
                                                         });
         $(this).css({margin:'0',padding:'0'}).prepend(over);
         $(this).css({margin:'0',padding:'0'}).prepend(transparent.append(image));
     };

     /**
      * $.loading.complete()
      *
      */
     $.loading.complete = function() {
         $('.loading').remove();
     };

 })(jQuery);