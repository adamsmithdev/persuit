import AuthWrapper from '@/components/AuthWrapper';
import Button from '@/components/Button';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Settings
          </h1>
          <p className="text-[var(--foreground-muted)] mt-2">
            Customize your Job Tracker experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications */}
            <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Notifications
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Receive email updates about your applications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 text-[var(--primary)] bg-[var(--surface-variant)] border-[var(--border)] rounded focus:ring-[var(--primary)] disabled:opacity-60"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">
                      Interview Reminders
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Get reminded about upcoming interviews
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 text-[var(--primary)] bg-[var(--surface-variant)] border-[var(--border)] rounded focus:ring-[var(--primary)] disabled:opacity-60"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">
                      Weekly Summaries
                    </h3>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      Receive weekly progress reports
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    className="w-5 h-5 text-[var(--primary)] bg-[var(--surface-variant)] border-[var(--border)] rounded focus:ring-[var(--primary)] disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Display Preferences */}
            <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Display Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="theme"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Theme
                  </label>
                  <select
                    id="theme"
                    disabled
                    className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] disabled:opacity-60"
                  >
                    <option value="system">System Default</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="itemsPerPage"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Items per Page
                  </label>
                  <select
                    id="itemsPerPage"
                    disabled
                    className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] disabled:opacity-60"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="defaultView"
                    className="block text-sm font-medium text-[var(--foreground)] mb-2"
                  >
                    Default View
                  </label>
                  <select
                    id="defaultView"
                    disabled
                    className="w-full px-4 py-3 bg-[var(--surface-variant)] border border-[var(--border)] rounded-xl text-[var(--foreground)] disabled:opacity-60"
                  >
                    <option value="dashboard">Dashboard</option>
                    <option value="applications">Applications List</option>
                    <option value="calendar">Calendar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="bg-[var(--surface)] rounded-2xl p-8 border border-[var(--border)]">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">
                Data & Privacy
              </h2>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" disabled fullWidth>
                    <span className="mr-2">📥</span> Export My Data (Coming
                    Soon)
                  </Button>

                  <Button variant="outline" disabled fullWidth>
                    <span className="mr-2">🔄</span> Backup Data (Coming Soon)
                  </Button>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-medium text-red-800 mb-2">
                      Danger Zone
                    </h4>
                    <p className="text-sm text-red-700 mb-4">
                      These actions cannot be undone. Please be careful.
                    </p>
                    <Button variant="outline" disabled>
                      <span className="mr-2">🗑️</span> Delete Account (Coming
                      Soon)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Coming Soon
              </h3>
              <div className="space-y-3 text-sm text-[var(--foreground-muted)]">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">⏳</span>
                  <span>Custom dashboard layouts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">⏳</span>
                  <span>Advanced filtering options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">⏳</span>
                  <span>Integration settings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">⏳</span>
                  <span>API access management</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <Link href="/" className="block">
                  <Button variant="outline" fullWidth>
                    <span className="mr-2">📚</span> Documentation
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button variant="outline" fullWidth>
                    <span className="mr-2">💬</span> Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
