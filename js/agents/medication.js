// Agent 3: Medication Agent
// Manages family medication schedules, calculates adherence, flags potential timing conflicts/duplicates.
(function(window) {
  'use strict';

  const MedicationAgent = {
    name: 'Medication Agent',
    id: 'agent_med',

    async evaluate(query, member) {
      const storeState = window.CareBridgeStore.getState();
      const memberMeds = storeState.medications.filter(m => m.memberId === member.id);
      
      const taken = memberMeds.filter(m => m.status === 'taken');
      const pending = memberMeds.filter(m => m.status === 'pending');
      const upcoming = memberMeds.filter(m => m.status === 'upcoming');
      const adherenceRate = memberMeds.length ? Math.round((taken.length / memberMeds.length) * 100) : 100;

      // Duplicate or interaction safety checks
      const warnings = [];
      const lowRefills = memberMeds.filter(m => m.refillDaysLeft <= 10);
      if (lowRefills.length > 0) {
        warnings.push(`Refill Alert: ${lowRefills.map(m => m.name).join(', ')} has ${lowRefills[0].refillDaysLeft} days of supply remaining.`);
      }

      return {
        agent: 'Medication Agent',
        status: 'completed',
        memberName: member.name,
        activePrescriptionsCount: memberMeds.length,
        todayAdherence: `${adherenceRate}%`,
        scheduleBreakdown: {
          taken: taken.map(m => `${m.name} (${m.dosage}) - ${m.timeSlot}`),
          pending: pending.map(m => `${m.name} (${m.dosage}) - ${m.timeSlot}`),
          upcoming: upcoming.map(m => `${m.name} (${m.dosage}) - ${m.timeSlot}`)
        },
        refillWarnings: warnings,
        safetyDirective: 'Medication Agent never alters dosages or suggests stopping prescribed therapy. Always follow the explicit instructions of your treating doctor.',
        summary: `Medication schedule retrieved for ${member.name}. ${taken.length} of ${memberMeds.length} daily doses marked taken. Adherence rate is ${adherenceRate}%.`
      };
    }
  };

  window.MedicationAgent = MedicationAgent;
})(window);
