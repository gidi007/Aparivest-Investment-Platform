import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51Q8HExEnDFNvl25BxD2woy1XCuAtbptS4aA7dURZcg6ZffeCt84rTjoQQ5qLT6yCBfqi4uJFDmhzQGeL6PCO7fKp00RHrhxNaX");

const StripeProvider = ({ children }) => (
    <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeProvider;
