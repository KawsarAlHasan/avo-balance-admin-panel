import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllPlans = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await axios.get("/plans.json");

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
