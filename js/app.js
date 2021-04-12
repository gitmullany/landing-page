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
 * Define Global Variables
 *
*/

let currentActiveSectionId = "section1";
const sectionsArray = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function whatSectionIsInViewport () {
  // loops through sections and returns the section which has the most content in the viewport
  const windowHeight = window.screen.height;
  let sectionTopPosition = 0;
  let sectionBotPosition = 0;
  let contentInViewport = 0;
  let candidateSection = 1;
  let candidateSectionContentHeight = 0;
  let counter = 1;

  for (const thisSection of sectionsArray) {
         sectionTopPosition = thisSection.getBoundingClientRect().top;
         sectionBotPosition = thisSection.getBoundingClientRect().bottom;
        
        //if the section's top is below the viewport, then none of it is in view
        //and we continue to the next loop after incrementing the counter
        //if the section's top is above the viewport, then set it at zero
        //otherwise use the actual value to calculate content in view
        if (sectionTopPosition > windowHeight) {
            counter++;
            continue;
        } else {
            if (sectionTopPosition < 0) {
                sectionTopPosition = 0;
            }
        };
        //if the section's bot is above the viewport, then none of it is in view
        //and we continue to the next loop after incrementing the counter
        //if the section's bot is below the viewport, then set it at the window height
        //otherwise use the actual value to calculate content in view

        if (sectionBotPosition < 0) {
            counter++;
            continue;
        } else {
            if (sectionBotPosition > windowHeight) {
                sectionBotPosition = windowHeight;
            }
        };

        contentInViewport = sectionBotPosition - sectionTopPosition;
        if (contentInViewport > candidateSectionContentHeight) {
            candidateSection = counter;
            candidateSectionContentHeight = contentInViewport;
        }
        counter++;
    };
    return(candidateSection);
};


// Set sections as active
function setActiveSection (clickedSection) {
   const oldActiveSectionId = currentActiveSectionId;
   const oldSection = document.getElementById(oldActiveSectionId);

   //used remove & add vs. toggle because the new section may be 
   //the same as the old section
   oldSection.classList.remove("your-active-class"); 
   clickedSection.classList.add("your-active-class");
};


function setActiveMenu (clickedSection) {
    const oldMenuItem = document.getElementById(`menu-${currentActiveSectionId}`);
    const newMenuItem = document.getElementById(`menu-${clickedSection.id}`);
 
console.log(oldMenuItem);
console.log(newMenuItem);

    //used remove & add vs. toggle because the new section may be 
    //the same as the old section
    oldMenuItem.classList.remove("menu__active"); 
    newMenuItem.classList.add("menu__active");
 };



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

function main() {
    // history reset - copied from Stackoverflow answer
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      };

    window.scrollTo(0,0);
     buildNav();
     setUpListeners();
}; 


// build the nav

function buildNav () {
   const listFragment = document.createDocumentFragment();

   for (const thisSection of sectionsArray) {
       const sectionTitle = thisSection.dataset.nav;
       const newNavItem = document.createElement('li');
       newNavItem.id=`menu-${thisSection.id}`;
       newNavItem.className="menu__link";
       newNavItem.innerHTML=`${sectionTitle}`;
       listFragment.appendChild(newNavItem);
   };
   navList.appendChild(listFragment);
};


// Scroll to section on link click
function scrollOnClick(evt) {
    const clickedSectionNumber = evt.target.textContent;
    clickedSection = document.querySelector(`section[data-nav="${clickedSectionNumber}"]`);
    clickedSection.scrollIntoView({behavior: "smooth"});
    setActiveSection(clickedSection);
    setActiveMenu(clickedSection);
    currentActiveSectionId = clickedSection.id;
};


// Scroll to section on window scroll
function scrollOnViewMove () {
    let newActiveSection = "section"+ whatSectionIsInViewport();
    console.log(newActiveSection);
    if (newActiveSection !== currentActiveSectionId) {
        setActiveSection(document.getElementById(newActiveSection));
    };
};

/// EVENT LISTENER SETUP

function setUpListeners () {
  // Listen for when the nav section gets a click (and scroll to that section)
    navList.addEventListener("click", scrollOnClick);
  // Listen for a scroll and see if we need to update the active section
    document.addEventListener("scroll", scrollOnViewMove);
}


main();