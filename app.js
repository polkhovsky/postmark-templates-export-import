const postmark = require('postmark');
const _ = require("underscore");
const sourceClient = new postmark.Client("[YOUR SOURCE POSTMARK SERVER TOKEN]");
const targetClient = new postmark.Client("[YOUR TARGET POSTMARK SERVER TOKEN]");

sourceClient.getTemplates((err, result) => {

    _.each(result.Templates, (t) => {

        sourceClient.getTemplate(t.TemplateId, (e, sourceTemplate) => {
            if (e) {
                console.error(e);
            } else {
                let targetTemplate = {
                    Name: sourceTemplate.Name,
                    Subject: sourceTemplate.Subject,
                    HtmlBody: sourceTemplate.HtmlBody,
                    TextBody: sourceTemplate.TextBody
                };
                targetClient.createTemplate(targetTemplate, (err, response) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(response);
                    }
                });
            }
        });
    });
});