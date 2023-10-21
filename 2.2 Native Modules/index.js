var fs = require("fs");

// fs.writeFile("textFile.txt", "Hello", (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// }); 

fs.readFile('textFile.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 