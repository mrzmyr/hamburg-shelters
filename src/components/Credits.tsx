"use client";
import { Github } from "lucide-react";

export const Credits = () => {
  return (
    <div
      className="bg-white rounded-lg shadow px-3 py-2"
    >
      <div className="text-md text-gray-800">
        <a
          href="https://github.com/mrzmyr/hamburg-shelters"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-gray-800 hover:text-gray-900"
        >
          <Github size={17} className="mr-1" />
          GitHub
        </a>
      </div>
    </div>
  );
};
