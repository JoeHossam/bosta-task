export const getShipmentDetails = async (shipmentNumber: string) => {
  const response = await fetch(
    `https://tracking.bosta.co/shipments/track/${shipmentNumber}`
  );
  if (!response.ok) throw response;
  const data = await response.json();
  return data as IGetShipmentDetails;
};

interface IGetShipmentDetails {
  provider: string;
  CurrentStatus: CurrentStatus;
  PromisedDate: string;
  TrackingNumber: string;
  TrackingURL: string;
  SupportPhoneNumbers: string[];
  TransitEvents: TransitEvent[];
  CreateDate: string;
  isEditableShipment: boolean;
  nextWorkingDay: NextWorkingDay[];
}

interface NextWorkingDay {
  dayDate: string;
  dayName: string;
}

interface TransitEvent {
  state: string;
  timestamp: string;
  hub?: string;
  reason?: string;
}

interface CurrentStatus {
  state: TDeliveryStatus;
  timestamp: string;
}

export type TDeliveryStatus = "DELIVERED" | "CANCELLED" | "DELIVERED_TO_SENDER";
