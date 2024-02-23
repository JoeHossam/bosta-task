import AddressInfo from "./AddressInfo";
import TrackingDetails from "./TrackingDetails";
import ShipmentProgress from "./ShipmentProgress";

const TrackingPage = () => {
  return (
    <>
      <ShipmentProgress />
      <section className="flex gap-5 flex-col md:flex-row mt-5">
        <TrackingDetails />
        <AddressInfo />
      </section>
    </>
  );
};

export default TrackingPage;
