import React from "react";

const Form = (props) => {
  const { formSuccessCallback } = props;

  const handleSubmit = (e) => {
    e.preventDefault()
    let myForm = document.getElementById('joinTeam');
    let formData = new FormData(myForm)
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString()
    }).then(() => 
    console.log('Form successfully submitted - display thanks'),
    formSuccessCallback(),
    myForm.style.display = "none"
    ).catch((error) =>
      console.log(error))
  }

  
  return (
    <form
      name="team"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      id="joinTeam"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="team" />
      <p>
        <input name="user" placeholder="xxx-xxx-xxx-xxx" type="text" required />
      </p>
      <p>
        <input type="checkbox" id="agreeToTerms" name="terms" required />
        <label for="terms">I agree to the terms of the <a href="/privacy">Privacy Policy</a></label>

      </p>
      <input name="team" placeholder="team" value="A" type="text" required hidden />
      <button type="submit">Join</button>
    </form>
  );
}


export default Form