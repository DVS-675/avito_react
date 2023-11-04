export const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return emailRegex.test(email);
};

// Поиск по плейлисту
export function getSearchingTracks(arr, value) {
  const findList = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].title.toLowerCase().includes(value)) {
      findList.push(arr[i]);
    }
  }

  return findList;
}
