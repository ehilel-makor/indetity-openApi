# Sample code documentation

### prerequisites

- NodeJS >= 10.6
- NPM >= 6.10.0
- JAVA >= 1.8.0
- JAR >= 5.0.0

### step 1

> git clone https://github.com/ehilel-makor/indetity-openApi.git
> {.is-info}

### step 2

add data to sql server from sql_data file

### step 3

change \_env to .env with correct data details

### step 4

> run npm start
> {.is-info}

## The server is currently working, we will now add a post request to create data

### step 5

> Add to indetity-openApi\swagger.yaml file under /indetity path
> {.is-info}

```

    post:
      tags:
        - 'identity'
      summary: 'Create identity'
      operationId: 'createIdentity'
      requestBody:
        description: Insert identity details
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/identity_create'
      responses:
        '201':
          description: 'Created'
        '400':
          description: 'Bad Request'
        '500':
          description: 'Internal Server Error'
```

### step 6

> Add to indetity-openApi\swagger.yaml file under components / schemas
> {.is-info}

```

    identity_create:
      type: object
      properties:
        first_name:
          type: string
        last_name:
          type: string
        email:
          type: string
        gender:
          type: string
        ip_address:
          type: string
      required:
        - first_name
        - last_name
        - email
        - gender
        - ip_address
```

### step 7

run:

```
java -jar openapi-generator-cli.jar generate -i swagger.yaml -t templates\nodejs-express-server -g nodejs-express-server
```

Or use the command that appears in the project

> run_swagger.cmd
> {.is-info}

### step 8

> Add to indetity-openApi\server_generate\models\Identity.js file
> {.is-info}

```
//create identity
Identity.createIdentity = async (payload, result) => {
  const query_str = await create_query_str(payload.identityCreate, 'detail');
  if (query_str) {
    const { res, err } = await update_in_data_base(query_str);
    if (err) return result({ status: 404, code: '4.1' });
  }
  return result(null, { code: '2.1' });
};
```

> Congratulations we have a server with full CRUD working
