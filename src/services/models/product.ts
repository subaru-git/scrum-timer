import { firestore } from 'firebase/app';

export type Product = {
  id?: string;
  name: string;
  beginDate: Date;
  sprintTerm: number;
  beginTime: Date;
  endTime: Date;
  dailyScrumBeginTime: Date;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};
