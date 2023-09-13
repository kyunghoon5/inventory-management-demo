
import TrackingUI from '../../../components/ui/TrackingUI';

const Trackingall= () => {

  return (
    <div className="p-8 pt-0 ">
      <div className="text-lg font-bold pb-8 ">All Tracking</div>
      <TrackingUI dashbordValue={10} vendorName='all' onCell='on'/>
    </div>
  );
};

export default Trackingall;
