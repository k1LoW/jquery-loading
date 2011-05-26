/**
 * 'Now loading' UI Plugin 0.1 for jQuery
 *
 * Copyright(C) 2009-2011 101000code/101000LAB
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
      * @param {Boolean} attr.position Loading message position 'absolute' or 'fixed'
      * @param {Boolean} attr.cancel When cancel is true, user can cancel loading design.
      */
     $.fn.loading = function(attr) {
         var $self = this;
         if (typeof attr == 'undefined') {
             attr = {};
         }

         $self._initialize(attr);

         var attrDefault = {
             type : 'simple',
             src : '',
             message : 'Now loading...',
             position : 'absolute',
             cancel : false
         };

         attr = $.extend(attrDefault, attr);

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
      * alias of $(document).loading()
      *
      * @see $.loading()
      */
     $.loading = function(attr) {
         $(document).loading(attr);
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
         var $target = ($(this).get(0) == $(document).get(0)) ? this : $(this);
         over = $('<div>').attr({'class':'loading', id:'loading_over'}).css({
                                                                                position:'absolute',
                                                                                //top:'0',
                                                                                //left:'0',
                                                                                backgroundColor:'#FFFFFF',
                                                                                opacity: '0.5',
                                                                                width: $target.width(),
                                                                                height: $target.height(),
                                                                                zIndex:99
                                                                            });
         transparent = $('<div>').attr({'class':'loading', id:'loading_transparent'}).css({
                                                                                              position:'absolute',
                                                                                              //top:'0',
                                                                                              //left:'0',
                                                                                              width: $target.width(),
                                                                                              height: $target.height(),
                                                                                              textAlign:'center'
                                                                                          });
     };

     /**
      * $.fn._simple()
      *
      */
     $.fn._simple = function(attr) {
         var message = (attr.message) ? attr.message : 'Now loading...';
         var $target = ($(this).get(0) == $(document).get(0)) ? $('body') : $(this);

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
                                                                   position:attr.position,
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

         $target.css({margin:'0',padding:'0'}).prepend(over);
         $target.css({margin:'0',padding:'0'}).prepend(transparent.append(simple));
     };

     /**
      * $.fn._image()
      *
      */
     $.fn._image = function(attr) {
         var imgObj = Image();
         var $target = ($(this).get(0) == $(document).get(0)) ? $('body') : $(this);
         imgObj.src = attr.src;
         var image = $('<img>').attr({src:attr.src}).css({
                                                             marginTop: $target.height()/2 - imgObj.height/2
                                                         });

         $target.css({margin:'0',padding:'0'}).prepend(over);
         $target.css({margin:'0',padding:'0'}).prepend(transparent.append(image));
     };

     /**
      * $.loading.complete()
      *
      */
     $.loading.complete = function() {
         $('.loading').remove();
     };

 })(jQuery);