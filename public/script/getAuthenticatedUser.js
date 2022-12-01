const connection = require("./databaseConnection");

const getUser = (request, response) => {
    // Capture the input fields
    let eID = request.body.username;
    let password = request.body.password;
    console.log(eID);
    console.log(password);
    // Ensure the input fields exists and are not empty
    if (eID && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM Login WHERE empID = ? AND pswrd = ?', [eID, password], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                console.log(results[0])
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = eID;

                //Employee View if RoleId is 3
                if (results[0].RoleId == 3) {
                    response.redirect('/');
                } else {
                    response.redirect('/supervisor');
                }

            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
}
module.exports = {getUser};