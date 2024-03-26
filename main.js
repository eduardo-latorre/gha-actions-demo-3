// - Node nodules must be installed and uploaded to the repo
const core = require('@actions/core');
const exec = require('@actions/exec');

function run(){
    core.notice('Hello from my custom JavaScript Action!');

    // 1-Get input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true }); // Can be true even if action is false
    const distFolder = core.getInput('dist-folder', { required: true });

    const s3Uri = `s3://${bucket}`; // Passing vars into s3 string in JS
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`); // Run a command from JS

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('website-url', websiteUrl) // Should match the output name in the action
}

run();