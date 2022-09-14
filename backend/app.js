const express = require('express'); 

const app = express();

app.use(express.urlencoded());

app.use(express.static("public"));

app.get("/", function(req, res) {

})

app.listen(5000, function() {
    console.log("Server is running on port 5000")
})