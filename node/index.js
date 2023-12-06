const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'nodedb',
  };


app.get('/', (req, res) => {
    insertPeopleName(res);
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})

async function insertPeopleName(res)
{
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) values('Matheus Affonso')`;
      
    connection.query(sql);
    getPeople(res, connection);

}
function getPeople(res, connection)
{
    const sql = `SELECT id, name FROM people`;  
    
    connection.query(sql, (error, results, fields) => {
        if (error) {
          throw error
        };
        
        let table = '<table>';
        table += '<tr><th>Id</th><th>Name</th></tr>';

        for(let people of results) {      
          table += `<tr>`;
          table += `<td>${people.id}</td>`;
          table += `<td>${people.name}</td>`;
          table += `</tr>`;
        }
    
        table += '</table>';    
        
        res.send('<h1>Full Cycle Rocks!</h1>' + table);    
      });   
      connection.end();   
}