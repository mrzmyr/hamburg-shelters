"use client";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export const Loading = ({
  isLoading,
}) => {
  return (
    <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-black transition-all ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
      <LoadingIndicator />
    </div>
  );
};
