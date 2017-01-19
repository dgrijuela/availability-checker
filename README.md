[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Install
- Click on the 'Deploy to Heroku' button on a new tab
- There you can choose a name for your app and the location where it will run
- Then make sure it has automatically selected the add-ons stated below
- Config variables are to be filled in as stated below too (*except for SENDGRID_API_KEY*)
- Click of 'Deploy for Free'
- Wait for deploy to finish and click on 'Manage app'
- Go to 'Settings' -> 'Reveal config vars' and copy SENDGRID_PASSWORD and SENDGRID_USERNAME
- Go to [sendgrid.com](https://sendgrid.com) and log in with those credentials
- Click on 'Settings' -> 'API Keys' -> 'Create API Key' -> 'General API Key', set the name you want, give it full access to everything, and save
- Copy the generated key and paste it on SENDGRID_API_KEY, back on Heroku config vars
- Now go to 'Resources', desactivate 'web', and activate 'worker' (*using the pencils and the switchs*)
- Finally click on 'Heroku Scheduler' -> 'Add new job', fill in `node index.js`, frequency the one you want and save

### ENV variables needed

- **SENDER_NAME**: name sending the email (*defaults to 'Availability Checker'*)
- **URLS**: comma separated list of the URLs to check, e.g. 'http://primeraurl.com,https://segunda.net'
- **EMAILS**: comma separated list of emails to send the notification to, e.g. 'hey@yo.com,go@go.com'
- **SENDGRID_EMAIL**: autofilled when enabling the Sendgrid add-on
- **SENDGRID_USERNAME**: autofilled when enabling the Sendgrid add-on
- **SENDGRID_API_KEY**: see install instructions above to generate it in [sendgrid.com](https://sendgrid.com)

### Add-ons needed:

- **scheduler:standard**. To run the script again and again
- **sendgrid**. To send the emails
