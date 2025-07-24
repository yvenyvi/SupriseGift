document.addEventListener("DOMContentLoaded", function () {
  // Hide preloader after page load
  window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add("fade-out");
        setTimeout(function() {
          preloader.style.display = "none";
        }, 500);
      }, 1000);
    }
  });
  
  let currentPage = 0;
  const pages = document.querySelectorAll(".page");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const totalPages = pages.length;
  
  // Initialize the book
  updatePageVisibility();
  updateButtonStatus();
  
  // Navigation event listeners
  prevButton.addEventListener("click", goToPrevPage);
  nextButton.addEventListener("click", goToNextPage);
  
  // Initialize TOC click events
  initTOCEvents();
  
  // Initialize clock and day counter
  initClock();
  initDayCounter();
  
  // Initialize slideshow
  initPhotoSlideshow();
    // Personalization panel has been removed
  
  // Initialize surprise button
  initSurpriseModal();

  // Page navigation functions
  function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      // First, unflip all pages
      pages.forEach((page, index) => {
        if (index < pageIndex) {
          page.classList.add("flipped");
        } else {
          page.classList.remove("flipped");
        }
      });
      
      currentPage = pageIndex;
      updatePageVisibility();
      updateButtonStatus();
    }
  }
  
  function goToNextPage() {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  }
  
  function goToPrevPage() {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }
  
  function updatePageVisibility() {
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
  }
  
  function updateButtonStatus() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;
  }
  
  // Table of Contents click events
  function initTOCEvents() {
    const tocItems = document.querySelectorAll(".toc-item");
    tocItems.forEach(item => {
      item.addEventListener("click", function() {
        const targetPage = parseInt(this.getAttribute("data-page"));
        goToPage(targetPage);
      });
    });
  }
  
  // Digital Clock function - Showing elapsed time since July 27, 2022 in HH:MM:SS format
  function initClock() {
    const clockElement = document.querySelector(".digital-clock .time");
    if (clockElement) {
      updateClock();
      setInterval(updateClock, 1000);
    }
    
    function updateClock() {
      const startDate = new Date("2022-07-27T00:00:00"); // July 27, 2022 at midnight
      const now = new Date();
      
      // Calculate the difference in milliseconds
      const diffTime = Math.abs(now - startDate);
      
      // Calculate hours, minutes, and seconds
      const totalSeconds = Math.floor(diffTime / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      
      // Calculate remaining minutes and seconds
      const remainingMinutes = totalMinutes % 60;
      const remainingSeconds = totalSeconds % 60;
      
      // Format with leading zeros for minutes and seconds
      const formattedHours = totalHours.toLocaleString(); // With thousands separator
      const formattedMinutes = String(remainingMinutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      
      // Create the time string
      const timeString = `${formattedHours}<span class="colon">:</span>${formattedMinutes}<span class="colon">:</span>${formattedSeconds}`;
      
      // Apply a subtle highlight effect when the display changes
      if (clockElement.innerHTML !== timeString) {
        // Highlight only on hour changes
        if (!clockElement.innerHTML.includes(formattedHours)) {
          clockElement.classList.add('hour-changed');
          setTimeout(() => {
            clockElement.classList.remove('hour-changed');
          }, 1000);
        }
      }
      
      clockElement.innerHTML = timeString;
    }
  }
  
  // Day counter function
  function initDayCounter() {
    const dayCountElement = document.querySelector(".days-count");
    if (dayCountElement) {
      const startDate = new Date("2022-07-27"); // Format: YYYY-MM-DD
      const today = new Date();
      
      // Calculate the difference in milliseconds
      const diffTime = Math.abs(today - startDate);
      
      // Convert to days
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // Update the element
      dayCountElement.textContent = diffDays;
    }
  }
  
  // Surprise Modal functions
  function initSurpriseModal() {
    const surpriseButton = document.querySelector(".surprise-button");
    const modalOverlay = document.querySelector(".modal-overlay");
    const closeButton = document.querySelector(".modal-close");
    const modal = document.querySelector(".surprise-modal");
    
    if (surpriseButton && modalOverlay) {
      surpriseButton.addEventListener("click", function() {
        modalOverlay.classList.add("active");
        
        // Create flying hearts animation
        createFlyingHearts();
      });
      
      closeButton.addEventListener("click", function() {
        modalOverlay.classList.remove("active");
      });
      
      modalOverlay.addEventListener("click", function(e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove("active");
        }
      });
    }
  }
  
  function createFlyingHearts() {
    const heartsContainer = document.querySelector(".flying-hearts");
    if (!heartsContainer) return;
    
    // Clear previous hearts
    heartsContainer.innerHTML = "";
    
    // Create new hearts
    const numberOfHearts = 25;
    
    for (let i = 0; i < numberOfHearts; i++) {
      const heart = document.createElement("div");
      heart.innerHTML = "❤";
      heart.className = "heart-particle";
      
      // Random position, size, and animation delay
      const size = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2
      const left = Math.random() * 100; // Random position from 0% to 100%
      const animationDelay = Math.random() * 4; // Random delay up to 4s
      
      heart.style.fontSize = `${size}em`;
      heart.style.left = `${left}%`;
      heart.style.bottom = "0";
      heart.style.animationDelay = `${animationDelay}s`;
      
      heartsContainer.appendChild(heart);
    }
  }
  
  // Photo Slideshow function
  function initPhotoSlideshow() {
    const slideshow = document.getElementById("slideshow");
    const slideshowNav = document.getElementById("slideshow-nav");
    const prevButton = document.getElementById("slideshow-prev");
    const nextButton = document.getElementById("slideshow-next");
    
    if (!slideshow || !slideshowNav) return;
    
    // List of all images for the slideshow
    const images = [
      "assets/images/072722.jpg",
      "assets/images/firstPic.jpg",
      "assets/images/gradPic.jpg",
      "assets/images/image1.jpeg",
      "assets/images/image2.jpg",
      "assets/images/image3.jpeg",
      "assets/images/mylove.jpg",
      "assets/images/trinoma.jpg"
    ];
    
    let currentSlide = 0;
    
    // Create slides
    images.forEach((image, index) => {
      // Create slide
      const slide = document.createElement("div");
      slide.className = "slide";
      
      // Create image
      const img = document.createElement("img");
      img.src = image;
      img.alt = `Our memory ${index + 1}`;
      
      // Add image title
      const title = document.createElement("div");
      title.className = "slide-caption";
      title.textContent = `Memory #${index + 1}`;
      
      // Add image to slide
      slide.appendChild(img);
      slide.appendChild(title);
      
      // Add slide to slideshow
      slideshow.appendChild(slide);
      
      // Create dot for navigation
      const dot = document.createElement("div");
      dot.className = "slideshow-dot";
      if (index === 0) dot.classList.add("active");
      
      // Add click event to dot
      dot.addEventListener("click", () => {
        goToSlide(index);
      });
      
      // Add dot to navigation
      slideshowNav.appendChild(dot);
    });
    
    // Add click event to prev/next buttons
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
      });
    }
    
    // Auto-play slideshow
    const slideshowInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
    
    // Stop auto-play on hover
    slideshow.addEventListener("mouseenter", () => {
      clearInterval(slideshowInterval);
    });
    
    // Function to go to a specific slide
    function goToSlide(index) {
      // Handle wrapping
      if (index < 0) {
        index = images.length - 1;
      } else if (index >= images.length) {
        index = 0;
      }
      
      // Update current slide
      currentSlide = index;
      
      // Update slideshow transform
      slideshow.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      const dots = slideshowNav.querySelectorAll(".slideshow-dot");
      dots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }
    // Personalization panel functionality has been removed
});
