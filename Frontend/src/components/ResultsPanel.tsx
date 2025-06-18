
import React from 'react';
import { AlertTriangle, FileVideo, Loader2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DetectionResults } from '@/pages/Index';

interface ResultsPanelProps {
  results: DetectionResults;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  const anomalyPercentage = results.totalFrames > 0 
    ? Math.round((results.anomalousFrames / results.totalFrames) * 100) 
    : 0;

  if (results.processing) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="relative">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Processing Video...
              </h3>
              <p className="text-slate-600">
                Analyzing frames for anomaly detection. This may take a few moments.
              </p>
            </div>
            <div className="w-full max-w-xs mt-4">
              <Progress value={undefined} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.totalFrames === 0 && !results.processing) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <FileVideo className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Results Yet
              </h3>
              <p className="text-slate-600">
                Upload a video to see anomaly detection results here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
              <FileVideo className="w-4 h-4 mr-2" />
              Total Frames
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">
              {results.totalFrames.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Anomalous Frames
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {results.anomalousFrames.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anomaly Percentage */}
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Anomaly Rate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Detection Rate</span>
            <span className="text-lg font-bold text-slate-800">{anomalyPercentage}%</span>
          </div>
          <Progress 
            value={anomalyPercentage} 
            className="h-3"
          />
          <p className="text-xs text-slate-500">
            {anomalyPercentage < 5 
              ? "Low anomaly rate detected" 
              : anomalyPercentage < 15 
                ? "Moderate anomaly rate detected" 
                : "High anomaly rate detected"
            }
          </p>
        </CardContent>
      </Card>

      {/* Result Image */}
      {results.resultImage && (
        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">
              Detection Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={results.resultImage}
                alt="Anomaly detection result"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Anomalies Detected
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              Visual representation showing detected anomalies highlighted in the processed frames
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsPanel;
