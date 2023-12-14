import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  const putDb = async (content) => {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectstore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('Content added to database with ID:', result);
  };
  
  const getDb = async () => {

    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.getAll()
    const result = await request;
    console.log('Retrieved content from the database:B', result);
  };
  
  initdb();
  
  export { putDb, getDb };