import { NewCoast } from '../../shared/models/coast.model';
import { NewIncome } from '../../shared/models/income.model';

export const Filters = {
  byType: (data: NewCoast[] | NewIncome[], filterValue: string) => +data.filter(obj => obj.type === filterValue).reduce((acc, cur) => acc + cur.sum, 0).toFixed(2),
  byAuthor: (data: NewIncome[], filterValue: string) => data.filter(obj => obj.who === filterValue)
};
