/*
import Component from "@glimmer/component";
import { apiInitializer } from "discourse/lib/api";
//import { iconHTML } from "discourse-common/lib/icon-library";


export default apiInitializer("1.14.0", (api) => {
  api.onPageChange((url, title) => {
    const allowedCategories = settings.allowed_in.split('|'); // Assuming this is a list of slugs
    console.log(allowedCategories);
    if (allowedCategories) {
      if (url.includes('/t/')) { // Check if we're on a topic page
        const topicController = Discourse.__container__.lookup('controller:topic');
        const topicModel = topicController.get('model');
        const categorySlug = topicModel.category.slug; // Using slug for this example
        if (allowedCategories.includes(categorySlug.toString())) {
          api.renderInOutlet(
            'below-site-header',
            <template>
            <p>Confetti enabled</p>
            </template>
          );  
        }
      }
    }
  });
*/
});
