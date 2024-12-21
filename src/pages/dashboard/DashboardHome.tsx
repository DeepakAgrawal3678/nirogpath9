import React from 'react';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { Chart } from '../../components/dashboard/Chart';
import { Activity, Droplet, Pill, Calendar } from 'lucide-react';
import { useActivity } from '../../hooks/useActivity';
import { useBloodSugar } from '../../hooks/useBloodSugar';
import { ActivityChart } from '../../components/dashboard/ActivityChart';
import { BloodSugarChart } from '../../components/dashboard/BloodSugarChart';
import { RecentActivities } from '../../components/dashboard/RecentActivities';

export function DashboardHome() {
  const { activities, loading: activitiesLoading } = useActivity();
  const { readings: bloodSugarReadings, loading: readingsLoading } = useBloodSugar();

  const thisWeekActivities = activities.filter(activity => {
    const activityDate = new Date(activity.timestamp);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    return activityDate >= weekStart;
  });

  const totalMinutes = thisWeekActivities.reduce(
    (sum, activity) => sum + parseInt(activity.duration), 
    0
  );

  const latestReading = bloodSugarReadings[0];
  const latestBloodSugar = latestReading ? latestReading.beforeFood : 'N/A';

  return (
    <div className="h-[calc(100vh-2rem)] p-4 flex flex-col gap-4">
      {/* Header Section */}
      <div>
        <h1 className="text-xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-slate-200">Here's your health overview for today</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Blood Sugar"
          value={`${latestBloodSugar} mg/dL`}
          icon={Droplet}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Medications"
          value="2 pending"
          icon={Pill}
        />
        <MetricCard
          title="Weekly Activity"
          value={`${totalMinutes} mins`}
          icon={Activity}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Next Check-up"
          value="3 days"
          icon={Calendar}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Charts Section - 8 columns */}
        <div className="col-span-8 grid grid-rows-[45%_35%] gap-4">
          <Chart title="Blood Sugar Trends">
            {readingsLoading ? (
              <div className="h-full flex items-center justify-center text-slate-200">
                Loading blood sugar data...
              </div>
            ) : bloodSugarReadings.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-200">
                No blood sugar readings recorded yet
              </div>
            ) : (
              <div className="h-[calc(100%-2rem)]">
                <BloodSugarChart readings={bloodSugarReadings} />
              </div>
            )}
          </Chart>

          <Chart title="Activity Overview">
            {activitiesLoading ? (
              <div className="h-full flex items-center justify-center text-slate-200">
                Loading activities...
              </div>
            ) : activities.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-200">
                No activities logged yet
              </div>
            ) : (
              <div className="h-[calc(100%-2rem)]">
                <ActivityChart activities={activities} />
              </div>
            )}
          </Chart>
        </div>

        {/* Right Sidebar - 4 columns */}
        <div className="col-span-4 grid grid-rows-2 gap-4">
          <div className="glass-effect p-3 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">Upcoming Medications</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium text-white text-sm">Metformin</p>
                  <p className="text-xs text-slate-200">500mg • With breakfast</p>
                </div>
                <span className="text-orange-500 text-xs">8:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                <div>
                  <p className="font-medium text-white text-sm">Glipizide</p>
                  <p className="text-xs text-slate-200">5mg • After dinner</p>
                </div>
                <span className="text-orange-500 text-xs">8:00 PM</span>
              </div>
            </div>
          </div>

          <div className="glass-effect p-3 rounded-xl">
            <h3 className="text-sm font-semibold text-white mb-2">Recent Activities</h3>
            {activitiesLoading ? (
              <div className="text-center text-slate-200 text-xs">Loading activities...</div>
            ) : activities.length === 0 ? (
              <div className="text-center text-slate-200 text-xs">No activities logged yet</div>
            ) : (
              <div className="space-y-2">
                <RecentActivities activities={activities.slice(0, 2)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}