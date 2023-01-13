import express, {Express, Request, Response}from 'express';
import mysql, {Connection, MysqlError} from 'mysql';

const app: Express = express();


app.use(express.json())
const port: number = 3002; //calling port

const connection: Connection = mysql.createConnection({
//connected to database
host: 'localhost',
user: 'root',
password: 'ilove0TTers',
database: 'classicmodels'
});


// creating query for connection to db to reuse for CRUD
app.get('/', (req: Request, res: Response) => {
connection.query("SELECT * FROM classicmodels.customers", (err: MysqlError | null, result: any) => {
if (err) {
console.error(err)
res.status(500).end()
return
}
res.status(200).json(result).end()
});
});

  // C R E A T E 
  // connected to db first, then the querie is for customer id '123' and inserts values 
app.post('/', (req: Request, res: Response) => {
connection.query(
"INSERT INTO customers (`customerNumber`,`customerName`,`contactLastName`,`contactFirstName`,`phone`,`addressLine1`,`addressLine2`,`city`,`state`,`postalCode`,`country`,`salesRepEmployeeNumber`,`creditLimit`) VALUES ('123', 'Alexia', 'Lorenzana', '123.456.7899', '1409 old tree', null, 'clt', 'nc', '') ", 
req.body, (err: MysqlError | null, result: any) => {
if (err) {
console.error(err)
res.status(500).end()
  
return
}
  
req.body.id = result.insertId
res.status(200).json(req.body).end()
});
})

// R E A D 
// trying to get the office info for the office with id of 7 which would be the London office 
app.get('/:id', (req: Request, res: Response) => {
connection.query("SELECT * FROM offices WHERE id = 7", [req.params.id], (err: MysqlError | null, result: any) => {
if (err) {
console.error(err)
res.status(500).end()
return
}
res.status(200).json(result).end()
});
})

// U P D A T E 
// updating the Tokyo's information through its id of 5 by changing the city, phone number 
app.put('/:id', (req: Request, res: Response) => {
req.body.id = Number(req.params.id)
connection.query(
"UPDATE offices SET city = Charlotte, phone = 678-999-8212 WHERE id = 5",
[req.body.title, req.body.content, req.body.id],
(err: MysqlError | null) => {
if (err) {
console.error(err)
res.status(500).end()
return
}
res.status(200).json(req.body).end()
});
})



// D E L E T E 
// this connection query excutes the delete from offices table where the id is 4 which would be the Paris office 
app.delete('/:id', (req: Request, res: Response) => {
connection.query("DELETE FROM offices WHERE id = 4", [req.params.id], (err: MysqlError | null) => {
if (err) {
console.error(err)
res.status(500).end()
return
}
res.status(200).end()
});
})

app.listen(3002, () => {
console.log(`listening on port ${port}`);
})

