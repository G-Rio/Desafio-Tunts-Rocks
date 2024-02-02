function notes(){
  //Link table with script
  var ss = SpreadsheetApp.openById('1lSkOxnOj2gEarUs1OGYLkZReesp-U_X5abN5zOUQy7c');
  var dataTab = ss.getSheetByName('engenharia_de_software');
  var datas = dataTab.getRange('C4:H27').getValues();

  //Create loop for verification of the fouts
  for(line=0; line<datas.length; line++){
    var fouts = datas[line][0];
    var average = 0;
    var naf = 0;

    //Verify fouts
    if(fouts > 15){
      datas[line][4] = "Reprovado por Faltas";
      datas[line][5] = 0;
    }
    //desapprove
    else{
      //average calculation
      average = (datas[line][1] + datas[line][2] + datas[line][3]) /3;
      if(average < 50){
        datas[line][4] = 'Reprovado por Nota';
        datas[line][5] = 0;
      }
      //final exam
      else{
        if(average >= 50 && average < 70){
          naf = (average - 70);
          datas [line][4] = 'Exame Final'
          datas [line][5] = Math.abs(naf.toFixed(0));
        }
        //Aprroved
        else{
          datas [line][4] = "Aprovado";
          datas [line][5] = 0;
        }
      }
    }
  }

  var situation = ss.getSheetByName('engenharia_de_software');
  situation.getRange(4,3, datas.length, datas[0].length).setValues(datas);
}
