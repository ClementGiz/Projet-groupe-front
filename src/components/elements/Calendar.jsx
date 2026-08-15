import React, { useState } from 'react';

export default function Calendar({ events = [], onEventClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Noms des mois et jours en français
    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    // Navigation dans les mois
    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Calcul des jours du mois
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // Ajustement pour faire commencer la semaine le Lundi (0: Lun, 6: Dim)
    const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Génération du quadrillage des jours
    const calendarDays = [];
    // Case vides du début de mois
    for (let i = 0; i < startingDay; i++) {
        calendarDays.push(null);
    }
    // Jours du mois courant
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Helper pour formater les dates en YYYY-MM-DD
    const formatDateKey = (day) => {
        if (!day) return null;
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    // Filtrer les événements par jour
    const getEventsForDay = (day) => {
        const dateKey = formatDateKey(day);
        if (!dateKey) return [];
        return events.filter((event) => event.date === dateKey);
    };

    // Badge de statut / type d'événement (Charte : Vert #10B981, Ambre #F59E0B, Bleu #2563EB)[cite: 1]
    const getEventBadgeStyle = (type) => {
        switch (type) {
            case 'cours':
                return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
            case 'examen':
                return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100';
            case 'valide':
                return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
        }
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        // Conteneur principal (Fond blanc, bordure 1px, ombrage léger, arrondis 8px)[cite: 1]
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5 w-full max-w-4xl mx-auto space-y-4">

            {/* En-tête : Titre & Navigation */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                    {monthNames[month]} {year}
                </h2>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={prevMonth}
                        className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
                        title="Mois précédent"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition text-xs font-medium"
                    >
                        Aujourd'hui
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition text-sm font-medium"
                        title="Mois suivant"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Jours de la semaine (Haut de tableau) */}
            <div className="grid grid-cols-7 gap-1 text-center border-b border-slate-100 pb-2">
                {dayNames.map((day, idx) => (
                    <span key={idx} className="text-xs font-medium text-slate-500 uppercase">
            {day}
          </span>
                ))}
            </div>

            {/* Grille du calendrier */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                    if (day === null) {
                        return <div key={index} className="h-28 bg-slate-50/50 rounded-lg border border-transparent" />;
                    }

                    const dateKey = formatDateKey(day);
                    const isToday = dateKey === todayStr;
                    const dayEvents = getEventsForDay(day);

                    return (
                        <div
                            key={index}
                            className={`h-28 p-1.5 border rounded-lg flex flex-col justify-between transition-colors ${
                                isToday
                                    ? 'border-blue-600 bg-blue-50/30'
                                    : 'border-slate-200 bg-white hover:bg-slate-50/50'
                            }`}
                        >
                            {/* Numéro du jour */}
                            <div className="flex justify-between items-center">
                <span
                    className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                        isToday
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700'
                    }`}
                >
                  {day}
                </span>
                            </div>

                            {/* Liste des événements du jour */}
                            <div className="space-y-1 overflow-y-auto max-h-20 scrollbar-thin">
                                {dayEvents.map((evt, evtIdx) => (
                                    <button
                                        key={evt.id || evtIdx}
                                        onClick={() => onEventClick && onEventClick(evt)}
                                        className={`w-full text-left text-[11px] px-1.5 py-1 rounded border truncate block transition cursor-pointer ${getEventBadgeStyle(
                                            evt.type
                                        )}`}
                                        title={`${evt.title} (${evt.time || ''})`}
                                    >
                                        <span className="font-semibold block truncate">{evt.title}</span>
                                        {evt.time && <span className="opacity-75 text-[10px]">{evt.time}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}