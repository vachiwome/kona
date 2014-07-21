
var activeCache = null;

// Actual rendered height of a header element
var cloneHeight = function () {
    var $clone = $('<div class="clone"></div>').appendTo('body'),
        cloneHeight = $clone.outerHeight();
    $clone.remove();
    return cloneHeight;
}();

// Top offsets of each header
var offsets = [];

// Figure out which section is 'active'
var activeHeaderIndex = function () {
    var scrollTop = document.body.scrollTop;
    for (var i = 0; i < offsets.length; i++)
    if (offsets[i] - cloneHeight > scrollTop) return Math.max(i - 1, 0);
}

// Build the 'offsets' array
$('.header').each(function (i, obj) {
    offsets.push($(this).offset().top);
});

// Listen to scroll events
$(window).on('scroll', function () {
    var active = activeHeaderIndex(),
        scroll = document.body.scrollTop,
        clone = $('.clone').length,
        $active = $('.header').eq(active),
        prevTitle = $('.header').eq(active - 1).text(),
        title = $active.text(),
        $fixed = $('.fixed');
    // Hide fixed header
    if (offsets[active] > scroll) {
        if (!clone) {
            $('.header').eq(0).hide();
            $('<li class="clone">' + prevTitle + '</li>').insertBefore($active);
        }
        $fixed.hide();
        // Show fixed header
    } else {
        if (clone) {
            $('.header').eq(0).show();
            $('.clone').remove();
        }
        $fixed.show();
    }
    // If we're not changing headers, exit
    if (active == activeCache) return;
    // Update active index
    activeCache = active;
    // Remove old fixed header (if any)
    $('.fixed').remove();
    // Add a new fixed header
    $fixed = $('<div class="fixed">' + title + '</div>').appendTo('body');
}).trigger('scroll');