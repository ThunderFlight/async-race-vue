export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getCarBrand() {
  const carBrands = [
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Chevrolet",
    "Nissan",
    "Volkswagen",
    "Tesla",
    "Hyundai",
    "Kia",
    "Porsche",
    "Lexus",
    "Subaru",
    "Mazda",
    "Jaguar",
    "Land Rover",
    "Ferrari",
    "Lamborghini",
  ];
  const randomId = Math.floor(Math.random() * (carBrands.length - 1));
  return carBrands[randomId];
}
