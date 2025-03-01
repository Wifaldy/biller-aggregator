import * as moment from 'moment';

export const parseTimeToDate = (date: string): Date => {
  return new Date(`1970-01-01T${date}Z`);
};

export const formatTimeToUtc = (time: Date): string => {
  return moment.utc(time).format('HH:mm:ss');
};

export const validateStartTimeAndEndTime = (
  startTime: string,
  endTime: string,
): boolean => {
  const parsedStartTime = parseTimeToDate(startTime);
  const parsedEndTime = parseTimeToDate(endTime);
  return parsedEndTime > parsedStartTime;
};
