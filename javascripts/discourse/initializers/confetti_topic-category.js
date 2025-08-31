import { apiInitializer } from "discourse/lib/api";
import { tracked } from "@glimmer/tracking";

// var script = document.createElement('script');
// script.src = "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
// document.head.appendChild(script);

export default apiInitializer("1.14.0", (api) => {
  @tracked confettiHandler; // To store the event listener function
  
  api.onPageChange((url, title) => {
    // Remove any existing confetti listener
    if (this.confettiHandler) {
      window.removeEventListener('click', this.confettiHandler);
      this.confettiHandler = null;
    }
  
    allowedCategories = settings.allowed_in_categories.split('|');
    allowedURLs = settings.allowed_in_urls.split('|');
    confettiAmount = settings.confetti_amount;
    confettiSpread = settings.confetti_spread;
    
    if (allowedCategories || allowedURLs) {
      topicController;
      topicModel
      categorySlug;
      if (url.includes('/t/')) {
        this.topicController = Discourse.__container__.lookup('controller:topic');
        this.topicModel; = this.topicController.get('model');
        this.categorySlug; = this.topicModel.category_id;
      }
      
      if ((url.includes('/t/') && this.allowedCategories.includes(this.categorySlug.toString())) || (this.allowedURLs.includes(url)) {
        // Define the handler to use for confetti
        this.confettiHandler = function (e) {
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
        this.confettiHandler = function (e) {
          let xpos = e.clientX;
          let ypos = e.clientY;
          window.confetti({
            particleCount: settings.confetti_amount,
            spread: settings.confetti_spread,
            origin: { y: ypos / window.innerHeight , x: xpos / window.innerWidth },
          });
        };
      }
      window.addEventListener('click', this.confettiHandler);
  });
});
