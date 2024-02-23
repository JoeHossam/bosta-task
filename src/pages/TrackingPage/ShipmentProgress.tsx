import { TDeliveryStatus, getShipmentDetails } from "@/api";
import { Spinner as LoadingSpinner } from "@/assets/icons";
import ProgressStageManager from "@/components/ProgressStageManager";
import { useQuery } from "@tanstack/react-query";
import { Store, Truck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { arEG, enAU } from "date-fns/locale";

const ShipmentProgress = () => {
  const { shipmentNumber } = useParams<{ shipmentNumber: string }>();
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shipmentNumber", shipmentNumber],
    queryFn: () => getShipmentDetails(shipmentNumber!),
    enabled: !!shipmentNumber,
  });

  if (!shipmentNumber) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl">
        {t("PLEASE_ADD_SHIPMENT_NUMBER")}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <div>{t("SOMETHING_WENT_WRONG")}</div>;
  }

  return (
    <section className="border rounded-xl">
      <div className="grid grid-cols-2 gap-5 md:gap-0 md:grid-cols-4 justify-between p-8 border-b ">
        <InfoItem header="SHIPMENT_NUMBER">{data.TrackingNumber}</InfoItem>
        <InfoItem header="LAST_UPDATE">
          {format(
            new Date(data.CurrentStatus.timestamp),
            "EEEE dd MMMM yyyy, hh:mm a",
            {
              locale: i18n.language === "ar" ? arEG : enAU,
            }
          )}
        </InfoItem>
        <InfoItem header="RETAILER">{data.provider}</InfoItem>
        <InfoItem header="DELIVERY_TIME_IN">
          {format(new Date(data.PromisedDate), "dd MMMM yyyy", {
            locale: i18n.language === "ar" ? arEG : enAU,
          })}
        </InfoItem>
      </div>
      <div className="p-8">
        <ProgressDetails status={data.CurrentStatus.state} />
      </div>
    </section>
  );
};

const InfoItem = (props: { header: string; children: React.ReactNode }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground font-light text-sm">
        {t(props.header)}
      </div>
      <p className="text-xl">{props.children}</p>
    </div>
  );
};

const ProgressDetails = ({ status }: { status: TDeliveryStatus }) => {
  const { t } = useTranslation();
  return (
    <>
      <ProgressStageManager
        // assuming if delivered then its complete
        activeIdx={status === "DELIVERED_TO_SENDER" ? 3 : 2}
        color={
          status === "DELIVERED_TO_SENDER"
            ? "bg-green-500"
            : status === "CANCELLED"
            ? "bg-red-500"
            : "bg-yellow-500"
        }
        stages={[
          {
            icon: Truck,
            children: <span>{t("CREATED_SHIPMENT")}</span>,
          },
          {
            icon: Truck,
            children: <span>{t("RECEIVED_SHIPMENT_FROM_RETAILER")}</span>,
          },
          {
            icon: Truck,
            children: <span>{t("SHIPMENT_OUT_FOR_DELIVERY")}</span>,
          },
          {
            icon: Store,
            children: <span>{t("SHIPMENT_DELIVERED")}</span>,
          },
        ]}
      />
    </>
  );
};

export default ShipmentProgress;
