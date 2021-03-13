var express = require("express");
var router = express.Router();
var axios = require("axios");
var prefixes = `

    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    PREFIX owl: <http://www.w3.org/2002/07/owl#>

    PREFIX rdfs: <w3.org/2000/01/rdf-schema#>

    PREFIX noInferences: <ontotext.com/explicit>

    PREFIX skos: <w3.org/2004/02/skos/core#>

    PREFIX : <http://www.semanticweb.org/rodrigo/ontologies/prc2021/advocacias#>

    PREFIX h: <http://www.semanticweb.org/rodrigo/ontologies/prc2021/advocacias#>

`;
//agradecimentos ao rodrigo pela ontologia a minha nao dava kkkk
/* GET home page. */
router.get("/", function (req, res, next) {
  axios
    .get("http://localhost:7200/rest/repositories")
    .then((dados) => {
      let rep = dados.data.map((r) => {
        return {
          id: r.id,
          title: r.title,
          uri: r.uri,
        };
      });
      res.render("index", { reps: rep });
    })
    .catch((erro) => {
      console.log(erro);
    });
});

router.get("/repositories/:id", function (req, res, next) {
  var getLink =
    "http://localhost:7200/repositories/" + req.params.id + "?query=";

  var query = `SELECT * WHERE { ?s a owl:Class .}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)

    .then((dados) => {
      var classes = [];
      dados.data.results.bindings.map((bind) =>
        classes.push(bind.s.value.split("#")[1])
      );
      res.render("repo", { repos: req.params.id, classes: classes });
    })

    .catch((erro) => console.log(erro));
});

router.get("/repositories/:id/class/:cl", function (req, res, next) {
  var getLink =
    "http://localhost:7200/repositories/" + req.params.id + "?query=";

  var query = `SELECT * WHERE { ?s a :` + req.params.cl + ` .}`;

  var encoded = encodeURIComponent(prefixes + query);
  axios
    .get(getLink + encoded)

    .then((dados) => {
      var dudes = [];
      dados.data.results.bindings.map((bind) =>
        dudes.push(bind.s.value.split("#")[1])
      );
      res.render("class", {
        repos: req.params.id,
        classe: req.params.cl,
        individuos: dudes,
      });
    })

    .catch((erro) => console.log(erro));
});

router.get(
  "/repositories/:id/class/:cl/individual/:ind",
  function (req, res, next) {
    var getLink =
      "http://localhost:7200/repositories/" + req.params.id + "?query=";

    var query = `SELECT * WHERE { :` + req.params.ind + ` ?p ?o}`;

    var encoded = encodeURIComponent(prefixes + query);
    axios
      .get(getLink + encoded)

      .then((dados) => {
        var dude = dados.data.results.bindings.map((bind) => {
          return {
            p: bind.p.value.split("#")[1],
            o:
              bind.o.type == "literal"
                ? bind.o.value
                : bind.o.value.split("#")[1],
          };
        });
        console.log(dude);
        res.render("indi", {
          repos: req.params.id,
          classe: req.params.cl,
          individuos: req.params.ind,
          prop: dude,
        });
      })

      .catch((erro) => console.log(erro));
  }
);

module.exports = router;
