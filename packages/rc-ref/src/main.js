function main() {
  const p = "中國人"
  for (let pElement of p) {
    console.log("str is ", pElement);
    console.log("charCode is ", pElement.charCodeAt(0));
    console.log("char is ", pElement.charAt(0));
  }
}

main()
