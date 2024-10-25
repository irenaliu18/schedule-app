const haveDayOverlap = (days1, days2) => {
    const daysSet1 = new Set(days1.split(''));
    const daysSet2 = new Set(days2.split(''));
    for (let day of daysSet1) {
        if (daysSet2.has(day)) return true;
    }
    return false;

};

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const haveTimeOverlay = (timeRange1, timeRange2) => {
    const [start1, end1] = timeRange1.split('-').map(timeToMinutes);
    const [start2, end2] = timeRange2.split('-').map(timeToMinutes);
    return (start1 < end2 && start2 < end1);
};

export const hasTimeConflict = (course1, course2) => {
    if (!course1 || !course2 || !course1.term || !course2.term) {
        return false;  // Return false if any course object is undefined or lacks a `term`
      }
    if (course1.term !== course2.term || !course1.meets || !course2.meets) {
        return false;
    } 
    const [days1, timeRange1] = course1.meets.split(' ');
    const [days2, timeRange2] = course2.meets.split(' ');

    return haveDayOverlap(days1, days2) && haveTimeOverlay(timeRange1, timeRange2);
}
