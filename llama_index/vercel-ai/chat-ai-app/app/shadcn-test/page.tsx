import React from 'react';
import { Button } from "@/components/shadcn/button";

const ShadCNButtons = () => {
  return (
    <div className="shadcn-buttons flex gap-4 justify-center items-center p-5">
      <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Button 1</Button>
      <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Button 2</Button>
    </div>
  );
};

export default ShadCNButtons;