import { apiInitializer } from "discourse/lib/api";

// var script = document.createElement('script');
// script.src = "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
// document.head.appendChild(script);
  
let confettiHandler; // To store the event listener function

export default apiInitializer("1.14.0", (api) => {
  api.onPageChange((url, title) => {
    // Remove any existing confetti listener
    if (confettiHandler) {
      window.removeEventListener('click', confettiHandler);
      confettiHandler = null;
    }
  
    const allowedCategories = settings.allowed_in_categories.split('|'); // Assuming this is a list of slugs
    const allowedURLs = settings.allowed_in_urls.split('|');
    const confettiAmount = settings.confetti_amount; // Note: Removed interpolation syntax
    const confettiSpread = settings.confetti_spread; // Note: Removed interpolation syntax
    if (allowedCategories || allowedURLs) {
      const topicController;
      const topicModel
      const categorySlug;
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
        window.addEventListener('click', confettiHandler);
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
