export function isEndTimeGreaterThanTwoDays(endTime: string) {
  const twoDays = 2 * 24 * 60 * 60 * 1000;
  const endTimeDate = new Date(endTime).getTime();
  const now = new Date().getTime();

  return endTimeDate - now > twoDays;
}

export function isWithinLastThreeDays(targetTime: string) {
  const twoDays = 3 * 24 * 60 * 60 * 1000;
  const targetTimeDate = new Date(targetTime).getTime();
  const now = new Date().getTime();

  return now - targetTimeDate < twoDays;
}
