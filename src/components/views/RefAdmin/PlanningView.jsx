import React, { useMemo, useState } from 'react';

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const CURSUS_COLORS = [
    "bg-blue-600",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-slate-600",
    "bg-blue-400",
];

function colorForCursusId(id) {
    if (!id) return "bg-slate-500";
    return CURSUS_COLORS[id % CURSUS_COLORS.length];
}

function toDateOnly(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildMonthGrid(year, month) {
    const firstOfMonth = new Date(year, month, 1);
    const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - firstWeekday);

    const days = [];
    for (let i = 0; i < 42; i++) {
        const day = new Date(gridStart);
        day.setDate(gridStart.getDate() + i);
        days.push(day);
    }
    return days;
}

function eventOccursOn(coursDonne, day) {
    const debut = toDateOnly(new Date(coursDonne.date_debut));
    const fin = coursDonne.date_fin ? toDateOnly(new Date(coursDonne.date_fin)) : debut;
    const d = toDateOnly(day);
    return d >= debut && d <= fin;
}

export function PlanningView({ coursDonnes, onSelectCoursDonne, onAdd }) {
    const [currentDate, setCurrentDate] = useState(() => new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const days = useMemo(() => buildMonthGrid(year, month), [year, month]);

    const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    const monthLabel = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    const today = toDateOnly(new Date()).getTime();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-lg font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
                        onClick={goToPreviousMonth}
                        title="Mois précédent"
                    >
                        ‹
                    </button>
                    <span className="min-w-[10rem] text-center text-base font-semibold capitalize text-slate-900">
                        {monthLabel}
                    </span>
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-lg font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
                        onClick={goToNextMonth}
                        title="Mois suivant"
                    >
                        ›
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
                        onClick={goToToday}
                    >
                        Aujourd'hui
                    </button>
                    <button
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        onClick={onAdd}
                    >
                        + Ajouter une séance
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
                {JOURS.map((j) => (
                    <div key={j} className="py-1 text-center text-xs font-semibold text-slate-500">
                        {j}
                    </div>
                ))}

                {days.map((day, idx) => {
                    const isOutsideMonth = day.getMonth() !== month;
                    const isToday = toDateOnly(day).getTime() === today;
                    const dayEvents = coursDonnes.filter((cd) => eventOccursOn(cd, day));

                    return (
                        <div
                            key={idx}
                            className={
                                "flex min-h-[6rem] flex-col gap-1 rounded-lg border p-1.5 " +
                                (isOutsideMonth ? "border-slate-100 bg-slate-50/60" : "border-slate-200 bg-white") +
                                (isToday ? " border-2 border-blue-600" : "")
                            }
                        >
                            <span className={"text-xs font-semibold " + (isOutsideMonth ? "text-slate-300" : "text-slate-900")}>
                                {day.getDate()}
                            </span>
                            {dayEvents.map((cd) => (
                                <div
                                    key={cd.id}
                                    className={
                                        "cursor-pointer truncate rounded px-1.5 py-0.5 text-[11px] leading-tight text-white transition-opacity hover:opacity-90 " +
                                        colorForCursusId(cd.cours?.cursus?.id ?? cd.cours?.cursus)
                                    }
                                    title={`${cd.cours?.cours?.libelle ?? ""} — ${cd.promotion?.nom ?? ""} — ${cd.formateur?.user?.first_name ?? ""} ${cd.formateur?.user?.last_name ?? ""}`}
                                    onClick={() => onSelectCoursDonne(cd)}
                                >
                                    {cd.cours?.cours?.libelle} · {cd.promotion?.nom}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}