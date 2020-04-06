import { firestore } from 'firebase/app';
import moment from 'moment';

export type Product = {
  id?: string;
  name: string;
  beginDate: string;
  sprintTerm: number;
  beginTime: string;
  endTime: string;
  dailyScrumBeginTime: string;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};
