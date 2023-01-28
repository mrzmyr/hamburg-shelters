"use client";

export const Error = ({
  onClick,
}) => {
  return (
    <div className="shadow bg-red-100 border-red-400 text-red-700 px-3 py-2 mt-2 rounded max-w-xs" role="alert">
      <p>Something went wrong while fetching places. <a href="#" onClick={onClick} className="text-red-700 hover:text-red-900 font-medium underline">Reload</a></p>
    </div>
  );
};
