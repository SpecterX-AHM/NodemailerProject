# NodemailerProject
Use Nodemailer to Send Emails 📬 from Your Node.js Server. 📮 Nodemailer is a Node.js module that allows you to send emails from your server with ease. Whether you want to communicate with your users or just notify yourself when something has gone wrong, one of the options for doing so is through mail.👀

## About Nodemailer
Nodemailer’s API is pretty simple and requires us to do the following :
(I). Create a Transporter object : 
- To create a transporter object, we do the following:  
`let transporter = nodemailer.createTransport({  
      service: 'gmail',  
      auth: {  
        type: 'OAuth2',  
        user: process.env.MAIL_USERNAME,  
        pass: process.env.MAIL_PASSWORD,  
        clientId: process.env.OAUTH_CLIENTID,  
        clientSecret: process.env.OAUTH_CLIENT_SECRET,  
        refreshToken: process.env.OAUTH_REFRESH_TOKEN  
      }  
    });`  
    
✋ Pay attention, as apart from the user and the pass keys, which are your own credentials for your gmail account, the other three keys need to be retrieved after setting up `OAuth`. Gmail has a high level of security when it comes to mail sent by/to a user’s account. There are a number of ways we can overcome this obstacle (some better than others), and we will choose the one that requires us to set up a project in the `Google Cloud Platform`. We need to do that in order to have credentials for the `OAuth security` enabled by Gmail.    
  
🙃 The next steps will require some configurations :

### Google Cloud Platform Configurations
(a). If you don’t have a Google Cloud Platform account, be sure to set one up as a prerequisite. Once you have that set up, create a New Project by clicking on the dropdown menu in the upper left corner.  
(b). Select the `NEW PROJECT` option. In the next window, we will have to give our project a name. Pick whatever you like, but we will continue with out `NodemailerProject` name. For the `Location` property, you can leave it as `No organization`. It may take a few seconds to for the project to be set up.  
(c). Open up the navigation menu by clicking the three dashed lines in the top left corner and select `APIs and Services`. In order to be able to use Nodemailer and Gmail we will have to use `OAuth2`. If you aren’t familiar with OAuth, it is a protocol for authentication.   
(d). Now, we will have to configure our `OAuth Consent Screen`. If you are not a G-Suite member, the only option available will be `External` for `User Type`.  
(e). After clicking `CREATE`, the next screen requires us to fill out the application’s information (our server). Fill in your email in the User support email field and also in the Developer contact information field. Clicking `Save and Continue` will bring us to the Scopes phase of this configuration. Skip this phase, as it is not relevant for us, and head into the Test Users phase.  
(f). Add yourself as a user in `ADD USERS`and click `Save and continue`.  

### To Configure Your OAuth Settings
In this phase will we create OAuth credentials to be used with Nodemailer.    
(a). Head over to the `Credentials` tab above OAuth Consent Screen. Click on the plus (➕) sign that has the text `Create Credentials` and choose `OAuth Client ID`.  
(b). In the `Application type` dropdown menu, choose `Web Application`.  
(c). In the `Authorized Redirect URIs` section, make sure to add `OAuth2.0 Playground` (https://developers.google.com/oauthplayground) as we will use it to get one of the keys that was mentioned in the beginning.  
(d). After clicking create, you will be presented with your `client id`(OAUTH_CLIENTID) and `client secret`(OAUTH_CLIENT_SECRET). Keep these to yourself and never expose them in any way, shape, or form.  

### To Get Your OAuth Refresh Token  
To get the refresh token, which we will use within the transporter object in Nodemailer, we need to head over to the OAuth2 Playground. We approved this URI for this specific purpose in an earlier stage.
1. Click on the gear icon to the right (which is `OAuth2.0 Configuration`) and check the checkbox to use your own `OAuth2.0 Credentials`.
2. Look over to the left side of the website and you will see a list of services. Scroll down until you see `Gmail API v1`.
3. Click `Authorize APIs`. You will be presented with a screen to login to any of your Gmail accounts. Choose the one you listed as a Test user.
4. The next screen will let you know that Google still hasn’t verified this application, but this is ok since we haven’t submitted it for verification. Click `Continue`.
5. In the next screen, you will be asked to grant permission to your project to interact with your gmail account. Please do so.
6. Once that is done, you will be redirected back to the `OAuth Playground` and you can see that there is an `authorization code` in the menu to the left. Click on the blue button labelled `Exchange authorization code for tokens`. The fields for the refresh token (OAUTH_REFRESH_TOKEN) and the access token will now be filled.

(II). Create a MailOptions Object :  
- Next, we will create the mailOptions object, which holds the details of where to send the email and with what data.  
`let mailOptions = {    
      from: 'sender@gmail.com',    
      to: 'receiver@gmail.com',    
      subject: 'NodemailerProject',    
      text: 'Hi! This is from your NodemailerProject <3'    
    };`  
    
(III). Use the Transporter.sendMail method :  
- Finally, we will use the sendMail method:  
`transporter.sendMail(mailOptions, function(err, data) {  
      if (err) {  
        console.log("Error :( " + err);  
      } else {  
        console.log("Email sent successfully!");  
      }  
    });`  

## To get started with Nodemailer
1. Clone the repository using `git clone https://github.com/DamianArado/NodemailerProject.git`.
2. Use `cd NodemailerProject`.
3. Make sure you have [NodeJs](https://nodejs.org/en/download/) installed.
4. Use `npm i` to install the required dependencies.
5. And Here we go! Run your application using `node app.js` and you will see your inbox being populated with a new email!😄
