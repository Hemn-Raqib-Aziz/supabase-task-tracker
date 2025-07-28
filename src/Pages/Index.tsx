import { useEffect, useState } from "react";
import TaskManager from "../components/TaskManager";
import Auth from "../auth/Auth";
import supabase from "../config/supabaseClient";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
     if (!session) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <>
      {!session ? (
        <Auth />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Sticky Header with logout button */}
          <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">T</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Task Manager</h2>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Log Out
              </button>
            </div>
          </header>

          {/* Main Content - Added padding-top to account for sticky header */}
          <div className="pt-4">
            <TaskManager session={session} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;