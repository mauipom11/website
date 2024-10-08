// IIFE to encapsulate the functionality
(function() {
    var d = document,
        accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
        setAriaAttr,
        setAccordionAria,
        switchAccordion,
        touchSupported = ('ontouchstart' in window),
        pointerSupported = ('pointerdown' in window);

    // Polyfill for preventing click delay on touch devices
    function skipClickDelay(e) {
        e.preventDefault();
        e.target.click();
    }

    // Function to set ARIA attributes
    setAriaAttr = function(el, ariaType, newProperty) {
        el.setAttribute(ariaType, newProperty);
    };

    // Function to set ARIA attributes for accordion
    setAccordionAria = function(el1, el2, expanded) {
        switch (expanded) {
            case "true":
                setAriaAttr(el1, 'aria-expanded', 'true');
                setAriaAttr(el2, 'aria-hidden', 'false');
                break;
            case "false":
                setAriaAttr(el1, 'aria-expanded', 'false');
                setAriaAttr(el2, 'aria-hidden', 'true');
                break;
            default:
                break;
        }
    };

    // Function to handle accordion switch
    switchAccordion = function(e) {
        e.preventDefault();
        var thisAnswer = e.target.parentNode.nextElementSibling;
        var thisQuestion = e.target;

        if (thisAnswer.classList.contains('is-collapsed')) {
            setAccordionAria(thisQuestion, thisAnswer, 'true');
        } else {
            setAccordionAria(thisQuestion, thisAnswer, 'false');
        }
        thisQuestion.classList.toggle('is-collapsed');
        thisQuestion.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('is-collapsed');
        thisAnswer.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('animateIn');
    };

    // Add event listeners to accordion triggers
    for (var i = 0, len = accordionToggles.length; i < len; i++) {
        if (touchSupported) {
            accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
        }
        if (pointerSupported) {
            accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
        }
        accordionToggles[i].addEventListener('click', switchAccordion, false);
    }
})();
