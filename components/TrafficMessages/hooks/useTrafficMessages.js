import useSWR from "swr";
import { API_URL } from "../../../constants";
import trafficService from "../../../services/trafficService";

export default function useTrafficMessages(config = {}) {
  const { data, error } = useSWR(API_URL, () => trafficService.getTrafficMessages(), {
    // default revalidate on mount, can be overridden by passing
    // {
    //  revalidateOnMount: false
    //}
    // to hook config
    revalidateOnMount: true,
    ...config,
  });

  return { data, error };
}
