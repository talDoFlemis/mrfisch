import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) =>
  axios
    .get(url)
    .then((r) => r.data)
    .catch((err) => {
      throw err;
    });

export const useQuery = <T>(
  url: string | null,
  revalidateOnFocus?: boolean
) => {
  return useSWR<T>(url ? url : null, fetcher, {
    revalidateOnFocus: revalidateOnFocus ?? true,
  });
};
