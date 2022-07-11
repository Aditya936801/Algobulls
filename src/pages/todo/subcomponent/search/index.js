export const filter = (data, filterData, setFilterData, searchValue) => {
  const re = /^\s+/;
  if (!re.test(searchValue)) {
    const checkForInclude = (string1, string2) => {
        
        string1 = string1?.toLowerCase()
        string2 = string2?.toLowerCase()
      return string1?.includes(string2);
    };

    const checkForTags = (tags) => {
      for (let i = 0; i < tags?.length; i++) {
        return checkForInclude(tags[i], searchValue);
      }
    };

    const checkForFilter = (elem) => {
      if (checkForInclude(elem?.description, searchValue)) {
        return true;
      } else if (checkForInclude(elem?.title, searchValue)) {
        return true;
      } else if (checkForInclude(elem?.status, searchValue)) {
        return true;
      } else if (checkForInclude(elem?.duedate, searchValue)) {
        return true;
      } else if (checkForInclude(elem?.timestamp, searchValue)) {
        return true;
      } else if (checkForTags(elem.tags)) {
        return true;
      } else {
        return false;
      }
    };

    const newData = data.filter((elem) => {
      return checkForFilter(elem);
    
    });
    
    return newData
  }
  else{
    return data
  }
};
