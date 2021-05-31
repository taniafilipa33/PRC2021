var express = require("express");
var router = express.Router();
var axios = require("axios");

var prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/comta/ontologies/emd#>
`;

execQuery = async function (query) {
  var getLink = "http://localhost:7200/repositories/EMD?query=";
  var encoded = encodeURIComponent(prefixes + query);
  var result = await axios.get(getLink + encoded);
  console.log(result);
  return result.data;
};

execTransaction = async function (query) {
  var postLink = "http://localhost:7200/repositories/EMD/statements";
  var encoded = encodeURIComponent(prefixes + query);
  try {
    var response = await axios.post(postLink, `update=${encoded}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* GET home page. */
router.get("/api/emd", async function (req, res, next) {
  if (req.query.res == "OK") {
    var query1 = `  
  select ?emd where { 
    ?emd ?p :EMD ;
        :resultado "true".
  } 
  `;

    execQuery(query1)
      .then((result) => {
        result = result.results.bindings.map((c) => {
          return {
            id: c.emd.value.split("#")[1],
          };
        });
        res.jsonp(result);
      })
      .catch((e) => console.log(e));
  } else {
    var query1 = `  
  select ?emd ?resultado ?data where {
    ?emd ?p :EMD;
      :resultado ?resultado;
      :dataEMD ?data.
  } 
  `;
    var query2 = `  
  select ?emd ?nome where {
    ?atleta ?p :Atleta ;
           :nomeCompleto ?nome;
           :temExame ?emd.
  } 
  
  `;

    execQuery(query1)
      .then((result) => {
        execQuery(query2)
          .then((result2) => {
            result = result.results.bindings.map((c) => {
              return result2.results.bindings.map((e) => {
                if (c.emd.value.split("#")[1] == e.emd.value.split("#")[1]) {
                  return {
                    ID: c.emd.value.split("#")[1],
                    Nome: e.nome.value,
                    data: c.data.value,
                    resultado: c.resultado.value,
                  };
                }
              });
            });
            res.jsonp(result);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }
});

/* GET home page. */
router.get("/api/emd/:id", async function (req, res, next) {
  var query1 =
    `  
  select * where {
    :` +
    req.params.id +
    ` ?p :EMD;
         :resultado ?resultado;
         :dataEMD ?data.
  }
  `;

  execQuery(query1)
    .then((result) => {
      result = result.results.bindings.map((c) => {
        return {
          resultado: c.resultado.value,
          data: c.data.value,
        };
      });
      res.jsonp(result);
    })
    .catch((e) => console.log(e));
});

/* GET home page. */
router.get("/api/modalidades", async function (req, res, next) {
  var query1 = `  
    select distinct ?mod where {
      ?mod ?p :Modalidade.
    }
  `;

  execQuery(query1)
    .then((result) => {
      result = result.results.bindings.map((c) => {
        return {
          nome: c.mod.value.split("#")[1],
        };
      });
      res.jsonp(result);
    })
    .catch((e) => console.log(e));
});

router.get("/api/atletas", async function (req, res, next) {
  if (req.query.gen == "M") {
    var query1 = `  
    select ?nome where { 
      ?atleta ?p :Atleta ;
          :genero "M";
          :nomeCompleto ?nome.
    } order by ?nome
    
    `;
  }
  if (req.query.gen == "F") {
    var query1 = `  
  select ?nome where { 
    ?atleta ?p :Atleta ;
        :genero "F";
        :nomeCompleto ?nome.
  } order by ?nome
  
  `;
  }

  execQuery(query1)
    .then((result) => {
      result = result.results.bindings.map((c) => {
        return {
          nome: c.nome.value,
        };
      });
      res.jsonp(result);
    })
    .catch((e) => console.log(e));
});

/* GET home page. */
router.get("/api/modalidades/:id", async function (req, res, next) {
  var query1 = `  
  select * where { 
    ?emd ?p :EMD ;
        :resultado "true".
  } 
  `;

  execQuery(query1)
    .then((result) => {
      result = result.results.bindings.map((c) => {
        return {
          id: c.emd.value.split("#")[1],
        };
      });
      res.jsonp(result);
    })
    .catch((e) => console.log(e));
});

module.exports = router;
