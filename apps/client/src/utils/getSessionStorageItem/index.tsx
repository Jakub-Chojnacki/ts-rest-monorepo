const getSessionStorageItem = (storageKey: string): string | null => {
  const storageItem = sessionStorage.getItem(storageKey);
  if (storageItem) {
    return storageItem;
  }

  return null;
};

export default getSessionStorageItem;
