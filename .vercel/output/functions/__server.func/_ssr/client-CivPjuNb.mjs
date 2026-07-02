import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CivPjuNb.js
function createSupabaseClient() {
	return createClient("https://cssovwhnxfgyanprqzdj.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzc292d2hueGZneWFucHJxemRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDc1NDksImV4cCI6MjA5NzQyMzU0OX0.9nWVLES7sXeXcjoTk9_aRbW3nDsYbvZ6ce-54U0ekPw", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
