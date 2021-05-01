const fs = require("fs");

fs.readFile("mapa.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var cidades = JSON.parse(data)["cidades"];
  var ligacao = JSON.parse(data)["ligações"];

  var writer = "";
  let link = "";
  let st = "";
  /*
  cidades.forEach((obj) => {
    const id = obj.id;
    link = "www.semanticweb.org/comta/ontologies/tpc7#" + obj.id;
    st =
      "###  http://" +
      link +
      "\n:" +
      obj.id +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:Cidade ;\n\t:descrição '" +
      obj["descrição"] +
      "' ;\n\t:distrito '" +
      obj["distrito"] +
      "' ;\n\t:id '" +
      id +
      "' ;\n\t:nome '" +
      obj.nome +
      "' ;\n\t:população " +
      obj["população"] +
      " .";

    writer = writer + "\n\n" + st;
  });
  */
  ligacao.forEach((obj) => {
    const id = obj.id;
    link = "www.semanticweb.org/comta/ontologies/tpc7#" + obj.id;
    st =
      "###  http://" +
      link +
      "\n:" +
      obj.id +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:Ligação ;\n\t:temDestino :" +
      obj["destino"] +
      " ;\n\t:temOrigem :" +
      obj["origem"] +
      " ;\n\t:distancia " +
      obj["distância"] +
      " ;\n\t:idL '" +
      obj.id +
      "' .";

    writer = writer + "\n\n" + st;
  });
  console.log(writer); // para ser usado na onlogia
});
