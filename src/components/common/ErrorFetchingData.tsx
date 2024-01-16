import React from "react";

const ErrorFetchingData = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="text-sm font-medium text-destructive">
      Error fetching data,{" "}
      <button className="underline" onClick={refetch}>
        try again
      </button>
      .
    </div>
  );
};

export default ErrorFetchingData;
