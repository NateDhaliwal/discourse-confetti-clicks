import { apiInitializer } from "discourse/lib/api";
import { tracked } from "@glimmer/tracking";

// var script = document.createElement('script');
// script.src = "https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js";
// document.head.appendChild(script);

export default apiInitializer((api) => {
  let confettiHandler; // To store the event listener function
  const allowedCategories = settings.allowed_in_categories.split('|');
  console.log(allowedCategories);
  const allowedURLs = settings.allowed_in_urls.split('|').forEach((u) => {
    u = u.split('?')[0];
  });
  
  console.log(allowedURLs);
  const confettiAmount = settings.confetti_amount;
  const confettiSpread = settings.confetti_spread;
  
  api.onPageChange((url, title) => {
    console.log(url);
    console.log(title);
    // Remove any existing confetti listener
    if (confettiHandler) {
      window.removeEventListener('click', confettiHandler);
      confettiHandler = null;
    }
    
    if (allowedCategories || allowedURLs) {
      console.log("a b");
      let topicController;
      let topicModel;
      let categorySlug;
      
      if (url.includes('/t/')) {
        console.log("topic");
        topicController = Discourse.__container__.lookup('controller:topic');
        topicModel = topicController.get('model');
        categorySlug = topicModel.category_id;
      }
      
      if (
        (
          url.includes('/t/')
          &&
          allowedCategories.includes(categorySlug.toString())
        ) ||
        (
          allowedURLs.includes(url)
        )
      ) {
        console.log("ab!");
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
        console.log("!");
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
