"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const error = () => {
  return (
    <div className="flex h-[calc(88vh-2rem)] w-full flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="relative flex items-center justify-center">
          <h1 className="text-[350px] text-muted/20 font-bold select-none tracking-widest">
            505
          </h1>
          <img
            src="/error.svg"
            alt="Server Error Illustration"
            className="absolute bottom-4 h-104 w-104 object-contain"
          />
        </div>
        <div className="flex flex-col gap-2.5 justify-center items-center">
          <h1 className="text-2xl font-semibold">Internal Server Error</h1>
          <p className="w-max-sm text-center text-muted-foreground">
            The server encountered an internal error and was unable to complete
            your request.
          </p>
          <Button
            variant="default"
            onClick={() => window.location.reload()}
            className="hover:cursor-pointer"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default error;
