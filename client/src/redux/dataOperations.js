
export const sortItemsdata = (list, sortOrder = 'asc') => {
  const typesCount = {};
  list?.forEach((item) => {
    if (typesCount[item.Type]) {
      typesCount[item.Type]++;
    } else {
      typesCount[item.Type] = 1;
    }
  });

  const sortedList = [...list].sort((a, b) => {
    const countDiff = typesCount[a.Type] - typesCount[b.Type];
    if (countDiff === 0) {
      const nameDiff = a.Title.localeCompare(b.Title);
      return sortOrder === 'asc' ? nameDiff : -nameDiff;
    }
    return sortOrder === 'asc' ? countDiff : -countDiff;
  });

  return sortedList;
};



export const sortItemsByNamedata = (list, order) => {
  const sortedList = [...list];
  sortedList.sort((a, b) => {
    const compare = a.Title.localeCompare(b.Title);
    return order === 'asc' ? compare : -compare;
  });

  return sortedList;
};





export const searchItems = (list, searchTerm) => {
  if (!searchTerm) {
    return list; 
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return list.filter((item) => {
    const { Title, Year } = item;
    return (
      Title.toLowerCase().includes(lowerCaseSearchTerm) ||
      Year.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });
};

    