import Image from "next/image";
import ErrorFetchingData from "../common/ErrorFetchingData";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";

const ProjectNotFound = ({
  refetch,
  error,
}: {
  refetch: () => Promise<void>;
  error?: any;
}) => {
  useEffect(() => {
    if (error) {
      toast({ title: error.message, variant: "error" });
    }
  }, []);
  return (
    <div>
      <Image
        src="/team/colab.svg"
        alt="profile-page-image"
        width={531}
        height={108}
        className="mx-auto h-auto w-full max-w-sm"
      />
      <div className="flex flex-col items-center">
        <div className="mt-6 text-2xl">Oops!</div>
        <ErrorFetchingData refetch={refetch} />
      </div>
    </div>
  );
};

export default ProjectNotFound;
