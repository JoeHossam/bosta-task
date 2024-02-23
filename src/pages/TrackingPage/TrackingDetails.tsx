import { format } from "date-fns";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { arEG, enAU } from "date-fns/locale";
import { useParams } from "react-router-dom";
import useGetShipmentDetails from "@/hooks/useGetShipmentDetails";
import LoadingSpinner from "@/assets/icons/spinner";

const TrackingDetails = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-2xl mb-5">{t("SHIPMENT_DETAILS")}</h2>
      <DetailsTable />
    </div>
  );
};

const DetailsTable = () => {
  const { shipmentNumber } = useParams<{ shipmentNumber: string }>();
  const { data, isLoading, isError } = useGetShipmentDetails(shipmentNumber);
  const { t, i18n } = useTranslation();

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
    <table className="table-fixed w-full rounded-md p-1 overflow-hidden">
      <thead className="bg-gray-100">
        <tr className="border">
          <TableCell className="text-muted-foreground font-semibold">
            {t("BRANCH")}
          </TableCell>
          <TableCell className="text-muted-foreground font-semibold">
            {t("DATE")}
          </TableCell>
          <TableCell className="text-muted-foreground font-semibold">
            {t("TIME")}
          </TableCell>
          <TableCell className="text-muted-foreground font-semibold">
            {t("DETAILS")}
          </TableCell>
        </tr>
      </thead>
      <tbody>
        {data.TransitEvents.map((event, idx) => (
          <tr key={idx} className="border">
            <TableCell>مدينة نصر</TableCell>
            <TableCell>
              {format(event.timestamp, "dd/MM/yyyy", {
                locale: i18n.language === "ar" ? arEG : enAU,
              })}
            </TableCell>
            <TableCell>
              {format(event.timestamp, "hh:mm a", {
                locale: i18n.language === "ar" ? arEG : enAU,
              })}
            </TableCell>
            <TableCell>{t(event.state)}</TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => (
  <td ref={ref} className={`table-cell px-6 py-4 ${props.className}`}>
    {props.children}
  </td>
));

export default TrackingDetails;
