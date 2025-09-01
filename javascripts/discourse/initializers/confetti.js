import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  let confettiHandler; // To store the event listener function
  const allowedCategories = settings.allowed_in_categories.split("|");

  const allowedURLs = settings.allowed_in_urls.split("|");

  api.onPageChange((url) => {
    // Remove any existing confetti listener
    if (confettiHandler) {
      window.removeEventListener("click", confettiHandler);
      confettiHandler = null;
    }

    if (allowedCategories || allowedURLs) {
      let topicController;
      let topicModel;
      let categorySlug;

      if (url.includes("/t/")) {
        topicController = Discourse.__container__.lookup("controller:topic"); // eslint-disable-no-undef
        topicModel = topicController.get("model");
        categorySlug = topicModel.category_id;
      }

      if (
        (url.includes("/t/") &&
          allowedCategories.includes(categorySlug.toString())) ||
        allowedURLs.includes(url.split("?")[0])
      ) {
        // Define the handler to use for confetti
        confettiHandler = function (e) {
          let xpos = e.clientX;
          let ypos = e.clientY;
          window.confetti({
            particleCount: settings.confetti_amount,
            spread: settings.confetti_spread,
            origin: {
              y: ypos / window.innerHeight,
              x: xpos / window.innerWidth,
            },
          });
        };
        window.addEventListener("click", confettiHandler);
      }
    } else {
      // Confetti is used everywhere
      confettiHandler = function (e) {
        let xpos = e.clientX;
        let ypos = e.clientY;
        window.confetti({
          particleCount: settings.confetti_amount,
          spread: settings.confetti_spread,
          origin: {
            y: ypos / window.innerHeight,
            x: xpos / window.innerWidth,
          },
        });
      };
    }
    window.addEventListener("click", confettiHandler);
  });
});
