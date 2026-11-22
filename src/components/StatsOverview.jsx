import React from 'react';
import { Layers, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

export default function StatsOverview({ stats }) {
  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      subtext: 'All tracked deliverables',
      icon: Layers,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      subtext: `${stats.todo} waiting in To do`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Completed',
      value: stats.completed,
      subtext: 'Finished & verified',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      subtext: 'Derived dynamically',
      icon: TrendingUp,
      iconBg: 'bg-violet-50 text-violet-600',
    },
  ];

  return (
    <section
      aria-label="Overview Statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="flex items-start justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition hover:border-slate-300"
          >
            <div>
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{card.subtext}</p>
            </div>
            <div className={`rounded-xl p-2.5 ${card.iconBg}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </section>
  );
}
