const { CohereClientV2 } = require('cohere-ai');
const cohere = new CohereClientV2({
  token: 'QYGtWwsD3cNvr5KdCoUl9y6eQBmg6y9yCI35ZEqm',
});

const express = require('express');
const app = express();
app.use(express.json());



app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});