import { useState } from 'react';
import TotalBins    from './cards/TotalBins';
import BinsAbove90  from './cards/BinsAbove90';
import RouteDistance from './cards/RouteDistance';
import FuelSaved    from './cards/FuelSaved';
import AvgFillLevel from './cards/AvgFillLevel';
import VehicleType  from './cards/VehicleType';

/* wrapper that adds click + pop animation to any card */
const ClickCard = ({ children }) => {
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    setPopping(true);
    setTimeout(() => { setPopping(false); }, 220);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer rounded-xl transition-shadow hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150 ${popping ? 'kpi-card-click' : ''}`}
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
};

const KPIMetrics = ({ bins = [], analytics = {} }) => {
  const totalBins  = analytics.totalBins ?? bins.length;
  const alertBins  = analytics.binsAbove90 ?? bins.filter(b => b.fillLevel >= 90).length;
  const normalBins = totalBins - alertBins;

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <ClickCard><TotalBins totalBins={totalBins} normalBins={normalBins} alertBins={alertBins}/></ClickCard>
        <ClickCard><BinsAbove90 alertCount={analytics.binsAbove90 ?? 0} sinceYesterday={0}/></ClickCard>
        <ClickCard><RouteDistance distance={analytics.routeDistance ?? 0} estimatedTime={analytics.estimatedTime ?? '--'}/></ClickCard>
        <ClickCard><FuelSaved percentage={analytics.fuelSaved ?? 0}/></ClickCard>
        <ClickCard><AvgFillLevel fillLevel={analytics.avgFillLevel ?? 0}/></ClickCard>
        <ClickCard><VehicleType evPercentage={analytics.evPercentage ?? 0}/></ClickCard>
      </div>
    </>
  );
};

export default KPIMetrics;
