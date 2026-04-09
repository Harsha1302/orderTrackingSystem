import React from 'react';
import { Package, Archive, Truck, CheckCircle } from 'lucide-react';

const STAGES = ['Placed', 'Packed', 'Shipped', 'Delivered'];
const STAGE_ICONS = [Package, Archive, Truck, CheckCircle];

const ProgressTracker = ({ currentStatus }) => {
  const currentIndex = STAGES.indexOf(currentStatus);
  const progressPercentage = (currentIndex / (STAGES.length - 1)) * 100;

  return (
    <div className="tracker-container">
      <div 
        className="tracker-progress-line" 
        style={{ width: `calc(${progressPercentage}% - 20px)` }}
      />
      
      {STAGES.map((stage, index) => {
        const isCompleted = index <= currentIndex;
        const isActive = index === currentIndex;
        const Icon = STAGE_ICONS[index];

        let stepClass = 'tracker-step';
        if (isActive) stepClass += ' step-active';
        else if (isCompleted) stepClass += ' step-completed';

        return (
          <div key={stage} className={stepClass}>
            <div className="step-icon">
               <Icon size={16} />
            </div>
            <span className="step-label">{stage}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
