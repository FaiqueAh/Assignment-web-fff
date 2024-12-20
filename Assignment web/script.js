document.addEventListener('DOMContentLoaded', () => {
  // Hamburger Menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-item');
  const totalSlides = slides.length;

  const prevButtonCarousel = document.querySelector('.carousel-prev');
  const nextButtonCarousel = document.querySelector('.carousel-next');

  function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;

    const offset = -currentSlide * 100;
    const carouselImages = document.querySelector('.carousel-images'); 

    if (carouselImages) {
      carouselImages.style.transform = `translateX(${offset}%)`;
    }
  }

  
  if (prevButtonCarousel) {
    prevButtonCarousel.addEventListener('click', () => {
      currentSlide--;
      showSlide(currentSlide);
    });
  }

  if (nextButtonCarousel) {
    nextButtonCarousel.addEventListener('click', () => {
      currentSlide++;
      showSlide(currentSlide);
    });
  }

  // Auto Slide
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000);

  
  // Image Gallery Lightbox
  const galleryImages = document.querySelectorAll('.image-item img, .about-image img');

  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    lightbox.innerHTML = `
      <span class="close">&times;</span>
      <img src="" alt="Lightbox Image">
      <button class="prev">&#10094;</button>
      <button class="next">&#10095;</button>
    `;

    const lightboxImage = lightbox.querySelector('img');
    const closeButton = lightbox.querySelector('.close');
    const prevButtonLightbox = lightbox.querySelector('.prev'); 
    const nextButtonLightbox = lightbox.querySelector('.next'); 

    let currentIndex = 0;

    galleryImages.forEach((image, index) => {
      image.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.style.display = 'flex';
      });
    });

    function showImage(index) {
      const imageSrc = galleryImages[index]?.src;
      if (imageSrc) {
        lightboxImage.src = imageSrc;
      }
    }

    closeButton.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    prevButtonLightbox.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentIndex);
    });

    nextButtonLightbox.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // Timeline Lightbox Functionality
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineLightbox = document.getElementById('timeline-lightbox');
  const lightboxYear = document.getElementById('lightbox-year');
  const lightboxDetails = document.getElementById('lightbox-details');
  const lightboxClose = document.querySelector('.lightbox-timeline .close');

  if (!timelineLightbox || !lightboxYear || !lightboxDetails || !lightboxClose) {
    console.error('Required elements are missing in the DOM.');
    return; 
  }

  // Open Lightbox on Timeline Item Click
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      const year = item.getAttribute('data-year');
      const details = item.querySelector('.timeline-content').getAttribute('data-details');
      lightboxYear.textContent = year;
      lightboxDetails.textContent = details;
      timelineLightbox.style.display = 'flex';
    });
  });

  // Close Lightbox
  lightboxClose.addEventListener('click', () => {
    timelineLightbox.style.display = 'none';
  });

  // Close Lightbox on Outside Click
  timelineLightbox.addEventListener('click', (e) => {
    if (e.target === timelineLightbox) {
      timelineLightbox.style.display = 'none';
    }
  });
});




 

