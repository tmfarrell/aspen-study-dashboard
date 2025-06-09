
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const ScreeningProgress = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock data for screening progress over 12 months
  const screeningData = {
    all: {
      total: 15678,
      target: 20000,
      countries: [
        { name: 'USA', screened: 4200, target: 5000 },
        { name: 'Canada', screened: 1800, target: 2000 },
        { name: 'France', screened: 1650, target: 2000 },
        { name: 'Germany', screened: 1920, target: 2200 },
        { name: 'Italy', screened: 1340, target: 1800 },
        { name: 'Switzerland', screened: 890, target: 1000 },
        { name: 'UK', screened: 1580, target: 2000 },
        { name: 'Spain', screened: 1180, target: 1500 },
        { name: 'Belgium', screened: 720, target: 1000 },
        { name: 'Netherlands', screened: 398, target: 500 }
      ]
    },
    eu: {
      total: 8678,
      target: 11000,
      countries: [
        { name: 'France', screened: 1650, target: 2000 },
        { name: 'Germany', screened: 1920, target: 2200 },
        { name: 'Italy', screened: 1340, target: 1800 },
        { name: 'Switzerland', screened: 890, target: 1000 },
        { name: 'UK', screened: 1580, target: 2000 },
        { name: 'Spain', screened: 1180, target: 1500 },
        { name: 'Belgium', screened: 720, target: 1000 },
        { name: 'Netherlands', screened: 398, target: 500 }
      ]
    },
    americas: {
      total: 6000,
      target: 7000,
      countries: [
        { name: 'USA', screened: 4200, target: 5000 },
        { name: 'Canada', screened: 1800, target: 2000 }
      ]
    }
  };

  const currentData = screeningData[selectedRegion as keyof typeof screeningData];
  const progressPercentage = (currentData.total / currentData.target) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Screening Progress (12 Months)</CardTitle>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Global</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="americas">Americas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {currentData.total.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            of {currentData.target.toLocaleString()} target patients screened
          </div>
          <Progress value={progressPercentage} className="mt-2" />
          <div className="text-xs text-muted-foreground mt-1">
            {progressPercentage.toFixed(1)}% complete
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">By Country:</h4>
          {currentData.countries.map((country, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span>{country.name}</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {country.screened.toLocaleString()}/{country.target.toLocaleString()}
                </span>
                <div className="w-16">
                  <Progress 
                    value={(country.screened / country.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreeningProgress;
