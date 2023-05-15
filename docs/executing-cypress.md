# Running Cypress Testing
Depends on having Node/NPM installed.  The directory structure reflected in `chart/tests` should correspond to a minimal but standard directory structure for a cypress working directory utilizing typescript. 
```bash
tests
├── cypress
│   └── e2e
│       └── neuvector-health.cy.ts
├── cypress.config.ts
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

The configuration in `chart/tests/cypress.config.ts` sets the default environment variables. In this example, a base url is set.  
```json
env: {
    url: "https://neuvector.bigbang.dev"
},
```

# The two main scenarios when executing package cypress tests are:
* Executing from outside of Kubernetes, targeting a hostname like `https://neuvector.bigbang.dev`
* Executing from within the Kubernetes cluster, utilizing Gluon, which typically targets a Kubernetes service like: `"http://neuvector-service-webui.neuvector.svc.cluster.local:8443"`

## Executing from outside of Kubernetes

### Execute tests headlessly

```bash
# navigate to test directory
cd chart/tests

# install packages
npm install

# run tests headless
npx cypress run --env url=https://neuvector.bigbang.dev --browser chrome --headless
```

### Developing tests interactively with Cypress UI

```bash
# navigate to test directory
cd chart/tests

# install packages
npm install

# Open Cypress UI
npx cypress open
```

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

