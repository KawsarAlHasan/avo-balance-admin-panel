import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API } from "./api";

export const useAllUsers = ({ page = 1, limit = 20, search = "" }) => {
  const getData = async () => {
    const response = await API.get("/accounts/users/", {
      params: {
        page: page,
        page_size: limit,
        search: search,
      },
    });

    return response.data;
  };

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", page, limit, search],
    queryFn: getData,
  });

  return { allUsers, isLoading, isError, error, refetch };
};

export const useAllAdmins = () => {
  const getData = async () => {
    const response = await API.get("/accounts/admin/?role=ADMIN,OWNER");

    return response.data;
  };

  const {
    data: allAdmins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: getData,
  });

  return { allAdmins, isLoading, isError, error, refetch };
};
