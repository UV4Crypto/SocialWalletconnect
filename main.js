// access Web3auth package from window.





const web3authSdk = window.Web3auth;
let web3AuthInstance = null;

function subscribeAuthEvents(web3auth) {
  web3auth.on("connected", (data) => {
    console.log("Yeah!, you are successfully logged in", data);
  });

  web3auth.on("connecting", () => {
    console.log("connecting");
  });

  web3auth.on("disconnected", () => {
    console.log("disconnected");
  });

  web3auth.on("errored", (error) => {
    console.log("some error or user have cancelled login request", error);
  });

  web3auth.on("MODAL_VISIBILITY", (isVisible) => {
    console.log("modal visibility", isVisible);
  });
}

(async function init() {
  // ⭐️ STEP: 1
  web3AuthInstance = new web3authSdk.Web3Auth({
    chainConfig: {
      chainNamespace: "eip155",
    },
    clientId:
      "BMSoJ91LCyxXr_pkMF8o_T3GEQBjVNVHS3qYsODRz3V0PMKmar9pG6FjEBrEdb_bWQutRpiL4lBWWtrfeuTV6G8", // get your clientId from https://dashboard.web3auth.io
  });

  // STEP: 2
  subscribeAuthEvents(web3AuthInstance);

  // STEP: 3
  await web3AuthInstance.initModal();
})();

// ⭐️ STEP 4:
// this function will be triggered on click of button with login id.
$("#login").click(async function (event) {


  // if(window.ethereum){

  // }else{

  try {
    const provider = await web3AuthInstance.connect();
    const user = await web3AuthInstance.getUserInfo();
    initWeb3();
  } catch (error) {
    $("#error").text(error.message);
  }
// }
});

//<script>

// ⭐️ STEP 5:
async function initWeb3() {
  // we can access this provider on `web3AuthInstance` only after user is logged in.
  // This provider is also returned as a response of `connect` function in step 4. You can use either ways.
  const web3 = new Web3(web3AuthInstance.provider);
  const address = (await web3.eth.getAccounts())[0];
  const balance = await web3.eth.getBalance(address);
  console.log(address);
  console.log(balance);
  $("#address").text(address);
  $("#balance").text(balance);
}



//</script>

//<script>

// ⭐️ STEP 6:
$("#logout").click(async function (event) {
  try {
    await web3AuthInstance.logout();
    $("#text").text("logged log.");
    $("#address").text("");
    $("#balance").text("");
    $("#login").show();
    $("#logout").hide();
  } catch (error) {
    $("#error").text(error.message);
  }
});

//</script>
