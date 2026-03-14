import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useSettings = () => {
  const getData = async () => {
    const response = await API.get("/accounts/openai-key/");

    return response.data.api_key;
  };

  const {
    data: openAi = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["openAi"],
    queryFn: getData,
  });

  return { openAi, isLoading, isError, error, refetch };
};
