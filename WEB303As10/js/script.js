const form = $("form");
const submit = $("#submit");
const countrySelect = $("#country");

submit.prop("disabled", true);

countrySelect.append("<option value=''>Select a Country</option>");

const formState = {
  username: false,
  password: false,
  confirmPassword: false,
  checkTerm: false,
  country: false,
};

for (let country of countries) {
  countrySelect.append(
    `<option value="${country.code}">${country.name}</option>`
  );
}

const enableButton = () => {
  let buttonState = false;
  for (let key in formState) {
    if (!formState[key]) buttonState = true;
  }

  submit.prop("disabled", buttonState);
};

const changeVal = (e) => {
  const element = $(e.target);
  const val = element.val();

  switch (element.attr("id")) {
    case "username":
      formState.username = val !== "";
      break;
    case "password":
      formState.password = val.length >= 12;
      break;
    case "confirm-password":
      formState.confirmPassword = val === $("#password").val();
      break;
    case "terms-check":
      formState.checkTerm = $("#terms-check").is(":checked");
      break;
    case "country":
      formState.country = $("#country").val() !== "";
      break;
    default:
      console.log("submit button enabled");
      return;
  }

  enableButton();
};

for (let input of $("input")) {
  $(input).change(changeVal);
}

$("#country").change(changeVal);

submit.disabled = true;

form.submit((e) => {
  e.preventDefault();
  $("form").append(
    `<p>Welcome ${$(
      "#username"
    ).val()}! The country code you selected is ${countrySelect.val()}</p>`
  );
});
