const PARTS = [
  { name: 'seconds', value: 60 },
  { name: 'minutes', value: 60 },
  { name: 'hours', value: 24 },
  { name: 'days', value: 7 },
  { name: 'weeks', value: 4.33 },
  { name: 'months', value: 12 },
  { name: 'years', value: Infinity }
];

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelativeDate(toDate, fromDate = Date.now()){
  let duration = (toDate - fromDate) / 1000;
  for(let i = 0; i <= PARTS.length; i++){
    if(Math.abs(duration) < PARTS[i].value){
      return relativeTimeFormat.format(Math.round(duration), PARTS[i].name);
    }
    duration /= PARTS[i].value;
  }
}

export default formatRelativeDate;