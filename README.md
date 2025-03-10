# Sample code documentation

### prerequisites

- NodeJS >= 10.6
- NPM >= 6.10.0
- JAVA >= 1.8.0
- JAR >= 5.0.0

### step 1

> Run: `git clone https://github.com/ehilel-makor/indetity-openApi.git`

### step 2

add data to sql server from `indetity-openApi\sql_data`

### step 3

change `_env` to `.env` with correct data details

### step 4

> Run: `npm start`

## The server is currently working, we will now add a post request to create data

### step 5

> Add to `indetity-openApi\swagger.yaml` file under /indetity path

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

> Add to `indetity-openApi\swagger.yaml` file under components / schemas

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

Run:

```
java -jar openapi-generator-cli.jar generate -i swagger.yaml -t templates\nodejs-express-server -g nodejs-express-server
```

Or use the command that appears in the project

> `run_swagger.cmd`

### step 8

> Add to `indetity-openApi\server_generate\models\Identity.js`:

```
Identity.createIdentity = async (payload, result) => {
  try {
    const res = await dbHelper.execute(query.insert('detail', payload.body), payload.body)
    return result({ status: 201, data: res })
  } catch (error) {
    if (error.status) {
      return result(error)
    }
    return result({ status: 500 })
  }
}
```

> Congratulations we have a server with full CRUD working on: http://localhost:8000/api-docs/

![alt text](https://github.com/ehilel-makor/indetity-openApi/blob/main/identityOpenApi.png?raw=true)
