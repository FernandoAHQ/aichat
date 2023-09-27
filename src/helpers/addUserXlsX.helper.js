const User = require('../models/user');
var XLSX = require('xlsx')


const ExcelToJSON = ()=>{

    const excel = XLSX.readFile('./creden_agodic22.xls')

    var name = excel.SheetNames;

    let datos= XLSX.utils.sheet_to_json(excel.Sheets[name[0]])


    // console.log(datos[0]);

    add(datos[0])


    datos.forEach((element)=>{

        console.log( add(element) )
        



    })

}



add =  async (data)=>{

    Newuser = new User(data)
    await Newuser.save()

    return 'OK' 

}

module.exports={

    ExcelToJSON


}