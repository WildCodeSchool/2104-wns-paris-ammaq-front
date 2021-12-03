export const getFullMinutes = (date) => {
  const minutes = date.getMinutes().toString();
  console.log(minutes.length);
  if (minutes.length <= 1){
    return "0" + minutes
  } else {
    return minutes
  }
};

export const getMonthName = (date) => {
  let month = date.getMonth() + 1;

  switch(month) {
    case (month = 1):
      return "janvier";
    case (month = 2):
      return "février";
    case (month = 3):
      return "mars";
    case (month = 4):
      return "avril";
    case (month = 5):
      return "mai";
    case (month = 6):
      return "juin";
    case (month = 7):
      return "juillet";
    case (month = 8):
      return "août";
    case (month = 9):
      return "septembre";
    case (month = 10):
      return "octobre";
    case (month = 11):
      return "novembre";
    case (month = 12):
      return "décembre";
  }
};
