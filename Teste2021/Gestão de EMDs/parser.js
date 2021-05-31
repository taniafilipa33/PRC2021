const fs = require("fs");

fs.readFile("emd.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var exames = JSON.parse(data);

  var writer = [];
  let link = "";
  let st = "";
  var clubes = [];
  var modalidades = [];

  exames.forEach((obj) => {
    const id = obj.id;
    var nomeClube = obj.clube;
    nomeClube.replace(" ", "_");
    var modalidade = obj.modalidade;
    clubes.push(nomeClube);

    var nomeAtleta = obj.nome.primeiro + "_" + obj.nome["último"];
    var nomeAtleta2 = obj.nome.primeiro + " " + obj.nome["último"];

    //tratar clube
    link = "www.semanticweb.org/comta/ontologies/emd#" + nomeClube;
    st =
      "###  http://" +
      link +
      "\n:" +
      nomeClube +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:Clube ;\n\t:temAtleta :" +
      nomeAtleta +
      " ;\n\t:nomeClube '" +
      nomeClube +
      "' .\n\n";
    writer = writer + "\n\n" + st;
    /*

    //tratar modalidades
    link = "www.semanticweb.org/comta/ontologies/emd#" + modalidade;
    st =
      "###  http://" +
      link +
      "\n:" +
      modalidade +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:Modalidade ;\n\t:éPraticadaPor :" +
      nomeAtleta +
      " ;\n\t:nomeModalidade '" +
      modalidade +
      "' .\n\n";
    writer = writer + "\n\n" + st;
  
    //tratar exames
    link = "www.semanticweb.org/comta/ontologies/emd#" + obj._id;
    st =
      "###  http://" +
      link +
      "\n:" +
      obj._id +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:EMD ;\n\t:pertenceA :" +
      nomeAtleta +
      " ;\n\t:dataEMD '" +
      obj.dataEMD +
      "' ;\n\t:index " +
      obj.index +
      " ;\n\t:resultado '" +
      obj.resultado +
      "' .\n\n";
    writer = writer + "\n\n" + st;

    //tratar atletas
    var r = 0;
    
    link = "www.semanticweb.org/comta/ontologies/emd#" + nomeAtleta;
    st =
      "###  http://" +
      link +
      "\n:" +
      nomeAtleta +
      " rdf:type owl:NamedIndividual ,\n\t\t\t:Atleta ;\n\t:praticaModalidade :" +
      modalidade +
      " ;\n\t:temClube :" +
      nomeClube +
      " ;\n\t:temExame :" +
      obj._id +
      " ;\n\t:temEmail '" +
      obj.email +
      "' ;\n\t:federado '" +
      obj.federado +
      "' ;\n\t:genero '" +
      obj["género"] +
      "' ;\n\t:idade " +
      obj.idade +
      " ;\n\t:morada '" +
      obj.morada +
      "' ;\n\t:nomeCompleto '" +
      nomeAtleta2 +
      "' .\n\n";
    writer = writer + "\n\n" + st;
    //modalidades.push(modalidade);
*/
    /*


    if (modalidades.includes(modalidade)) {
      var inde = 0;
      var repetida;
      var i = 0;
      var subs = [];
      if (r == 0) {
        writer.forEach((s) => {
          i++;
          if (s.modalidade == modalidade) {
            repetida = s.st;
            inde = i;
            writer.splice(inde, 1);
            var c = "PraticadaPor :" + nomeAtleta + " ,\n\t";
            repetida.replace("PraticadaPor ", c);
            console.log(repetida);
            if (repetida.includes("PraticadaPor")) console.log("hello");
            subs.push({ modalidade: modalidade, st: repetida });
            r = 1;
          } else {
            subs.push(s);
          }
        });
      }
      writer = null;
      writer = subs;
    } else {
      console.log("n tinha");
      link = "www.semanticweb.org/comta/ontologies/emd#" + modalidade;
      st =
        "###  http://" +
        link +
        "\n:" +
        modalidade +
        " rdf:type owl:NamedIndividual ,\n\t\t\t:Modalidade ;\n\t:éPraticadaPor :" +
        nomeAtleta +
        " ;\n\t:nomeModalidade '" +
        modalidade +
        "' .\n\n";
      writer.push({ modalidade: modalidade, st: st });
      modalidades.push(modalidade);
    }
  });
  //console.log(writer); // para ser usado na onlogia
  */
  });
  console.log(writer);
});
