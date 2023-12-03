import { CircuitBreaker } from "./service/circuitBreaker";
import { BreakerOptions } from "./service/options";

// with default config
const breaker1 = new CircuitBreaker({
  method: "get",
  url: "http://localhost:3000",
});

setInterval(() => {
    breaker1.exec().then(console.log).catch(console.error);
}, 1000);

// with option config
const breaker2 = new CircuitBreaker({
    method: "get",
    url: "http://localhost:3000",
  }, new BreakerOptions(5,6, 5000));
  
  setInterval(() => {
      breaker1.exec().then(console.log).catch(console.error);
  }, 1000);