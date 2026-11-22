import React from 'react';
import {
  Calendar,
  Pencil,
  Trash2,
  FolderOpen,
  Plus,
} from 'lucide-react';
import { STATUSES } from '../data/initialData';

const PRIORITY_STYLES = {
  High: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
  Medium: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  Low: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20',
};

const STATUS_STYLES = {
  'To do': 'bg-slate-100 text-slate-700 border-slate-200',
  'In progress': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

function formatDate(dateStr) {
  if (!dateStr) return 'No due date';
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) return dateStr;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDeleteRequest,
  onClearFilters,
  onOpenCreate,
  hasActiveFilters,
}) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <FolderOpen className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900">
          {hasActiveFilters ? 'No matching tasks found' : 'Your task board is empty'}
        </h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          {hasActiveFilters
            ? 'Try adjusting your search query, status tab, or priority filter to see more tasks.'
            : 'Get started by creating your first task to track progress across your sprint.'}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>
          )}
          <button
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View (md and up) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 pl-6 pr-3">Task & Description</th>
                <th className="px-3 py-3.5">Category</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-3 py-3.5">Priority</th>
                <th className="px-3 py-3.5">Due Date</th>
                <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="group transition-colors hover:bg-slate-50/80"
                >
                  <td className="max-w-md py-4 pl-6 pr-3">
                    <p
                      className={`font-semibold text-slate-900 ${
                        task.status === 'Completed'
                          ? 'line-through text-slate-400'
                          : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                        {task.description}
                      </p>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {task.category}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4">
                    <label className="sr-only" htmlFor={`status-${task.id}`}>
                      Change status for {task.title}
                    </label>
                    <select
                      id={`status-${task.id}`}
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                      className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        STATUS_STYLES[task.status] || STATUS_STYLES['To do']
                      }`}
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-white text-slate-900">
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-xs font-medium text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {formatDate(task.dueDate)}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-3 pr-6 text-right">
                    <div className="inline-flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(task)}
                        aria-label={`Edit ${task.title}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteRequest(task)}
                        aria-label={`Delete ${task.title}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Stacked Card View (< md) */}
      <div className="space-y-3 md:hidden">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {task.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  aria-label={`Edit ${task.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteRequest(task)}
                  aria-label={`Delete ${task.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3
              className={`mt-2.5 text-sm font-bold text-slate-900 ${
                task.status === 'Completed' ? 'line-through text-slate-400' : ''
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {task.description}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(task.dueDate)}
              </span>

              <select
                aria-label={`Change status for ${task.title}`}
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                className={`min-h-[36px] rounded-xl border px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  STATUS_STYLES[task.status] || STATUS_STYLES['To do']
                }`}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st} className="bg-white text-slate-900">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
