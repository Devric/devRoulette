(function($){ 
    $.fn.extend({
        devRoulette: function(options){
            var defaults = {
                speed : 1000,
                next : '#next',
                prev : '#prev'
                //todo add initial start position
            };
            var options = $.extend(defaults, options);
            return this.each(function(){
                var o = options;

                //assign default vars
                var obj = $(this),
                    box = obj.find('.box'),
                    bn = box.find('img').length,// box number
                    bw = box.width(),           // box width
                    bh = box.height(),          // box height
                    c = 360;                    // full circle

                if( bn <= 2 ) {
                    // if just boxes, we only need a 180 turn
                    var fullRotate = 180,
                        diameter = bh * 2;
                
                } else {
                    // calculations
                    var fullRotate = c / bn,    // calculate number of equal rotation from the midpoint of each box
                        theta = fullRotate / 2, // theta, half of two midpoints, depending on number of boxes

                        //inner radius
                        innerRadius = (bw / 2 )/ tan(theta),   // get adjcent(inner radius) by opposite dvide by tan0

                        // get outer radius
                        fullHeight = innerRadius + bh;         // inner radius + box height
                        
                        // get full radius
                        fullRadius = fullHeight/cos(theta),    // adjcent divide cos0 = hypothenus
                        diameter = fullRadius * 2;
                } // end if
                    
                // positioning
                obj.css({  
                    // print the container size
                    width:diameter,
                    height:diameter,
                    transform: 'rotate(0deg)'
                });

                // setup
                box
                .css({
                    'margin-left': (diameter - bw ) / 2 // calculat left margin by (diameter - boxwidth) /2
                })
                .wrap('<div class="boxparent"></div>');
                $('.boxparent').each(function(index){
                    var thisIndex = $(this).index(),
                        thisRotation = thisIndex * fullRotate;
                    $(this).css('transform','rotate( '+thisRotation+'deg)');
                });

                // action
                $(o.next).click(function() {
                    if( !obj.is(":animated") ) {
                        obj.animate({rotate: '-='+fullRotate+'deg'}, o.speed);
                    }
                });
                $(o.prev).click(function() {
                    if( !obj.is(":animated") ) {
                        obj.animate({rotate: '+='+fullRotate+'deg'}, o.speed);
                    }
                });

            });

            // helper function
            function cos(theta) { return r(Math.cos(theta * Math.PI/180)) } //cah
            function tan(theta) { return Math.tan(theta * Math.PI/180) } //toa
            function r(r) { return Math.round(r ) } // rounding and eg: to decimal round it to 5 decimal (r *100000 ) /100000
        }
    });
})(jQuery); //end menu
