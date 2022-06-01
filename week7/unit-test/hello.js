function Greet(name) {
  if (name === undefined || name === null){
    // generic response
    return "Hello there!";
  }
  else if (Array.isArray(name)){
    // response to multiple names
    let greeting = "Hello, ";
    name.forEach((element) => {
      greeting += element +", ";
    })
    // strip of trailing comma and space
    //from last name
    greeting = greeting.slice(0,-2);
    return greeting;
  }
  else if (name === name.toUpperCase()){
    // repsond to shouting
    return "HELLO " + name + "!";
  }
  else {
    // response to one specified name
  return "Hello, " +name;
  }
}
