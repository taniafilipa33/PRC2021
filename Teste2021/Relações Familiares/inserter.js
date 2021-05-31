var axios = require("axios");

let prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
`;

//query dos descendetes
var queryConstruct = encodeURI(
  prefixes +
    `CONSTRUCT {
    ?alguem1 :descendente ?alguem2 .

} WHERE {
    ?alguem2 :eProgenitorDe ?alguem1 .

}`
);

axios
  .get(
    "http://localhost:7200/repositories/familia/statements?query=" +
      queryConstruct
  )
  .then((data) => {
    console.log(data);

    var queryInsert = encodeURI(`INSERT DATA { ${data.data} }`);
    axios
      .get(
        "http://localhost:7200/repositories/familia/statements?query=" +
          queryInsert
      )
      .then((resposta) => console.log("inserido"))

      .catch((e) => console.log(e));
  })
  .catch((e) => console.log(e));
