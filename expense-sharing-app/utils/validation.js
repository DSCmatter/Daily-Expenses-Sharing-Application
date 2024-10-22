// Ensure that percentages add up to 100%
exports.validatePercentages = (participants) => {
    const totalPercentage = participants.reduce((acc, p) => acc + (p.percentage || 0), 0);
    return totalPercentage === 100;
  };
  