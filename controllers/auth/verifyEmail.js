const { userModel } = require("../../models/userModel");
const {INTERNAL_SERVER_ERROR } = require("../../response_messages/errorMessage");

const verifyEmail = async (req, res) => {
    try {
        const { email, verificationToken } = req.params;
        const existingUser = await userModel.findOne({ email });
        
        if (!existingUser) {
          const htmlData =`
          <h1 style="background-color: #f8d7da; 
           border: 1px solid #f5c6cb; 
           color: #721c24; 
           padding: 10px 20px; 
           border-radius: 5px; 
           display: inline-block; 
           max-width: 400px; 
           text-align: center;
           font-size: 18px; 
           font-family: Arial, sans-serif; 
           OOPS! Something went wrong
          </h1>`
            return res.send(htmlData);
        }

        if(existingUser.verified){
          const htmlData =`
          <h1 style="background-color: #f8d7da; 
           border: 1px solid #f5c6cb; 
           color: #721c24; 
           padding: 10px 20px; 
           border-radius: 5px; 
           display: inline-block; 
           max-width: 400px; 
           text-align: center;
           font-size: 18px; 
           font-family: Arial, sans-serif; 
           Email already verified
          </h1>`
            return res.send(htmlData);
        }

        if(existingUser.verificationToken !== verificationToken){
          const htmlData =`
          <h1 style="background-color: #f8d7da; 
           border: 1px solid #f5c6cb; 
           color: #721c24; 
           padding: 10px 20px; 
           border-radius: 5px; 
           display: inline-block; 
           max-width: 400px; 
           text-align: center;
           font-size: 18px; 
           font-family: Arial, sans-serif; 
             Verification link expired
          </h1>`
            return res.send(htmlData);
        }

        await userModel.findOneAndUpdate({ email }, { verified: true });
        await userModel.findOneAndUpdate({ email }, { verificationToken: null });


        //send html content on ui
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{
  box-sizing:border-box;
 /* outline:1px solid ;*/
}
body{
background: #ffffff;
background: linear-gradient(to bottom, #ffffff 0%,#e1e8ed 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e8ed',GradientType=0 );
    height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
  
}

.wrapper-1{
  width:100%;
  height:100vh;
  display: flex;
flex-direction: column;
}
.wrapper-2{
  padding :30px;
  text-align:center;
}
h1{
    font-family: 'Kaushan Script', cursive;
  font-size:4em;
  letter-spacing:3px;
  color:#5892FF ;
  margin:0;
  margin-bottom:20px;
}
.wrapper-2 p{
  margin:0;
  font-size:1.3em;
  color:#aaa;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.go-home{
  color:#fff;
  background:#5892FF;
  border:none;
  padding:10px 50px;
  margin:30px 0;
  border-radius:30px;
  text-transform:capitalize;
  box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
}
.footer-like{
  margin-top: auto; 
  background:#D7E6FE;
  padding:6px;
  text-align:center;
}
.footer-like p{
  margin:0;
  padding:4px;
  color:#5892FF;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
 a{
  text-decoration:none;
  color:white;
  font-weight:600;
  font-size: 14px;
}

@media (min-width:360px){
  h1{
    font-size:4.5em;
  }
  .go-home{
    margin-bottom:20px;
  }
}

@media (min-width:600px){
  .content{
  max-width:1000px;
  margin:0 auto;
}
  .wrapper-1{
  height: initial;
  max-width:620px;
  margin:0 auto;
  margin-top:50px;
  box-shadow: 4px 8px 40px 8px rgba(88, 146, 255, 0.2);
}
  
}
    </style>
</head>
<body>
    <div class=content>
        <div class="wrapper-1">
          <div class="wrapper-2">
            <h1>Thank you !</h1>
            <p>Thanks for Verify your account.</p>
            <p>you should use our service now.  </p>
            <button class="go-home">
            <a href="sdls">Login Now</a>
            </button>
          </div>
          <div class="footer-like">
            <p>Team Job Portal
            </p>
          </div>
      </div>
      </div>
      
      
      
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro" rel="stylesheet">
</body>
</html>
`
        return res.send(htmlContent);
    } catch (error) {
        console.error("Error occurred while verifying email:", error);
        const htmlData = `
          <h1 style="background-color: #f8d7da; 
           border: 1px solid #f5c6cb; 
           color: #721c24; 
           padding: 10px 20px; 
           border-radius: 5px; 
           display: inline-block; 
           max-width: 400px; 
           text-align: center;
           font-size: 18px; 
           font-family: Arial, sans-serif; 
           ${INTERNAL_SERVER_ERROR}
          </h1>`
        return res.send(htmlData);

    }
};

module.exports = { verifyEmail };
