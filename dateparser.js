var Naprimer = "{dd+25.mm+13.yyyy-1 Hap-1:Ms-139}";

function calcDataParse(data) {
  var regBraces = /\{[+:.\-\sDdMmYyHhSsap0-9]*\}/gi;
  var found = data.match(regBraces);
  if (found !== null) {
    for (var template_el = 0; template_el < found.length; template_el++) {
      var AMPMflag = false;
      var temp_date = new Date();
      var element = found[template_el];
      element = element.slice(1, -1);
      var def = element.split(/[.:\s]/);
      for (var time = 0; time < def.length; time++) {
        var el = def[time];
        if (el.includes("Ms")) {
          if (el.includes("+"))
            temp_date.setMinutes(temp_date.getMinutes() + Number(el.slice(3)));
          if (el.includes("-"))
            temp_date.setMinutes(temp_date.getMinutes() - Number(el.slice(3)));
        }
        if (el.includes("Hs")) {
          if (el.includes("+"))
            temp_date.setHours(temp_date.getHours() + Number(el.slice(3)));
          if (el.includes("-"))
            temp_date.setHours(temp_date.getHours() - Number(el.slice(3)));
        }
        if (el.includes("Hap")) {
          if (el.includes("+"))
            temp_date.setHours(temp_date.getHours() + Number(el.slice(4)));
          if (el.includes("-"))
            temp_date.setHours(temp_date.getHours() - Number(el.slice(4)));
          AMPMflag = true;
        }
        if (el.includes("dd")) {
          if (el.includes("+"))
            temp_date.setDate(temp_date.getDate() + Number(el.slice(3)));
          if (el.includes("-"))
            temp_date.setDate(temp_date.getDate() - Number(el.slice(3)));
        }
        if (el.includes("mm")) {
          if (el.includes("+"))
            temp_date.setMonth(temp_date.getMonth() + Number(el.slice(3)));
          if (el.includes("-"))
            temp_date.setMonth(temp_date.getMonth() - Number(el.slice(3)));
        }
        if (el.includes("yy") && !el.includes("yyyy")) {
          if (el.includes("+"))
            temp_date.setFullYear(temp_date.getFullYear() + Number(el.slice(3)));
          if (el.includes("-"))
            temp_date.setFullYear(temp_date.getFullYear() - Number(el.slice(3)));
        }
        if (el.includes("yyyy")) {
          if (el.includes("+"))
            temp_date.setFullYear(temp_date.getFullYear() + Number(el.slice(5)));
          if (el.includes("-"))
            temp_date.setFullYear(temp_date.getFullYear() - Number(el.slice(5)));  
        }
      }
      var tmp_element = "{" + element + "}";
      element = element.replace(
        /dd\+?\-?\d*/,
        temp_date.getDate() < 10
          ? "0" + temp_date.getDate()
          : temp_date.getDate()
      );
      element = element.replace(
        /mm\+?\-?\d*/,
        temp_date.getMonth() + 1 < 10
          ? "0" + (temp_date.getMonth() + 1)
          : temp_date.getMonth() + 1
      );
      element = element.replace(/yyyy\+?\-?\d*/, temp_date.getFullYear());
      element = element.replace(
        /yy\+?\-?\d*/,
        temp_date
          .getFullYear()
          .toString()
          .slice(2)
      );
      element = element.replace(
        /Hs\+?\-?\d*/,
        temp_date.getHours() < 10
          ? "0" + temp_date.getHours()
          : temp_date.getHours()
      );
      element = element.replace(
        /Ms\+?\-?\d*/,
        temp_date.getMinutes() < 10
          ? "0" + temp_date.getMinutes()
          : temp_date.getMinutes()
      );
      if (AMPMflag) {
        var m = "";
        m = temp_date.getHours() >= 12 ? "PM" : "AM";
        element = element.replace(/Hap\+?\-?\d*/, temp_date.getHours() % 12);
        element += " " + m;
      }
      data = data.replace(tmp_element, element);
    }
  }
  return data;
}

console.log(calcDataParse(Naprimer));
