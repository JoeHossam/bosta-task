import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
        {Array.from({ length: 10 })
          .fill(0)
          .map((_, idx) => (
            <tr key={idx} className="border">
              <TableCell>مدينة نصر</TableCell>
              <TableCell>{idx}</TableCell>
              <TableCell>11</TableCell>
              <TableCell>11</TableCell>
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
