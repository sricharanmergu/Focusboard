import React, { useState, useMemo } from 'react';
import { Menu, Plus, Search, Filter, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StatsOverview from './components/StatsOverview';
import FocusNotesCarousel from './components/FocusNotesCarousel';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useLocalStorageTasks } from './hooks/useLocalStorageTasks';
import { PRIORITIES, STATUSES } from './data/initialData';

const STATUS_TABS = ['All', ...STATUSES];

export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    resetSampleData,
  } = useLocalStorageTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Derived statistics (Single source of truth)
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, inProgress, todo, completionRate };
  }, [tasks]);

  // Combined search + status tab + priority filtering
  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    priorityFilter !== 'All';

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSaveTask = (taskPayload) => {
    if (taskPayload.id) {
      updateTask(taskPayload);
    } else {
      addTask(taskPayload);
    }
  };

  const handleConfirmDelete = (taskId) => {
    deleteTask(taskId);
    setTaskToDelete(null);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Navigation Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        onResetSampleData={resetSampleData}
        completionRate={stats.completionRate}
      />

      {/* Main Content Shell */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Task Overview
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Plan, prioritize, and track daily deliverables in one place.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>Create Task</span>
          </button>
        </header>

        {/* Dashboard Body */}
        <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-6 sm:px-8">
          {/* 1. Dynamic KPI Statistics */}
          <StatsOverview stats={stats} />

          {/* 2. Three-Slide Focus Notes Carousel */}
          <FocusNotesCarousel />

          {/* 3. Task Controls (Status Tabs, Search & Priority Filter) */}
          <section aria-label="Task Filters and List" className="space-y-4">
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs lg:flex-row lg:items-center">
              {/* Status Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter tasks by status"
                className="flex flex-wrap items-center gap-1.5"
              >
                {STATUS_TABS.map((tab) => {
                  const isActive = statusFilter === tab;
                  const count =
                    tab === 'All'
                      ? stats.total
                      : tab === 'To do'
                      ? stats.todo
                      : tab === 'In progress'
                      ? stats.inProgress
                      : stats.completed;

                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setStatusFilter(tab)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                      }`}
                    >
                      <span>{tab}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Input & Priority Select */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="relative flex-1 sm:w-64">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks by title..."
                    aria-label="Search tasks by title"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-8 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative flex items-center">
                  <Filter
                    className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-400"
                    aria-hidden="true"
                  />
                  <select
                    aria-label="Filter by priority"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-8 pr-8 text-xs font-semibold text-slate-700 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-auto"
                  >
                    <option value="All">All Priorities</option>
                    {PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority} Priority
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Task Table (Desktop/Tablet) & Stacked Cards (Mobile) */}
            <TaskList
              tasks={filteredTasks}
              onStatusChange={updateTaskStatus}
              onEdit={handleOpenEdit}
              onDeleteRequest={setTaskToDelete}
              onClearFilters={clearAllFilters}
              onOpenCreate={handleOpenCreate}
              hasActiveFilters={hasActiveFilters}
            />
          </section>
        </main>
      </div>

      {/* Create / Edit Modal */}
      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        task={taskToDelete}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
