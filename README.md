# mParticle Middleware

A re-creation of the mParticle middleware for Archipelago Companies. mParticle is the Customer Data Platform which serves as the foundation for all marketing integrations across all stores. The endpoints from this middleware are intended to be used across multiple brands and multiple Shopify stores.

## Description

* retrieves a user account from mParticle, Klaviyo, Shopify

* retrieves a user's list of events or the last instance of a particular event

## Getting Started

### Dependencies

* aws-sdk: allows developers to interact with Amazon Web Services (AWS) directly from their JavaScript applications, enabling functionalities such as S3 uploads, DynamoDB operations, and Lambda function invocations

* body-parser:  middleware for Express.js applications, used to parse incoming request bodies, making it easier to handle POST requests with JSON, URL-encoded, or other formatted data

* cors: a middleware for Express.js to enable Cross-Origin Resource Sharing (CORS), allowing web applications hosted on different domains to communicate with your server

* dot-env: allows developers to load environment variables from a .env file into process.env in Node.js applications, offering a convenient way to manage configuration settings

* express: a minimal and flexible Node.js web application framework, providing a robust set of tools for building web APIs and applications

* node-fetch: a lightweight module that brings the browser's Fetch API to Node.js, enabling developers to make HTTP requests in a more modern way than the native http and https modules

* serverless-http: a tool that enables Express.js applications to be deployed within serverless frameworks, such as AWS Lambda, converting HTTP requests/responses to formats compatible with these platforms

### Installing

1. Install dependencies on local environment
```
npm install
```

2. Ensure the region is set to us-west-2 in serverless.yml
```
provider:
  name: aws
  runtime: nodejs20.x
  region: us-west-2
```

### Deployment

In order to deploy the example, you need to run the following command:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "serverless-http-api" to stage "dev" (us-east-1)

✔ Service deployed to stack serverless-http-api-dev (91s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: serverless-http-api-dev-hello (1.6 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [HTTP API (API Gateway V2) event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in response similar to:

```json
{ "message": "Go Serverless v4! Your function executed successfully!" }
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.

## Potential Future Updates
* features to be added or desired

## Authors

* [@Daryl Blancaflor](djblanc360@gmail.com)

## Version History

* 0.1
    * Initial Release
    * 