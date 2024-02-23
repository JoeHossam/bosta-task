import { MailQuestion } from "lucide-react";
import { useTranslation } from "react-i18next";

const AddressInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="mb-2">
      <h2 className="text-2xl mb-5">{t("ADDRESS_INFO")}</h2>
      <div className="border p-5 mb-3 rounded bg-secondary">
        امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22 cairo
      </div>

      <div className="border p-5 rounded">
        <div className="flex gap-5">
          <MailQuestion size={50} />
          <div>
            {t("PROBLEM_IN_SHIPMENT")}
            <button className="bg-red-600 text-white mt-2 p-2 rounded-lg">
              {t("REPORT_PROBLEM")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
