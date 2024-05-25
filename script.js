$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('nav a').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Toggle dark mode
    $('#dark-mode-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        const icon = $('#mode-icon');
        if ($('body').hasClass('dark-mode')) {
            icon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
        }
    });

    // Skill tag filtering
    $('.skill-tag').on('click', function() {
        const skill = $(this).data('skill');
        
        // Toggle active state and cross icon visibility
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('i').hide();
        } else {
            $(this).addClass('active');
            $(this).find('i').show();
        }

        // Filter cards based on the selected skill tag
        filterCards();
    });

    // Cross icon click event
    $('.skill-tag i').on('click', function(event) {
        event.stopPropagation();
        $(this).parent().removeClass('active');
        $(this).hide();
        filterCards();
    });

    // Card hover effect
    $('.card').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
            $(this).css('box-shadow', '0 0 15px rgba(0, 0, 0, 0.2)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
            $(this).css('box-shadow', '0 0 10px rgba(0, 0, 0, 0.1)');
        }
    );

    function filterCards() {
        const activeSkills = $('.skill-tag.active').map(function() {
            return $(this).data('skill');
        }).get();

        if (activeSkills.length === 0) {
            $('.card').show();
            $('.section').show(); // Show all sections if no skills are selected
            return;
        }

        let visibleSections = new Set();

        $('.card').each(function() {
            const cardSkills = $(this).data('skills').split(' ');
            if (activeSkills.some(skill => cardSkills.includes(skill))) {
                $(this).show();
                visibleSections.add($(this).closest('.section').attr('id'));
            } else {
                $(this).hide();
            }
        });

        // Hide sections without visible cards, excluding "About Me"
        $('.section').each(function() {
            if ($(this).attr('id') !== 'about' && !visibleSections.has($(this).attr('id'))) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }

    // Toggle mobile menu
    $('#menu-toggle').on('click', function() {
        $('#nav-links').slideToggle();
    });
	
	// Scroll to top button functionality
    var scrollToTopBtn = $('#scrollToTopBtn');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            scrollToTopBtn.fadeIn();
        } else {
            scrollToTopBtn.fadeOut();
        }
    });

    scrollToTopBtn.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});
