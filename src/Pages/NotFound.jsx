import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import NotFoundAnimation from "../assets/404 Animation.json";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
       <Player loop autoPlay src={NotFoundAnimation} className="w-full min-h-[50dvh] animate-pulse"/>
       <Link to={-1} className="px-5 py-2 rounded dark:text-white font-bold bg-accent">Go Back</Link>
    </div>
  );
}
