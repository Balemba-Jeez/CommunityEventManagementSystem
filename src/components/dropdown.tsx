import { useState, useEffect, useRef } from "react";

const DropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 font-medium transition-colors flex items-center"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Events{" "}
        <span className="ml-0.5" aria-hidden="true">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-96 bg-white border border-border rounded-lg shadow-lg p-6 flex z-50">
          {/* Level Based */}
          <div className="mr-10">
            <div className="font-semibold mb-3">LEVEL BASED</div>
            <ul className="space-y-2">
              <li>
                <a href="#zone-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Zone Event
                </a>
              </li>
              <li>
                <a href="#global-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Global Event
                </a>
              </li>
            </ul>
          </div>
          {/* Time Based */}
          <div>
            <div className="font-semibold mb-3">TIME BASED</div>
            <ul className="space-y-2">
              <li>
                <a href="#live-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Live Event
                </a>
              </li>
              <li>
                <a href="#past-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Upcoming Event
                </a>
              </li>
              <li>
                <a href="#upcoming-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Past Event
                </a>
              </li>
              <li>
                <a href="#cancelled-event" className="hover:underline hover:decoration-primary hover:text-primary text-muted-foreground">
                  Cancelled Event
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
