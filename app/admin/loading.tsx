import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/0">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-12 animate-spin text-slate-600" />
        <p className="text-slate-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
