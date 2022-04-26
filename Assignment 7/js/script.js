$(function() {
    $('#photo-viewer').show().on('click', '.photo-box', function(e) {
        var $content = $(this).clone().find('img').css({
            marginLeft: 0,
            marginTop: 0,
            width: '100%',
            height: 'auto'
        });
        var modal = (function() {
            var $window = $(window);S
            var $modal = $('<div class="modal"/>');
            var $content = $('<div class="modal-content"/>');
            var $close = $('<button role="button" class="modal-close">close</button>');
            $modal.append($content, $close);


            $close.on('click', function(e) {
                e.preventDefault();
                modal.close();
            });
            return {
                center: function() { // function center ()
                    // Distance from top and left to center of modal
                    var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
                    var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
                    // Set CSS for the modal
                    $modal.css({
                        top: top + $window.scrollTop(),
                        left: left + $window.scrollLeft()
                    });
                },
                open: function(settings) {
                    $content.empty().append(settings.content);
                    $modal.css({ // Dimensions
                        width: settings.width || 'auto', // Set width
                        height: settings.height || 'auto' // Set height
                    }).appendTo('body'); // Add to page
                    modal.center(); // Call center() again
                    $window.on('resize', modal.center); // On window resize
                },
                close: function() {
                    // Remove content from the modal window
                    $content.empty();
                    // Remove modal window from the page
                    $modal.detach();
                    // Remove event handler
                    $(window).off('resize', modal.center);
                }
            }
        })
        var modal = new modal();

        modal.open({
            content: $content,
            width: 800,
            height: 450


        });
    });
});