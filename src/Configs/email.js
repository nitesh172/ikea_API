const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  "533820934685-lejurcpjfsrk1va41632k677hf58f5f3.apps.googleusercontent.com",
  "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", // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
)

oauth2Client.setCredentials({
  refresh_token:
    "1//04yIf9BYNxDEoCgYIARAAGAQSNgF-L9Irh_Fe0mUCVdaoniWF5Wsm2hXsI_84_z6fDDJqyI8f2nrPaNyFWIkY3zMRNICwmpjjtA",
})

const accessToken = oauth2Client.getAccessToken()


const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "ikeaseverclone@gmail.com",
    clientId:
      "533820934685-lejurcpjfsrk1va41632k677hf58f5f3.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04yIf9BYNxDEoCgYIARAAGAQSNgF-L9Irh_Fe0mUCVdaoniWF5Wsm2hXsI_84_z6fDDJqyI8f2nrPaNyFWIkY3zMRNICwmpjjtA",
    accessToken: accessToken,
  },
})

module.exports = transport
