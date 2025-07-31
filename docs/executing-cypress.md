# Running Cypress Testing

## Package Structure

All packages leveraging Cypress should have the following directory structure reflected in `chart/tests` with one or more test files under the `e2e` directory. 

```bash
tests
├── cypress
│   └── e2e
│       └── neuvector-health.cy.js
```

# The two main scenarios when executing package cypress tests are:
* Executing from your local developer machine outside of Kubernetes.
* Executing from within the Kubernetes cluster, utilizing Gluon, as part of the `helm test` command.

> **_NOTE:_** If you plan on targeting the virtual service and not the kubernetes service DNS name you may need to perform additional steps on your cluster to ensure it can resolve DNS internally; Otherwise, it will fail to resolve the URL. 

## Executing from outside of Kubernetes

### Execute tests headlessly

#### Requirements
* Docker Desktop must be installed on your local developer workstation
* Docker container must have connectivity to the service being tested (Ideally, this would be handled by creating a sshuttle connection to your cluster)

#### MAC Specific Requirements

Due to the differences in CPU architectures, the existing Cypress container cannot be used reliably on a MAC so it will need to be built locally before you can begin testing.  In order to do this you will need to perform the following steps to build the image locally:

1. Clone the [Cypress Image Repo](https://repo1.dso.mil/dsop/big-bang/cypress)

2. Change to the directory of the downloaded repository and execute the following command:

```bash
 docker build . -t cypress:local
```

#### Linux and Windows Subsystem for Linux (WSL) Requirements

Download the currently used Cypress image to your local workstation:

```bash
docker pull registry1.dso.mil/ironbank/big-bang/cypress@sha256:5bcf38c737aef09c51f5d43e5c3348849415b8e25ef93e5e2f2d0e809675c478
```

> **_NOTE:_** You can check the default image specified in [this file](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/chart/templates/bb-tests/_cypressrunner.yaml?ref_type=heads) to identify the current default Cypress image being used.

With the above requirements met you can now clone the [Gluon repository](https://repo1.dso.mil/big-bang/product/packages/gluon) and define the following variables which will be used later in the `docker run` command:

* export REPO_PATH=/path/to/your/parent/folder/for/your/repos
* export VIDEO_PATH=/path/where/you/would/like/to/store/cypress/videos
* export CYPRESS_SLUG=chart/tests/cypress/e2e

> **_NOTE:_** You can also store the variables in your bash profile so this step can be skipped in the future.

For MAC, run the container with the following command using your locally built image:

```bash
docker run -it --entrypoint /bin/bash --rm --mount type=bind,source=$REPO_PATH/{ReplaceWithPackageBeingTested}/$CYPRESS_SLUG,target=/test/cypress/e2e --mount type=bind,source=$REPO_PATH/gluon/common,target=/test/cypress/common --mount type=bind,source=$VIDEO_PATH,target=/test/cypress/videos --name cypress cypress:local

```

Otherwise, run the following command specifying the image you pulled earlier:

```bash
docker run -it --entrypoint /bin/bash --rm --mount type=bind,source=$REPO_PATH/{ReplaceWithPackageBeingTested}/$CYPRESS_SLUG=/test/cypress/e2e --mount type=bind,source=$REPO_PATH/gluon/common,target=/test/cypress/common --mount type=bind,source=$VIDEO_PATH,target=/test/cypress/videos --name cypress registry1.dso.mil/bigbang-ci/cypress-kubectl:13.8.1
```

All Cypress tests utilize at least one variable so you can either specify those in your docker run command or export them inside the container once it is started.  Specifying them in the `docker run` command will end up looking something like this where all of your necessary variables are defined using the `-e` parameter:

```bash
docker run -e cypress_url='https://twistlock.dev.bigbang.mil' -it --entrypoint /bin/bash --rm --mount type=bind,source=$REPO_PATH/{ReplaceWithPackageBeingTested}/$CYPRESS_SLUG=/test/cypress/e2e --mount type=bind,source=$REPO_PATH/gluon/common,target=/test/cypress/common --mount type=bind,source=$VIDEO_PATH,target=/test/cypress/videos --name cypress cypress:local
```

Now that the container is running and all variables required by the specific test you're testing have been defined you can execute the following command inside the container to execute:

```bash
npx cypress run --browser chrome
```

If you are running the container on a MAC, use the following command instead:

```bash
npx cypress run
```

This approach will allow you to quickly modify the Cypress test file and test it prior to pushing up your changes to your branch.

## Executing from within the cluster using Gluon

### 
Ensure package is installed with Install package enabling bbtests
```yaml
neuvector:
  values:
    bbtests:
      enabled: true
      cypress:
        artifacts: true
        envs:
          # This value utilizes the cypress_  prefix to set the `url`
          cypress_url: "http://neuvector-service-webui.{{ .Release.Namespace }}.svc.cluster.local:8443"
      scripts:
        envs:
          URL: "http://neuvector-service-webui.{{ .Release.Namespace }}.svc.cluster.local:8443"
```

Execute Cypress tests leveraging helm tests provided by Gluon library chart
```bash
# helm test <RELEASE> -n <NAMESPACE>
helm test neuvector-neuvector -n neuvector
```

