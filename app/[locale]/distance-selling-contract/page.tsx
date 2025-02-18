import PageContainer from "@/components/Containers/PageContainer";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {t("DistanceSellingContract.contractTitle")}
      </h1>
      <p className="text-base text-gray-600 mb-6">
        {t("DistanceSellingContract.contractText1")}
      </p>
      <p className="text-base text-gray-600 mb-6">
        {t("DistanceSellingContract.contractText2")}
      </p>

      <div className="space-y-6">
        {/* Seller Information */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.SellerInformation.title")}
          </h2>
          <p>
            <strong>
              {t("DistanceSellingContract.SellerInformation.appellation")}:{" "}
            </strong>
            {t("DistanceSellingContract.SellerInformation.companyName")}
          </p>
          <p>
            <strong>
              {t("DistanceSellingContract.SellerInformation.Address")}:{" "}
            </strong>
            {t("DistanceSellingContract.SellerInformation.companyAddress")}
          </p>
          <p>
            <strong>
              {t("DistanceSellingContract.SellerInformation.phone")}:{" "}
            </strong>
            {t("DistanceSellingContract.SellerInformation.phoneNumber")}
          </p>
          <p>
            <strong>
              {t("DistanceSellingContract.SellerInformation.email")}:{" "}
            </strong>
            {t("DistanceSellingContract.SellerInformation.emailAddress")}
          </p>
        </div>

        {/* Buyer Information */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.BuyerInformation.title")}
          </h2>
          <p>{t("DistanceSellingContract.BuyerInformation.text")}</p>
        </div>

        {/* Contract and Subject */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.ContractAndSubject.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.ContractAndSubject.text")}
          </p>
        </div>

        {/* General Provisions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.GeneralProvisions.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.GeneralProvisions.text")}
          </p>
        </div>

        {/* Right of Withdrawal */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.RightOfWithdrawal.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.RightOfWithdrawal.text")}
          </p>
        </div>

        {/* Right of Withdrawal Exceptions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.RightOfWithdrawalExceptions.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.RightOfWithdrawalExceptions.text")}
          </p>
        </div>

        {/* Exceptions */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.Exceptions.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.Exceptions.text")}
          </p>
        </div>

        {/* Payments and Shipping */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.PaymentsAndShipping.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.PaymentsAndShipping.text")}
          </p>
        </div>

        {/* Jurisdiction */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">
            {t("DistanceSellingContract.Jurisdiction.title")}
          </h2>
          <p className="text-sm text-gray-500">
            {t("DistanceSellingContract.Jurisdiction.text")}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
