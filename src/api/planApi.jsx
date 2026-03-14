import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useAllPlans = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get("/accounts/plans/");

    return response.data;
  };

  const {
    data: allPlans = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allPlans", page, limit],
    queryFn: getData,
  });

  return { allPlans, isLoading, isError, error, refetch };
};
