import React from 'react';
import { Header } from '@/components/Header';
import { AIInsightsPanel } from '@/components/registry/AIInsightsPanel';

const PhenOMInsights = () => {
  return (
    <div className="flex flex-col h-full">
      <Header title="PhenOM Insights" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="pl-8 pr-4 py-6 space-y-6">
          {/* Page Description */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#003f7f]">PhenOM Insights</h2>
            <p className="text-muted-foreground">
              AI-powered healthcare intelligence and predictive analytics
            </p>
          </div>

          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
};

export default PhenOMInsights;