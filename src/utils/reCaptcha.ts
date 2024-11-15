import {RecaptchaEnterpriseServiceClient} from '@google-cloud/recaptcha-enterprise'

export async function createAssessment(tokenReq:string, userIp:string, userAgentBrowser:string,{
  projectID = process.env.RECAPTCHA_PROJECT_ID || '',
  recaptchaKey = process.env.RECAPTCHA_SECRET_KEY || '',
  token = `${tokenReq}`,
  recaptchaAction = "",
  userIpAddress = `${userIp}`,
  userAgent = `${userAgentBrowser}`,
  ja3 = "ja3",
}: {
  projectID?: string;
  recaptchaKey?: string;
  token?: string;
  recaptchaAction?: string;
  userIpAddress?: string;
  userAgent?: string;
  ja3?: string;
}): Promise<number | null> {
 // Create the reCAPTCHA client & set the project path. There are multiple
   // ways to authenticate your client. For more information see:
   // https://cloud.google.com/docs/authentication
   // TODO: To avoid memory issues, move this client generation outside
   // of this example, and cache it (recommended) or call client.close()
   // before exiting this method.
   const client = new RecaptchaEnterpriseServiceClient();
   const projectPath = client.projectPath(projectID);

   // Build the assessment request.
   const request = ({
     assessment: {
       event: {
         token: token,
         siteKey: recaptchaKey,
         userIpAddress: userIpAddress,
         userAgent: userAgent,
         ja3: ja3,
       },
     },
     parent: projectPath,
   });

   // client.createAssessment() can return a Promise or take a Callback
   const [ response ]:any = await client.createAssessment(request);

   // Check if the token is valid.
   if (!response.tokenProperties.valid) {
    console.log("The CreateAssessment call failed because the token was: " +
      response.tokenProperties.invalidReason);

    return null;
   }

   // Check if the expected action was executed.
   // The `action` property is set by user client in the
   // grecaptcha.enterprise.execute() method.
   if (response.tokenProperties.action === recaptchaAction) {

    // Get the risk score and the reason(s).
    // For more information on interpreting the assessment,
    // see: https://cloud.google.com/recaptcha/docs/interpret-assessment
    console.log("The reCAPTCHA score is: " +
      response.riskAnalysis.score);

    response.riskAnalysis.reasons.forEach((reason: any) => {
      console.log(reason);
    });
    return response.riskAnalysis.score;
   } else {
    console.log("The action attribute in your reCAPTCHA tag " +
      "does not match the action you are expecting to score");
    return null;
   }
}
