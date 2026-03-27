import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import TotalBins    from './cards/TotalBins';
import BinsAbove90  from './cards/BinsAbove90';
import RouteDistance from './cards/RouteDistance';
import FuelSaved    from './cards/FuelSaved';
import AvgFillLevel from './cards/AvgFillLevel';
import VehicleType  from './cards/VehicleType';
import KPIDetailModal from './KPIDetailModal';

/* wrapper that adds click + pop animation to any card */
const ClickCard = ({ id, onClick, children }) => {
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    setPopping(true);
  setTimeout(() => { setPopping(false); onClick?.(id); }, 220);
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
  const [activeModal, setActiveModal] = useState(null);

  const totalBins  = analytics.totalBins ?? bins.length;
  const alertBins  = analytics.binsAbove90 ?? bins.filter(b => b.fillLevel >= 90).length;
  const normalBins = totalBins - alertBins;

  const modalData = {
    totalBins: { totalBins, normalBins, alertBins },
    binsAbove90: { alertCount: alertBins },
    routeDistance: { distance: analytics.routeDistance ?? 0, estimatedTime: analytics.estimatedTime ?? '--' },
    fuelSaved: { percentage: analytics.fuelSaved ?? 0 },
    avgFillLevel: { fillLevel: analytics.avgFillLevel ?? 0 },
    vehicleType: { evPercentage: analytics.evPercentage ?? 0 },
  };

  const open = useCallback((id) => setActiveModal(id), []);
  const close = useCallback(() => setActiveModal(null), []);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <ClickCard id="totalBins" onClick={open}><TotalBins totalBins={totalBins} normalBins={normalBins} alertBins={alertBins}/></ClickCard>
        <ClickCard id="binsAbove90" onClick={open}><BinsAbove90 alertCount={alertBins} sinceYesterday={0}/></ClickCard>
        <ClickCard id="routeDistance" onClick={open}><RouteDistance distance={analytics.routeDistance ?? 0} estimatedTime={analytics.estimatedTime ?? '--'}/></ClickCard>
        <ClickCard id="fuelSaved" onClick={open}><FuelSaved percentage={analytics.fuelSaved ?? 0}/></ClickCard>
        <ClickCard id="avgFillLevel" onClick={open}><AvgFillLevel fillLevel={analytics.avgFillLevel ?? 0}/></ClickCard>
        <ClickCard id="vehicleType" onClick={open}><VehicleType evPercentage={analytics.evPercentage ?? 0}/></ClickCard>
      </div>

      {activeModal && createPortal(
        <KPIDetailModal
          type={activeModal}
          data={modalData[activeModal]}
          onClose={close}
        />,
        document.body
      )}
    </>
  );
};

export default KPIMetrics;
