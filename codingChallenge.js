let sherlock = { surname: "Holmes", age: 64 };
let propertyName = prompt("What do you want to know?");
alert(sherlock[propertyName]);

let president = {
    name: "Pooh",
    next: president,
};

let charlotte = {};

let music = {
    taste: "classical",
};

let onion = {
    taste: music.taste,
};
for (var i = 0; i < 4; i++) {
    setTimeout(() => console.log(i));
}
