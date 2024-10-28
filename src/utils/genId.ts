const genId = (objects: { id: number }[]) => {
  let newId = -1;
  let idUsed = false;

  do {
    newId += 1;
    idUsed = Boolean(objects.find(({ id }) => id === newId));
  } while (idUsed);

  return newId;
};

export default genId;