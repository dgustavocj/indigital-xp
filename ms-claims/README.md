## ms-backend-archetype
Requirements
------------
* Docker
* Cmake
* Jq

Help
----
* make
* make help

Commands
--------
```console
Target                 Help                                    
------                 ----                                    
app.deps.get      Install dependencies. 
app.run           Run application.  
app.test          Run test. 
ct.build.image    Build image for development. 
ct.shell          Connect to the container by shell. 
npm.set.npmrc     Setting npmrc file.
```


The first step is to set up the gitlab access token and the @backend-libraries
------------------------------------------------------------------------------

# Configure gitlab access token
The gitlab access token configuration must be added to the .npmrc file. If the .npmrc file does not exist, it must be created.
```console
; Set AuhtToken                                                      
//gitlab.com/api/v4/projects/44198682/packages/npm/:_authToken=glpat-XXXXXXXXXXXXXXXXXXXX
```

# Configuring the @backend-libraries
```console
; Set value key for @backend-libraries
@backend-libraries:registry=https://gitlab.com/api/v4/projects/44198682/packages/npm/
```

The second step is to build the docker image for local development
------------------------------------------------------------------

# Build docker image
This step is done the first time after downloading the project.
```console
make ct.build.image
```

Third install package.json dependencies
---------------------------------------
This step must be performed when adding, modifying or deleting dependencies in the package.json file..
```console
make app.deps.get
```

Run the application to develop locally
--------------------------------------
```console
make app.run
```

Run the test
------------
```console
make app.test
```

API Endpoints
-------------

Home
----
```bash
curl --location 'http://localhost:8080'
```

Expected response:
```json
{
    "success": true,
    "message": "The ms-backend-archetype api.",
    "data": {
        "endpoints": {
            "health": {
                "/health": "methods: HEAD | GET"
            }
        }
    }
}
```

Health
------
```bash
curl --location 'http://localhost:8080/health'
```

Expected response:
```json
{
    "success": true,
    "message": "The ms-backend-archetype api is up",
    "data": {
        "status": "up",
        "errors": []
    }
}
```