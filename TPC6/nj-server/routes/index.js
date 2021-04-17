var express = require("express");
var router = express.Router();
var axios = require("axios");

var prefixes = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.semanticweb.org/comta/ontologies/tp5#>
`;
var linkQuery =
  "http://epl.di.uminho.pt:8738/api/rdf4j/query/A85176-TPC5?query=";

/* GET home page. */
router.get("/pubs?type=:id", function (req, res, next) {
  var query =
    `select * where {
      ?s a :` +
    req.params.id +
    `
    }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          s: bind.s.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

/* GET home page. */
router.get("/pubs", function (req, res, next) {
  var query = `select * where {
    ?s rdfs:subClassOf :Publicacao.
  }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          titulo: bind.s.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

/* GET home page. */
router.get("/pubs/:id", function (req, res, next) {
  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o
    }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          p: bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

/* GET home page. */
router.post("/pubs/:id", function (req, res, next) {
  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o
    }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          p: bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

/* GET home page. */
router.get("/authors", function (req, res, next) {
  var query = `select * where {
      ?s a :Autor
    }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          s: bind.s.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

/* GET home page. */
router.get("/authors/:id", function (req, res, next) {
  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o
    }`;
  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(linkQuery + encoded)
    .then((dados) => {
      console.log(dados.data.results.bindings);
      var pubs = dados.data.results.bindings.map((bind) => {
        return {
          p: bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.status(200).jsonp(pubs);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
