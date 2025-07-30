import { Player } from "@lottiefiles/react-lottie-player";
import LoaderAnimation from "../assets/Loading animation blue.json";

export default function NotFound() {
  return (
       <Player loop autoplay src={LoaderAnimation} className="animate-pulse min-h-10 min-w-10"/>
  );
}
