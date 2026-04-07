/**
 * Storage Manager using IndexedDB for large file storage
 * Handles presentations and lessons without localStorage quota issues
 */

interface Lesson {
  id: string;
  name: string;
  fileName: string;
  fileData: string; // Base64 encoded file
  uploadedAt: string;
  type: 'explanation' | 'exercise';
}

const DB_NAME = 'DuhaWayDB';
const STORE_NAME = 'lessons';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// Save lessons to IndexedDB
export const saveLessons = async (lessons: Lesson[]): Promise<void> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // Clear existing data
    store.clear();

    // Add new data
    lessons.forEach((lesson) => {
      store.add(lesson);
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error saving lessons:', error);
    throw error;
  }
};

// Load lessons from IndexedDB
export const loadLessons = async (): Promise<Lesson[]> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error loading lessons:', error);
    return [];
  }
};

// Delete a lesson
export const deleteLesson = async (id: string): Promise<void> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }
};

// Get lesson count
export const getLessonCount = async (): Promise<number> => {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Error getting lesson count:', error);
    return 0;
  }
};

// Compress file before storing (optional - reduces size)
export const compressBase64 = (base64: string): string => {
  try {
    // For now, just return as-is. In production, you could use pako or similar
    return base64;
  } catch (error) {
    console.error('Error compressing:', error);
    return base64;
  }
};
