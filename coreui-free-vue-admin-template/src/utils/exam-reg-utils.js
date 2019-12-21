const extractDate = function(date) {
  let d = new Date(date);
  let dd = d.getDate();
  let mm = d.getMonth() + 1; //January is 0!
  
  let yyyy = d.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '/' + mm + '/' + yyyy;
};

const inverseDate = function(date) {
  let yyyyMMdd = date.split("-");
  return yyyyMMdd[2] + "-" + yyyyMMdd[1] + "-" + yyyyMMdd[0];
};

export default {
  extractDate,
  inverseDate
}