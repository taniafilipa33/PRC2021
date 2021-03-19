var express = require("express");
var router = express.Router();
var axios = require("axios");
var prefixes = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX noInferences: <http://www.ontotext.com/explicit>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX : <http://www.daml.org/2003/01/periodictable/PeriodicTable#>

`;
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/groups", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query = `select *
where {
  ?s a :Group.
}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var elementos = [];
      dados.data.results.bindings.map((bind) => {
        elementos.push(bind.s.value.split("#")[1]);
      });
      res.render("elems", {
        elems: elementos,
        titulo: "Grupos",
        url: "groups",
      });
    })
    .catch((erro) => console.log(erro));
});

router.get("/groups/:id", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var props = dados.data.results.bindings.map((bind) => {
        return {
          p:
            bind.p.type == "literal"
              ? bind.p.value
              : bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.render("ele", { elem: props, titulo: " Grupo" });
    })
    .catch((erro) => console.log(erro));
});

router.get("/peri", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query = `select *
where {
  ?s a :Period.
}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var elementos = [];
      dados.data.results.bindings.map((bind) => {
        elementos.push(bind.s.value.split("#")[1]);
      });
      res.render("elems", {
        elems: elementos,
        titulo: "Periodos",
        url: "peri",
      });
    })
    .catch((erro) => console.log(erro));
});

router.get("/peri/:id", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var props = dados.data.results.bindings.map((bind) => {
        return {
          p:
            bind.p.type == "literal"
              ? bind.p.value
              : bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.render("ele", { elem: props, titulo: " Periodo" });
    })
    .catch((erro) => console.log(erro));
});

/* GET home page. */
router.get("/elements", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query = `select *
where {
  ?s a :Element.
}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var elementos = [];
      dados.data.results.bindings.map((bind) => {
        elementos.push(bind.s.value.split("#")[1]);
      });
      res.render("elems", {
        elems: elementos,
        titulo: "Elementos",
        url: "elements",
      });
    })
    .catch((erro) => console.log(erro));
});

router.get("/elements/:id", function (req, res, next) {
  var getLink = "http://localhost:7200/repositories/tpc4" + "?query=";

  var query =
    `select * where {
      :` +
    req.params.id +
    ` ?p ?o}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)
    .then((dados) => {
      var props = dados.data.results.bindings.map((bind) => {
        return {
          p:
            bind.p.type == "literal"
              ? bind.p.value
              : bind.p.value.split("#")[1],
          o:
            bind.o.type == "literal"
              ? bind.o.value
              : bind.o.value.split("#")[1],
        };
      });
      res.render("ele", { elem: props, titulo: " Elemento" });
    })
    .catch((erro) => console.log(erro));
});

module.exports = router;
