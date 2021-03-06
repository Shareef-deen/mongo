require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]

});

const Person = mongoose.model("Person",personSchema);


//let Person;

const createAndSavePerson = (done) => {
  let yaw = new Person({name: "Yaw", age: 19, favoriteFoods: ["Banku"]});

  yaw.save((err, data)=>{
    if (err) return console.error(err);
    done(null , data);
  })

  
};
var arrayOfPeople = [
  {name: "Lariba", age: 29, favoriteFoods: ["Banku"]},
  {name: "Asibi", age: 39, favoriteFoods: ["Tuo"]},
  {name: "Lardi", age: 19, favoriteFoods: ["Banku","Tuo"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if (err) return console.error(err);
    done(null , data);
  })
  
};


const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);
  })
  
};

const findPersonById = (personId, done) => {
 /* Person.findById(personId, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);
  });*/
    Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person)=>{
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, data)=>{
      if (err) return console.error(err);
      done(null , data);    
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);

  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);

  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
  /*
  Person.remove({name: nameToRemove}, (err, data)=>{
    if (err) return console.error(err);
    done(null , data);
  })*/
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec((err, data)=>{
    if (err) return console.error(err);
    done(null , data);

  })

};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
