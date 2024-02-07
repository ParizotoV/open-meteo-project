import React from "react";
import { Loader2 } from "lucide-react";

const Loader: React.FC = () => {
  return (
    <span className="flex flex-col h-full text-white text-2xl flex justify-center items-center">
      <Loader2 data-testid="loader-svg" className="animate-spin" width={50} height={50} />
      <span>Loading...</span>
    </span>
  );
};

export default Loader;
