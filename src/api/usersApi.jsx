import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAllUsers = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await axios.get("/users.json");

    return response.data;
  };

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", page, limit],
    queryFn: getData,
  });

  return { allUsers, isLoading, isError, error, refetch };
};

export const useAllAdmins = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await axios.get("/admins.json");

    return response.data;
  };

  const {
    data: allAdmins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAdmins", page, limit],
    queryFn: getData,
  });

  return { allAdmins, isLoading, isError, error, refetch };
};
