// Agent 5: Welfare Scheme Agent
// Discovers and matches public healthcare and social welfare programs based on member demographics and eligibility criteria.
(function(window) {
  'use strict';

  const WelfareSchemeAgent = {
    name: 'Welfare Scheme Agent',
    id: 'agent_welfare',

    async matchSchemes(query, member) {
      const storeState = window.CareBridgeStore.getState();
      const allSchemes = storeState.welfareSchemes;

      // Filter schemes based on member age and criteria
      const matched = allSchemes.filter(s => {
        if (member && member.age) {
          return member.age >= s.minAge && member.age <= s.maxAge;
        }
        return true;
      });

      return {
        agent: 'Welfare Scheme Agent',
        status: 'completed',
        targetMember: member ? member.name : 'Family General',
        totalSchemesMatched: matched.length,
        schemes: matched.map(s => ({
          name: s.name,
          category: s.category,
          coverageAmount: s.coverageAmount,
          matchConfidence: s.matchScore,
          whyRelevant: s.whyRelevant,
          requiredDocuments: s.requiredDocuments,
          portal: s.portalName,
          link: s.officialUrl
        })),
        disclaimer: 'Potentially relevant programs only — eligibility must be verified with the respective government authority or official portal.',
        summary: `Welfare Scheme Agent identified ${matched.length} potentially applicable healthcare schemes for ${member ? member.name : 'your family'} based on demographic and age criteria.`
      };
    }
  };

  window.WelfareSchemeAgent = WelfareSchemeAgent;
})(window);
