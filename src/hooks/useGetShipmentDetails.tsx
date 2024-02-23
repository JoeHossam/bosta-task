import { getShipmentDetails } from "@/api";
import { useQuery } from "@tanstack/react-query";

const useGetShipmentDetails = (shipmentNumber?: string) => {
  return useQuery({
    queryKey: ["shipmentNumber", shipmentNumber],
    queryFn: () => getShipmentDetails(shipmentNumber!),
    enabled: !!shipmentNumber,
  });
};

export default useGetShipmentDetails;
