import { Player } from "@lottiefiles/react-lottie-player";
import emptyAnimation from "../assets/empty.json";

export default function EmptyState({ message = "Nothing to display here." }) {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-10 text-center text-slate-500">
      <Player
        autoplay
        loop
        src={emptyAnimation}
        className="w-80 h-80"
      />
      <p className="mt-4 text-lg font-semibold">{message}</p>
    </div>
  );
}