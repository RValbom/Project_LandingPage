/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/


/* #################################### */
/* ###### Define Global Variables ##### */

	// select each section container element
	const sectionElementItem = document.querySelectorAll("[id^='section']");



/* ############################ */
/* ##### Helper Functions ##### */

	/* Active sections by:
		- adding class 'active' to section when near top of viewport: this will highlight the section itself
		- changing the navigation's bar section background: this will highlight the nav menu item related with active section
	*/
	function makeActive(){

		// loop through each section on the page
		sectionElementItem.forEach((section) => {
			
			// get object with section's size/position info
			const sectionBox = section.getBoundingClientRect();
			
			// get navigation bar element related with current section
			const navMenuListItem = document.querySelector(`#nav${section.getAttribute('id')}`);
			
			// activate section and navBar item if section is near viewport top / deactivate otherwise
			if (sectionBox.top <= 125 && sectionBox.bottom >= 125) {
				
				// Apply active state on current section and corresponding Nav link
				section.setAttribute('class', 'your-active-class');
				navMenuListItem.style.background = '#987';
			} else {
				
				// Remove active state on current section and corresponding Nav link
				section.removeAttribute('class');
				navMenuListItem.style.background = 'white';
			}
		});
	};



	/* Set "Go to Top" button visible */
	function scrollFunction() {
		
		// Get the button element
		const goTopbutton = document.getElementById("goTopBtn");

		// when the user scrolls down 20px from the top of the document, show the button. Otherwise, hides it
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			goTopbutton.style.display = "block";
		} else {
			goTopbutton.style.display = "none";
		}
	}



	/* When the user clicks on the button, scroll to the top of the document */
	function topFunction() {
		
		// For Safari
		document.body.scrollTop = 0;
		
		// For Chrome, Firefox, IE and Opera
		document.documentElement.scrollTop = 0;
	}



/* ########################## */
/* ##### Main Functions ##### */

	/* Create Navigation Bar */

	// get navigation bar element
	const navMenuList = document.querySelector('#navbar__list');

	// iterate through each section element
	sectionElementItem.forEach((section) => {

		// if each section has an attribute named 'data-nav', which corresponds to its name
		if(section.hasAttribute('data-nav')) {

			// get the section name
			const sectionName = section.getAttribute('data-nav')

			// create an unordered list item
			const navMenuListItem = document.createElement('li');
			navMenuListItem.setAttribute('id', `nav${section.getAttribute('id')}`);

			// creates an anchor element and sets its attributes
			const navMenuListItemLink = document.createElement('a');
			navMenuListItemLink.setAttribute('href', `#${section.getAttribute('id')}`);
			navMenuListItemLink.textContent = sectionName;
			navMenuListItemLink.className = 'menu__link';
	
			// Scroll to section's anchor ID on link click, using scrollTO event
			navMenuListItemLink.addEventListener('click', function (e) {
				e.preventDefault();

				document.querySelector(navMenuListItemLink.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
				});
			});
			
			// append anchor element to unordered list item
			navMenuListItem.appendChild(navMenuListItemLink);

			// append unordered list item to navigation bar
			navMenuList.appendChild(navMenuListItem);
		}
	});


	/* Create collapsible content */
	const collSection = document.querySelectorAll(".container__collapsible");
	
	// iterate through each section element and add a click event listener which toggles the active class and expands or hides the collapsible text
	collSection.forEach((section) => {
		section.addEventListener("click", function() {
			section.classList.toggle("container__collapsible__active");
			
			const sectionContent = section.nextElementSibling;
			
			if (sectionContent.style.display === "block") {
				sectionContent.style.display = "none";
			} else {
				sectionContent.style.display = "block";
			}
		});
	});


/* ############## */
/* ### Events ### */

	/* Add listeners to scrolling events */

	let timer = null;
	document.addEventListener('scroll', function() {

		// Search which section is inside viewport and activate it
		makeActive();

		
		// Set "Go to Top" button visible
		scrollFunction();


		// Hide Navigation Bar when not scrolling (keeping it visible when viewport is on page's top)
		const navMenuList = document.querySelector('.page__header');

		if(timer !== null) {
			clearTimeout(timer);
			navMenuList.style.visibility = 'visible';
		}
		
		// Set a timer to 150ms after stop scrolling: if the viewport is on page's top, keep the navigation bar visible, otherwise hide it
		timer = setTimeout(function(e) {

			// when reached the top, set to visible again
			if (document.body.scrollTop > 20) {
				navMenuList.style.visibility = 'hidden';
			  } else {
				navMenuList.style.visibility = 'visible';
			  }

		}, 150);

	}, false);



	/* Add listener to click event on "Go to Top" button */

	// Get the button element
	const goTopbutton = document.getElementById("goTopBtn");

	// when button is clicked, viewport goes to page's top
	goTopbutton.addEventListener('click', function (e) {
					e.preventDefault();

					topFunction();
				});