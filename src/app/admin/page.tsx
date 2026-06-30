"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScoutLogo from "@/components/ui/ScoutLogo";

interface WaitlistEntry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  leagues: string[];
  message: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [fetching, setFetching] = useState(false);

  // Check if session token exists in sessionStorage (clears when tab closes)
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthorized(true);
      fetchEntries(token);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem("admin_token", data.token);
        setIsAuthorized(true);
        fetchEntries(data.token);
      } else {
        setError(data.message || "Invalid password.");
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEntries = async (token: string) => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/waitlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      } else {
        // Token expired or invalid
        handleLogout();
      }
    } catch (err) {
      console.error("Failed to fetch entries", err);
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthorized(false);
    setEntries([]);
    setPassword("");
  };

  const roleCount = (role: string) =>
    entries.filter((e) => e.role?.toLowerCase() === role.toLowerCase()).length;

  const roleBadgeClass = (role: string) => {
    const base =
      "inline-block text-xs font-display font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border";
    switch (role?.toLowerCase()) {
      case "player":
        return `${base} bg-orange-court/10 border-orange-court/30 text-orange-court`;
      case "coach":
        return `${base} bg-blue-400/10 border-blue-400/30 text-blue-300`;
      case "agent":
        return `${base} bg-purple-400/10 border-purple-400/30 text-purple-300`;
      default:
        return `${base} bg-carbon border-[#1E2130] text-ash`;
    }
  };

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const headers = ["ID", "Joined At", "Full Name", "Email", "Phone", "Role", "Leagues Interest", "Optional Message"];
    const rows = entries.map((entry) => [
      entry.id,
      new Date(entry.created_at).toLocaleString("en-AU"),
      entry.full_name,
      entry.email,
      entry.phone,
      entry.role,
      (entry.leagues || []).join(", "),
      entry.message.replace(/"/g, '""'), // Escape quotes for CSV
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `scout_au_waitlist_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-carbon text-white font-body py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background Reticle */}
      <div className="absolute inset-0 bg-reticle opacity-[0.03] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 court-lines-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center border-b border-[#1E2130] pb-8 mb-10">
          <ScoutLogo size="default" />
          <div className="flex items-center gap-2">
            <span className="bg-orange-court/10 border border-orange-court/20 text-orange-court font-display font-bold uppercase tracking-expanded text-xs px-3 py-1 rounded-full">
              Admin Portal
            </span>
            {isAuthorized && (
              <button
                onClick={handleLogout}
                className="text-steel hover:text-white text-xs font-medium transition-colors ml-4 uppercase tracking-expanded"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isAuthorized ? (
            /* LOGIN STATE */
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto card-dark p-8 md:p-10"
            >
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-6">
                Authorize Access
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-pass" className="block text-sm font-medium text-ash mb-1.5">
                    Admin Password
                  </label>
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••••••"
                  />
                </div>
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center font-display font-bold uppercase tracking-expanded rounded-xl px-7 py-3.5 text-sm bg-orange-court text-white hover:bg-orange-court-hover transition-colors disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Enter Dashboard"}
                </button>
              </form>
            </motion.div>
          ) : (
            /* DASHBOARD STATE */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-white">
                    Waitlist Entries
                  </h2>
                  <p className="text-ash text-sm font-body mt-1.5 flex items-center gap-2">
                    {fetching ? (
                      <>
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange-court animate-pulse" />
                        Refreshing signups…
                      </>
                    ) : (
                      <>
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                        Live · {entries.length} registered {entries.length === 1 ? "lead" : "leads"}
                      </>
                    )}
                  </p>
                </div>

                {entries.length > 0 && (
                  <button
                    onClick={exportToCSV}
                    className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-expanded rounded-xl px-5 py-3 text-xs bg-orange-court text-white hover:bg-orange-court-hover shadow-lg shadow-orange-court/20 transition-all hover:-translate-y-0.5"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export CSV
                  </button>
                )}
              </div>

              {/* Summary stat cards */}
              {entries.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Leads", value: entries.length },
                    { label: "Players", value: roleCount("Player") },
                    { label: "Coaches", value: roleCount("Coach") },
                    { label: "Agents & Other", value: entries.length - roleCount("Player") - roleCount("Coach") },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="card-dark p-5 bg-carbon-light/60 hover:border-orange-court/30 transition-colors"
                    >
                      <p className="text-steel text-[11px] font-display uppercase tracking-expanded">
                        {stat.label}
                      </p>
                      <p className="text-white font-display font-black text-3xl mt-2 tabular-nums">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Table / Content List */}
              <div className="card-dark overflow-hidden border border-[#1E2130] bg-carbon-light/40">
                {fetching && entries.length === 0 ? (
                  <div className="py-20 text-center text-steel">
                    <svg className="animate-spin h-8 w-8 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" className="opacity-75" />
                    </svg>
                    Loading list...
                  </div>
                ) : entries.length === 0 ? (
                  <div className="py-20 text-center text-ash text-sm">
                    No signups found yet. Invite users to join the waitlist!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-carbon/60 border-b border-[#1E2130] text-[11px] font-display uppercase tracking-expanded text-steel">
                          <th className="py-4 px-6 font-bold">Joined Date</th>
                          <th className="py-4 px-6 font-bold">Name</th>
                          <th className="py-4 px-6 font-bold">Email</th>
                          <th className="py-4 px-6 font-bold">Phone</th>
                          <th className="py-4 px-6 font-bold">Role</th>
                          <th className="py-4 px-6 font-bold">Leagues</th>
                          <th className="py-4 px-6 font-bold">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E2130]/60 text-sm font-body text-ash">
                        {entries.map((entry) => (
                          <tr key={entry.id} className="align-top hover:bg-carbon-lighter/25 transition-colors">
                            <td className="py-4 px-6 whitespace-nowrap text-xs text-steel">
                              {new Date(entry.created_at).toLocaleDateString("en-AU", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-4 px-6 font-semibold text-white whitespace-nowrap">
                              {entry.full_name}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <a
                                href={`mailto:${entry.email}`}
                                className="text-orange-court hover:text-orange-court-hover hover:underline transition-colors"
                              >
                                {entry.email}
                              </a>
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap text-xs tabular-nums">
                              {entry.phone}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className={roleBadgeClass(entry.role)}>
                                {entry.role}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                                {(entry.leagues || []).map((league) => (
                                  <span
                                    key={league}
                                    className="whitespace-nowrap text-[10px] leading-none bg-orange-court/10 border border-orange-court/20 text-orange-court px-2 py-1 rounded font-display font-bold uppercase tracking-wide"
                                  >
                                    {league}
                                  </span>
                                ))}
                                {(!entry.leagues || entry.leagues.length === 0) && (
                                  <span className="text-xs text-steel">—</span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6 max-w-xs text-xs text-ash" title={entry.message}>
                              {entry.message ? (
                                <span className="line-clamp-2">{entry.message}</span>
                              ) : (
                                <span className="text-steel italic">None</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
