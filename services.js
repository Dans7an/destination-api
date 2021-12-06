function generateUniqueId() {
  // 123456789
  let id = "";

  for (let index = 0; index < 6; index++) {
    const randomNumber = Math.ceil(Math.random() * 9);
    id += randomNumber;
  }
  return id;
}

module.exports = { generateUniqueId };
