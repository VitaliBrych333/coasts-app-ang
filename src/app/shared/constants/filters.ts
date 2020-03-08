import { NewCoast } from '../../shared/models/coast.model';
import { NewIncome } from '../../shared/models/income.model';

function setDate(value: Date): Date {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export const Filters = {
  byType: (data: NewCoast[] | NewIncome[], filterValue: string) => +data.filter(obj => obj.type === filterValue)
                                                                        .reduce((acc, cur) => acc + cur.sum, 0).toFixed(2),

  byAuthor: (data: NewIncome[], filterValue: string) => data.filter(obj => obj.who === filterValue),
  byYear: (data: object[], filterValue: number) => data.filter((obj: any) => new Date(obj.date).getFullYear() === filterValue),
  byMonth: (data: object[], filterValue: number) => data.filter((obj: any) => new Date(obj.date).getMonth() === filterValue),
  byLowDate: (data: NewIncome[] | NewCoast[], filterValue: Date) => data.filter((obj: NewIncome | NewCoast) => setDate(obj.date) >= filterValue),
  byTopDate: (data: NewIncome[] | NewCoast[], filterValue: Date) => data.filter((obj: NewIncome | NewCoast) => setDate(obj.date) <= filterValue),
};
