let documents = [];
for (let i = 0; i < 200; i++) {
  documents.push({
    name: "Caldo " + i,
    price: 24,
    img: "/images",
    typeId: "5eb9c552c7b38f4ff8f9e11d",
  });
}
module.exports = {
  model: "Dishes",
  documents,
};
