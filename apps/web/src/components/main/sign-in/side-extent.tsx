import { cn } from "@repo/styles/cn";

export function SideExtent() {
  return (
    <aside
      className={cn(
        "relative overflow-hidden bg-gradi-to-br from-primary-800 via-primary-600 to-secondary-600 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:min-h760px] lg:flex-col lg:justify-between lg:px-12 lg:py-14",
      )}
    >
      {/* MEDICAL 3D BACKGROUND */}
    
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
        )}
      >
        {/* Glow */}
    
        <div
          className={cn(
            "absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary-200/20 blur-3xl",
          )}
        />
    
        <div
          className={cn(
            "absolute -right-24 -bottom-28 h-96 w-96 rounded-full bg-secondary-300/20 blur-3xl",
          )}
        />
    
        {/* Rings */}
    
        <div
          className={cn(
            "absolute top-12 -right-20 h-64 w-64 rounded-full border-primary-50/10 border",
          )}
        />
    
        <div
          className={cn(
            "absolute top-36 right-5 h-32 w-32 rounded-full border-primary-50/10 border",
          )}
        />
    
        {/* CAPSULE */}
    
        <div
          className={cn(
            "absolute top-10 right-8 hidden h-24 w-24 rotate-12 items-center justify-center rounded-3xl border-primary-50/15 border bg-primary-50/10 shadow-primary-950/20 shadow-2xl backdrop-blur-xl sm:flex",
          )}
        >
          <div
            className={cn(
              "relative h-14 w-8 -rotate-35 overflow-hidden rounded-full shadow-primary-950/20 shadow-xl",
            )}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1/2 bg-primary-50/90",
              )}
            />
    
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-1/2 bg-accent-300/90",
              )}
            />
          </div>
        </div>
    
        {/* RX CARD */}
    
        <div
          className={cn(
            "absolute top-[38%] right-7 hidden w-28 -rotate-6 rounded-2xl border-primary-50/15 border bg-primary-50/10 p-4 shadow-primary-950/20 shadow-2xl backdrop-blur-xl lg:block",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-xl font-bold text-primary-50/90",
            )}
          >
            Rx
          </p>
    
          <div
            className={cn(
              "mt-3 h-1.5 w-full rounded-full bg-primary-50/20",
            )}
          />
    
          <div
            className={cn(
              "mt-2 h-1.5 w-3/4 rounded-full bg-primary-50/15",
            )}
          />
    
          <div
            className={cn(
              "mt-2 h-1.5 w-1/2 rounded-full bg-primary-50/10",
            )}
          />
        </div>
    
        {/* MEDICAL CROSS */}
    
        <div
          className={cn(
            "absolute bottom-42 left-8 hidden h-20 w-20 -rotate-12 items-center justify-center rounded-2xl border-primary-50/15 border bg-primary-50/10 shadow-primary-950/20 shadow-2xl backdrop-blur-xl sm:flex",
          )}
        >
          <div className="relative h-10 w-10">
            <div
              className={cn(
                "absolute top-0 left-1/2 h-10 w-3 -translate-x-1/2 rounded-full bg-primary-50/80",
              )}
            />
    
            <div
              className={cn(
                "absolute top-1/2 left-0 h-3 w-10 -translate-y-1/2 rounded-full bg-primary-50/80",
              )}
            />
          </div>
        </div>
    
        {/* TABLET STRIP */}
    
        <div
          className={cn(
            "absolute right-8 bottom-10 hidden w-36 rotate-6 rounded-2xl border-primary-50/15 border bg-primary-50/10 p-4 shadow-primary-950/20 shadow-2xl backdrop-blur-xl lg:block",
          )}
        >
          <div className="grid grid-cols-4 gap-2">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square rounded-full border-primary-50/20 border bg-primary-50/20 shadow-inner",
                )}
              />
            ))}
          </div>
        </div>
    
        {/* MEDICINE BOTTLE */}
    
        <div
          className={cn(
            "absolute bottom-14 left-[43%] hidden h-24 w-16 -rotate-6 rounded-xl border-primary-50/15 border bg-primary-50/10 shadow-primary-950/15 shadow-xl backdrop-blur-xl lg:block",
          )}
        >
          <div
            className={cn(
              "absolute -top-3 left-1/2 h-4 w-9 -translate-x-1/2 rounded-t-lg border-primary-50/15 border bg-primary-50/20",
            )}
          />
    
          <div
            className={cn(
              "absolute top-7 right-2 left-2 rounded-lg bg-primary-50/10 px-1 py-3 text-center",
            )}
          >
            <span
              className={cn(
                "font-brand-secondary text-xs font-bold text-primary-50/70",
              )}
            >
              MED
            </span>
          </div>
        </div>
      </div>
    
      {/* SIDE CONTENT */}
    
      <div className="relative z-10">
        {/* ICON */}
    
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-2xl border-primary-50/15 border bg-primary-50/10 shadow-primary-950/10 shadow-lg backdrop-blur-xl",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-primary-50 h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14"
            />
    
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14"
            />
    
            <rect x="3" y="3" width="18" height="18" rx="5" />
          </svg>
        </div>
    
        <p
          className={cn(
            "mt-10 font-brand-accent text-xs font-semibold uppercase tracking-[0.22em] text-primary-100/80",
          )}
        >
          Medical Representative Portal
        </p>
    
        <h1
          className={cn(
            "mt-4 max-w-md font-brand-secondary text-3xl font-bold tracking-tight text-primary-50 sm:text-4xl lg:text-5xl",
          )}
        >
          Your workday, connected.
        </h1>
    
        <p
          className={cn(
            "mt-5 max-w-md font-brand-primary text-sm leading-7 text-primary-100/80 sm:text-base",
          )}
        >
          Access your professional workspace, manage your daily activities
          and stay organised throughout every field visit.
        </p>
      </div>
    
      {/* FEATURE CARDS */}
    
      <div
        className={cn(
          "relative z-10 mt-10 grid gap-3 2xs:grid-cols-3 lg:mt-16 lg:grid-cols-1",
        )}
      >
        <div
          className={cn(
            "rounded-2xl border-primary-50/15 border bg-primary-50/10 p-4 shadow-primary-950/10 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-sm font-semibold text-primary-50",
            )}
          >
            Secure Access
          </p>
    
          <p className="text-primary-100/70 mt-1 text-xs">
            Protected professional workspace
          </p>
        </div>
    
        <div
          className={cn(
            "rounded-2xl border-primary-50/15 border bg-primary-50/10 p-4 shadow-primary-950/10 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-sm font-semibold text-primary-50",
            )}
          >
            Stay Organised
          </p>
    
          <p className="text-primary-100/70 mt-1 text-xs">
            Keep your daily activity on track
          </p>
        </div>
    
        <div
          className={cn(
            "rounded-2xl border-primary-50/15 border bg-primary-50/10 p-4 shadow-primary-950/10 shadow-lg backdrop-blur-xl",
          )}
        >
          <p
            className={cn(
              "font-brand-secondary text-sm font-semibold text-primary-50",
            )}
          >
            Work Smarter
          </p>
    
          <p className="text-primary-100/70 mt-1 text-xs">
            Everything you need in one place
          </p>
        </div>
      </div>
    </aside>
  );
}

