import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllPayments = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await axios.get("/payment.json");

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
