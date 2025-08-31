import { apiInitializer } from "discourse/lib/api";
import { tracked } from "@glimmer/tracking";

// var script = document.createElement('script');
// script.src = "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
// document.head.appendChild(script);

export default apiInitializer((api) => {
  const confettiHandler; // To store the event listener function
  const allowedCategories = settings.allowed_in_categories.split('|');
  const allowedURLs = settings.allowed_in_urls.split('|');
  const confettiAmount = settings.confetti_amount;
  const confettiSpread = settings.confetti_spread;
  
  api.onPageChange((url, title) => {
    // Remove any existing confetti listener
    if (confettiHandler) {
      window.removeEventListener('click', confettiHandler);
      confettiHandler = null;
    }
    
    if (allowedCategories || allowedURLs) {
      let topicController;
      let topicModel;
      let categorySlug;
      if (url.includes('/t/')) {
        topicController = Discourse.__container__.lookup('controller:topic');
        topicModel; = topicController.get('model');
        categorySlug; = topicModel.category_id;
      }
      
      if ((url.includes('/t/') && allowedCategories.includes(categorySlug.toString())) || (allowedURLs.includes(url)) {
        // Define the handler to use for confetti
        confettiHandler = function (e) {
          let xpos = e.clientX;
          let ypos = e.clientY;
          window.confetti({
            particleCount: settings.confetti_amount,
            spread: settings.confetti_spread,
            origin: { y: ypos / window.innerHeight , x: xpos / window.innerWidth },
          });
        };
        window.addEventListener('click', this.confettiHandler);
      }
    } else {
        // Confetti is used everywhere
        confettiHandler = function (e) {
          let xpos = e.clientX;
          let ypos = e.clientY;
          window.confetti({
            particleCount: settings.confetti_amount,
            spread: settings.confetti_spread,
            origin: { y: ypos / window.innerHeight , x: xpos / window.innerWidth },
          });
        };
      }
      window.addEventListener('click', confettiHandler);
  });
});
