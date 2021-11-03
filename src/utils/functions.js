export const firstLetter = (name) => {
  return name[0];
};

export const withoutFirst = (name) => {
  return name.substring(1);
};

export const compactChan = (chan) => {
  console.log(chan);
  const compacted = chan.split(" ");
  console.log(compacted);
  console.log(compacted.join(""));
  return compacted.join("");
};
