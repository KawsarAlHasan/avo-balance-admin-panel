import { useQuery } from "@tanstack/react-query";
import { API } from "./api";

export const useAllPayments = ({ page = 1, limit = 50 }) => {
  const getData = async () => {
    const response = await API.get(`/accounts/subscriptions?page=${page}&page_size=${limit}`);

    return response.data;
  };

  const {
    data: allPayments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allPayments", page, limit],
    queryFn: getData,
  });

  return { allPayments, isLoading, isError, error, refetch };
};
