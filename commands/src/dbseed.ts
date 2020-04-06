import commander from 'commander';
import admin from 'firebase-admin';
import fs from 'fs';

import { Product } from './services/models/product';
import { collectionName } from './services/constants';

import serviceAccount from './scrum-timer-firebase-adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

const uploadSeed = async (collection: string, seedFile: string) => {
  const buffer = fs.readFileSync(seedFile, 'utf8');
  const products = JSON.parse(buffer);
  const ref = db.collection(collection);

  switch (collection) {
    case collectionName.products: {
      const docs: Required<Product>[] =
        products.map((product: Product) => ({
          ...product,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })) || [];
      for await (const doc of docs) {
        const { id, ...docWithoutId } = doc;
        await ref.doc(id).set(docWithoutId);
      }

      return;
    }
    default: {
      throw new Error('specify target collection');
    }
  }
};

commander
  .version('0.1.0', '-v, --version')
  .arguments('<collection> <seedFile>')
  .action(uploadSeed);

commander.parse(process.argv);
