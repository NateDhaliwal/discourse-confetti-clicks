import Component from "@glimmer/component";
import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  try {
    api.renderInOutlet(
      'above-site-header',
      class confetticlicks extends Component {
        get confettiSpread() {
          return settings.confetti_spread;
        }
        get confettiAmount() {
          return settings.confetti_amount;
        }
        <template>
          <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js"></script>
          <script>
            alert('hi');
            window.addEventListener('click', function (e) {
            let xpos = e.clientX;
            let ypos = e.clientY;
            confetti({
              particleCount: {{this.confettiAmount}},
              spread: {{this.confettiSpread}},
              origin: { y: ypos/window.innerHeight , x: xpos/window.innerWidth },
            });
          });
          </script>
        <h1>{{this.confettiAmount}}</h1>
        </template>
      } 
    );
  } catch (e) {
    console.log(e);
  }
});
