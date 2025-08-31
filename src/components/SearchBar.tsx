
import { useState } from "react";

export default function SearchBar({
  onChange,
}: {
  onChange: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => {
          const v = e.target.value;
          setQ(v);
          onChange(v);
        }}
        placeholder="Tìm dịch vụ: tuyển sinh, học bổng, VHUB..."
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring"
      />
      <button
        type="button"
        onClick={() => {
          setQ("");
          onChange("");
        }}
        className="btn-ghost"
      >
        Xoá
      </button>
    </div>
  );
}
